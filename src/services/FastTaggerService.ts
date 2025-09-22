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
    groups: '[]',
    tagToGroups: '[]',
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
    makeFilter() : Record<string, unknown> {
      return  {

      };
    }
  }).then((result: any) => {
    const tagList: Tag[] = result.data.findTags.tags;
    const unseenTags = new Map(Object.keys(tagToGroupsByTagId).map(tagId => [tagId, false]));
    for (var tag of tagList) {
        tags.push(tag);
        tagsById[tag.id] = tag;

        if (!tagToGroupsByTagId[tag.id]) {
            const tagToGroup : FastTaggerTag = {
                tagId: tag.id
            };
            tagToGroups.push(tagToGroup);
            tagToGroupsByTagId[tag.id] = tagToGroup;
        }

        if (unseenTags.get(tag.id)) {
            unseenTags.delete(tag.id);
        }
    }

    // has tags no longer present
    if (unseenTags.size > 0) {
        for (const removedTagId of Object.keys(unseenTags)) {
            const tagToGroup = tagToGroupsByTagId[removedTagId];
            const idx = tagToGroups.indexOf(tagToGroup);

            tagToGroups.splice(idx, 1);
            delete tagToGroupsByTagId[removedTagId];
        }
    }

    saveConfig();
  });
}

export async function getTagGroups(): Promise<FastTaggerGroup[]> {
    await init();

    return groups;
}

export function addTagGroup(group: FastTaggerGroup): void {
    group.id = uuid41();
    groups.push(group);
    groupsById[group.id];
}

export function removeTagGroup(group: FastTaggerGroup): void {
  if (!group.id) {
    return;
  }
  const idx = groups.findIndex(e => e.id == group.id);
  if (idx < 0) {
    return;
  }
  groups.splice(idx, 1);
  delete groupsById[group.id];
}

export function moveTagGroupUp(group: FastTaggerGroup): void {
  
}

export function moveTagGroupDown(group: FastTaggerGroup): void {
  
}

export async function getTagGroupToTags(): Promise<Map<FastTaggerGroup, Tag[]>> {
    await init();  
    
    const ret : Map<FastTaggerGroup, Tag[]> = new Map();

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

const uuid41 = () => {
  let d = '';
  while (d.length < 32) d += Math.random().toString(16).substr(2);
  const vr = ((parseInt(d.substr(16, 1), 16) & 0x3) | 0x8).toString(16);
  return `${d.substr(0, 8)}-${d.substr(8, 4)}-4${d.substr(13, 3)}-${vr}${d.substr(17, 3)}-${d.substr(20, 12)}`;
};

export interface FastTaggerGroup {
  id?: string;
  name?: string;
}

export interface FastTaggerTag {
  tagId: string;
  groupId?: string;
}