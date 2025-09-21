import { ModalComponent } from "./Modal";

const PluginApi = window.PluginApi;
const { React } = window.PluginApi;
const { Button } = PluginApi.libraries.Bootstrap;

interface FastTaggerSettingsDialogProps {
  onClose: (accept?: boolean) => void;
}

interface FastTaggerSettingsDialogState {}

class FastTaggerSettingsDialog extends React.Component<
  FastTaggerSettingsDialogProps,
  FastTaggerSettingsDialogState
> {
  constructor(props: FastTaggerSettingsDialogProps) {
    super(props);
    this.state = {};
  }

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
      ></ModalComponent>
    );
  }
}

export default FastTaggerSettingsDialog;
