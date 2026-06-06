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
  faQuestion,
  faTag,
  faTrash,
  faUser,
  faVideo,
  faXmark,
} = PluginApi.libraries.FontAwesomeSolid;
const { FormattedMessage } = PluginApi.libraries.Intl;
const { Icon, LoadingIndicator } = PluginApi.components;

let { TagSelect, TagIDSelect, TagLink } = PluginApi.components;
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
if (!TagLink) {
  PluginApi.utils.loadComponents([PluginApi.loadableComponents.TagLink]).then(() => {
    TagLink = PluginApi.components.TagLink;
  });
}

interface FastTaggerTagGroupDetailsFormProps {
  item: FastTaggerGroup;
  onRemoved?: () => void;
  onChanged?: (
    name?: string,
    conditionTagId?: string,
    tagId?: string,
    contexts?: string[],
    colorClass?: string,
  ) => Promise<void>;
}

interface FastTaggerTagGroupDetailsFormState {
  name?: string;
  contexts?: Set<string>;
  conditionTagId?: string;
  tagId?: string;
  colorClass?: string;
  changed: boolean;
  disabled: boolean;
}

const contexts = ["scene", "image", "group", "gallery", "performer", "studio", "tag"];

class FastTaggerTagGroupDetailsForm extends React.PureComponent<
  FastTaggerTagGroupDetailsFormProps,
  FastTaggerTagGroupDetailsFormState
> {
  constructor(props: FastTaggerTagGroupDetailsFormProps) {
    super(props);
    this.state = {
      name: props.item.name,
      contexts: props.item.contexts !== undefined ? new Set(props.item.contexts) : new Set(contexts),
      conditionTagId: props.item.conditionTagId,
      tagId: props.item.tagId,
      colorClass: props.item.colorClass,
      changed: false,
      disabled: false,
    };
  }

  onRemoveClicked = () => {
    if (this.props.onRemoved) {
      this.props.onRemoved();
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
      },
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
      },
    );
  };

  onConditionChanged = (tagId?: string) => {
    this.setState(
      {
        conditionTagId: tagId,
        tagId: tagId,
        changed: true,
      },
      () => {
        this.onFocusLost();
      },
    );
  };

  onTagChanged = (tagId?: string) => {
    this.setState(
      {
        conditionTagId: undefined,
        tagId: tagId,
        changed: true,
      },
      () => {
        this.onFocusLost();
      },
    );
  };

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
              this.state.tagId,
              this.state.contexts ? Array.from(this.state.contexts.values()) : undefined,
              this.state.colorClass,
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
                }),
            );
          },
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
            <InputGroup>
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={(event) => this.onNameChanged(event.target.value)}
                onBlur={(event) => this.onFocusLost()}
                disabled={this.state.disabled}
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
                  disabled={this.state.disabled}
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

          <div className="mb-1">
            <ButtonGroup size="sm">
              {contexts.map((groupContext) => (
                <Button
                  key={groupContext}
                  size="sm"
                  className={this.state.contexts?.has(groupContext) ? "btn-success" : "btn-danger"}
                  onClick={() => this.onToggleContext(groupContext)}
                  disabled={this.state.disabled}
                >
                  {groupContext == "scene" && (
                    <>
                      <Icon icon={faCirclePlay} title="toggle visible when tagging scenes" />
                      <span>
                        <FormattedMessage id="scenes" defaultMessage="Scenes" />
                      </span>
                    </>
                  )}
                  {groupContext == "image" && (
                    <>
                      <Icon icon={faImage} title="toggle visible when tagging images" />
                      <span>
                        <FormattedMessage id="images" defaultMessage="Images" />
                      </span>
                    </>
                  )}
                  {groupContext == "group" && (
                    <>
                      <Icon icon={faFilm} title="toggle visible when tagging groups" />
                      <span>
                        <FormattedMessage id="groups" defaultMessage="Groups" />
                      </span>
                    </>
                  )}
                  {groupContext == "gallery" && (
                    <>
                      <Icon icon={faImages} title="toggle visible when tagging galleries" />
                      <span>
                        <FormattedMessage id="galleries" defaultMessage="Galleries" />
                      </span>
                    </>
                  )}
                  {groupContext == "performer" && (
                    <>
                      <Icon icon={faUser} title="toggle visible when tagging performers" />
                      <span>
                        <FormattedMessage id="performers" defaultMessage="Performers" />
                      </span>
                    </>
                  )}
                  {groupContext == "studio" && (
                    <>
                      <Icon icon={faVideo} title="toggle visible when tagging studios" />
                      <span>
                        <FormattedMessage id="studios" defaultMessage="Studios" />
                      </span>
                    </>
                  )}
                  {groupContext == "tag" && (
                    <>
                      <Icon icon={faTag} title="toggle visible when tagging tags" />
                      <span>
                        <FormattedMessage id="tags" defaultMessage="Tags" />
                      </span>
                    </>
                  )}
                </Button>
              ))}
            </ButtonGroup>
          </div>

          {(!this.state.tagId || this.state.conditionTagId) && (
            <div className="d-flex align-items-center">
              <div title="Show only if tagged with this tag">
                <Icon icon={faQuestion} />
              </div>
              <PluginApi.components.TagIDSelect
                className="flex-grow-1 align-self-stretch"
                isMulti={false}
                isDisabled={this.state.disabled}
                isClearable={true}
                creatable={false}
                noSelectionString="Show only if tagged with..."
                ids={this.state.conditionTagId ? [this.state.conditionTagId] : []}
                onSelect={(selected) =>
                  this.onConditionChanged(selected && selected.length > 0 ? selected[0].id : undefined)
                }
              ></PluginApi.components.TagIDSelect>
            </div>
          )}
          {!this.state.conditionTagId && (
            <div className="d-flex align-items-center">
              <div title="Stored in this tag">
                <Icon icon={faTag} />
              </div>
              <PluginApi.components.TagIDSelect
                className="flex-grow-1"
                isMulti={false}
                isDisabled={this.state.disabled}
                isClearable={true}
                creatable={false}
                noSelectionString="Store group in tag..."
                ids={this.state.tagId ? [this.state.tagId] : []}
                onSelect={(selected) => this.onTagChanged(selected && selected.length > 0 ? selected[0].id : undefined)}
              ></PluginApi.components.TagIDSelect>
            </div>
          )}
        </Card.Body>
        <Card.Footer className={this.state.colorClass ? " bg-" + this.state.colorClass : ""}>
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6 text-right">
              {this.state.changed && <span>*</span>}
              {this.props.onRemoved && (
                <Button size="sm" variant="danger" onClick={this.onRemoveClicked} disabled={this.state.disabled}>
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

export default FastTaggerTagGroupDetailsForm;
