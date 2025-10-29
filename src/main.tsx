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

PluginApi.patch.after("TagCard.Title", function (props: any, _: any, result: any) {
  const group = FastTaggerService.getTagGroupForTag(props.tag);

  if (group && group.colorClass) {
    return (<div className={ "fasttagger-tag-group-color fasttagger-tag-group-color-" + group.colorClass}>{result}</div>);
  }

  return result;
});