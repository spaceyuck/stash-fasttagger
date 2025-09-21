import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

const PluginApi = window.PluginApi;
const { React } = PluginApi;
const { Modal } = PluginApi.libraries.Bootstrap;
const { FormattedMessage } = PluginApi.libraries.Intl;

export const Icon: React.FC<FontAwesomeIconProps> = (props) => (
  <FontAwesomeIcon {...props} className={`fa-icon ${props.className ?? ""}`} />
);
