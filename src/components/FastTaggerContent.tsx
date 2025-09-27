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
  excludeIds?: Set<String>, 
}

class FastTaggerContent extends React.Component<FastTaggerContentProps, FastTaggerContentState> {
  constructor(props: FastTaggerContentProps) {
    super(props);
    this.state = {
      excludeIds: props.excludeIds ? new Set(props.excludeIds) : undefined
    };
  }

  async componentDidMount() {
    this.loadData();
  }

  static getDerivedStateFromProps(props: FastTaggerContentProps, state: FastTaggerContentState) {
    state.excludeIds = props.excludeIds ? new Set(props.excludeIds) : undefined;
  }

  loadData = () => {
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
    if (this.isTagSelected(tag.id)) {
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

  isTagSelected = (tagId: String): boolean => {
    const idx = this.props.values?.findIndex((e) => e.id == tagId);
    return idx !== undefined && idx > -1;
  };

  isTagExcluded = (tagId: string): boolean => {
    if (this.state.excludeIds) {
      return this.state.excludeIds.has(tagId);
    } else {
      return false;
    }
  };
  
  onSettingsClick = () => {
    this.setState({ showSettings: true });
  };

  onSettingsClose = (accept: boolean | undefined) => {
    this.setState({ showSettings: false });
    this.loadData();
  };

  maybeRenderSettingsDialog = () => {
    if (!this.state.showSettings) {
      return;
    }

    return <FastTaggerSettingsDialog onClose={this.onSettingsClose}></FastTaggerSettingsDialog>;
  };

  renderTagPopover = (tag: Tag) => (
    <Popover className="hover-popover-content">
      <Popover.Content className="tag-popover-card">
        <div className="tag-card zoom-0 grid-card card">
          <div className="thumbnail-section">
            <img loading="lazy" className="tag-card-image" alt={tag.name} src={tag.image_path ?? ""} />
          </div>
          <div className="card-section">
            <h5 className="card-section-title flex-aligned">{tag.name}</h5>
            <div className="tag-description">{tag.description}</div>
          </div>
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
        {!this.state.loading &&
          this.state.tagGroupsToTags
            ?.filter(
              (groupEntry) =>
                !!groupEntry.group &&
                (!groupEntry.group.conditionTagId || this.isTagSelected(groupEntry.group.conditionTagId))
            )
            .map((groupEntry) => (
              <Card className="fast-tagger-card">
                <Card.Header>{groupEntry.group?.name}</Card.Header>
                <Card.Body>
                  <ButtonGroup>
                    {groupEntry.tags.map((tag) => (
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 0 }}
                        overlay={this.renderTagPopover(tag)}
                      >
                        <Button
                          variant="secondary"
                          size="sm"
                          className={this.isTagSelected(tag.id) ? "btn-success" : ""}
                          onClick={() => this.onTagClick(tag)}
                          disabled={this.isTagExcluded(tag.id)}
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
