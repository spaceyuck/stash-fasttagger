import FastTaggerSettingsDialog from "./FastTaggerSettingsDialog";

const PluginApi = window.PluginApi;
const { React } = window.PluginApi;
const { Button } = PluginApi.libraries.Bootstrap;
const { faGear } = PluginApi.libraries.FontAwesomeSolid;
const { Icon, LoadingIndicator } = PluginApi.components;

interface FastTaggerSettingsButtonProps {
  onClose?: (accept?: boolean) => void;
}

interface FastTaggerSettingsButtonState {
  loading: boolean;
  showSettings: boolean;
}

class FastTaggerSettingsButton extends React.Component<FastTaggerSettingsButtonProps, FastTaggerSettingsButtonState> {
  constructor(props: FastTaggerSettingsButtonProps) {
    super(props);
    this.state = {
      loading: false,
      showSettings: false,
    };
  }


  onSettingsClick = () => {
    this.setState({ showSettings: true });
  };

  onSettingsClose = (accept: boolean | undefined) => {
    this.setState({ showSettings: false });
    if (this.props.onClose) {
      this.props.onClose(accept);
    }
  };

  maybeRenderSettingsDialog = () => {
    if (!this.state.showSettings) {
      return;
    }

    return <FastTaggerSettingsDialog onClose={this.onSettingsClose}></FastTaggerSettingsDialog>;
  };

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    return (
      <div>
        {this.maybeRenderSettingsDialog()}
        <Button className="plugin-fast-tagger-settings-button" variant="secondary" onClick={this.onSettingsClick}>
          <Icon icon={faGear} /> Settings
        </Button>
      </div>
    );
  }
}

export default FastTaggerSettingsButton;
