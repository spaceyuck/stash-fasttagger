import { FastTaggerEnhancedTag, FastTaggerGroup, FastTaggerGroupTags } from "../services/FastTaggerService";

const PluginApi = window.PluginApi;
const { React } = window.PluginApi;
const { Card, Dropdown } = PluginApi.libraries.Bootstrap;
const { LoadingIndicator } = PluginApi.components;

let { TagLink } = PluginApi.components;
PluginApi.utils.loadComponents([PluginApi.loadableComponents.TagLink]).then(() => {
  TagLink = PluginApi.components.TagLink;
});

interface FastTaggerTagFormProps {
  item: FastTaggerEnhancedTag;
  tagGroups?: FastTaggerGroupTags[];
  onMoveTagToGroup: (group?: FastTaggerGroup) => void;
}

interface FastTaggerTagFormState {
  name?: string;
}

class FastTaggerTagGroupForm extends React.Component<FastTaggerTagFormProps, FastTaggerTagFormState> {
  constructor(props: FastTaggerTagFormProps) {
    super(props);
    this.state = {
      name: props.item._nameOverride,
    };
  }

  onNameChanged = (text: string) => {
    this.setState({
      name: text,
    });
  };

  onTagMove = (group?: FastTaggerGroup) => {
    this.props.onMoveTagToGroup(group);
  };

  render() {
    if (!TagLink) {
      return (<LoadingIndicator/>);
    }

    return (
      <Card className="card-sm fast-tagger-card">
        <Card.Body>
          <div className="d-flex flex-direction-row justify-content-between align-items-center">
            <div className="flex-grow-1 mr-3">
              <div>
                <TagLink tag={this.props.item} linkType="details"></TagLink>
              </div>
              <div>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={this.state.name}
                  onChange={(event) => this.onNameChanged(event.target.value)}
                />
              </div>
            </div>
            <div>
              <Dropdown>
                <Dropdown.Toggle variant="primary" size="sm">
                  Move to
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.props.tagGroups?.map((targetGroupEntry) => {
                    if (targetGroupEntry.group?.id != this.props.item._tagGroupId) {
                      return (
                        <Dropdown.Item onClick={() => this.onTagMove(targetGroupEntry.group)}>
                          {targetGroupEntry.group?.name}
                        </Dropdown.Item>
                      );
                    }
                  })}
                  {this.props.tagGroups && this.props.tagGroups.length > 0 && <Dropdown.Divider />}
                  <Dropdown.Item onClick={() => this.onTagMove(undefined)}>No group</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default FastTaggerTagGroupForm;
