import FastTaggerSettingsDialog from "./FastTaggerSettingsDialog";
import * as FastTaggerService from "../services/FastTaggerService";
import { FastTaggerGroup, FastTaggerGroupTags } from "../services/FastTaggerService";

const PluginApi = window.PluginApi;
const { React } = window.PluginApi;
const { Button, ButtonGroup, Card, Overlay, OverlayTrigger, Popover } = PluginApi.libraries.Bootstrap;
const { faGear } = PluginApi.libraries.FontAwesomeSolid;
const { Icon, LoadingIndicator } = PluginApi.components;

interface FastTaggerContentProps {
  values?: Tag[];
  onSelect?: (item: Tag[]) => void;
  excludeIds?: string[];
}

interface FastTaggerContentState {
  loading?: boolean;
  showSettings?: boolean;
  tagGroups?: FastTaggerGroup[];
  tagGroupsToTags?: FastTaggerGroupTags[];
}

class FastTaggerContent extends React.Component<FastTaggerContentProps, FastTaggerContentState> {
  constructor(props: FastTaggerContentProps) {
    super(props);
    this.state = {};
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

  onTagClick = (tag: Tag) => {
    let ret: Tag[] = [];
    // is currently selected -> needs to be removed
    if (this.isTagSelected(tag)) {
      this.props.values?.forEach((e) => {
        if (e.id != tag.id) {
          ret.push(e);
        }
      });
    }
    // is currently not selected -> needs to be added
    else {
      this.props.values?.forEach((e) => {
        ret.push(e);
      });
      ret.push(tag);
    }
    this.props.onSelect?.(ret);
  };

  isTagSelected = (tag: Tag): boolean => {
    const idx = this.props.values?.findIndex((e) => e.id == tag.id);
    return idx !== undefined && idx > -1;
  };

  onSettingsClick = () => {
    this.setState((state) => {
      return { showSettings: true };
    });
  };

  onSettingsClose = (accept: boolean | undefined) => {
    this.setState({ showSettings: false });
    this.loadTagGroups();
  };

  maybeRenderSettingsDialog = () => {
    if (!this.state.showSettings) {
      return;
    }

    return <FastTaggerSettingsDialog onClose={this.onSettingsClose}></FastTaggerSettingsDialog>;
  };

  renderTagPopover = (tag: Tag) => (
    <Popover>
      <Popover.Title as="h3">{tag.name}</Popover.Title>
      <Popover.Content className="hover-popover-content">
        <div className="tag-card zoom-0">
          <div className="thumbnail-section">
            <img loading="lazy" className="tag-card-image" alt={tag.name} src={tag.image_path ?? ""} />
          </div>
          <div className="card-section">
            <h5 className="card-section-title flex-aligned">{tag.name}</h5>
          </div>
          {tag.description}
        </div>
      </Popover.Content>
    </Popover>
  );

  render() {
    if (this.state.loading) {
      return <LoadingIndicator />;
    }

    return (
      <>
        {this.maybeRenderSettingsDialog()}
        <div>
          {this.props.excludeIds?.map((excludedId) => (
            <span>{excludedId}, </span>
          ))}
        </div>
        {!this.state.loading &&
          this.state.tagGroupsToTags?.filter((groupEntry) => !!groupEntry.group).map((groupEntry) => (
            <Card className="card-sm fast-tagger-card">
              <Card.Header>{groupEntry.group ? groupEntry.group.name : "Ungrouped tags"}</Card.Header>
              <Card.Body>
                <ButtonGroup aria-label="Basic example">
                  {groupEntry.tags.map((tag) => (
                    <OverlayTrigger placement="right" delay={{ show: 0, hide: 0 }} overlay={this.renderTagPopover(tag)}>
                      <Button
                        variant="secondary"
                        className={this.isTagSelected(tag) ? "btn-success" : ""}
                        onClick={() => this.onTagClick(tag)}
                      >
                        {tag._nameOverride ? tag._nameOverride : tag.name}
                      </Button>
                    </OverlayTrigger>
                  ))}
                </ButtonGroup>
              </Card.Body>
            </Card>
          ))}
        <div>
          <Button className="plugin-fast-tagger-settings-button" variant="secondary" onClick={this.onSettingsClick}>
            <Icon icon={faGear} /> Settings
          </Button>
        </div>
      </>
    );
  }
}

export default FastTaggerContent;
