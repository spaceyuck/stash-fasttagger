const { GQL } = window.PluginApi;
const { StashService } = window.PluginApi.utils;
const { Apollo } = window.PluginApi.libraries;

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
    initGroups().then(() => {
      loadTags().then(() => {
        initialized = true;
        initializePromise = undefined;
        resolve();
      });
    });
  });
  return initializePromise;
}

let initializedGroups = false;
let initializeGroupsPromise: Promise<void> | undefined = undefined;
export async function initGroups() {
  if (initializedGroups) {
    return;
  } else if (initializeGroupsPromise) {
    return initializeGroupsPromise;
  }

  initializeGroupsPromise = new Promise((resolve, reject) => {
    console.debug("initializing fast tagger groups");
    loadConfig().then(() => {
      initializedGroups = true;
      initializeGroupsPromise = undefined;
      resolve();
    });
  });

  return initializeGroupsPromise;
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
        group.colorClass = mapColorOldToNew(group.colorClass);
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
  await saveConfigPugin();
  return saveConfigCustomFields();
}

async function saveConfigCustomFields() {
  const savedGroupTagIds: Set<string> = new Set([]);

  const promises = [];
  for (const group of groups) {
    promises.push(
      saveGroupToCustomFields(group).then((groupTagId) => {
        if (groupTagId) {
          savedGroupTagIds.add(groupTagId);
        }
      }),
    );
  }

  for (const tagToGroup of tagToGroups) {
    promises.push(saveTagToCustomFields(tagToGroup));
  }

  await Promise.all(promises);

  fetchTags({
    custom_fields: {
      field: "FastTagger_group_label",
      modifier: "NOT_NULL",
    },
  }).then((tagsWithGroupData) => {
    const promises = [];
    for (const tag of tagsWithGroupData) {
      // already saved -> skip
      if (savedGroupTagIds.has(tag.id)) {
        continue;
      }

      promises.push(
        StashService.getClient().mutate({
          mutation: GQL.TagUpdateDocument,
          variables: {
            input: {
              id: tag.id,
              custom_fields: {
                remove: [
                  "FastTagger_group_label",
                  "FastTagger_group_order",
                  "FastTagger_group_conditional",
                  "FastTagger_group_color",
                  "FastTagger_group_contexts",
                ],
              },
            },
          },
        }),
      );
    }
    return Promise.all(promises);
  });
}

async function saveGroupToCustomFields(group: FastTaggerGroup): Promise<string | undefined> {
  // not a group contitional on tag -> not persistable in tag
  var tagId;
  if (!group.conditionTagId && !group.tagId) {
    return;
  } else if (group.conditionTagId) {
    tagId = group.conditionTagId;
  } else {
    tagId = group.tagId;
  }

  await StashService.getClient().mutate({
    mutation: GQL.TagUpdateDocument,
    variables: {
      input: {
        id: tagId,
        custom_fields: {
          partial: {
            FastTagger_group_label: group.name,
            FastTagger_group_order: "" + group.order,
            FastTagger_group_conditional: group.conditionTagId ? "true" : "false",
            FastTagger_group_color: group.colorClass,
            FastTagger_group_contexts: JSON.stringify(group.contexts),
          },
          remove: [],
        },
      },
    },
  });

  return tagId;
}

async function saveTagToCustomFields(tagToGroup: FastTaggerTag): Promise<string> {
  const tag = tagsById.get(tagToGroup.tagId);
  const hasCustomFields = tag?.custom_fields?.FastTagger_tag_label !== undefined;

  // is tag assigned to group
  if (tagToGroup.groupId) {
    // changed or has no custom fields -> need to save
    if (tagToGroup.modified || !hasCustomFields) {
      const group = groupsById.get(tagToGroup.groupId);
      const groupTag = group && group.tagId ? tagsById.get(group.tagId) : undefined;
      await StashService.getClient().mutate({
        mutation: GQL.TagUpdateDocument,
        variables: {
          input: {
            id: tagToGroup.tagId,
            custom_fields: {
              partial: {
                FastTagger_tag_label: tagToGroup.name ? tagToGroup.name : "",
                FastTagger_tag_group: group
                  ? JSON.stringify({
                      name: group.name,
                      id: group.id,
                      tagId: group.tagId,
                      tagName: groupTag?.name,
                    })
                  : undefined,
              },
              remove: [],
            },
          },
        },
      });
    }
  }
  // not assigned to group but has values -> clear
  else {
    // changed or has custom fields -> need to save
    if (tagToGroup.modified || hasCustomFields) {
      await StashService.getClient().mutate({
        mutation: GQL.TagUpdateDocument,
        variables: {
          input: {
            id: tagToGroup.tagId,
            custom_fields: {
              remove: ["FastTagger_tag_label", "FastTagger_tag_group"],
            },
          },
        },
      });
    }
  }

  return tagToGroup.tagId;
}

async function saveConfigPugin() {
  return window.csLib.setConfiguration("fastTagger", {
    groups: JSON.stringify(groups),
    tagToGroups: JSON.stringify(tagToGroups),
  });
}

async function clearConfig() {
  await clearConfigPlugin();
  await clearConfigCustomFields();

  groups = [];
  groupsById.clear();
  tagToGroups = [];
  tagToGroupsByTagId.clear();

  initialized = false;
}

async function clearConfigPlugin() {
  return window.csLib.setConfiguration("fastTagger", {
    groups: "[]",
    tagToGroups: "[]",
  });
}

async function clearConfigCustomFields() {
  // clear all custom field values from tags
  const promises = [];
  for (const tag of tags) {
    promises.push(
      StashService.getClient().mutate({
        mutation: GQL.TagUpdateDocument,
        variables: {
          input: {
            id: tag.id,
            custom_fields: {
              remove: [
                "FastTagger_group_label",
                "FastTagger_group_order",
                "FastTagger_group_conditional",
                "FastTagger_group_color",
                "FastTagger_group_contexts",
                "FastTagger_tag_label",
                "FastTagger_tag_group",
              ],
            },
          },
        },
      }),
    );
  }

  return Promise.all(promises);
}

interface SerializedConfig {
  groups: SerializedConfigGroup[];
  tagToGroups: SerializedConfigTag[];
}

type SerializedConfigGroup = FastTaggerGroup & {
  conditionTag?: {
    name: string;
    aliases: string[];
  };
  tag?: {
    name: string;
    aliases: string[];
  };
};

type SerializedConfigTag = FastTaggerTag & {
  tag?: {
    name: string;
    aliases: string[];
  };
};

function serializeConfig() {
  const configData: SerializedConfig = {
    groups: [],
    tagToGroups: [],
  };

  for (const group of groups) {
    const exportedGroup: SerializedConfigGroup = { ...group };
    if (group.conditionTagId) {
      const tag = tagsById.get(group.conditionTagId);
      if (tag) {
        exportedGroup.conditionTag = {
          name: tag.name,
          aliases: tag.aliases,
        };
      }
    }
    if (group.tagId) {
      const tag = tagsById.get(group.tagId);
      if (tag) {
        exportedGroup.tag = {
          name: tag.name,
          aliases: tag.aliases,
        };
      }
    }
    configData.groups.push(exportedGroup);
  }

  for (const tagToGroup of tagToGroups) {
    const exportedTagToGroup: SerializedConfigTag = { ...tagToGroup };
    const tag = tagsById.get(tagToGroup.tagId);
    if (!tag) {
      continue;
    }
    exportedTagToGroup.tag = {
      name: tag.name,
      aliases: tag.aliases,
    };
    configData.tagToGroups.push(exportedTagToGroup);
  }

  return JSON.stringify(configData);
}

function deserializeConfig(config: string) {
  const configData: SerializedConfig = JSON.parse(config);

  if (configData.groups) {
    for (const groupData of configData.groups) {
      const group: FastTaggerGroup = {
        id: groupData.id,
        name: groupData.name,
        order: groupData.order,
        contexts: groupData.contexts,
        colorClass: mapColorOldToNew(groupData.colorClass),
      };

      let conditionTag;
      if (groupData.conditionTag) {
        conditionTag = findTagByNameOrAlias(groupData.conditionTag.name, groupData.conditionTag.aliases);
      }
      // tag not found by name -> look for ID
      if (!conditionTag && groupData.conditionTagId) {
        conditionTag = tagsById.get(groupData.conditionTagId);
      }
      // tag found
      if (conditionTag) {
        console.debug(
          'FastTagger import matched tag group "' +
            group.name +
            '" condition tag ' +
            groupData.conditionTagId +
            ' "' +
            groupData.conditionTag?.name +
            '" ' +
            groupData.conditionTag?.aliases +
            " to " +
            conditionTag.id +
            ' "' +
            conditionTag.name +
            '"',
        );
        group.conditionTagId = conditionTag.id;
        group.tagId = conditionTag.id;
      }

      let tag;
      if (!group.conditionTagId && groupData.tag) {
        tag = findTagByNameOrAlias(groupData.tag.name, groupData.tag.aliases);
      }
      // tag not found by name -> look for ID
      if (!group.conditionTagId && !tag && groupData.tagId) {
        tag = tagsById.get(groupData.tagId);
      }
      // tag found
      if (!group.conditionTagId && tag) {
        console.debug(
          'FastTagger import matched tag group "' +
            group.name +
            '"  tag ' +
            groupData.tagId +
            ' "' +
            groupData.tag?.name +
            '" ' +
            groupData.tag?.aliases +
            " to " +
            tag.id +
            ' "' +
            tag.name +
            '"',
        );
        group.conditionTagId = undefined;
        group.tagId = tag.id;
      }

      _addTagGroup(group);
    }
  }

  if (configData.tagToGroups) {
    for (var tagToGroupData of configData.tagToGroups) {
      let tag;
      if (tagToGroupData.tag) {
        tag = findTagByNameOrAlias(tagToGroupData.tag.name, tagToGroupData.tag.aliases);
      }
      // tag not found by name -> look for ID
      if (!tag) {
        tag = tagsById.get(tagToGroupData.tagId);
      }
      // no matching tag -> skip
      if (!tag) {
        continue;
      }
      const tagToGroup = tagToGroupsByTagId.get(tag.id);
      if (!tagToGroup) {
        continue;
      }
      console.debug(
        "FastTagger import matched tag " +
          tagToGroupData.tagId +
          ' "' +
          tagToGroupData.name +
          '" "' +
          tagToGroupData.tag?.name +
          '" ' +
          tagToGroupData.tag?.aliases +
          " to " +
          tag.id +
          ' "' +
          tag.name +
          '"',
      );
      tagToGroup.name = tagToGroupData.name;
      tagToGroup.groupId = tagToGroupData.groupId;
    }
  }
}

async function loadTags() {
  tags = [];
  tagsById.clear();

  return fetchTags({}).then((tagList: Tag[]) => {
    const unseenTags = new Map(Array.from(tagToGroupsByTagId.keys()).map((tagId) => [tagId, true]));
    for (const tag of tagList) {
      addTag(tag);

      if (unseenTags.get(tag.id)) {
        unseenTags.delete(tag.id);
      }
    }

    // has tags no longer present
    if (unseenTags.size > 0) {
      for (const removedTagId of unseenTags.keys()) {
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

async function fetchTags(filter: any): Promise<Tag[]> {
  return StashService.getClient()
    .query({
      query: window.PluginApi.libraries.Apollo.gql`
      query FindTagsFastTagger($filter: FindFilterType, $tag_filter: TagFilterType, $ids: [ID!]) {
        findTags(filter: $filter, tag_filter: $tag_filter, ids: $ids) {
          count
          tags {
            ...FastTaggerTagData
            __typename
          }
          __typename
        }
      }

      fragment FastTaggerTagData on Tag {
        id
        name
        sort_name
        description
        aliases
        image_path
        parents {
          id
          __typename
        }
        custom_fields
        __typename
      }
    `,
      variables: {
        filter: {
          sort: "name",
          page: 1,
          per_page: 99999,
        },
        tag_filter: filter,
      },
    })
    .then((result: any) => {
      return result.data.findTags.tags;
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
          tagId: easyTagsGroup.conditionId && easyTagsGroup.conditionId != "-1" ? easyTagsGroup.conditionId : undefined,
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

function mapColorOldToNew(input?: string): string | undefined {
  if (input == "primary") {
    return "blue";
  } else if (input == "secondary") {
    return "gray";
  } else if (input == "success") {
    return "green";
  } else if (input == "warning") {
    return "orange";
  } else if (input == "danger") {
    return "red";
  } else if (input == "info") {
    return "cyan";
  } else if (input == "warning") {
    return "orange";
  } else if (input == "light") {
    return "white";
  } else if (input == "light") {
    return "white";
  }

  return input;
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

export async function exportConfig() {
  await init();

  return serializeConfig();
}

export async function importConfig(config: string) {
  await clearConfig();
  await init();

  deserializeConfig(config);
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

export async function updateTagGroup(
  group: FastTaggerGroup,
  name?: string,
  conditionTagId?: string,
  tagId?: string,
  contexts?: string[],
  colorClass?: string,
) {
  await init();

  const idx = groups.findIndex((e) => e.id == group.id);
  if (idx < 0) {
    return;
  }

  const savedGroup = groups[idx];
  savedGroup.name = name;
  savedGroup.conditionTagId = conditionTagId;
  savedGroup.tagId = conditionTagId ? conditionTagId : tagId;
  savedGroup.contexts = contexts;
  savedGroup.colorClass = colorClass;

  // hide modfied property from stringify
  if (savedGroup.modified === undefined) {
    Object.defineProperty(tagToGroups, "modified", { value: "static", writable: true });
  }
  savedGroup.modified = true;
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

export async function moveTagGroupTo(group: FastTaggerGroup, newOrder: number) {
  await init();

  const idx = groups.findIndex((e) => e.id == group.id);
  if (idx < 0) {
    return;
  }

  const moveUp = newOrder < idx + 1;
  groups[idx].order = newOrder + (moveUp ? 0 : 1);

  // shift every below new target positions down one
  for (let updateIdx: number = Math.max(moveUp ? newOrder - 1 : newOrder, 0); updateIdx < groups.length; updateIdx++) {
    // skip updated entry
    if (updateIdx == idx) {
      continue;
    }
    groups[updateIdx].order += 1;
  }

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
      conditionTag: group.conditionTagId ? tagsById.get(group.conditionTagId) : undefined,
      tag: group.tagId ? tagsById.get(group.tagId) : undefined,
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

export function getTag(tagId?: string): Tag | undefined {
  if (!tagId) {
    return;
  }

  return tagsById.get(tagId);
}

export function findTagByNameOrAlias(name: string, aliases: string[]): Tag | undefined {
  const tag = tags.find(
    (t) =>
      // imported name matches name or alias
      (name &&
        (t.name.toLowerCase() == name.toLowerCase() ||
          t.aliases.findIndex((alias) => alias.toLowerCase() == name.toLowerCase()) > -1)) ||
      // imported alias matches name or alias
      (aliases &&
        aliases.findIndex(
          (importedAlias: string) =>
            t.name.toLowerCase() == importedAlias.toLowerCase() ||
            t.aliases.findIndex((alias) => importedAlias.toLowerCase() == alias.toLowerCase()) > -1,
        ) > -1),
  );

  return tag;
}

export function getTagGroupForTag(tag?: Tag): FastTaggerGroup | undefined {
  if (!tag) {
    return;
  }

  const tagToGroups = tagToGroupsByTagId.get(tag.id);
  if (!tagToGroups || !tagToGroups.groupId) {
    return;
  }

  const group = groupsById.get(tagToGroups.groupId);
  return group;
}

export async function moveTagToGroup(tag: Tag, group?: FastTaggerGroup) {
  const tagToGroups = tagToGroupsByTagId.get(tag.id);
  if (!tagToGroups) {
    return;
  }

  tagToGroups.groupId = group?.id;
}

export async function updateTag(tag: FastTaggerEnhancedTag, name?: string) {
  const tagToGroups = tagToGroupsByTagId.get(tag.id);
  if (!tagToGroups) {
    return;
  }

  tagToGroups.name = name;

  // hide modfied property from stringify
  if (tagToGroups.modified === undefined) {
    Object.defineProperty(tagToGroups, "modified", { value: "static", writable: true });
  }
  tagToGroups.modified = true;
}

export interface FastTaggerGroup {
  id?: string;
  name?: string;
  order: number;
  /**
   * indentifiers of contexts to show group in (scene, image, ...)
   */
  contexts?: string[];
  /**
   * ID of tag to condition visibility of group on
   */
  conditionTagId?: string;
  /**
   * ID of tag backing this group (if any)
   */
  tagId?: string;
  /**
   * optional color class for group
   */
  colorClass?: string;
  modified?: boolean;
}

export interface FastTaggerTag {
  tagId: string;
  groupId?: string;
  /**
   * override for name
   */
  name?: string;
  modified?: boolean;
}

export interface FastTaggerGroupTags {
  group?: FastTaggerGroup;
  tags: FastTaggerEnhancedTag[];
  /**
   * tag used to trigger visibility of this group
   */
  conditionTag?: Tag;
  /**
   * tag backing this group (if any)
   */
  tag?: Tag;
}

export interface FastTaggerEnhancedTag extends Tag {
  _nameOverride?: string;
  _tagGroupId?: string;
}
