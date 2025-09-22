import { ModalComponent } from "./Modal";
import FastTaggerTagGroupForm from "./FastTaggerTagGroupForn";
import * as FastTaggerService from "../services/FastTaggerService";
import { FastTaggerGroup } from "../services/FastTaggerService";

const PluginApi = window.PluginApi;
const { React } = PluginApi;
const { Button } = PluginApi.libraries.Bootstrap;
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
    FastTaggerService.addTagGroup({});
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
        {this.state.loading && <LoadingIndicator />}
        {!this.state.loading &&
          this.state.tagGroups?.map((tagGroup) => (
            <FastTaggerTagGroupForm
              item={tagGroup}
              onGroupUp={() => this.onGroupUp(tagGroup)}
              onGroupDown={() => this.onGroupDown(tagGroup)}
              onGroupRemove={() => this.onGroupRemove(tagGroup)}
            />
          ))}
        {!this.state.loading && (
          <div>
            <Button variant="primary" onClick={this.onAddClicked}>
              Add
            </Button>
          </div>
        )}
      </ModalComponent>
    );
  }
}

export default FastTaggerSettingsDialog;
