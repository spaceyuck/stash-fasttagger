const { GQL } = window.PluginApi;
const { StashService } = window.PluginApi.utils;

let groups: FastTaggerGroup[] = [];
let groupsById: { [key: string]: FastTaggerGroup } = {};
let tagToGroups: FastTaggerTag[] = [];
let tagToGroupsByTagId: { [key: string]: FastTaggerTag } = {};
let tags: Tag[] = [];
let tagsById: { [key: string]: Tag } = {};

let initialized = false;

export async function init() {
  if (initialized) {
    return;
  }

  console.debug("initializing fast tagger data");
  await loadConfig();
  await loadTags();

  if (groups.length == 0) {
    await migrateEasyTagConfig();
  }

  initialized = true;
}

async function loadConfig() {
  groups = [];
  groupsById = {};
  tagToGroups = [];
  tagToGroupsByTagId = {};
  return window.csLib
    .getConfiguration("fastTagger", { groups: "[]", tagToGroups: "[]" })
    .then((storedConfig) => {
      if (storedConfig) {
        groups = JSON.parse(storedConfig["groups"]);
        for (var group of groups) {
          if (!group.id) {
            continue;
          }
          groupsById[group.id] = group;
        }
        tagToGroups = JSON.parse(storedConfig["tagToGroups"]);
        for (var tag of tagToGroups) {
          tagToGroupsByTagId[tag.tagId] = tag;
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

export async function clearConfig() {
  await window.csLib.setConfiguration("fastTagger", {
    groups: "[]",
    tagToGroups: "[]",
  });
  await init();
}

async function loadTags() {
  tags = [];
  tagsById = {};
  return StashService.queryFindTags({
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
    const unseenTags = new Map(
      Object.keys(tagToGroupsByTagId).map((tagId) => [tagId, false])
    );
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

    saveConfig();
  });
}

function addTag(tag: Tag) {
  tags.push(tag);
  tagsById[tag.id] = tag;

  if (!tagToGroupsByTagId[tag.id]) {
    const tagToGroup: FastTaggerTag = {
      tagId: tag.id,
    };
    tagToGroups.push(tagToGroup);
    tagToGroupsByTagId[tag.id] = tagToGroup;
  }
}

function removeTag(tagId: string) {
  const tagToGroup = tagToGroupsByTagId[tagId];
  const idx = tagToGroups.indexOf(tagToGroup);

  tagToGroups.splice(idx, 1);
  delete tagToGroupsByTagId[tagId];
}

function _addTagGroup(group: FastTaggerGroup) {
  if (!group.id) {
    return;
  }

  groups.push(group);
  groupsById[group.id];
}

function _finalzeTagGroups() {
  groups.sort((a:FastTaggerGroup, b:FastTaggerGroup) => a.order - b.order)
  
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
  return `${d.substr(0, 8)}-${d.substr(8, 4)}-4${d.substr(
    13,
    3
  )}-${vr}${d.substr(17, 3)}-${d.substr(20, 12)}`;
};

async function migrateEasyTagConfig() {
  if (groups.length > 0) {
    return;
  }
  return window.csLib
    .getConfiguration("easytag", { Groups: "{}", Tags: "[]" })
    .then((storedConfig) => {
      if (storedConfig) {
        const easyTagsGroups: EasyTagGroups = JSON.parse(
          storedConfig["Groups"]
        );
        const easyTagsTags: EasyTagTag[] = JSON.parse(storedConfig["Tags"]);

        for (const key in easyTagsGroups) {
          const easyTagsGroup = easyTagsGroups[key];
          
          const group:FastTaggerGroup = {
            id: uuid41(),
            name: easyTagsGroup.title,
            order: easyTagsGroup.order
          };

          _addTagGroup(group);
        }

        _finalzeTagGroups();
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

export async function getTagGroups(): Promise<FastTaggerGroup[]> {
  await init();

  return groups;
}

export function addTagGroup(group: FastTaggerGroup): void {
  group.id = uuid41();
  if (groups.length > 0) {
    group.order = groups[groups.length - 1].order + 1;
  } else {
    group.order = 1;
  }
  _addTagGroup(group);
}

export function removeTagGroup(group: FastTaggerGroup): void {
  if (!group.id) {
    return;
  }

  const idx = groups.findIndex((e) => e.id == group.id);
  if (idx < 0) {
    return;
  }

  groups.splice(idx, 1);
  delete groupsById[group.id];

  _finalzeTagGroups();
}

export function moveTagGroupUp(group: FastTaggerGroup): void {
  const idx = groups.findIndex((e) => e.id == group.id);
  if (idx < 0) {
    return;
  }

  // already at top
  if (idx == 0) {
    return;
  }

  const orderAbove = groups[idx-1].order;
  groups[idx-1].order = groups[idx].order;
  groups[idx].order = orderAbove;

  _finalzeTagGroups();
}

export function moveTagGroupDown(group: FastTaggerGroup): void {
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

export async function getTagGroupToTags(): Promise<
  Map<FastTaggerGroup, Tag[]>
> {
  await init();

  const ret: Map<FastTaggerGroup, Tag[]> = new Map();

  for (const group of groups) {
    ret.set(group, []);
  }

  for (const tagToGroup of tagToGroups) {
    if (!tagToGroup.groupId) {
      continue;
    }

    const group = groupsById[tagToGroup.groupId];
    const tag = tagsById[tagToGroup.tagId];
    ret.get(group)?.push(tag);
  }

  return ret;
}

export interface FastTaggerGroup {
  id?: string;
  name?: string;
  order: number;
}

export interface FastTaggerTag {
  tagId: string;
  groupId?: string;
}
