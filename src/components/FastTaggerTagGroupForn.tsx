import { FastTaggerGroup } from "../services/FastTaggerService";

const PluginApi = window.PluginApi;
const { React } = window.PluginApi;
const { Button, ButtonGroup, Card } = PluginApi.libraries.Bootstrap;
const { FormattedMessage } = PluginApi.libraries.Intl;
const { faArrowUp, faArrowDown, faTrash } =
  PluginApi.libraries.FontAwesomeSolid;
const { Icon } = PluginApi.components;

interface FastTaggerTagGroupFormProps {
  item: FastTaggerGroup;
  onGroupUp?: Function;
  onGroupDown?: Function;
  onGroupRemove?: Function;
}

interface FastTaggerTagGroupFormState {}

class FastTaggerTagGroupForm extends React.Component<
  FastTaggerTagGroupFormProps,
  FastTaggerTagGroupFormState
> {
  constructor(props: FastTaggerTagGroupFormProps) {
    super(props);
    this.state = {};
  }

  onUpClicked = () => {
    if (this.props.onGroupUp) {
      this.props.onGroupUp();
    }
  };

  onDownClicked = () => {
    if (this.props.onGroupDown) {
      this.props.onGroupDown();
    }
  };

  onRemoveClicked = () => {
    if (this.props.onGroupRemove) {
      this.props.onGroupRemove();
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
              value={this.props.item.name}
              placeholder="Name..."
              className="form-control"
              required
            />
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="row">
            <div className="col-md-6">
              <ButtonGroup>
                {this.props.onGroupUp && (
                  <Button size="xs" onClick={this.onUpClicked}>
                    <Icon icon={faArrowUp} />
                  </Button>
                )}
                {this.props.onGroupDown && (
                  <Button size="xs" onClick={this.onDownClicked}>
                    <Icon icon={faArrowDown} />
                  </Button>
                )}
              </ButtonGroup>
              <span>{this.props.item.order}</span>
            </div>
            <div className="col-md-6 text-right">
              {this.props.onGroupRemove && (
                <Button
                  size="xs"
                  variant="danger"
                  onClick={this.onRemoveClicked}
                >
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
