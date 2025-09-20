const PluginApi = window.PluginApi;
const { React, GQL } = PluginApi;

const FastTaggerSettingsPage: React.FC = () => {
  const componentsToLoad = [
    PluginApi.loadableComponents.SceneCard,
    PluginApi.loadableComponents.PerformerSelect,
  ];
  const componentsLoading = PluginApi.hooks.useLoadComponents(componentsToLoad);

  const { SceneCard, LoadingIndicator } = PluginApi.components;

  // read a random scene and show a scene card for it
  const { data } = GQL.useFindScenesQuery({
    variables: {
      filter: {
        per_page: 1,
        sort: "random",
      },
    },
  });

  const scene = data?.findScenes.scenes[0];

  if (componentsLoading) return <LoadingIndicator />;

  return (
    <div>
      <div>This is a test page.</div>
      {!!scene && <SceneCard scene={data.findScenes.scenes[0]} />}
      <div>
        dfsdfsdfasdfa
      </div>
    </div>
  );
};

export default FastTaggerSettingsPage;
