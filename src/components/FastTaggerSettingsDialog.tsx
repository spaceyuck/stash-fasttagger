import { ModalComponent } from "./Modal";
import FastTaggerTagGroupForm from "./FastTaggerTagGroupForn";
import * as FastTaggerService from "../services/FastTaggerService";
import { FastTaggerGroup, FastTaggerGroupTags } from "../services/FastTaggerService";

const PluginApi = window.PluginApi;
const { React } = PluginApi;
const { Button, Card, Dropdown, DropdownButton, Tabs, Tab } = PluginApi.libraries.Bootstrap;
const { LoadingIndicator } = PluginApi.components;

interface FastTaggerSettingsDialogProps {
  onClose: (accept?: boolean) => void;
}

interface FastTaggerSettingsDialogState {
  loading?: boolean;
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

  componentDidMount() {
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

  onAddClicked = () => {
    FastTaggerService.addTagGroup({
      order: 99999,
    }).then(() => {
      this.loadTagGroups();
    });
  };

  onClearClicked = () => {
    FastTaggerService.clearConfig().then(() => {
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

  render() {
    return (
      <ModalComponent
        show
        header="Settings"
        accept={{
          onClick: () => {
            this.props.onClose(true);
          },
          text: /*intl.formatMessage({ id: "actions.apply" })*/ "Apply",
        }}
        cancel={{
          onClick: () => this.props.onClose(),
          text: /*intl.formatMessage({ id: "actions.cancel" })*/ "Cancel",
          variant: "secondary",
        }}
        modalProps={{ size: "xl", dialogClassName: "scrape-dialog" }}
      >
        <Tabs defaultActiveKey="groups" justify>
          <Tab eventKey="tags" title="Tags">
            {this.state.loading && <LoadingIndicator />}
            {!this.state.loading &&
              this.state.tagGroupsToTags?.map((groupEntry) => (
                <Card className="card-sm">
                  <Card.Header>{groupEntry.group.name}</Card.Header>
                  <Card.Body>
                    <div className="row">
                      {groupEntry.tags.map((tag) => (
                        <div className="col-12 col-md-6 col-lg-4">
                          <Card className="card-sm">
                            <Card.Body>
                              <div>{tag.name}</div>
                              <div>
                                <DropdownButton variant="primary" title="Move to" drop="end" className="btn-sm">
                                  {this.state.tagGroupsToTags?.map((targetGroupEntry) => {
                                    <Dropdown.Item onClick={() => this.onTagMove(tag, targetGroupEntry.group)}>
                                      {targetGroupEntry.group.name}
                                    </Dropdown.Item>
                                  })}
                                  <Dropdown.Item onClick={() => this.onTagMove(tag, undefined)}>No group</Dropdown.Item>
                                </DropdownButton>
                              </div>
                            </Card.Body>
                          </Card>
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
                      onGroupUp={() => this.onGroupUp(tagGroup)}
                      onGroupDown={() => this.onGroupDown(tagGroup)}
                      onGroupRemove={() => this.onGroupRemove(tagGroup)}
                    />
                  </div>
                ))}
            </div>
            {!this.state.loading && (
              <div>
                <Button variant="primary" onClick={this.onAddClicked}>
                  Add
                </Button>
              </div>
            )}
            {!this.state.loading && (
              <div>
                <Button variant="danger" onClick={this.onClearClicked}>
                  Clear Config
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
