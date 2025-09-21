import FastTaggerSettingsDialog from "./FastTaggerSettingsDialog";

const PluginApi = window.PluginApi;
const { React } = window.PluginApi;
const { Button } = PluginApi.libraries.Bootstrap;
const { FormattedMessage } = PluginApi.libraries.Intl;

interface FastTaggerContentProps {
  values?: Tag[];
  onSelect?: (item: Tag[]) => void;
  excludeIds?: string[];
}

interface FastTaggerContentState {
  showSettings?: boolean;
}

class FastTaggerContent extends React.Component<
  FastTaggerContentProps,
  FastTaggerContentState
> {
  constructor(props: FastTaggerContentProps) {
    super(props);
    this.state = {};
  }

  onSettingsClick = () => {
    this.setState((state) => {
      return { showSettings: true };
    });
  }

  onSettingsClose = (accept: boolean | undefined) => {
    this.setState((state) => {
      return { showSettings: false };
    });
  }

  maybeRenderSettingsDialog = () => {
    if (!this.state.showSettings) {
      return;
    }

    return (
      <FastTaggerSettingsDialog onClose={this.onSettingsClose}>

      </FastTaggerSettingsDialog>
    );
  }

  render() {
    return (
      <>
        {this.maybeRenderSettingsDialog()}
        <div>tagger view goes here</div>
        <div>
          {this.props.values &&
            this.props.values.map((item) => <span>{item.id}, </span>)}
        </div>
        <div>
          <Button
            className="plugin-fast-tagger-settings-button"
            variant="secondary"
            onClick={this.onSettingsClick}
          >
            <FormattedMessage id="plugin.fast-tagger.settings" />
          </Button>
        </div>
      </>
    );
  }
}

export default FastTaggerContent;
