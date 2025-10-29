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
  tags?: Tag[];
  /**
   * map from tag ID to IDs of direct and indirect parent IDs
   */
  tagIdToParentIds?: Map<string, Set<string>>;
  tagGroups?: FastTaggerGroup[];
  tagGroupsToTags?: FastTaggerGroupTags[];
  excludeIds?: Set<String>;
}

class FastTaggerContent extends React.Component<FastTaggerContentProps, FastTaggerContentState> {
  constructor(props: FastTaggerContentProps) {
    super(props);
    this.state = {
      excludeIds: props.excludeIds ? new Set(props.excludeIds) : undefined,
    };
  }

  async componentDidMount() {
    this.loadData();
  }

  static getDerivedStateFromProps(props: FastTaggerContentProps, state: FastTaggerContentState) {
    state.excludeIds = props.excludeIds ? new Set(props.excludeIds) : undefined;
    return state;
  }

  loadData = () => {
    console.debug("loading tags, tag groups and tag groups to tags...");
    this.setState({ loading: true });
    const tagsPromise = FastTaggerService.getTags().then((tags) => {
      console.debug("done loading tags", tags);
      const tagIdToParentIds = this.buildParentIdMap(tags);
      this.setState({ tags: tags, tagIdToParentIds: tagIdToParentIds });
    });
    const tagGroupsPromise = FastTaggerService.getTagGroups().then((tagGroups) => {
      console.debug("done loading tag groups", tagGroups);
      this.setState({ tagGroups: tagGroups });
    });
    const tagGroupsToTagsPromise = FastTaggerService.getTagGroupToTags().then((tagGroupsToTags) => {
      console.debug("done loading tag groups to tags", tagGroupsToTags);
      this.setState({ tagGroupsToTags: tagGroupsToTags });
    });
    return Promise.all([tagsPromise, tagGroupsPromise, tagGroupsToTagsPromise]).then(() => {
      this.setState({ loading: false });
    });
  };

  buildParentIdMap = (tags: Tag[]) => {
    const tagIdToParentIds = new Map<string, Set<string>>();
    // round one -> populate immediate parent IDs
    for (const tag of tags) {
      tagIdToParentIds.set(tag.id, new Set<string>());
      for (const parent of tag.parents) {
        tagIdToParentIds.get(tag.id)?.add(parent.id);
      }
    }

    for (const tagId of tagIdToParentIds.keys()) {
      this.populateParentIdMap(tagId, tagIdToParentIds);
    }

    return tagIdToParentIds;
  };

  populateParentIdMap = (tagId: string, tagIdToParentIds: Map<string, Set<string>>) => {
    const parentIds: Set<string> = tagIdToParentIds.get(tagId)!;

    for (const parentId of parentIds) {
      const indirectParentIds = this.populateParentIdMap(parentId, tagIdToParentIds);
      indirectParentIds.forEach((indirectParentId) => parentIds.add(indirectParentId));
    }

    return parentIds;
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

  isTagSelected = (tagId: string): boolean => {
    const idx = this.props.values?.findIndex((e) => e.id == tagId);
    return idx !== undefined && idx > -1;
  };

  isChildTagSelected = (tagId: string): boolean => {
    const idx = this.props.values?.findIndex((e) => this.state.tagIdToParentIds?.get(e.id)?.has(tagId));
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
      <div className="fast-tagger-content">
        {this.maybeRenderSettingsDialog()}
        {!this.state.loading &&
          this.state.tagGroupsToTags
            ?.filter(
              (groupEntry) =>
                !!groupEntry.group &&
                (!groupEntry.group.conditionTagId ||
                  this.isTagSelected(groupEntry.group.conditionTagId) ||
                  this.isChildTagSelected(groupEntry.group.conditionTagId))
            )
            .map((groupEntry) => (
              <Card
                className={
                  "fast-tagger-card fast-tagger-group " +
                  (groupEntry.group?.contexts ? groupEntry.group?.contexts.join(" ") : "all")
                }
                key={groupEntry.group?.id}
              >
                <Card.Header className={groupEntry.group?.colorClass ? " bg-" + groupEntry.group?.colorClass : ""}>
                  {groupEntry.group?.name}
                </Card.Header>
                <Card.Body>
                  <ButtonGroup>
                    {groupEntry.tags.map((tag) => (
                      <OverlayTrigger
                        key={tag.id}
                        placement="right"
                        delay={{ show: 250, hide: 0 }}
                        overlay={this.renderTagPopover(tag)}
                      >
                        <Button
                          size="sm"
                          className={
                            "fast-tagger-group-tag" +
                            (this.isTagSelected(tag.id)
                              ? " btn-success"
                              : this.isChildTagSelected(tag.id)
                              ? " btn-light"
                              : " btn-secondary")
                          }
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
      </div>
    );
  }
}

export default FastTaggerContent;
