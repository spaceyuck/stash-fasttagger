import FastTaggerTagSelectAddon from "@components/FastTaggerTagSelectAddon";
import "./styles.scss";

const { PluginApi } = window;
const { React } = PluginApi;

PluginApi.patch.after(
  "TagSelect",
  function (props: any, _: any, result: any) {
    return (
      <>
        {result}
        <FastTaggerTagSelectAddon />
      </>
    );
  }
);
