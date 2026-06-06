import FastTaggerTagGroupSettingsDialog from "./FastTaggerTagGroupSettingsDialog";
import * as FastTaggerService from "../services/FastTaggerService";
import { FastTaggerGroup } from "../services/FastTaggerService";
import { Item } from "react-bootstrap/lib/Breadcrumb";

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

interface FastTaggerTagGroupListItemFormProps {
  item: FastTaggerGroup;
  disabled?: boolean;
  onUp?: () => void;
  onDown?: () => void;
  onOrder?: (order: number) => void;
  onRemove?: () => void;
  onEditOpen?: () => void;
  onEditClose?: (accept?: boolean) => void;
}

interface FastTaggerTagGroupListItemFormState {
  showEditDialog: boolean;
  order?: number;
  changed: boolean;
  disabled: boolean;
}

const contexts = ["scene", "image", "group", "gallery", "performer", "studio", "tag"];

class FastTaggerTagGroupListItemForm extends React.PureComponent<
  FastTaggerTagGroupListItemFormProps,
  FastTaggerTagGroupListItemFormState
> {
  constructor(props: FastTaggerTagGroupListItemFormProps) {
    super(props);
    this.state = {
      showEditDialog: false,
      order: props.item.order,
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

  onFocusLost = () => {};

  onEditClicked = () => {
    this.setState({
      showEditDialog: true,
    });
    if (this.props.onEditOpen) {
      this.props.onEditOpen();
    }
  };

  onEditDialogClosed = (accept?: boolean) => {
    this.setState({
      showEditDialog: false,
    });
    if (this.props.onEditClose) {
      this.props.onEditClose(accept);
    }
  };

  maybeRenderEditDialog() {
    if (!this.state.showEditDialog) {
      return;
    }

    return <FastTaggerTagGroupSettingsDialog item={this.props.item} onClose={this.onEditDialogClosed} />;
  }

  render() {
    if (!PluginApi.components.TagIDSelect) {
      return <LoadingIndicator />;
    }

    return (
      <>
        {this.maybeRenderEditDialog()}
        <Card className="fast-tagger-card">
          <Card.Body>
            <div className="mb-1">
              <h5>{this.props.item.name}</h5>
            </div>

            <div className="mb-1 d-flex flex-row">
              {contexts.map((groupContext) => (
                <div
                  key={groupContext}
                  className={
                    "m-0 " +
                    (this.props.item.contexts && this.props.item.contexts.indexOf(groupContext) >= 0
                      ? "text-success"
                      : "text-danger")
                  }
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

            {this.props.item.conditionTagId && (
              <div className="d-flex align-items-center">
                <div title="Show only if tagged with this tag">
                  <Icon icon={faQuestion} />
                </div>
                {FastTaggerService.getTag(this.props.item.conditionTagId) != undefined && (
                  <TagLink tag={FastTaggerService.getTag(this.props.item.conditionTagId)} linkType="details"></TagLink>
                )}
              </div>
            )}
            {!this.props.item.conditionTagId && this.props.item.tagId && (
              <div className="d-flex align-items-center">
                <div title="Stored in this tag">
                  <Icon icon={faTag} />
                </div>
                {FastTaggerService.getTag(this.props.item.tagId) != undefined && (
                  <TagLink tag={FastTaggerService.getTag(this.props.item.tagId)} linkType="details"></TagLink>
                )}
              </div>
            )}
          </Card.Body>
          <Card.Footer className={this.props.item.colorClass ? " bg-" + this.props.item.colorClass : ""}>
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
          </Card.Footer>
        </Card>
      </>
    );
  }
}

export default FastTaggerTagGroupListItemForm;
