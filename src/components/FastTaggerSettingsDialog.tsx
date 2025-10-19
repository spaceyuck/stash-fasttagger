import { ModalComponent } from "./Modal";
import FastTaggerSettingsContext from "./FastTaggerSettingsContext";
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
      order: 99999,
    }).then(() => {
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

  onGroupChanged = (tagGroup: FastTaggerGroup, name?: string, conditionTagId?: string, contexts?: string[]) => {
    this.setState({ saving: true });
    FastTaggerService.updateTagGroup(tagGroup, name, conditionTagId, contexts).then(() => {
      this.setState({ saving: false });
    });
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
        {this.state.loading && <LoadingIndicator />}
        {!this.state.loading && (
          <FastTaggerSettingsContext.Provider value={{ tags: this.state.tags, tagIdToTag: this.state.tagIdToTag }}>
            <Tabs defaultActiveKey="groups" justify activeKey={this.state.activeTab} onSelect={this.onActiveTabChanged}>
              <Tab eventKey="tags" title="Tags">
                {this.state.activeTab == "tags" &&
                  this.state.tagGroupsToTags?.map((groupEntry) => (
                    <Card className="fast-tagger-card" key={groupEntry.group ? groupEntry.group?.id : "ungrouped"}>
                      <Card.Header>{groupEntry.group ? groupEntry.group.name : "Ungrouped tags"}</Card.Header>
                      <Card.Body>
                        <div className="row">
                          {groupEntry.tags.map((tag) => (
                            <div className="col-12 col-md-6 col-lg-4" key={tag.id}>
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
                <div className="row">
                  {this.state.activeTab == "groups" &&
                    this.state.tagGroups?.map((tagGroup) => (
                      <div className="col-sm-12 col-md-6 col-lg-4" key={tagGroup.id}>
                        <FastTaggerTagGroupForm
                          item={tagGroup}
                          onUp={() => this.onGroupUp(tagGroup)}
                          onDown={() => this.onGroupDown(tagGroup)}
                          onOrder={(order) => this.onGroupOrder(tagGroup, order)}
                          onRemove={() => this.onGroupRemove(tagGroup)}
                          onChanged={(name, conditionTagId, contexts) =>
                            this.onGroupChanged(tagGroup, name, conditionTagId, contexts)
                          }
                          disabled={this.state.saving}
                        />
                      </div>
                    ))}
                </div>
                <div>
                  <Button variant="primary" onClick={this.onGroupAdd}>
                    Add
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </FastTaggerSettingsContext.Provider>
        )}
      </ModalComponent>
    );
  }
}

export default FastTaggerSettingsDialog;
