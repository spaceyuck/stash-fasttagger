import FastTaggerSettingsContext from "./FastTaggerSettingsContext";
import FastTaggerTagSelector from "./FastTaggerTagSelector";
import * as FastTaggerService from "../services/FastTaggerService";
import { FastTaggerGroup } from "../services/FastTaggerService";

const PluginApi = window.PluginApi;
const { React } = window.PluginApi;
const { Button, ButtonGroup, Card, FormControl, InputGroup } = PluginApi.libraries.Bootstrap;
const {
  faArrowUp,
  faArrowDown,
  faCirclePlay,
  faFilm,
  faImage,
  faImages,
  faLocationDot,
  faPencil,
  faTag,
  faTrash,
  faUser,
  faVideo,
} = PluginApi.libraries.FontAwesomeSolid;
const { Icon, LoadingIndicator } = PluginApi.components;

let { TagSelect, TagIDSelect } = PluginApi.components;
if (!TagSelect && PluginApi.loadableComponents.TagSelec) {
  PluginApi.utils.loadComponents([PluginApi.loadableComponents.TagSelect]).then(() => {
    TagSelect = PluginApi.components.TagSelect;
  });
}
if (!TagIDSelect && PluginApi.loadableComponents.TagIDSelect) {
  PluginApi.utils.loadComponents([PluginApi.loadableComponents.TagIDSelect]).then(() => {
    TagIDSelect = PluginApi.components.TagIDSelect;
  });
}

interface FastTaggerTagGroupFormProps {
  item: FastTaggerGroup;
  disabled?: boolean;
  onUp?: () => void;
  onDown?: () => void;
  onOrder?: (order: number) => void;
  onRemove?: () => void;
  onChanged?: (name?: string, conditionTagId?: string, contexts?: string[], colorClass?: string) => Promise<void>;
}

interface FastTaggerTagGroupFormState {
  edit: boolean;
  name?: string;
  order?: number;
  contexts?: Set<string>;
  conditionTagId?: string;
  colorClass?: string;
  changed: boolean;
  disabled: boolean;
}

const contexts = ["scene", "image", "group", "gallery", "performer", "studio", "tag"];

class FastTaggerTagGroupForm extends React.PureComponent<FastTaggerTagGroupFormProps, FastTaggerTagGroupFormState> {
  constructor(props: FastTaggerTagGroupFormProps) {
    super(props);
    this.state = {
      edit: false,
      name: props.item.name,
      order: props.item.order,
      contexts: props.item.contexts !== undefined ? new Set(props.item.contexts) : new Set(contexts),
      conditionTagId: props.item.conditionTagId,
      colorClass: props.item.colorClass,
      changed: false,
      disabled: false,
    };
  }

  debounce = (func: (...args: any[]) => any | void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  onEditClicked = () => {
    this.setState({ edit: true });
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

  onColorClassChanged = (value?: string) => {
    this.setState(
      {
        colorClass: value,
        changed: true,
      },
      () => {
        this.onFocusLost();
      }
    );
  };

  onToggleContext = (context: string) => {
    this.setState(
      (state) => {
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
      },
      () => {
        this.onFocusLost();
      }
    );
  };

  onConditionChanged = (tagId?: string) => {
    this.setState(
      {
        conditionTagId: tagId,
        changed: true,
      },
      () => {
        this.onFocusLost();
      }
    );
  };

  onOrderChanged = (order?: string) => {
    const orderValue = order !== undefined ? parseInt(order) : undefined;
    this.setState({
      order: orderValue,
      changed: true,
    });

    if (order) {
      if (this.onOrderCallback) {
        this.onOrderCallback(orderValue);
      }
    }
  };

  onOrderCallback = this.props.onOrder ? this.debounce(this.props.onOrder, 500) : undefined;

  onFocusLost = () => {
    if (this.state.changed) {
      if (this.props.onChanged) {
        this.setState(
          {
            disabled: true,
          },
          () => {
            this.props.onChanged!(
              this.state.name,
              this.state.conditionTagId,
              this.state.contexts ? Array.from(this.state.contexts.values()) : undefined,
              this.state.colorClass
            ).then(
              () =>
                this.setState({
                  disabled: false,
                  changed: false,
                }),
              () =>
                this.setState({
                  disabled: false,
                  changed: false,
                })
            );
          }
        );
      }
    }
  };

  render() {
    if (!PluginApi.components.TagIDSelect) {
      return <LoadingIndicator />;
    }

    return (
      <Card className="fast-tagger-card">
        <Card.Body>
          {!this.state.edit && (
            <div className="mb-1">
              <h5>{this.state.name}</h5>
            </div>
          )}
          {this.state.edit && (
            <div className="mb-1">
              <InputGroup>
                <input
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={(event) => this.onNameChanged(event.target.value)}
                  onBlur={(event) => this.onFocusLost()}
                  disabled={this.props.disabled || this.state.disabled}
                  placeholder="Name..."
                  className="form-control form-control-sm text-input"
                  required
                />
                <InputGroup.Append>
                  <select
                    className={
                      "form-control form-control-sm" + (this.state.colorClass ? " bg-" + this.state.colorClass : "")
                    }
                    value={this.state.colorClass}
                    onChange={(event) => this.onColorClassChanged(event.target.value)}
                    disabled={this.props.disabled || this.state.disabled}
                  >
                    <option value="">None</option>
                    <option value="blue" className="text-blue">
                      Blue
                    </option>
                    <option value="green" className="text-green">
                      Green
                    </option>
                    <option value="red" className="text-red">
                      Red
                    </option>
                    <option value="yellow" className="text-yellow">
                      Yellow
                    </option>
                    <option value="orange" className="text-orange">
                      Orange
                    </option>
                    <option value="cyan" className="text-cyan">
                      Cyan
                    </option>
                    <option value="indigo" className="text-indigo">
                      indigo
                    </option>
                    <option value="purple" className="text-purple">
                      Purple
                    </option>
                    <option value="pink" className="text-pink">
                      Pink
                    </option>
                    <option value="teal" className="text-teal">
                      Teal
                    </option>
                    <option value="white" className="text-white">
                      White
                    </option>
                    <option value="gray" className="text-gray">
                      Gray
                    </option>
                    <option value="gray" className="text-gray">
                      Gray
                    </option>
                    <option value="gray-dark" className="text-gray-dark">
                      Dark Gray
                    </option>
                    <option value="transparent" className="text-transparent">
                      Transparent
                    </option>
                  </select>
                </InputGroup.Append>
              </InputGroup>
            </div>
          )}
          {!this.state.edit && (
            <div className="mb-1 d-flex flex-row">
              {contexts.map((groupContext) => (
                <div
                  key={groupContext}
                  className={"m-0 " + (this.state.contexts?.has(groupContext) ? "text-success" : "text-danger")}
                >
                  {groupContext == "scene" && <Icon icon={faCirclePlay} title="toggle visible when tagging scenes" />}
                  {groupContext == "image" && <Icon icon={faImage} title="toggle visible when tagging images" />}
                  {groupContext == "group" && <Icon icon={faFilm} title="toggle visible when tagging groups" />}
                  {groupContext == "gallery" && <Icon icon={faImages} title="toggle visible when tagging galleries" />}
                  {groupContext == "performer" && <Icon icon={faUser} title="toggle visible when tagging performers" />}
                  {groupContext == "studio" && <Icon icon={faVideo} title="toggle visible when tagging studios" />}
                  {groupContext == "tag" && <Icon icon={faTag} title="toggle visible when tagging tags" />}
                </div>
              ))}
            </div>
          )}
          {this.state.edit && (
            <div className="mb-1">
              <ButtonGroup size="sm">
                {contexts.map((groupContext) => (
                  <Button
                    key={groupContext}
                    size="sm"
                    className={this.state.contexts?.has(groupContext) ? "btn-success" : "btn-danger"}
                    onClick={() => this.onToggleContext(groupContext)}
                    disabled={this.props.disabled || this.state.disabled}
                  >
                    {groupContext == "scene" && <Icon icon={faCirclePlay} title="toggle visible when tagging scenes" />}
                    {groupContext == "image" && <Icon icon={faImage} title="toggle visible when tagging images" />}
                    {groupContext == "group" && <Icon icon={faFilm} title="toggle visible when tagging groups" />}
                    {groupContext == "gallery" && (
                      <Icon icon={faImages} title="toggle visible when tagging galleries" />
                    )}
                    {groupContext == "performer" && (
                      <Icon icon={faUser} title="toggle visible when tagging performers" />
                    )}
                    {groupContext == "studio" && <Icon icon={faVideo} title="toggle visible when tagging studios" />}
                    {groupContext == "tag" && <Icon icon={faTag} title="toggle visible when tagging tags" />}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          )}
          {!this.state.edit && this.state.conditionTagId && (
            <div>requires tag {FastTaggerService.getTag(this.state.conditionTagId)?.name}</div>
          )}
          {this.state.edit && (
            <div>
              {/* FIXME this part seems to be the cause of the slowdown */}
              <PluginApi.components.TagIDSelect
                isMulti={false}
                isDisabled={this.props.disabled || this.state.disabled}
                creatable={false}
                noSelectionString="Required tag"
                ids={this.state.conditionTagId ? [this.state.conditionTagId] : []}
                onSelect={(selected) => this.onConditionChanged(selected ? selected[0].id : undefined)}
              ></PluginApi.components.TagIDSelect>
            </div>
          )}
        </Card.Body>
        <Card.Footer className={this.state.colorClass ? " bg-" + this.state.colorClass : ""}>
          {!this.state.edit && (
            <div className="row">
              <div className="col-md-6">{this.state.order}</div>
              <div className="col-md-6 text-right">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={this.onEditClicked}
                  disabled={this.props.disabled || this.state.disabled}
                >
                  <Icon icon={faPencil} />
                </Button>
              </div>
            </div>
          )}
          {this.state.edit && (
            <div className="row">
              <div className="col-md-6">
                <InputGroup className="mb-3 input-group-sm">
                  <InputGroup.Prepend>
                    {this.props.onUp && (
                      <Button
                        size="sm"
                        onClick={this.onUpClicked}
                        disabled={this.props.disabled || this.state.disabled}
                      >
                        <Icon icon={faArrowUp} />
                      </Button>
                    )}
                    {this.props.onDown && (
                      <Button
                        size="sm"
                        onClick={this.onDownClicked}
                        disabled={this.props.disabled || this.state.disabled}
                      >
                        <Icon icon={faArrowDown} />
                      </Button>
                    )}
                  </InputGroup.Prepend>
                  <input
                    type="number"
                    className="form-control form-control-sm  text-input"
                    value={this.state.order}
                    min="1"
                    onChange={(event) => this.onOrderChanged(event.target.value)}
                    disabled={this.props.disabled || this.state.disabled}
                  />
                </InputGroup>
              </div>
              <div className="col-md-6 text-right">
                {this.state.changed && <span>*</span>}
                {this.props.onRemove && (
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={this.onRemoveClicked}
                    disabled={this.props.disabled || this.state.disabled}
                  >
                    <Icon icon={faTrash} />
                  </Button>
                )}
              </div>
            </div>
          )}
        </Card.Footer>
      </Card>
    );
  }
}

export default FastTaggerTagGroupForm;
