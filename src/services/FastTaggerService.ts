const { GQL } = window.PluginApi;
const { StashService } = window.PluginApi.utils;

let groups: FastTaggerGroup[] = [];
let groupsById: Map<string, FastTaggerGroup> = new Map();
let tagToGroups: FastTaggerTag[] = [];
let tagToGroupsByTagId: Map<string, FastTaggerTag> = new Map();
let tags: Tag[] = [];
let tagsById: Map<string, Tag> = new Map();
let tagOrderNumbersById: Map<string, number> = new Map();

let initialized = false;
let initializePromise: Promise<void> | undefined = undefined;

export async function init() {
  if (initialized) {
    return;
  } else if (initializePromise) {
    return initializePromise;
  }

  initializePromise = new Promise((resolve, reject) => {
    console.debug("initializing fast tagger data");
    loadConfig().then(() => {
      loadTags().then(() => {
        initialized = true;
        initializePromise = undefined;
        resolve();
      });
    });
  });
  return initializePromise;
}

async function loadConfig() {
  groups = [];
  groupsById.clear();
  tagToGroups = [];
  tagToGroupsByTagId.clear();
  return window.csLib.getConfiguration("fastTagger", { groups: "[]", tagToGroups: "[]" }).then((storedConfig) => {
    if (storedConfig) {
      groups = JSON.parse(storedConfig["groups"]);
      for (var group of groups) {
        if (!group.id) {
          continue;
        }
        groupsById.set(group.id, group);
      }
      tagToGroups = JSON.parse(storedConfig["tagToGroups"]);
      for (var tag of tagToGroups) {
        tagToGroupsByTagId.set("" + tag.tagId, tag);
      }
    }
  });
}

async function saveConfig() {
  return window.csLib.setConfiguration("fastTagger", {
    groups: JSON.stringify(groups),
    tagToGroups: JSON.stringify(tagToGroups),
  });
}

async function clearConfig() {
  await window.csLib.setConfiguration("fastTagger", {
    groups: "[]",
    tagToGroups: "[]",
  });
  groups = [];
  groupsById.clear();
  tagToGroups = [];
  tagToGroupsByTagId.clear();
  initialized = false;
}

async function loadTags() {
  tags = [];
  tagsById.clear();
  return StashService.queryFindTagsForSelect({
    makeFindFilter(): FindFilterType {
      return {
        sort: "name",
        page: 1,
        per_page: 99999,
      };
    },
    makeFilter(): Record<string, unknown> {
      return {};
    },
  }).then((result: any) => {
    const tagList: Tag[] = result.data.findTags.tags;
    const unseenTags = new Map(Object.keys(tagToGroupsByTagId).map((tagId) => [tagId, false]));
    for (const tag of tagList) {
      addTag(tag);

      if (unseenTags.get(tag.id)) {
        unseenTags.delete(tag.id);
      }
    }

    // has tags no longer present
    if (unseenTags.size > 0) {
      for (const removedTagId of Object.keys(unseenTags)) {
        removeTag(removedTagId);
      }
    }

    tags.sort((left, right) => {
      const leftValue = (left.sort_name ? left.sort_name : "") + left.name;
      const rightValue = (right.sort_name ? right.sort_name : "") + right.name;
      return leftValue.localeCompare(rightValue);
    });
  });
}

function addTag(tag: Tag) {
  tags.push(tag);
  tagsById.set(tag.id, tag);

  if (!tagToGroupsByTagId.get("" + tag.id)) {
    const tagToGroup: FastTaggerTag = {
      tagId: tag.id,
    };
    tagToGroups.push(tagToGroup);
    tagToGroupsByTagId.set("" + tag.id, tagToGroup);
  }
}

function removeTag(tagId: string) {
  const tagToGroup = tagToGroupsByTagId.get(tagId);
  if (!tagToGroup) {
    return;
  }
  const idx = tagToGroups.indexOf(tagToGroup);

  tagToGroups.splice(idx, 1);
  tagToGroupsByTagId.delete("" + tagId);
}

function _addTagGroup(group: FastTaggerGroup) {
  if (!group.id) {
    return;
  }

  groups.push(group);
  groupsById.set(group.id, group);
}

function _finalzeTagGroups() {
  groups.sort((a: FastTaggerGroup, b: FastTaggerGroup) => a.order - b.order);

  // make order continguous again
  let orderValue = 0;
  for (const group of groups) {
    orderValue++;
    group.order = orderValue;
  }
}

const uuid41 = () => {
  let d = "";
  while (d.length < 32) d += Math.random().toString(16).substr(2);
  const vr = ((parseInt(d.substr(16, 1), 16) & 0x3) | 0x8).toString(16);
  return `${d.substr(0, 8)}-${d.substr(8, 4)}-4${d.substr(13, 3)}-${vr}${d.substr(17, 3)}-${d.substr(20, 12)}`;
};

async function migrateEasyTagConfig() {
  if (groups.length > 0) {
    return;
  }
  return window.csLib.getConfiguration("easytag", { Groups: "{}", Tags: "[]" }).then((storedConfig) => {
    if (storedConfig) {
      const easyTagsGroups: EasyTagGroups = JSON.parse(storedConfig["Groups"]);
      const easyTagsTags: EasyTagTag[] = JSON.parse(storedConfig["Tags"]);

      const easyTagsGroupNameToGroup: Map<string, string> = new Map();
      for (const key in easyTagsGroups) {
        const easyTagsGroup = easyTagsGroups[key];

        const group: FastTaggerGroup = {
          id: uuid41(),
          name: easyTagsGroup.title,
          order: easyTagsGroup.order,
          conditionTagId:
            easyTagsGroup.conditionId && easyTagsGroup.conditionId != "-1" ? easyTagsGroup.conditionId : undefined,
        };

        _addTagGroup(group);

        if (group.id) {
          easyTagsGroupNameToGroup.set(key, group.id);
        }
      }

      _finalzeTagGroups();

      for (const easyTagsTag of easyTagsTags) {
        const tagToGroup = tagToGroupsByTagId.get("" + easyTagsTag.stashId);
        if (tagToGroup && easyTagsTag.group) {
          const tagGroupId = easyTagsGroupNameToGroup.get(easyTagsTag.group);
          if (tagGroupId) {
            const tagGroup = groupsById.get(tagGroupId);
            if (tagGroup) {
              tagToGroup.groupId = tagGroup.id;
              tagToGroup.name = easyTagsTag.name;
            }
          }
        }
      }
    }
  });
}

interface EasyTagGroups {
  [name: string]: EasyTagGroup;
}
interface EasyTagGroup {
  title: string;
  order: number;
  type: string;
  conditionId: string;
}
interface EasyTagTag {
  group: string;
  name: string;
  stashId: number;
  stashName: string;
  stashSortName: string;
}

export async function applyChanges() {
  return saveConfig();
}

export async function revertChanges() {
  initialized = false;
  return init();
}

export async function resetConfig() {
  return clearConfig();
}

export async function importEasyTag() {
  await clearConfig();
  await init();
  return migrateEasyTagConfig();
}

export async function getTagGroups(): Promise<FastTaggerGroup[]> {
  await init();

  return groups;
}

export async function addTagGroup(group: FastTaggerGroup) {
  await init();

  group.id = uuid41();
  if (groups.length > 0) {
    group.order = groups[groups.length - 1].order + 1;
  } else {
    group.order = 1;
  }

  _addTagGroup(group);
}

export async function removeTagGroup(group: FastTaggerGroup) {
  await init();

  if (!group.id) {
    return;
  }

  const idx = groups.findIndex((e) => e.id == group.id);
  if (idx < 0) {
    return;
  }

  groups.splice(idx, 1);
  groupsById.delete(group.id);

  for (const tagToGroup of tagToGroups) {
    if (tagToGroup.groupId == group.id) {
      tagToGroup.groupId = undefined;
    }
  }

  _finalzeTagGroups();
}

export async function updateTagGroup(group: FastTaggerGroup, name?: string, conditionTagId?: string) {
  await init();

  const idx = groups.findIndex((e) => e.id == group.id);
  if (idx < 0) {
    return;
  }

  groups[idx].name = name;
  groups[idx].conditionTagId = conditionTagId;
}

export async function moveTagGroupUp(group: FastTaggerGroup) {
  await init();

  const idx = groups.findIndex((e) => e.id == group.id);
  if (idx < 0) {
    return;
  }

  // already at top
  if (idx == 0) {
    return;
  }

  const orderAbove = groups[idx - 1].order;
  groups[idx - 1].order = groups[idx].order;
  groups[idx].order = orderAbove;

  _finalzeTagGroups();
}

export async function moveTagGroupDown(group: FastTaggerGroup) {
  await init();

  const idx = groups.findIndex((e) => e.id == group.id);
  if (idx < 0) {
    return;
  }

  // already at bottom
  if (idx == groups.length - 1) {
    return;
  }

  const orderBelow = groups[idx + 1].order;
  groups[idx + 1].order = groups[idx].order;
  groups[idx].order = orderBelow;

  _finalzeTagGroups();
}

export async function getTagGroupToTags(): Promise<FastTaggerGroupTags[]> {
  await init();

  const resultEntriesByGroupId: Map<string, FastTaggerGroupTags> = new Map();
  const ret: FastTaggerGroupTags[] = [];

  for (const group of groups) {
    if (!group.id) {
      continue;
    }

    const entry: FastTaggerGroupTags = {
      group: group,
      tags: [],
    };

    resultEntriesByGroupId.set(group.id, entry);
    ret.push(entry);
  }
  const ungroupedEntry: FastTaggerGroupTags = {
    group: undefined,
    tags: [],
  };
  resultEntriesByGroupId.set("_", ungroupedEntry);
  ret.push(ungroupedEntry);

  for (const tagToGroup of tagToGroups) {
    const group = tagToGroup.groupId ? groupsById.get(tagToGroup.groupId) : undefined;
    const tag = tagsById.get(tagToGroup.tagId);
    if (tag) {
      const enhancedTag: FastTaggerEnhancedTag = { ...tag };
      enhancedTag._nameOverride = tagToGroup.name;
      enhancedTag._tagGroupId = tagToGroup.groupId;
      resultEntriesByGroupId.get(tagToGroup.groupId ? tagToGroup.groupId : "_")?.tags.push(enhancedTag);
    }
  }

  for (const value of resultEntriesByGroupId.values()) {
    value.tags.sort((left, right) => {
      const leftValue = (left.sort_name ? left.sort_name : "") + left.name;
      const rightValue = (right.sort_name ? right.sort_name : "") + right.name;
      return leftValue.localeCompare(rightValue);
    });
  }

  return ret;
}

export async function getTags(): Promise<Tag[]> {
  await init();

  return tags;
}

export async function moveTagToGroup(tag: Tag, group?: FastTaggerGroup) {
  const tagToGroups = tagToGroupsByTagId.get(tag.id);
  if (!tagToGroups) {
    return;
  }

  tagToGroups.groupId = group?.id;
}

export async function updateTag(tag: Tag, name?: string) {
  const tagToGroups = tagToGroupsByTagId.get(tag.id);
  if (!tagToGroups) {
    return;
  }

  tagToGroups.name = name;
}

export interface FastTaggerGroup {
  id?: string;
  name?: string;
  order: number;
  conditionTagId?: string;
}

export interface FastTaggerTag {
  tagId: string;
  groupId?: string;
  /**
   * override for name
   */
  name?: string;
  tag?: Tag;
}

export interface FastTaggerGroupTags {
  group?: FastTaggerGroup;
  tags: FastTaggerEnhancedTag[];
}

export interface FastTaggerEnhancedTag extends Tag {
  _nameOverride?: string;
  _tagGroupId?: string;
}
