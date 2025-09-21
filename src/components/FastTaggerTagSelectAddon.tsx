import FastTaggerContent from "@components/FastTaggerContent";

const PluginApi = window.PluginApi;
const { React, GQL } = PluginApi;
const { Button } = PluginApi.libraries.Bootstrap;
const { FormattedMessage } = PluginApi.libraries.Intl;

interface FastTaggerTagSelectAddonProps {}

interface FastTaggerTagSelectAddonState {
  isOpen: boolean;
}

class FastTaggerTagSelectAddon extends React.Component<
  FastTaggerTagSelectAddonProps,
  FastTaggerTagSelectAddonState
> {
  constructor(props: FastTaggerTagSelectAddonState) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  onToggleClick = () => {
    this.setState((state) => {
      return { isOpen: !state.isOpen };
    });
  };

  render() {
    //if (loading) return <LoadingIndicator />;

    return (
      <>
        <div>
          <Button
            className="plugin-fast-tagger-open-button"
            variant="primary"
            onClick={this.onToggleClick}
          >
            {!this.state.isOpen && (
              <FormattedMessage id="plugin.fast-tagger.open" />
            )}
            {this.state.isOpen && (
              <FormattedMessage id="plugin.fast-tagger.close" />
            )}
          </Button>
        </div>
        {this.state.isOpen && <FastTaggerContent />}
      </>
    );
  }
}

export default FastTaggerTagSelectAddon;
