import { ModalComponent } from "./Modal";
import FastTaggerTagForm from "./FastTaggerTagForn";
import FastTaggerTagGroupDetailsForm from "./FastTaggerTagGroupDetailsForm";
import * as FastTaggerService from "../services/FastTaggerService";
import { FastTaggerGroup, FastTaggerEnhancedTag } from "../services/FastTaggerService";

const PluginApi = window.PluginApi;
const { React } = PluginApi;
const { Button, Card, Tabs, Tab } = PluginApi.libraries.Bootstrap;
const { faPlus } = PluginApi.libraries.FontAwesomeSolid;
const { Icon, LoadingIndicator } = PluginApi.components;

let { TagIDSelect, TagSelect } = PluginApi.components;
if (!TagIDSelect && PluginApi.loadableComponents.TagIDSelect) {
  PluginApi.utils.loadComponents([PluginApi.loadableComponents.TagIDSelect]).then(() => {
    TagIDSelect = PluginApi.components.TagIDSelect;
  });
}
if (!TagSelect && PluginApi.loadableComponents.TagSelect) {
  PluginApi.utils.loadComponents([PluginApi.loadableComponents.TagSelect]).then(() => {
    TagSelect = PluginApi.components.TagSelect;
  });
}

interface FastTaggerTagGroupSettingsDialogProps {
  item: FastTaggerGroup;
  onClose: (accept?: boolean) => void;
}

interface FastTaggerTagGroupSettingsDialogState {
  loading?: boolean;
  saving?: boolean;
  tags?: FastTaggerEnhancedTag[];
  tagsToAdd?: Tag[];
}

class FastTaggerTagGroupSettingsDialog extends React.Component<
  FastTaggerTagGroupSettingsDialogProps,
  FastTaggerTagGroupSettingsDialogState
> {
  constructor(props: FastTaggerTagGroupSettingsDialogProps) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true });
    return this.loadTags().then(() => {
      this.setState({ loading: false });
    });
  };

  loadTags = async () => {
    return FastTaggerService.getTagsForTagGroup(this.props.item).then((tags) => {
      this.setState({ tags: tags });
    });
  };

  onTagAdd = (tag: Tag) => {
    this.setState({ saving: true });
    FastTaggerService.moveTagToGroup(tag, this.props.item).then(() => {
      this.loadTags().then(() => {
        this.setState({ saving: false });
      });
    });
  };

  onTagRemove = (tag: Tag) => {
    this.setState({ saving: true });
    FastTaggerService.moveTagToGroup(tag, undefined).then(() => {
      this.loadTags().then(() => {
        this.setState({ saving: false });
      });
    });
  };

  onTagChanged = (tag: Tag, name?: string) => {
    this.setState({ saving: true });
    FastTaggerService.updateTag(tag, name).then(() => {
      this.setState({ saving: false });
    });
  };

  onGroupChanged = (
    name?: string,
    conditionTagId?: string,
    tagId?: string,
    contexts?: string[],
    colorCloss?: string,
  ) => {
    this.setState({ saving: true });
    return FastTaggerService.updateTagGroup(this.props.item, name, conditionTagId, tagId, contexts, colorCloss).then(
      () => {
        this.setState({ saving: false });
      },
    );
  };

  onGroupRemoved = () => {
    this.setState({ saving: true });
    return FastTaggerService.removeTagGroup(this.props.item).then(() => {
      this.setState({ saving: false });
      this.onOkClicked();
    });
  };

  onTagsToAddChanged = (tagsToAdd?: Tag[]) => {
    this.setState({ tagsToAdd: tagsToAdd });
  };

  onTagAddClicked = () => {
    if (this.state.tagsToAdd) {
      this.setState({ saving: true });

      for (const tagToAdd of this.state.tagsToAdd) {
        FastTaggerService.moveTagToGroup(tagToAdd, this.props.item);
      }
      return this.loadTags().then(() => {
        this.setState({ saving: false });
        this.setState({ tagsToAdd: undefined });
      });
    }
  };

  onOkClicked = () => {
    this.props.onClose(true);
  };

  render() {
    return (
      <ModalComponent
        show
        isRunning={this.state.loading || this.state.saving}
        header={'Edit group "' + this.props.item.name + '"'}
        accept={{
          onClick: this.onOkClicked,
          text: /*intl.formatMessage({ id: "actions.apply" })*/ "OK",
        }}
        modalProps={{ size: "xl", dialogClassName: "scrape-dialog" }}
      >
        {this.state.loading && <LoadingIndicator />}

        {!this.state.loading && (
          <FastTaggerTagGroupDetailsForm
            item={this.props.item}
            onChanged={this.onGroupChanged}
            onRemoved={this.onGroupRemoved}
          />
        )}

        {!this.state.loading && (
          <>
            <Card className="fast-tagger-card" key={this.props.item.id}>
              <Card.Header className={this.props.item.colorClass ? " bg-" + this.props.item.colorClass : ""}>
                {this.props.item.name}
              </Card.Header>
              <Card.Body>
                <div className="row align-items-stretch">
                  {this.state.tags?.map((tag) => (
                    <div className="col-12 col-md-6 col-lg-4" key={tag.id}>
                      <FastTaggerTagForm
                        item={tag}
                        onRemove={() => this.onTagRemove(tag)}
                        onChanged={(name) => this.onTagChanged(tag, name)}
                      />
                    </div>
                  ))}
                  <div className="col-12 col-md-6 col-lg-4">
                    <Card className="fast-tagger-card">
                      <Card.Body>
                        <div className="d-flex flex-direction-row justify-content-between align-items-center">
                          <div className="flex-grow-1 mr-3">
                            <PluginApi.components.TagIDSelect
                              isMulti={true}
                              isClearable={true}
                              creatable={false}
                              ids={this.state.tagsToAdd? this.state.tagsToAdd.map(e => e.id):[]}
                              noSelectionString="Select tag to add..."
                              onSelect={this.onTagsToAddChanged}
                            />
                          </div>
                          <div>
                            <div>
                              <Button
                                className="plugin-fast-tagger-settings-button"
                                variant="secondary"
                                disabled={!this.state.tagsToAdd}
                                onClick={this.onTagAddClicked}
                              >
                                <Icon icon={faPlus} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <div className="row"></div>
          </>
        )}
      </ModalComponent>
    );
  }
}

export default FastTaggerTagGroupSettingsDialog;
