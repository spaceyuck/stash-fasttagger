import FastTaggerContent from "@components/FastTaggerContent";

const PluginApi = window.PluginApi;
const { React, GQL } = PluginApi;
const { Button } = PluginApi.libraries.Bootstrap;
const { FormattedMessage } = PluginApi.libraries.Intl;

interface IFilterValueProps<T> {
  values?: T[];
  onSelect?: (item: T[]) => void;
}

interface IFilterProps {
  noSelectionString?: string;
  className?: string;
  active?: boolean;
  isMulti?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  creatable?: boolean;
  menuPortalTarget?: HTMLElement | null;
}

type TagSelectProps = IFilterProps &
  IFilterValueProps<Tag> & {
    hoverPlacement?: /*Placement*/any;
    hoverPlacementLabel?: /*Placement*/any;
    excludeIds?: string[];
  };

interface FastTaggerTagSelectAddonState {
  isOpen: boolean;
}

class FastTaggerTagSelectAddon extends React.Component<
  TagSelectProps,
  FastTaggerTagSelectAddonState
> {
  constructor(props: TagSelectProps) {
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

    if (!this.props.isMulti || this.props.isClearable === false) {
        return (<></>);
    }

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
        {this.state.isOpen && <FastTaggerContent values={this.props.values} excludeIds={this.props.excludeIds} onSelect={this.props.onSelect} />}
      </>
    );
  }
}

export default FastTaggerTagSelectAddon;
