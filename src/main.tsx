import FastTaggerTagSelectAddon from "./components/FastTaggerTagSelectAddon";
import * as FastTaggerService from "./services/FastTaggerService";
import "./styles.scss";

const { PluginApi } = window;
const { React } = PluginApi;

FastTaggerService.initGroups();

PluginApi.patch.after("TagSelect", function (props: any, _: any, result: any) {
  return (
    <>
      {result}
      <FastTaggerTagSelectAddon {...props} />
    </>
  );
});

PluginApi.patch.before("TagLink", function (props: any, _: any) {
  const group = FastTaggerService.getTagGroupForTag(props.tag);

  if (group && group.colorClass) {
    props.className = (props.className ? props.className + " ": "") + "bg-" + group.colorClass;
  }

  return [props, _];
});
