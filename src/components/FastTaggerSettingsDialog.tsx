import { ModalComponent } from "./Modal";
import FastTaggerTagForm from "./FastTaggerTagForn";
import FastTaggerTagGroupForm from "./FastTaggerTagGroupForn";
import * as FastTaggerService from "../services/FastTaggerService";
import { FastTaggerGroup, FastTaggerGroupTags } from "../services/FastTaggerService";

const PluginApi = window.PluginApi;
const { React } = PluginApi;
const { Button, Card, Tabs, Tab } = PluginApi.libraries.Bootstrap;
const { LoadingIndicator } = PluginApi.components;

interface FastTaggerSettingsDialogProps {
  onClose: (accept?: boolean) => void;
}

interface FastTaggerSettingsDialogState {
  loading?: boolean;
  saving?: boolean;
  tagGroups?: FastTaggerGroup[];
  tagGroupsToTags?: FastTaggerGroupTags[];
}

class FastTaggerSettingsDialog extends React.Component<FastTaggerSettingsDialogProps, FastTaggerSettingsDialogState> {
  constructor(props: FastTaggerSettingsDialogProps) {
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
    const tagGroupsPromise = this.doLoadGroups();
    const tagGroupsToTagsPromise = this.doLoadTags();
    return Promise.all([tagGroupsPromise, tagGroupsToTagsPromise]).then(() => {
      this.setState({ loading: false });
    });
  };

  loadGroups = async () => {
    this.setState({ loading: true });
    return this.doLoadGroups().then(() => {
      this.setState({ loading: false });
    });
  };

  loadTags = async () => {
    this.setState({ loading: true });
    return this.doLoadTags().then(() => {
      this.setState({ loading: false });
    });
  };

  doLoadGroups = async () => {
    return FastTaggerService.getTagGroups().then((tagGroups) => {
      console.debug("done loading tag groups", tagGroups);
      this.setState({ tagGroups: tagGroups });
    });
  };

  doLoadTags = async () => {
    return FastTaggerService.getTagGroupToTags().then((tagGroupsToTags) => {
      console.debug("done loading tag groups to tags", tagGroupsToTags);
      this.setState({ tagGroupsToTags: tagGroupsToTags });
    });
  };

  onTagMove = (tag: Tag, group?: FastTaggerGroup) => {
    FastTaggerService.moveTagToGroup(tag, group).then(() => {
      this.loadTags();
    });
  };

  onTagChanged = (tag: Tag, name?: string) => {
    FastTaggerService.updateTag(tag, name);
  };

  onGroupAdd = () => {
    FastTaggerService.addTagGroup({
      order: 99999,
    }).then(() => {
      this.loadGroups();
    });
  };

  onClear = () => {
    FastTaggerService.resetConfig().then(() => {
      this.loadData();
    });
  };

  onGroupUp = (tagGroup: FastTaggerGroup) => {
    FastTaggerService.moveTagGroupUp(tagGroup).then(() => {
      this.loadGroups();
    });
  };

  onGroupDown = (tagGroup: FastTaggerGroup) => {
    FastTaggerService.moveTagGroupDown(tagGroup).then(() => {
      this.loadGroups();
    });
  };

  onGroupRemove = (tagGroup: FastTaggerGroup) => {
    FastTaggerService.removeTagGroup(tagGroup).then(() => {
      this.loadGroups();
    });
  };

  onGroupChanged = (tagGroup: FastTaggerGroup, name?: string, conditionTagId?: string, contexts?: string[]) => {
    FastTaggerService.updateTagGroup(tagGroup, name, conditionTagId, contexts);
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

  onImportEasyTagConfig = () => {
    this.setState({ saving: true });
    FastTaggerService.importEasyTag().then(() => {
      this.setState({ saving: false });
      this.loadData();
    });
  };

  render() {
    return (
      <ModalComponent
        show
        isRunning={this.state.loading || this.state.saving}
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
        leftFooterButtons={[
          { text: "Clear Config", variant: "danger", onClick: this.onClear },
          { text: "Download Config", variant: "secondary", onClick: this.onExportConfig },
          { text: "Upload Config", variant: "secondary", onClick: this.onImportConfig },
          { text: "Import from EasyTag", variant: "secondary", onClick: this.onImportEasyTagConfig },
        ]}
      >
        <Tabs defaultActiveKey="groups" justify>
          <Tab eventKey="tags" title="Tags">
            {this.state.loading && <LoadingIndicator />}
            {!this.state.loading &&
              this.state.tagGroupsToTags?.map((groupEntry) => (
                <Card className="fast-tagger-card">
                  <Card.Header>{groupEntry.group ? groupEntry.group.name : "Ungrouped tags"}</Card.Header>
                  <Card.Body>
                    <div className="row">
                      {groupEntry.tags.map((tag) => (
                        <div className="col-12 col-md-6 col-lg-4">
                          <FastTaggerTagForm
                            item={tag}
                            tagGroups={this.state.tagGroupsToTags}
                            onMoveTagToGroup={(group) => this.onTagMove(tag, group)}
                            onChanged={(name) => this.onTagChanged(tag, name)}
                          />
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </Tab>
          <Tab eventKey="groups" title="Groups">
            {this.state.loading && <LoadingIndicator />}
            <div className="row">
              {!this.state.loading &&
                this.state.tagGroups?.map((tagGroup) => (
                  <div className="col-sm-12 col-md-6 col-lg-4">
                    <FastTaggerTagGroupForm
                      item={tagGroup}
                      onUp={() => this.onGroupUp(tagGroup)}
                      onDown={() => this.onGroupDown(tagGroup)}
                      onRemove={() => this.onGroupRemove(tagGroup)}
                      onChanged={(name, conditionTagId, contexts) =>
                        this.onGroupChanged(tagGroup, name, conditionTagId, contexts)
                      }
                    />
                  </div>
                ))}
            </div>
            {!this.state.loading && (
              <div>
                <Button variant="primary" onClick={this.onGroupAdd}>
                  Add
                </Button>
              </div>
            )}
          </Tab>
        </Tabs>
      </ModalComponent>
    );
  }
}

export default FastTaggerSettingsDialog;
