import { FastTaggerGroup } from "../services/FastTaggerService";

const PluginApi = window.PluginApi;
const { React } = window.PluginApi;
const { Button, ButtonGroup, Card } = PluginApi.libraries.Bootstrap;
const { FormattedMessage } = PluginApi.libraries.Intl;
const { faArrowUp, faArrowDown, faTrash } = PluginApi.libraries.FontAwesomeSolid;
const { Icon } = PluginApi.components;

interface FastTaggerTagGroupFormProps {
  item: FastTaggerGroup;
  onUp?: () => void;
  onDown?: () => void;
  onRemove?: () => void;
  onChanged?: (name?: string) => void;
}

interface FastTaggerTagGroupFormState {
  name?: string;
  changed: boolean;
}

class FastTaggerTagGroupForm extends React.Component<FastTaggerTagGroupFormProps, FastTaggerTagGroupFormState> {
  constructor(props: FastTaggerTagGroupFormProps) {
    super(props);
    this.state = {
      name: props.item.name,
      changed: false,
    };
  }

  onUpClicked = () => {
    if (this.props.onUp) {
      this.props.onUp();
    }
  };

  onDownClicked = () => {
    if (this.props.onDown) {
      this.props.onDown();
    }
  };

  onRemoveClicked = () => {
    if (this.props.onRemove) {
      this.props.onRemove();
    }
  };

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

  render() {
    return (
      <Card className="card-sm">
        <Card.Body>
          <div>
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={(event) => this.onNameChanged(event.target.value)}
              onBlur={(event) => this.onFocusLost()}
              placeholder="Name..."
              className="form-control form-control-sm"
              required
            />
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="row">
            <div className="col-md-6">
              <ButtonGroup>
                {this.props.onUp && (
                  <Button size="xs" onClick={this.onUpClicked}>
                    <Icon icon={faArrowUp} />
                  </Button>
                )}
                {this.props.onDown && (
                  <Button size="xs" onClick={this.onDownClicked}>
                    <Icon icon={faArrowDown} />
                  </Button>
                )}
              </ButtonGroup>
              <span>{this.props.item.order}</span>
            </div>
            <div className="col-md-6 text-right">
              {this.props.onRemove && (
                <Button size="xs" variant="danger" onClick={this.onRemoveClicked}>
                  <Icon icon={faTrash} />
                </Button>
              )}
            </div>
          </div>
        </Card.Footer>
      </Card>
    );
  }
}

export default FastTaggerTagGroupForm;
