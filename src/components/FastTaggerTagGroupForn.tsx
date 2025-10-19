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
  onChanged?: (name?: string, conditionTagId?: string, contexts?: string[]) => void;
}

interface FastTaggerTagGroupFormState {
  name?: string;
  contexts?: Set<string>;
  conditionTagId?: string;
  order?: number;
  changed: boolean;
}

const contexts = ["scene", "image", "group", "gallery", "performer", "studio", "tag"];

class FastTaggerTagGroupForm extends React.PureComponent<FastTaggerTagGroupFormProps, FastTaggerTagGroupFormState> {
  constructor(props: FastTaggerTagGroupFormProps) {
    super(props);
    this.state = {
      name: props.item.name,
      contexts: props.item.contexts !== undefined ? new Set(props.item.contexts) : new Set(contexts),
      conditionTagId: props.item.conditionTagId,
      order: props.item.order,
      changed: false,
    };
  }

  debounce = (func: (...args: any[]) => any | void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
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
    this.setState({
      conditionTagId: tagId,
      changed: true,
    });
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
        this.props.onChanged(
          this.state.name,
          this.state.conditionTagId,
          this.state.contexts ? Array.from(this.state.contexts.values()) : undefined
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
          <div className="mb-1">
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={(event) => this.onNameChanged(event.target.value)}
              onBlur={(event) => this.onFocusLost()}
              disabled={this.props.disabled}
              placeholder="Name..."
              className="form-control form-control-sm"
              required
            />
          </div>
          <div className="mb-1">
            <ButtonGroup size="sm">
              {contexts.map((groupContext) => (
                <Button
                  key={groupContext}
                  size="sm"
                  className={this.state.contexts?.has(groupContext) ? "btn-success" : "btn-danger"}
                  onClick={() => this.onToggleContext(groupContext)}
                  disabled={this.props.disabled}
                >
                  {groupContext == "scene" && <Icon icon={faCirclePlay} title="toggle visible when tagging scenes" />}
                  {groupContext == "image" && <Icon icon={faImage} title="toggle visible when tagging images" />}
                  {groupContext == "group" && <Icon icon={faFilm} title="toggle visible when tagging groups" />}
                  {groupContext == "gallery" && <Icon icon={faImages} title="toggle visible when tagging galleries" />}
                  {groupContext == "performer" && <Icon icon={faUser} title="toggle visible when tagging performers" />}
                  {groupContext == "studio" && <Icon icon={faVideo} title="toggle visible when tagging studios" />}
                  {groupContext == "tag" && <Icon icon={faTag} title="toggle visible when tagging tags" />}
                </Button>
              ))}
            </ButtonGroup>
          </div>
          <div>
            {/* FIXME this part seems to be the cause of the slowdown */}
            <PluginApi.components.TagIDSelect
              isMulti={false}
              isDisabled={this.props.disabled}
              ids={this.state.conditionTagId ? [this.state.conditionTagId] : []}
              onSelect={(selected) => this.onConditionChanged(selected ? selected[0].id : undefined)}
            ></PluginApi.components.TagIDSelect>
          </div>
        </Card.Body>
        <Card.Footer>
          <div className="row">
            <div className="col-md-6">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  {this.props.onUp && (
                    <Button size="xs" onClick={this.onUpClicked} disabled={this.props.disabled}>
                      <Icon icon={faArrowUp} />
                    </Button>
                  )}
                  {this.props.onDown && (
                    <Button size="xs" onClick={this.onDownClicked} disabled={this.props.disabled}>
                      <Icon icon={faArrowDown} />
                    </Button>
                  )}
                </InputGroup.Prepend>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.order}
                  min="1"
                  onChange={(event) => this.onOrderChanged(event.target.value)}
                  disabled={this.props.disabled}
                />
              </InputGroup>
            </div>
            <div className="col-md-6 text-right">
              {this.state.changed && <span>*</span>}
              {this.props.onRemove && (
                <Button size="xs" variant="danger" onClick={this.onRemoveClicked} disabled={this.props.disabled}>
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
