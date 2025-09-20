import type React from "@types/react";
import type ReactRouterDOM from "@types/react-router-dom";
import type { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type {
  IconDefinition,
  SizeProp,
} from "@fortawesome/fontawesome-svg-core";
declare global {
  interface Window {
    PluginApi: IPluginApi;
  }
}

interface IPluginApi {
  /**
   * An instance of the React library.
   */
  React: typeof React;
  /**
   * An instance of the ReactDOM library.
   */
  ReactDOM: typeof ReactDOM;
  /**
   * This namespace contains the generated graphql client interface. This is a low-level interface. In many cases, StashService should be used instead.
   */
  GQL: {
    useConfigurationQuery(): {
      data: { configuration: ConfigResult };
      loading: boolean;
    };
    useFindImagesQuery(args: { variables: QueryFindImagesArgs }): {
      data?: {
        findImages: Query["findImages"];
      };
      loading: boolean;
    };
    useFindPerformerQuery(args: { variables: QueryFindPerformerArgs }): {
      data: {
        findPerformer: Query["findPerformer"];
      };
      loading: boolean;
    };
    useFindPerformersQuery(args: { variables: QueryFindPerformersArgs }): {
      data?: {
        findPerformers: Query["findPerformers"];
      };
      loading: boolean;
    };
    useFindScenesQuery(args: { variables: QueryFindScenesArgs }): {
      data: { findScenes: Query["findScenes"] };
      loading: boolean;
    };
    useFindStudioQuery(args: { variables: QueryFindStudioArgs }): {
      data: { findStudio: Query["findStudio"] };
      loading: boolean;
    };
    useFindStudiosQuery(args: { variables: QueryFindStudiosArgs }): {
      data: { findStudios: Query["findStudios"] };
      loading: boolean;
    };
    useFindTagsQuery(args: { variables: QueryFindTagsArgs }): {
      data: { findTags: Query["findTags"] };
      loading: boolean;
    };
    useStatsQuery(): { data: { stats: StatsResultType }; loading: boolean };
  };
  /**
   * Allows plugins to listen for Stash's events.
   */
  Event: {
    addEventListener: (
      event: string,
      callback: (e: CustomEvent) => void
    ) => void;
  };
  /**
   * provides access to UI libraries
   */
  libraries: {
    ReactRouterDOM: typeof ReactRouterDOM;
    Bootstrap: {
      Button: React.FC<any>;
      Nav: React.FC<any> & {
        Link: React.FC<any>;
        Item: React.FC<any>;
      };
      Tab: React.FC<any> & {
        Pane: React.FC<any>;
      }
    };
    Apollo: {};
    FontAwesomeRegular: {
    };
    FontAwesomeSolid: {
      faBox: IconDefinition;
      faEye: IconDefinition;
      faEthernet: IconDefinition;
      faMars: IconDefinition;
      faStar: IconDefinition;
      faTansgenderAlt: IconDefinition;
      faVenus: IconDefinition;
    };
    FontAwesomeBrands: {
    };
    Intl: {
      FormattedMessage: React.FC<any>;
    };
    Mousetrap: {};
    MousetrapPause: {};
    ReactSelect: {};
  };
  /**
   * This namespace contains all of the components that may need to be loaded using the loadComponents method. Components are added to this namespace as needed. Please make a development request if a required component is not in this namespace.
   * 
   * This component also includes coarse-grained entries for every lazily loaded import in the stock UI. If a component is not available in components when the page loads, it can be loaded using the coarse-grained entry. For example, PerformerCard can be loaded using loadableComponents.Performers.
   */
  loadableComponents: any;
  components: StashPluginComponents;
  utils: {
    NavUtils: any;
    /**
     * @see https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/core/StashService.ts
     */
    StashService: any;
    /**
     * Due to code splitting, some components may not be loaded and available when a plugin page is rendered. loadComponents loads all of the components that a plugin page may require.
     * 
     * In general, PluginApi.hooks.useLoadComponents hook should be used instead.
     * @param components The list of components to load. These values should come from the PluginApi.loadableComponents namespace.
     * @returns Returns a Promise<void> that resolves when all of the components have been loaded.
     */
    loadComponents: (components: Promise[]) => Promise<void>;
  };
  hooks: {
    useGalleryLightbox: any;
    useLightbox: any;
    useSpriteInfo: any;
    useToast: any;
    /**
     * This is a hook used to load components, using the PluginApi.utils.loadComponents method.
     * @param components The list of components to load. These values should come from the PluginApi.loadableComponents namespace.
     * @returns Returns a boolean which will be true if the components are loading.
     */
    useLoadComponents: (components: Promise[]) => boolean;
  };
  /**
   * This namespace provides methods to patch components to change their behaviour.
   */
  //patch: PatchableComponents;
  patch: {
    before: (target: string, fn: Function) => void;
    instead: (target: string, fn: Function) => void;
    after: (target: string, fn: Function) => void;
  },
  /**
   * This namespace contains methods used to register page routes and components.
   */
  register: {
    /**
     * Registers a route in the React Router.
     * @param path The path to register. This should generally use the /plugin/ prefix.
     * @param component A React function component that will be rendered when the route is loaded.
     */
    route: (path: string, component: React.FC<any>) => void;
    /**
     * Registers a component to be used by plugins. The component will be available in the components namespace.
     * @param name The name of the component to register. This should be unique and should ideally be prefixed with plugin-.
     * @param component A React function component.
     */
    component: (name: string, component: React.FC<any>) => void;
  };
}

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

interface StashPluginComponents /* extends Record<string, React.FC<any>> */ {
  HoverPopover: (props: IHoverPopover) => React.JSX.Element;
  Icon: (props: IIcon) => FontAwesomeIcon;
  LoadingIndicator: (props: ILoadingProps) => React.JSX.Element;
  "PerformerDetailsPanel.DetailGroup": (
    props: PropsPerformerDetailsPanelDetailGroup
  ) => React.JSX.Element;
  SceneCard: (props: ISceneCardProps) => React.JSX.Element;
}

interface PatchableComponents {
  after: PatchableComponentsAfter;
  before: PatchableComponentsBefore;
  instead: PatchableComponentsInstead;
}

interface PatchableComponentsAfter {
  (
    component: "PerformerDetailsPanel.DetailGroup",
    fn: (props: PropsPerformerDetailsPanelDetailGroup) => React.JSX.Element[]
  ): void;
}

interface PatchableComponentsBefore {
  (
    component: "PerformerDetailsPanel.DetailGroup",
    fn: (props: PropsPerformerDetailsPanelDetailGroup) => React.JSX.Element[]
  ): void;
}

interface PatchableComponentsInstead {
  (
    component: "Frontpage",
    fn: (
      props: PropsPerformerDetailsPanelDetailGroup,
      _: object,
      Original: React.JSX
    ) => React.JSX.Element[]
  ): void;
  (
    component: "PerformerDetailsPanel.DetailGroup",
    fn: (
      props: PropsPerformerDetailsPanelDetailGroup,
      _: object,
      Original: React.JSX
    ) => React.JSX.Element[]
  ): void;
  (
    component: "SceneCard",
    fn: (
      props: ISceneCardProps,
      _: object,
      Original: React.JSX
    ) => React.JSX.Element[]
  ): void;
  (
    component: "SceneCard.Details",
    fn: (
      props: ISceneCardProps,
      _: object,
      Original: React.JSX
    ) => React.JSX.Element[]
  ): void;
  (
    component: "SceneCard.Image",
    fn: (
      props: ISceneCardProps,
      _: object,
      Original: React.JSX
    ) => React.JSX.Element[]
  ): void;
  (
    component: "SceneCard.Overlays",
    fn: (
      props: ISceneCardProps,
      _: object,
      Original: React.JSX
    ) => React.JSX.Element[]
  ): void;
  (
    component: "SceneCard.Popovers",
    fn: (
      props: ISceneCardProps,
      _: object,
      Original: React.JSX
    ) => React.JSX.Element[]
  ): void;
}

interface PropsPerformerDetailsPanelDetailGroup
  extends React.PropsWithChildren {
  collapsed: boolean;
  fullWidth: boolean;
  performer: Performer;
}

interface IHoverPopover extends React.PropsWithChildren {
  enterDelay?: number;
  leaveDelay?: number;
  content: JSX.Element[] | JSX.Element | string;
  className?: string;
  placement?: "top" | "right" | "bottom" | "left";
  onOpen?: () => void;
  onClose?: () => void;
  target?: React.RefObject<HTMLElement>;
}

interface IPerformerFragment {
  name?: Maybe<string>;
  gender?: Maybe<GenderEnum>;
}

interface ISceneCardProps {
  scene: Scene;
  containerWidth?: number;
  previewHeight?: number;
  index?: number;
  queue?: SceneQueue;
  compact?: boolean;
  selecting?: boolean;
  selected?: boolean | undefined;
  zoomIndex?: number;
  onSelectedChanged?: (selected: boolean, shiftKey: boolean) => void;
}

interface IScenePreviewProps {
  isPortrait: boolean;
  image?: string;
  video?: string;
  soundActive: boolean;
  vttPath?: string;
  onScrubberClick?: (timestamp: number) => void;
}

interface IIcon {
  icon: IconDefinition;
  className?: string;
  color?: string;
  size?: SizeProp;
}

interface IratingSystemOptions {
  starPrecision: "full" | "half" | "quarter" | "tenth";
  type: "decimal" | "stars";
}

interface ILoadingProps {
  message?: JSX.Element | string;
  inline?: boolean;
  small?: boolean;
  card?: boolean;
}
