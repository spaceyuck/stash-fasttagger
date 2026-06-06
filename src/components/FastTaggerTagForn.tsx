import { FastTaggerEnhancedTag, FastTaggerGroup, FastTaggerGroupTags } from "../services/FastTaggerService";

const PluginApi = window.PluginApi;
const { React } = window.PluginApi;
const { Card, Button } = PluginApi.libraries.Bootstrap;
const { faTrash } = PluginApi.libraries.FontAwesomeSolid;
const { Icon, LoadingIndicator } = PluginApi.components;

let { TagLink } = PluginApi.components;
if (!TagLink) {
  PluginApi.utils.loadComponents([PluginApi.loadableComponents.TagLink]).then(() => {
    TagLink = PluginApi.components.TagLink;
  });
}

interface FastTaggerTagFormProps {
  item: FastTaggerEnhancedTag;
  /**
   * called when tag should be removed from containing group, empty means unremovable
   */
  onRemove?: () => void;
  /**
   * called when tag override data changed
   */
  onChanged?: (name?: string) => void;
}

interface FastTaggerTagFormState {
  name?: string;
  changed?: boolean;
}

class FastTaggerTagForm extends React.PureComponent<FastTaggerTagFormProps, FastTaggerTagFormState> {
  constructor(props: FastTaggerTagFormProps) {
    super(props);
    this.state = {
      name: props.item._nameOverride,
    };
  }

  onNameChanged = (text: string) => {
    this.setState({
      name: text,
      changed: true,
    });
  };

  onFocusLost = () => {
    if (this.state.changed) {
      if (this.props.onChanged) {
        this.props.onChanged(this.state.name);
      }
    }
  };

  onRemove = () => {
    if (this.props.onRemove) {
      this.props.onRemove();
    }
  };

  render() {
    if (!TagLink) {
      return <LoadingIndicator />;
    }

    return (
      <Card className="fast-tagger-card">
        <Card.Body>
          <div className="d-flex flex-direction-row justify-content-between align-items-center">
            <div className="flex-grow-1 mr-3">
              <div>
                <TagLink tag={this.props.item} linkType="details"></TagLink>
              </div>
              <div>
                <input
                  type="text"
                  className="form-control form-control-sm  text-input"
                  value={this.state.name}
                  onChange={(event) => this.onNameChanged(event.target.value)}
                  onBlur={(event) => this.onFocusLost()}
                />
              </div>
            </div>
            {this.props.onRemove && (
              <div>
                <Button className="plugin-fast-tagger-settings-button" variant="danger" onClick={this.onRemove}>
                  <Icon icon={faTrash} />
                </Button>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default FastTaggerTagForm;
