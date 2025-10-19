const PluginApi = window.PluginApi;
const { React } = window.PluginApi;

interface FastTaggerSettingsContextProps {
    tags?: Tag[];
    tagIdToTag?: Map<string, Tag>;
}

const FastTaggerSettingsContext:React.Context<FastTaggerSettingsContextProps> = React.createContext({});

export default FastTaggerSettingsContext;