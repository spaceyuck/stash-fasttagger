A UI plugin for [Stash](https://github.com/stashapp/stash) that enables fast tagging without searching for tags.

This plugin heavily inspired by the Quick Edit Plugin by [S3L3CT3DLoves](https://github.com/S3L3CT3DLoves), but implemented using the [UI Plugin API](https://docs.stashapp.cc/in-app-manual/plugins/uipluginapi/).

# Basic functionality
* show a small "Open Quick Tag Editor" link under each multi tag select box in the UI
* tags to select are show grouped, and can be toggled on and of with a signle click
* tags have a hover popup in the spirit of the actual tag hover popup, showing name, desciption and image (it's not identical, since that UI component is not acessible to UI plugins)
* a "Settings" button a the bottom of the Quick Tag Editor will open a settings popup, where the tags and groups can be configured

# Features
* create many groups to organize tags
* groups can be hidden per item type, so that for example a group can be hidden when tagging performers, but shown for scenes and images
* groups can be conigured to only be shown when a selected tag is already tagged, allowing a setup where one tag group contains the broad topics to be tagged, and only show the more specific tags for each topic if it is selected
* move tags between tag groups, or no tag group (tags can only belong to one group, and tags without a group will not be shown in the Quick Tag Editor)
* tags are always sorted based on Tag sort name and name, so special topic-dependent non-alphanumeric tag orders can be relized through the sort name
* tags can have an optional shorter display name, enabling very compact tag buttons within the context of a group, even with many tags in a group
* configuration is stored within the Stash server itself
* download and upload the current configuration to / from a JSON file, as a convient for of backup (it is not recommended to reuse configuration backup between different Stash servers, since they are specific to the tag IDs of the specific server)
* a mechanism to import the settings from the [Quick Edit / Easy tag](https://github.com/S3L3CT3DLoves/stashPlugins) plugin by [S3L3CT3DLoves](https://github.com/S3L3CT3DLoves), so if you have already configured a complex structure there, it should be only one click to migrate it over

# Screenshots

## Editor

Initial state of any tag multi-select

![editor closed](/doc/screenshots/editor_closed.png?raw=true "Initial state of any tag multi-select")

tag multi-select with open editor

![editor open](/doc/screenshots/editor_open.png?raw=true "tag multi-select with open editor")

## Settings

Settings dialog, on tab for managing tag groups

![settings tab groups](/doc/screenshots/settings_groups.png?raw=true "Settings dialog, on tab for managing tag groups")

Settings dialog, on tab for managing tag to group assignments

![settings tab tags](/doc/screenshots/settings_tags.png?raw=true "Settings dialog, on tab for managing tag to group assignments")


# Credits
* [S3L3CT3DLoves](https://github.com/S3L3CT3DLoves) for creating the original [Quick Edit / Easy tag](https://github.com/S3L3CT3DLoves/stashPlugins) Plugin that provided the inspiration for this
* as a toal React newbie, [Valkyr-JS](https://github.com/Valkyr-JS) providing a [template](https://github.com/Valkyr-JS/StashPluginTemplate) to get started with a Stash UI plugin was extremely helpful
