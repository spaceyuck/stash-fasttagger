import { ModalComponent } from "./Modal";
import FastTaggerTagGroupForm from "./FastTaggerTagGroupForn";
import * as FastTaggerService from "../services/FastTaggerService";
import { FastTaggerGroup } from "../services/FastTaggerService";

const PluginApi = window.PluginApi;
const { React } = PluginApi;
const { Button, Tabs, Tab } = PluginApi.libraries.Bootstrap;
const { LoadingIndicator } = PluginApi.components;

interface FastTaggerSettingsDialogProps {
  onClose: (accept?: boolean) => void;
}

interface FastTaggerSettingsDialogState {
  loading?: boolean;
  tagGroups?: FastTaggerGroup[];
}

class FastTaggerSettingsDialog extends React.Component<
  FastTaggerSettingsDialogProps,
  FastTaggerSettingsDialogState
> {
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
    console.debug("loading tag groups...");
    this.setState({ loading: true });
    FastTaggerService.getTagGroups().then((tagGroups) => {
      console.debug("done loading tag groups", tagGroups);
      this.setState({ tagGroups: tagGroups, loading: false });
    });
  };

  onAddClicked = () => {
    FastTaggerService.addTagGroup({
      order: 99999,
    });
    this.loadTagGroups();
  };

  onClearClicked = () => {
    FastTaggerService.clearConfig();
    this.loadTagGroups();
  };

  onGroupUp = (tagGroup: FastTaggerGroup) => {
    FastTaggerService.moveTagGroupUp(tagGroup);
    this.loadTagGroups();
  };

  onGroupDown = (tagGroup: FastTaggerGroup) => {
    FastTaggerService.moveTagGroupDown(tagGroup);
    this.loadTagGroups();
  };

  onGroupRemove = (tagGroup: FastTaggerGroup) => {
    FastTaggerService.removeTagGroup(tagGroup);
    this.loadTagGroups();
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
        <Tabs defaultActiveKey="groups">
          <Tab eventKey="tags" title="Tags">
            {this.state.loading && <LoadingIndicator />}
            <div className="row">
              <div className="col-10"></div>
              <div className="col-2">
                {!this.state.loading &&
                this.state.tagGroups?.map((tagGroup) => (
                  <div>{tagGroup.name}</div>
                ))}
              </div>
            </div>
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
