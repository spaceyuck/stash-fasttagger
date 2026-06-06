import FastTaggerTagSelectAddon from "./components/FastTaggerTagSelectAddon";
import FastTaggerSettingsButton from "./components/FastTaggerSettingsButton";
import * as FastTaggerService from "./services/FastTaggerService";
import "./styles.scss";

const { PluginApi } = window;
const { React } = PluginApi;

FastTaggerService.initGroups();

/**
 * add fast tagger to tag select
 */
PluginApi.patch.after("TagSelect", function (props: any, _: any, result: any) {
  return (
    <>
      {result}
      <FastTaggerTagSelectAddon {...props} />
    </>
  );
});

/**
 * add tag group color to tag link
 */
PluginApi.patch.before("TagLink", function (props: any, _: any) {
  const group = FastTaggerService.getTagGroupForTag(props.tag);

  if (group && group.colorClass) {
    const className = (props.className ? props.className + " " : "") + "bg-" + group.colorClass;
    props = { ...props, className: className };
  }

  return [props, _];
});

/**
 * add CSS class for color to tag card title to enable CSS to render colored border around tag card
 */
PluginApi.patch.after("TagCard.Title", function (props: any, _: any, result: any) {
  const group = FastTaggerService.getTagGroupForTag(props.tag);

  if (group && group.colorClass) {
    return <div className={"fasttagger-tag-group-color fasttagger-tag-group-color-" + group.colorClass}>{result}</div>;
  }

  return result;
});

/**
 * hook into Plugin settings to display settings button in own plugin settings panel
 */
PluginApi.patch.after("PluginSettings", function (props: any, _: any, result: any) {
  if (props.pluginID == "FastTagger" || props.pluginID == "FastTagger-dev") {
    return (
      <>
        {result}
        <div className="plugin-settings">
          <div className="setting">
            <div>
              <h3>Manage Tag Groups and Tags</h3>
              <div className="sub-heading">
                Open dialog to manage tag group and the tags in them
              </div>
            </div>
            <FastTaggerSettingsButton />
          </div>
        </div>
      </>
    );
  }

  return result;
});
