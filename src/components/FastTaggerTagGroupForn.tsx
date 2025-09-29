import * as FastTaggerService from "../services/FastTaggerService";
import { FastTaggerGroup } from "../services/FastTaggerService";

const PluginApi = window.PluginApi;
const { React } = window.PluginApi;
const { Button, ButtonGroup, Card } = PluginApi.libraries.Bootstrap;
const {
  faArrowUp,
  faArrowDown,
  faCirclePlay,
  faFilm,
  faImage,
  faImages,
  faLocationDot,
  faTag,
  faTrash,
  faUser,
  faVideo,
} = PluginApi.libraries.FontAwesomeSolid;
const { Icon, LoadingIndicator } = PluginApi.components;

interface FastTaggerTagGroupFormProps {
  item: FastTaggerGroup;
  onUp?: () => void;
  onDown?: () => void;
  onRemove?: () => void;
  onChanged?: (name?: string, conditionTagId?: string, contexts?: string[]) => void;
}

interface FastTaggerTagGroupFormState {
  loading: boolean;
  tags?: Tag[];
  name?: string;
  contexts?: Set<string>;
  conditionTagId?: string;
  changed: boolean;
}

const contexts = ["scene", "image", "group", "gallery", "performer", "studio", "tag"];

class FastTaggerTagGroupForm extends React.Component<FastTaggerTagGroupFormProps, FastTaggerTagGroupFormState> {
  constructor(props: FastTaggerTagGroupFormProps) {
    super(props);
    this.state = {
      loading: false,
      name: props.item.name,
      contexts: props.item.contexts !== undefined ? new Set(props.item.contexts) : new Set(contexts),
      conditionTagId: props.item.conditionTagId,
      changed: false,
    };
  }

  async componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true }, () => {
      return FastTaggerService.getTags().then((tags) => {
        this.setState({ tags: tags, loading: false });
      });
    });
  };

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

  onToggleContext = (context: string) => {
    this.setState((state) => {
      const newState = new Set(state.contexts);
      // already present -> remove
      if (state.contexts && state.contexts.has(context)) {
        newState.delete(context);
      }
      // not yet present -> add
      else {
        newState.add(context);
      }

      return {
        contexts: newState,
        changed: true,
      };
    }, () => {
      this.onFocusLost();
    });
  };

  onConditionChanged = (tagId?: string) => {
    this.setState({
      conditionTagId: tagId,
      changed: true,
    });
  };

  onFocusLost = () => {
    if (this.state.changed) {
      if (this.props.onChanged) {
        this.props.onChanged(
          this.state.name,
          this.state.conditionTagId,
          this.state.contexts ? Array.from(this.state.contexts.values()) : undefined
        );
      }
    }
  };

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    return (
      <Card className="fast-tagger-card">
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
          <div>
            <ButtonGroup size="sm">
              {contexts.map((context) => (
                <Button
                  size="sm"
                  className={this.state.contexts?.has(context) ? "btn-success" : "btn-danger"}
                  onClick={() => this.onToggleContext(context)}
                >
                  {context == "scene" && <Icon icon={faCirclePlay} title="toggle visible when tagging scenes" />}
                  {context == "image" && <Icon icon={faImage} title="toggle visible when tagging images" />}
                  {context == "group" && <Icon icon={faFilm} title="toggle visible when tagging groups" />}
                  {context == "gallery" && <Icon icon={faImages} title="toggle visible when tagging galleries" />}
                  {context == "performer" && <Icon icon={faUser} title="toggle visible when tagging performers" />}
                  {context == "studio" && <Icon icon={faVideo} title="toggle visible when tagging studios" />}
                  {context == "tag" && <Icon icon={faTag} title="toggle visible when tagging tags" />}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div>
            <select
              className="form-control"
              aria-placeholder="Selecto Tag for group condition"
              value={this.state.conditionTagId}
              onChange={(event) => this.onConditionChanged(event.target.value)}
              onBlur={(event) => this.onFocusLost()}
            >
              <option value="">---No Condition---</option>
              {this.state.tags?.map((tag) => (
                <option value={tag.id}>{tag.name}</option>
              ))}
            </select>
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
