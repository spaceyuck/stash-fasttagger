import FastTaggerSettingsContext from "./FastTaggerSettingsContext";
import * as FastTaggerService from "../services/FastTaggerService";

const PluginApi = window.PluginApi;
const { React } = window.PluginApi;
const { Card, Dropdown } = PluginApi.libraries.Bootstrap;
const { LoadingIndicator } = PluginApi.components;

let { TagLink } = PluginApi.components;
PluginApi.utils.loadComponents([PluginApi.loadableComponents.TagLink]).then(() => {
  TagLink = PluginApi.components.TagLink;
});

interface FastTaggerTagSelectorProps {
  selected?: string;
  onChange?: (tagId?: string) => void;
  disabled?: boolean;
}

interface FastTaggerTagSelectorState {
  selected?: string;
}

class FastTaggerTagSelector extends React.PureComponent<FastTaggerTagSelectorProps, FastTaggerTagSelectorState> {
  constructor(props: FastTaggerTagSelectorProps) {
    super(props);
    this.state = {
      selected: props.selected,
    };
  }

  onChange = (selected?: string) => {
    this.setState({ selected: selected }, () => {
      if (this.props.onChange) {
        this.props.onChange(selected);
      }
    });
  };

  render() {
    return (
      <FastTaggerSettingsContext.Consumer>
        {(context) => (
          <select
            className="form-control"
            aria-placeholder="Select Tag for group condition"
            value={this.state.selected}
            onChange={(event) => this.onChange(event.target.value)}
            disabled={this.props.disabled}
          >
            <option value="">---No Condition---</option>
            {context.tags?.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        )}
      </FastTaggerSettingsContext.Consumer>
    );
  }
}

export default FastTaggerTagSelector;
