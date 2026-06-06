import { ModalComponent } from "./Modal";
import FastTaggerTagGroupListItemForm from "./FastTaggerTagGroupListItemForm";
import * as FastTaggerService from "../services/FastTaggerService";
import { FastTaggerGroup, FastTaggerGroupTags } from "../services/FastTaggerService";

const PluginApi = window.PluginApi;
const { React } = PluginApi;
const { Button } = PluginApi.libraries.Bootstrap;
const { LoadingIndicator } = PluginApi.components;

interface FastTaggerSettingsDialogProps {
  onClose: (accept?: boolean) => void;
}

interface FastTaggerSettingsDialogState {
  loading?: boolean;
  saving?: boolean;
  hidden?: boolean;
  tags?: Tag[];
  tagIdToTag?: Map<string, Tag>;
  tagGroups?: FastTaggerGroup[];
  tagGroupsToTags?: FastTaggerGroupTags[];
  activeTab: string;
}

class FastTaggerSettingsDialog extends React.Component<FastTaggerSettingsDialogProps, FastTaggerSettingsDialogState> {
  constructor(props: FastTaggerSettingsDialogProps) {
    super(props);
    this.state = {
      loading: true,
      activeTab: "groups",
    };
  }

  async componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true });
    const tagsPromise = this.doLoadTags();
    const tagGroupsPromise = this.doLoadGroups();
    const tagGroupsToTagsPromise = this.doLoadTagGroupsToTags();
    return Promise.all([tagsPromise, tagGroupsPromise, tagGroupsToTagsPromise]).then(() => {
      this.setState({ loading: false });
    });
  };

  loadGroups = async () => {
    this.setState({ loading: true });
    return this.doLoadGroups().then(() => {
      this.setState({ loading: false });
    });
  };

  loadTagGroupsToTags = async () => {
    this.setState({ loading: true });
    return this.doLoadTagGroupsToTags().then(() => {
      this.setState({ loading: false });
    });
  };

  doLoadTags = async () => {
    return FastTaggerService.getTags().then((tags) => {
      console.debug("done loading tags", tags);
      const tagIdToTag = new Map<string, Tag>();
      for (const tag of tags) {
        tagIdToTag.set(tag.id, tag);
      }
      this.setState({ tags: tags, tagIdToTag: tagIdToTag });
    });
  };

  doLoadGroups = async () => {
    return FastTaggerService.getTagGroups().then((tagGroups) => {
      console.debug("done loading tag groups", tagGroups);
      this.setState({ tagGroups: tagGroups });
    });
  };

  doLoadTagGroupsToTags = async () => {
    return FastTaggerService.getTagGroupToTags().then((tagGroupsToTags) => {
      console.debug("done loading tag groups to tags", tagGroupsToTags);
      this.setState({ tagGroupsToTags: tagGroupsToTags });
    });
  };

  onTagMove = (tag: Tag, group?: FastTaggerGroup) => {
    this.setState({ saving: true });
    FastTaggerService.moveTagToGroup(tag, group).then(() => {
      this.loadTagGroupsToTags().then(() => {
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

  onGroupAdd = () => {
    this.setState({ saving: true });
    FastTaggerService.addTagGroup({
      name: "New Group",
      order: 99999,
    }).then((group) => {
      this.loadGroups().then(() => {
        this.setState({ saving: false });
      });
    });
  };

  onClear = () => {
    this.setState({ saving: true });
    FastTaggerService.resetConfig().then(() => {
      this.loadData().then(() => {
        this.setState({ saving: false });
      });
    });
  };

  onGroupUp = (tagGroup: FastTaggerGroup) => {
    this.setState({ saving: true });
    FastTaggerService.moveTagGroupUp(tagGroup).then(() => {
      this.loadGroups().then(() => {
        this.setState({ saving: false });
      });
    });
  };

  onGroupDown = (tagGroup: FastTaggerGroup) => {
    this.setState({ saving: true });
    FastTaggerService.moveTagGroupDown(tagGroup).then(() => {
      this.loadGroups().then(() => {
        this.setState({ saving: false });
      });
    });
  };

  onGroupOrder = (tagGroup: FastTaggerGroup, order: number) => {
    this.setState({ saving: true });
    FastTaggerService.moveTagGroupTo(tagGroup, order).then(() => {
      this.loadGroups().then(() => {
        this.setState({ saving: false });
      });
    });
  };

  onGroupRemove = (tagGroup: FastTaggerGroup) => {
    this.setState({ saving: true });
    FastTaggerService.removeTagGroup(tagGroup).then(() => {
      this.loadGroups().then(() => {
        this.setState({ saving: false });
      });
    });
  };

  onGroupEditOpen = (tagGroup: FastTaggerGroup) => {
    this.setState({ hidden: true });
  };

  onGroupEditClose = (tagGroup: FastTaggerGroup, accept?: boolean) => {
    if (accept) {
      this.loadGroups().then(() => {
        this.setState({ hidden: false });
      });
    } else {
      this.setState({ hidden: false });
    }
  };

  onActiveTabChanged = (activeTabKey: string) => {
    this.setState({ activeTab: activeTabKey });
  };

  onApply = () => {
    this.setState({ saving: true });
    FastTaggerService.applyChanges().then(() => {
      this.setState({ saving: false });
      this.props.onClose(true);
    });
  };

  onCancel = () => {
    this.setState({ saving: true });
    FastTaggerService.revertChanges().then(() => {
      this.setState({ saving: false });
      this.props.onClose();
    });
  };

  onExportConfig = () => {
    this.setState({ saving: true });
    FastTaggerService.exportConfig().then((config) => {
      let blob = new Blob([config], { type: "json" });
      let a = document.createElement("a");
      a.download = "FastTigger.config.json";
      a.href = URL.createObjectURL(blob);
      a.dataset.downloadurl = ["json", a.download, a.href].join(":");
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
      }, 1500);
      this.setState({ saving: false });
    });
  };

  onImportConfig = () => {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      this.setState({ saving: true });
      var file = (e.target as any).files[0];
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = (readerEvent) => {
        FastTaggerService.importConfig((readerEvent.target as any).result).then(() => {
          this.setState({ saving: false });
          this.loadData();
        });
      };
    };
    input.click();
  };

  onImporCustomFieldsConfig = () => {
    this.setState({ saving: true });
    FastTaggerService.importFromCustomFields().then(() => {
      this.setState({ saving: false });
      this.loadData();
    });
  };

  onImportEasyTagConfig = () => {
    this.setState({ saving: true });
    FastTaggerService.importFromEasyTag().then(() => {
      this.setState({ saving: false });
      this.loadData();
    });
  };

  render() {
    const footerButtons = [
      { text: "Clear Config", variant: "danger", onClick: this.onClear },
      { text: "Download Config", variant: "secondary", onClick: this.onExportConfig },
      { text: "Upload Config", variant: "secondary", onClick: this.onImportConfig },
    ];
    if (FastTaggerService.hasCustomFieldSupport()) {
      footerButtons.push({
        text: "Import from Tag Custom Fields",
        variant: "secondary",
        onClick: this.onImporCustomFieldsConfig,
      });
    }
    footerButtons.push({ text: "Import from EasyTag", variant: "secondary", onClick: this.onImportEasyTagConfig });

    return (
      <ModalComponent
        show
        isRunning={this.state.loading || this.state.saving}
        disabled={this.state.hidden}
        header="Settings"
        accept={{
          onClick: this.onApply,
          text: /*intl.formatMessage({ id: "actions.apply" })*/ "Apply",
        }}
        cancel={{
          onClick: this.onCancel,
          text: /*intl.formatMessage({ id: "actions.cancel" })*/ "Cancel",
          variant: "secondary",
        }}
        modalProps={{ size: "xl", dialogClassName: "scrape-dialog" }}
        leftFooterButtons={footerButtons}
      >
        {this.state.loading && <LoadingIndicator />}
        {!this.state.loading && (
          <>
            <div className="row">
              {this.state.tagGroups?.map((tagGroup) => (
                <div className="col-sm-12 col-md-6 col-lg-4" key={tagGroup.id}>
                  <FastTaggerTagGroupListItemForm
                    item={tagGroup}
                    onUp={() => this.onGroupUp(tagGroup)}
                    onDown={() => this.onGroupDown(tagGroup)}
                    onOrder={(order) => this.onGroupOrder(tagGroup, order)}
                    onRemove={() => this.onGroupRemove(tagGroup)}
                    onEditOpen={() => this.onGroupEditOpen(tagGroup)}
                    onEditClose={(accept) => this.onGroupEditClose(tagGroup, accept)}
                    disabled={this.state.saving || this.state.hidden}
                  />
                </div>
              ))}
            </div>
            <div>
              <Button variant="primary" onClick={this.onGroupAdd} disabled={this.state.saving || this.state.hidden}>
                Add
              </Button>
            </div>
          </>
        )}
      </ModalComponent>
    );
  }
}

export default FastTaggerSettingsDialog;
