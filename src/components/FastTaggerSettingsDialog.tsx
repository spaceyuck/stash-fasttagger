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
    this.loadTagGroups();
  }

  loadTagGroups = () => {
    console.debug("loading tag groups and tag groups to tags...");
    this.setState({ loading: true });
    const tagGroupsPromise = FastTaggerService.getTagGroups().then((tagGroups) => {
      console.debug("done loading tag groups", tagGroups);
      this.setState({ tagGroups: tagGroups });
    });
    const tagGroupsToTagsPromise = FastTaggerService.getTagGroupToTags().then((tagGroupsToTags) => {
      console.debug("done loading tag groups to tags", tagGroupsToTags);
      this.setState({ tagGroupsToTags: tagGroupsToTags });
    });
    return Promise.all([tagGroupsPromise, tagGroupsToTagsPromise]).then(() => {
      this.setState({ loading: false });
    });
  };

  onTagMove = (tag: Tag, group?: FastTaggerGroup) => {
    FastTaggerService.moveTagToGroup(tag, group).then(() => {
      this.loadTagGroups();
    });
  };

  onTagChanged = (tag: Tag, name?: string) => {
    FastTaggerService.updateTag(tag, name).then(() => {
      this.loadTagGroups();
    });
  };

  onGroupAdd = () => {
    FastTaggerService.addTagGroup({
      order: 99999,
    }).then(() => {
      this.loadTagGroups();
    });
  };

  onClear = () => {
    FastTaggerService.resetConfig().then(() => {
      this.loadTagGroups();
    });
  };

  onGroupUp = (tagGroup: FastTaggerGroup) => {
    FastTaggerService.moveTagGroupUp(tagGroup).then(() => {
      this.loadTagGroups();
    });
  };

  onGroupDown = (tagGroup: FastTaggerGroup) => {
    FastTaggerService.moveTagGroupDown(tagGroup).then(() => {
      this.loadTagGroups();
    });
  };

  onGroupRemove = (tagGroup: FastTaggerGroup) => {
    FastTaggerService.removeTagGroup(tagGroup).then(() => {
      this.loadTagGroups();
    });
  };

  onGroupChanged = (tagGroup: FastTaggerGroup, name?: string) => {
    FastTaggerService.updateTagGroup(tagGroup, name).then(() => {
      this.loadTagGroups();
    });
  };

  onApply = () => {
    this.setState({saving: true});
    FastTaggerService.applyChanges().then(() => {
      this.setState({saving: false});
      this.props.onClose(true);
    })
  };

  onCancel = () => {
    this.setState({saving: true});
    FastTaggerService.revertChanges().then(() => {
      this.setState({saving: false});
      this.props.onClose();
    })
  };

  onImportEasyTagConfig = () => {
    this.setState({saving: true});
    FastTaggerService.importEasyTag().then(() => {
      this.setState({saving: false});
      this.loadTagGroups();
    })
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
          {text: "Clear Config", variant: "danger", onClick: this.onClear},
          {text: "Import from EasyTag", variant: "secondary", onClick: this.onImportEasyTagConfig}
        ]}
      >
        <Tabs defaultActiveKey="groups" justify>
          <Tab eventKey="tags" title="Tags">
            {this.state.loading && <LoadingIndicator />}
            {!this.state.loading &&
              this.state.tagGroupsToTags?.map((groupEntry) => (
                <Card className="card-sm fast-tagger-card">
                  <Card.Header>{groupEntry.group ? groupEntry.group.name : "Ungrouped tags"}</Card.Header>
                  <Card.Body>
                    <div className="row">
                      {groupEntry.tags.map((tag) => (
                        <div className="col-12 col-md-6 col-lg-4">
                          <FastTaggerTagForm
                            item={tag}
                            tagGroups={this.state.tagGroupsToTags}
                            onMoveTagToGroup={(group) => this.onTagMove(tag, group)}
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
                      onChanged={(name) => this.onGroupChanged(tagGroup, name)}
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
