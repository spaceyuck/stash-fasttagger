import FastTaggerContent from "@components/FastTaggerContent";

const PluginApi = window.PluginApi;
const { React, GQL } = PluginApi;
const { Icon } = PluginApi.components;
const { faChevronDown, faChevronUp } = PluginApi.libraries.FontAwesomeSolid;

interface IFilterValueProps<T> {
  ids?: string[];
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
    hoverPlacement?: /*Placement*/ any;
    hoverPlacementLabel?: /*Placement*/ any;
    excludeIds?: string[];
    match: any;
  };

interface FastTaggerTagSelectAddonState {
  isOpen: boolean;
}

class FastTaggerTagSelectAddon extends React.Component<TagSelectProps, FastTaggerTagSelectAddonState> {
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
    if (
      !this.props.isMulti ||
      this.props.isClearable === false ||
      this.props.isDisabled === true ||
      (this.props.ids && this.props.ids.length > 0)
    ) {
      return <></>;
    }

    return (
      <>
        <div className="d-flex flex-row justify-content-center">
          <div>
            <a href="javascript:void(0)" className="plugin-fast-tagger-toggle" onClick={this.onToggleClick}>
              {!this.state.isOpen && <Icon icon={faChevronDown}></Icon>}
              {this.state.isOpen && <Icon icon={faChevronUp}></Icon>}
              {!this.state.isOpen && "Open Quick Tag Editor"}
              {this.state.isOpen && "Close Quick Tag Editor"}
              {!this.state.isOpen && <Icon icon={faChevronDown}></Icon>}
              {this.state.isOpen && <Icon icon={faChevronUp}></Icon>}
            </a>
          </div>
        </div>
        {this.state.isOpen && (
          <FastTaggerContent
            values={this.props.values}
            excludeIds={this.props.excludeIds}
            onSelect={this.props.onSelect}
          />
        )}
      </>
    );
  }
}

export default FastTaggerTagSelectAddon;
