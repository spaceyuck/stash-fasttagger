import FastTaggerSettingsPage from "@components/FastTaggerSettingsPage";
import FastTaggerTabContent from "@components/FastTaggerTabContent";
import { default as cx } from "classnames";
import "./styles.scss";

const { PluginApi } = window;
const { GQL, React } = PluginApi;
const { LoadingIndicator } = PluginApi.components;
const { Nav, Tab } = PluginApi.libraries.Bootstrap;
const { FormattedMessage } = PluginApi.libraries.Intl;

PluginApi.register.route(
  "/plugins/fast-tagger/setting",
  FastTaggerSettingsPage
);

PluginApi.patch.instead(
  "FrontPage",
  function (props: any, _: any, original: (props: any) => any) {
    return (
      <>
        <p>Hello from Test React!</p>
        {original({ ...props })}
      </>
    );
  }
);

PluginApi.patch.after(
  "ScenePage.Tabs",
  function (props: any, _: any, result: any) {
    return (
      <>
        {result}
        <Nav.Item>
          <Nav.Link eventKey="plugin-fast-tagger">
            <FormattedMessage id="plugin-fast-tagger" />
          </Nav.Link>
        </Nav.Item>
      </>
    );
  }
);

PluginApi.patch.after(
  "ScenePage.TabContent",
  function (props: any, _: any, result: any) {
    return (
      <>
        {result}
        <Tab.Pane eventKey="plugin-fast-tagger">
            <FastTaggerTabContent />
        </Tab.Pane>
      </>
    );
  }
);
