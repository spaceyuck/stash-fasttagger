import type React from "@types/react";
import type ReactRouterDOM from "@types/react-router-dom";
import type { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type {
  IconDefinition,
  SizeProp,
} from "@fortawesome/fontawesome-svg-core";
import { Placement } from "react-bootstrap/esm/Overlay";

declare global {
  interface Window {
    PluginApi: IPluginApi;
    csLib: ICsLib;
  }
}

/**
 * @see https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/pluginApi.d.ts
 */
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
    AddGalleryImagesDocument: { [key: string]: any };
    AddTempDlnaipDocument: { [key: string]: any };
    AnonymiseDatabaseDocument: { [key: string]: any };
    AvailablePluginPackagesDocument: { [key: string]: any };
    AvailableScraperPackagesDocument: { [key: string]: any };
    BackupDatabaseDocument: { [key: string]: any };
    BlobsStorageType: { [key: string]: any };
    BulkGalleryUpdateDocument: { [key: string]: any };
    BulkImageUpdateDocument: { [key: string]: any };
    BulkGroupUpdateDocument: { [key: string]: any };
    BulkPerformerUpdateDocument: { [key: string]: any };
    BulkSceneUpdateDocument: { [key: string]: any };
    BulkUpdateIdMode: { [key: string]: any };
    CircumisedEnum: { [key: string]: any };
    ConfigDataFragmentDoc: { [key: string]: any };
    ConfigDefaultSettingsDataFragmentDoc: { [key: string]: any };
    ConfigDlnaDataFragmentDoc: { [key: string]: any };
    ConfigGeneralDataFragmentDoc: { [key: string]: any };
    ConfigInterfaceDataFragmentDoc: { [key: string]: any };
    ConfigScrapingDataFragmentDoc: { [key: string]: any };
    ConfigurationDocument: { [key: string]: any };
    ConfigureDefaultsDocument: { [key: string]: any };
    ConfigureDlnaDocument: { [key: string]: any };
    ConfigureGeneralDocument: { [key: string]: any };
    ConfigureInterfaceDocument: { [key: string]: any };
    ConfigurePluginDocument: { [key: string]: any };
    ConfigureScrapingDocument: { [key: string]: any };
    ConfigureUiDocument: { [key: string]: any };
    CriterionModifier: { [key: string]: any };
    DeleteFilesDocument: { [key: string]: any };
    DestroySavedFilterDocument: { [key: string]: any };
    DirectoryDocument: { [key: string]: any };
    DisableDlnaDocument: { [key: string]: any };
    DlnaStatusDocument: { [key: string]: any };
    EnableDlnaDocument: { [key: string]: any };
    ExportObjectsDocument: { [key: string]: any };
    FilterMode: { [key: string]: any };
    FindDuplicateScenesDocument: { [key: string]: any };
    FindGalleriesDocument: { [key: string]: any };
    FindGalleriesForSelectDocument: { [key: string]: any };
    FindGalleryDocument: { [key: string]: any };
    FindImageDocument: { [key: string]: any };
    FindImagesDocument: { [key: string]: any };
    FindJobDocument: { [key: string]: any };
    FindGroupDocument: { [key: string]: any };
    FindGroupsDocument: { [key: string]: any };
    FindGroupsForSelectDocument: { [key: string]: any };
    FindPerformerDocument: { [key: string]: any };
    FindPerformersDocument: { [key: string]: any };
    FindPerformersForSelectDocument: { [key: string]: any };
    FindSavedFilterDocument: { [key: string]: any };
    FindSavedFiltersDocument: { [key: string]: any };
    FindSceneDocument: { [key: string]: any };
    FindSceneMarkerTagsDocument: { [key: string]: any };
    FindSceneMarkersDocument: { [key: string]: any };
    FindScenesByPathRegexDocument: { [key: string]: any };
    FindScenesDocument: { [key: string]: any };
    FindStudioDocument: { [key: string]: any };
    FindStudiosDocument: { [key: string]: any };
    FindStudiosForSelectDocument: { [key: string]: any };
    FindTagDocument: { [key: string]: any };
    FindTagsDocument: { [key: string]: any };
    FindTagsForSelectDocument: { [key: string]: any };
    FolderDataFragmentDoc: { [key: string]: any };
    GalleriesUpdateDocument: { [key: string]: any };
    GalleryChapterCreateDocument: { [key: string]: any };
    GalleryChapterDataFragmentDoc: { [key: string]: any };
    GalleryChapterDestroyDocument: { [key: string]: any };
    GalleryChapterUpdateDocument: { [key: string]: any };
    GalleryCreateDocument: { [key: string]: any };
    GalleryDataFragmentDoc: { [key: string]: any };
    GalleryDestroyDocument: { [key: string]: any };
    GalleryFileDataFragmentDoc: { [key: string]: any };
    GalleryUpdateDocument: { [key: string]: any };
    GenderEnum: { [key: string]: any };
    GenerateApiKeyDocument: { [key: string]: any };
    HashAlgorithm: { [key: string]: any };
    IdentifyFieldOptionsDataFragmentDoc: { [key: string]: any };
    IdentifyFieldStrategy: { [key: string]: any };
    IdentifyMetadataOptionsDataFragmentDoc: { [key: string]: any };
    ImageDataFragmentDoc: { [key: string]: any };
    ImageDecrementODocument: { [key: string]: any };
    ImageDestroyDocument: { [key: string]: any };
    ImageFileDataFragmentDoc: { [key: string]: any };
    ImageIncrementODocument: { [key: string]: any };
    ImageLightboxDisplayMode: { [key: string]: any };
    ImageLightboxScrollMode: { [key: string]: any };
    ImageResetODocument: { [key: string]: any };
    ImageUpdateDocument: { [key: string]: any };
    ImagesDestroyDocument: { [key: string]: any };
    ImagesUpdateDocument: { [key: string]: any };
    ImportDuplicateEnum: { [key: string]: any };
    ImportMissingRefEnum: { [key: string]: any };
    ImportObjectsDocument: { [key: string]: any };
    InstallPluginPackagesDocument: { [key: string]: any };
    InstallScraperPackagesDocument: { [key: string]: any };
    InstalledPluginPackagesDocument: { [key: string]: any };
    InstalledPluginPackagesStatusDocument: { [key: string]: any };
    InstalledScraperPackagesDocument: { [key: string]: any };
    InstalledScraperPackagesStatusDocument: { [key: string]: any };
    JobDataFragmentDoc: { [key: string]: any };
    JobQueueDocument: { [key: string]: any };
    JobStatus: { [key: string]: any };
    JobStatusUpdateType: { [key: string]: any };
    JobsSubscribeDocument: { [key: string]: any };
    LatestVersionDocument: { [key: string]: any };
    ListGalleryScrapersDocument: { [key: string]: any };
    ListGroupScrapersDocument: { [key: string]: any };
    ListPerformerScrapersDocument: { [key: string]: any };
    ListSceneScrapersDocument: { [key: string]: any };
    LogEntryDataFragmentDoc: { [key: string]: any };
    LogLevel: { [key: string]: any };
    LoggingSubscribeDocument: { [key: string]: any };
    LogsDocument: { [key: string]: any };
    MarkerStringsDocument: { [key: string]: any };
    MarkerWallDocument: { [key: string]: any };
    MetadataAutoTagDocument: { [key: string]: any };
    MetadataCleanDocument: { [key: string]: any };
    MetadataExportDocument: { [key: string]: any };
    MetadataGenerateDocument: { [key: string]: any };
    MetadataIdentifyDocument: { [key: string]: any };
    MetadataImportDocument: { [key: string]: any };
    MetadataScanDocument: { [key: string]: any };
    MigrateBlobsDocument: { [key: string]: any };
    MigrateDocument: { [key: string]: any };
    MigrateHashNamingDocument: { [key: string]: any };
    MigrateSceneScreenshotsDocument: { [key: string]: any };
    GroupCreateDocument: { [key: string]: any };
    GroupDataFragmentDoc: { [key: string]: any };
    GroupDestroyDocument: { [key: string]: any };
    GroupUpdateDocument: { [key: string]: any };
    GroupsDestroyDocument: { [key: string]: any };
    OptimiseDatabaseDocument: { [key: string]: any };
    OrientationEnum: { [key: string]: any };
    PackageDataFragmentDoc: { [key: string]: any };
    PackageType: { [key: string]: any };
    ParseSceneFilenamesDocument: { [key: string]: any };
    PerformerCreateDocument: { [key: string]: any };
    PerformerDataFragmentDoc: { [key: string]: any };
    PerformerDestroyDocument: { [key: string]: any };
    PerformerUpdateDocument: { [key: string]: any };
    PerformersDestroyDocument: { [key: string]: any };
    PluginSettingTypeEnum: { [key: string]: any };
    PluginTasksDocument: { [key: string]: any };
    PluginsDocument: { [key: string]: any };
    PreviewPreset: { [key: string]: any };
    ReloadPluginsDocument: { [key: string]: any };
    ReloadScrapersDocument: { [key: string]: any };
    RemoveGalleryImagesDocument: { [key: string]: any };
    RemoveTempDlnaipDocument: { [key: string]: any };
    ResolutionEnum: { [key: string]: any };
    RunPluginTaskDocument: { [key: string]: any };
    SaveFilterDocument: { [key: string]: any };
    SavedFilterDataFragmentDoc: { [key: string]: any };
    ScanCompleteSubscribeDocument: { [key: string]: any };
    SceneAssignFileDocument: { [key: string]: any };
    SceneCreateDocument: { [key: string]: any };
    SceneDataFragmentDoc: { [key: string]: any };
    SceneDecrementODocument: { [key: string]: any };
    SceneDestroyDocument: { [key: string]: any };
    SceneGenerateScreenshotDocument: { [key: string]: any };
    SceneIncrementODocument: { [key: string]: any };
    SceneIncrementPlayCountDocument: { [key: string]: any };
    SceneMarkerCreateDocument: { [key: string]: any };
    SceneMarkerDataFragmentDoc: { [key: string]: any };
    SceneMarkerDestroyDocument: { [key: string]: any };
    SceneMarkerUpdateDocument: { [key: string]: any };
    SceneMergeDocument: { [key: string]: any };
    SceneResetODocument: { [key: string]: any };
    SceneSaveActivityDocument: { [key: string]: any };
    SceneStreamsDocument: { [key: string]: any };
    SceneUpdateDocument: { [key: string]: any };
    SceneWallDocument: { [key: string]: any };
    ScenesDestroyDocument: { [key: string]: any };
    ScenesUpdateDocument: { [key: string]: any };
    ScrapeContentType: { [key: string]: any };
    ScrapeGalleryUrlDocument: { [key: string]: any };
    ScrapeGroupUrlDocument: { [key: string]: any };
    ScrapeMultiPerformersDocument: { [key: string]: any };
    ScrapeMultiScenesDocument: { [key: string]: any };
    ScrapePerformerUrlDocument: { [key: string]: any };
    ScrapeSceneUrlDocument: { [key: string]: any };
    ScrapeSingleGalleryDocument: { [key: string]: any };
    ScrapeSinglePerformerDocument: { [key: string]: any };
    ScrapeSingleSceneDocument: { [key: string]: any };
    ScrapeSingleStudioDocument: { [key: string]: any };
    ScrapeType: { [key: string]: any };
    ScrapedGalleryDataFragmentDoc: { [key: string]: any };
    ScrapedGroupDataFragmentDoc: { [key: string]: any };
    ScrapedGroupStudioDataFragmentDoc: { [key: string]: any };
    ScrapedPerformerDataFragmentDoc: { [key: string]: any };
    ScrapedSceneDataFragmentDoc: { [key: string]: any };
    ScrapedSceneGroupDataFragmentDoc: { [key: string]: any };
    ScrapedScenePerformerDataFragmentDoc: { [key: string]: any };
    ScrapedSceneStudioDataFragmentDoc: { [key: string]: any };
    ScrapedSceneTagDataFragmentDoc: { [key: string]: any };
    ScrapedStashBoxPerformerDataFragmentDoc: { [key: string]: any };
    ScrapedStashBoxSceneDataFragmentDoc: { [key: string]: any };
    ScrapedStudioDataFragmentDoc: { [key: string]: any };
    ScraperSourceDataFragmentDoc: { [key: string]: any };
    SelectGalleryDataFragmentDoc: { [key: string]: any };
    SelectGroupDataFragmentDoc: { [key: string]: any };
    SelectPerformerDataFragmentDoc: { [key: string]: any };
    SelectStudioDataFragmentDoc: { [key: string]: any };
    SelectTagDataFragmentDoc: { [key: string]: any };
    SetPluginsEnabledDocument: { [key: string]: any };
    SetupDocument: { [key: string]: any };
    SlimGalleryDataFragmentDoc: { [key: string]: any };
    SlimImageDataFragmentDoc: { [key: string]: any };
    SlimGroupDataFragmentDoc: { [key: string]: any };
    SlimPerformerDataFragmentDoc: { [key: string]: any };
    SlimSceneDataFragmentDoc: { [key: string]: any };
    SlimStudioDataFragmentDoc: { [key: string]: any };
    SlimTagDataFragmentDoc: { [key: string]: any };
    SortDirectionEnum: { [key: string]: any };
    StashBoxBatchPerformerTagDocument: { [key: string]: any };
    StashBoxBatchStudioTagDocument: { [key: string]: any };
    StatsDocument: { [key: string]: any };
    StopAllJobsDocument: { [key: string]: any };
    StopJobDocument: { [key: string]: any };
    StreamingResolutionEnum: { [key: string]: any };
    StudioCreateDocument: { [key: string]: any };
    StudioDataFragmentDoc: { [key: string]: any };
    StudioDestroyDocument: { [key: string]: any };
    StudioUpdateDocument: { [key: string]: any };
    StudiosDestroyDocument: { [key: string]: any };
    SubmitStashBoxFingerprintsDocument: { [key: string]: any };
    SubmitStashBoxPerformerDraftDocument: { [key: string]: any };
    SubmitStashBoxSceneDraftDocument: { [key: string]: any };
    SystemStatusDocument: { [key: string]: any };
    SystemStatusEnum: { [key: string]: any };
    TagCreateDocument: { [key: string]: any };
    TagDataFragmentDoc: { [key: string]: any };
    TagDestroyDocument: { [key: string]: any };
    TagUpdateDocument: { [key: string]: any };
    TagsDestroyDocument: { [key: string]: any };
    TagsMergeDocument: { [key: string]: any };
    UninstallPluginPackagesDocument: { [key: string]: any };
    UninstallScraperPackagesDocument: { [key: string]: any };
    UpdatePluginPackagesDocument: { [key: string]: any };
    UpdateScraperPackagesDocument: { [key: string]: any };
    ValidateStashBoxDocument: { [key: string]: any };
    VersionDocument: { [key: string]: any };
    VideoFileDataFragmentDoc: { [key: string]: any };
    VisualFileDataFragmentDoc: { [key: string]: any };
    refetchAvailablePluginPackagesQuery(...args: any[]): any;
    refetchAvailableScraperPackagesQuery(...args: any[]): any;
    refetchConfigurationQuery(...args: any[]): any;
    refetchDirectoryQuery(...args: any[]): any;
    refetchDlnaStatusQuery(...args: any[]): any;
    refetchFindDuplicateScenesQuery(...args: any[]): any;
    refetchFindGalleriesForSelectQuery(...args: any[]): any;
    refetchFindGalleriesQuery(...args: any[]): any;
    refetchFindGalleryQuery(...args: any[]): any;
    refetchFindImageQuery(...args: any[]): any;
    refetchFindImagesQuery(...args: any[]): any;
    refetchFindJobQuery(...args: any[]): any;
    refetchFindGroupQuery(...args: any[]): any;
    refetchFindGroupsForSelectQuery(...args: any[]): any;
    refetchFindGroupsQuery(...args: any[]): any;
    refetchFindPerformerQuery(...args: any[]): any;
    refetchFindPerformersForSelectQuery(...args: any[]): any;
    refetchFindPerformersQuery(...args: any[]): any;
    refetchFindSavedFilterQuery(...args: any[]): any;
    refetchFindSavedFiltersQuery(...args: any[]): any;
    refetchFindSceneMarkerTagsQuery(...args: any[]): any;
    refetchFindSceneMarkersQuery(...args: any[]): any;
    refetchFindSceneQuery(...args: any[]): any;
    refetchFindScenesByPathRegexQuery(...args: any[]): any;
    refetchFindScenesQuery(...args: any[]): any;
    refetchFindStudioQuery(...args: any[]): any;
    refetchFindStudiosForSelectQuery(...args: any[]): any;
    refetchFindStudiosQuery(...args: any[]): any;
    refetchFindTagQuery(...args: any[]): any;
    refetchFindTagsForSelectQuery(...args: any[]): any;
    refetchFindTagsQuery(...args: any[]): any;
    refetchInstalledPluginPackagesQuery(...args: any[]): any;
    refetchInstalledPluginPackagesStatusQuery(...args: any[]): any;
    refetchInstalledScraperPackagesQuery(...args: any[]): any;
    refetchInstalledScraperPackagesStatusQuery(...args: any[]): any;
    refetchJobQueueQuery(...args: any[]): any;
    refetchLatestVersionQuery(...args: any[]): any;
    refetchListGalleryScrapersQuery(...args: any[]): any;
    refetchListGroupScrapersQuery(...args: any[]): any;
    refetchListPerformerScrapersQuery(...args: any[]): any;
    refetchListSceneScrapersQuery(...args: any[]): any;
    refetchLogsQuery(...args: any[]): any;
    refetchMarkerStringsQuery(...args: any[]): any;
    refetchMarkerWallQuery(...args: any[]): any;
    refetchParseSceneFilenamesQuery(...args: any[]): any;
    refetchPluginTasksQuery(...args: any[]): any;
    refetchPluginsQuery(...args: any[]): any;
    refetchSceneStreamsQuery(...args: any[]): any;
    refetchSceneWallQuery(...args: any[]): any;
    refetchScrapeGalleryUrlQuery(...args: any[]): any;
    refetchScrapeGroupUrlQuery(...args: any[]): any;
    refetchScrapeMultiPerformersQuery(...args: any[]): any;
    refetchScrapeMultiScenesQuery(...args: any[]): any;
    refetchScrapePerformerUrlQuery(...args: any[]): any;
    refetchScrapeSceneUrlQuery(...args: any[]): any;
    refetchScrapeSingleGalleryQuery(...args: any[]): any;
    refetchScrapeSinglePerformerQuery(...args: any[]): any;
    refetchScrapeSingleSceneQuery(...args: any[]): any;
    refetchScrapeSingleStudioQuery(...args: any[]): any;
    refetchStatsQuery(...args: any[]): any;
    refetchSystemStatusQuery(...args: any[]): any;
    refetchValidateStashBoxQuery(...args: any[]): any;
    refetchVersionQuery(...args: any[]): any;
    useAddGalleryImagesMutation(...args: any[]): any;
    useAddTempDlnaipMutation(...args: any[]): any;
    useAnonymiseDatabaseMutation(...args: any[]): any;
    useAvailablePluginPackagesLazyQuery(...args: any[]): any;
    useAvailablePluginPackagesQuery(...args: any[]): any;
    useAvailablePluginPackagesSuspenseQuery(...args: any[]): any;
    useAvailableScraperPackagesLazyQuery(...args: any[]): any;
    useAvailableScraperPackagesQuery(...args: any[]): any;
    useAvailableScraperPackagesSuspenseQuery(...args: any[]): any;
    useBackupDatabaseMutation(...args: any[]): any;
    useBulkGalleryUpdateMutation(...args: any[]): any;
    useBulkImageUpdateMutation(...args: any[]): any;
    useBulkGroupUpdateMutation(...args: any[]): any;
    useBulkPerformerUpdateMutation(...args: any[]): any;
    useBulkSceneUpdateMutation(...args: any[]): any;
    useConfigurationLazyQuery(...args: any[]): any;
    useConfigurationQuery(): {
      data: { configuration: ConfigResult };
      loading: boolean;
    };
    useConfigurationSuspenseQuery(...args: any[]): any;
    useConfigureDefaultsMutation(...args: any[]): any;
    useConfigureDlnaMutation(...args: any[]): any;
    useConfigureGeneralMutation(...args: any[]): any;
    useConfigureInterfaceMutation(...args: any[]): any;
    useConfigurePluginMutation(...args: any[]): any;
    useConfigureScrapingMutation(...args: any[]): any;
    useConfigureUiMutation(...args: any[]): any;
    useDeleteFilesMutation(...args: any[]): any;
    useDestroySavedFilterMutation(...args: any[]): any;
    useDirectoryLazyQuery(...args: any[]): any;
    useDirectoryQuery(...args: any[]): any;
    useDirectorySuspenseQuery(...args: any[]): any;
    useDisableDlnaMutation(...args: any[]): any;
    useDlnaStatusLazyQuery(...args: any[]): any;
    useDlnaStatusQuery(...args: any[]): any;
    useDlnaStatusSuspenseQuery(...args: any[]): any;
    useEnableDlnaMutation(...args: any[]): any;
    useExportObjectsMutation(...args: any[]): any;
    useFindDuplicateScenesLazyQuery(...args: any[]): any;
    useFindDuplicateScenesQuery(...args: any[]): any;
    useFindDuplicateScenesSuspenseQuery(...args: any[]): any;
    useFindGalleriesForSelectLazyQuery(...args: any[]): any;
    useFindGalleriesForSelectQuery(...args: any[]): any;
    useFindGalleriesForSelectSuspenseQuery(...args: any[]): any;
    useFindGalleriesLazyQuery(...args: any[]): any;
    useFindGalleriesQuery(...args: any[]): any;
    useFindGalleriesSuspenseQuery(...args: any[]): any;
    useFindGalleryLazyQuery(...args: any[]): any;
    useFindGalleryQuery(...args: any[]): any;
    useFindGallerySuspenseQuery(...args: any[]): any;
    useFindImageLazyQuery(...args: any[]): any;
    useFindImageQuery(...args: any[]): any;
    useFindImageSuspenseQuery(...args: any[]): any;
    useFindImagesLazyQuery(...args: any[]): any;
    useFindImagesQuery(args: { variables: QueryFindImagesArgs }): {
      data?: {
        findImages: Query["findImages"];
      };
      loading: boolean;
    };
    useFindImagesSuspenseQuery(...args: any[]): any;
    useFindJobLazyQuery(...args: any[]): any;
    useFindJobQuery(...args: any[]): any;
    useFindJobSuspenseQuery(...args: any[]): any;
    useFindGroupLazyQuery(...args: any[]): any;
    useFindGroupQuery(...args: any[]): any;
    useFindGroupSuspenseQuery(...args: any[]): any;
    useFindGroupsForSelectLazyQuery(...args: any[]): any;
    useFindGroupsForSelectQuery(...args: any[]): any;
    useFindGroupsForSelectSuspenseQuery(...args: any[]): any;
    useFindGroupsLazyQuery(...args: any[]): any;
    useFindGroupsQuery(...args: any[]): any;
    useFindGroupsSuspenseQuery(...args: any[]): any;
    useFindPerformerLazyQuery(...args: any[]): any;
    useFindPerformerQuery(args: { variables: QueryFindPerformerArgs }): {
      data: {
        findPerformer: Query["findPerformer"];
      };
      loading: boolean;
    };
    useFindPerformerSuspenseQuery(...args: any[]): any;
    useFindPerformersForSelectLazyQuery(...args: any[]): any;
    useFindPerformersForSelectQuery(...args: any[]): any;
    useFindPerformersForSelectSuspenseQuery(...args: any[]): any;
    useFindPerformersLazyQuery(...args: any[]): any;
    useFindPerformersQuery(args: { variables: QueryFindPerformersArgs }): {
      data?: {
        findPerformers: Query["findPerformers"];
      };
      loading: boolean;
    };
    useFindPerformersSuspenseQuery(...args: any[]): any;
    useFindSavedFilterLazyQuery(...args: any[]): any;
    useFindSavedFilterQuery(...args: any[]): any;
    useFindSavedFilterSuspenseQuery(...args: any[]): any;
    useFindSavedFiltersLazyQuery(...args: any[]): any;
    useFindSavedFiltersQuery(...args: any[]): any;
    useFindSavedFiltersSuspenseQuery(...args: any[]): any;
    useFindSceneLazyQuery(...args: any[]): any;
    useFindSceneMarkerTagsLazyQuery(...args: any[]): any;
    useFindSceneMarkerTagsQuery(...args: any[]): any;
    useFindSceneMarkerTagsSuspenseQuery(...args: any[]): any;
    useFindSceneMarkersLazyQuery(...args: any[]): any;
    useFindSceneMarkersQuery(...args: any[]): any;
    useFindSceneMarkersSuspenseQuery(...args: any[]): any;
    useFindSceneQuery(...args: any[]): any;
    useFindSceneSuspenseQuery(...args: any[]): any;
    useFindScenesByPathRegexLazyQuery(...args: any[]): any;
    useFindScenesByPathRegexQuery(...args: any[]): any;
    useFindScenesByPathRegexSuspenseQuery(...args: any[]): any;
    useFindScenesLazyQuery(...args: any[]): any;
    useFindScenesQuery(...args: any[]): any;
    useFindScenesSuspenseQuery(...args: any[]): any;
    useFindStudioLazyQuery(...args: any[]): any;
    useFindStudioQuery(...args: any[]): any;
    useFindStudioSuspenseQuery(...args: any[]): any;
    useFindStudiosForSelectLazyQuery(...args: any[]): any;
    useFindStudiosForSelectQuery(...args: any[]): any;
    useFindStudiosForSelectSuspenseQuery(...args: any[]): any;
    useFindStudiosLazyQuery(...args: any[]): any;
    useFindStudiosQuery(...args: any[]): any;
    useFindStudiosSuspenseQuery(...args: any[]): any;
    useFindTagLazyQuery(...args: any[]): any;
    useFindTagQuery(...args: any[]): any;
    useFindTagSuspenseQuery(...args: any[]): any;
    useFindTagsForSelectLazyQuery(...args: any[]): any;
    useFindTagsForSelectQuery(...args: any[]): any;
    useFindTagsForSelectSuspenseQuery(...args: any[]): any;
    useFindTagsLazyQuery(...args: any[]): any;
    useFindTagsQuery(...args: any[]): any;
    useFindTagsSuspenseQuery(...args: any[]): any;
    useGalleriesUpdateMutation(...args: any[]): any;
    useGalleryChapterCreateMutation(...args: any[]): any;
    useGalleryChapterDestroyMutation(...args: any[]): any;
    useGalleryChapterUpdateMutation(...args: any[]): any;
    useGalleryCreateMutation(...args: any[]): any;
    useGalleryDestroyMutation(...args: any[]): any;
    useGalleryUpdateMutation(...args: any[]): any;
    useGenerateApiKeyMutation(...args: any[]): any;
    useImageDecrementOMutation(...args: any[]): any;
    useImageDestroyMutation(...args: any[]): any;
    useImageIncrementOMutation(...args: any[]): any;
    useImageResetOMutation(...args: any[]): any;
    useImageUpdateMutation(...args: any[]): any;
    useImagesDestroyMutation(...args: any[]): any;
    useImagesUpdateMutation(...args: any[]): any;
    useImportObjectsMutation(...args: any[]): any;
    useInstallPluginPackagesMutation(...args: any[]): any;
    useInstallScraperPackagesMutation(...args: any[]): any;
    useInstalledPluginPackagesLazyQuery(...args: any[]): any;
    useInstalledPluginPackagesQuery(...args: any[]): any;
    useInstalledPluginPackagesStatusLazyQuery(...args: any[]): any;
    useInstalledPluginPackagesStatusQuery(...args: any[]): any;
    useInstalledPluginPackagesStatusSuspenseQuery(...args: any[]): any;
    useInstalledPluginPackagesSuspenseQuery(...args: any[]): any;
    useInstalledScraperPackagesLazyQuery(...args: any[]): any;
    useInstalledScraperPackagesQuery(...args: any[]): any;
    useInstalledScraperPackagesStatusLazyQuery(...args: any[]): any;
    useInstalledScraperPackagesStatusQuery(...args: any[]): any;
    useInstalledScraperPackagesStatusSuspenseQuery(
      ...args: any[]
    ): any;
    useInstalledScraperPackagesSuspenseQuery(...args: any[]): any;
    useJobQueueLazyQuery(...args: any[]): any;
    useJobQueueQuery(...args: any[]): any;
    useJobQueueSuspenseQuery(...args: any[]): any;
    useJobsSubscribeSubscription(...args: any[]): any;
    useLatestVersionLazyQuery(...args: any[]): any;
    useLatestVersionQuery(...args: any[]): any;
    useLatestVersionSuspenseQuery(...args: any[]): any;
    useListGalleryScrapersLazyQuery(...args: any[]): any;
    useListGalleryScrapersQuery(...args: any[]): any;
    useListGalleryScrapersSuspenseQuery(...args: any[]): any;
    useListGroupScrapersLazyQuery(...args: any[]): any;
    useListGroupScrapersQuery(...args: any[]): any;
    useListGroupScrapersSuspenseQuery(...args: any[]): any;
    useListPerformerScrapersLazyQuery(...args: any[]): any;
    useListPerformerScrapersQuery(...args: any[]): any;
    useListPerformerScrapersSuspenseQuery(...args: any[]): any;
    useListSceneScrapersLazyQuery(...args: any[]): any;
    useListSceneScrapersQuery(...args: any[]): any;
    useListSceneScrapersSuspenseQuery(...args: any[]): any;
    useLoggingSubscribeSubscription(...args: any[]): any;
    useLogsLazyQuery(...args: any[]): any;
    useLogsQuery(...args: any[]): any;
    useLogsSuspenseQuery(...args: any[]): any;
    useMarkerStringsLazyQuery(...args: any[]): any;
    useMarkerStringsQuery(...args: any[]): any;
    useMarkerStringsSuspenseQuery(...args: any[]): any;
    useMarkerWallLazyQuery(...args: any[]): any;
    useMarkerWallQuery(...args: any[]): any;
    useMarkerWallSuspenseQuery(...args: any[]): any;
    useMetadataAutoTagMutation(...args: any[]): any;
    useMetadataCleanMutation(...args: any[]): any;
    useMetadataExportMutation(...args: any[]): any;
    useMetadataGenerateMutation(...args: any[]): any;
    useMetadataIdentifyMutation(...args: any[]): any;
    useMetadataImportMutation(...args: any[]): any;
    useMetadataScanMutation(...args: any[]): any;
    useMigrateBlobsMutation(...args: any[]): any;
    useMigrateHashNamingMutation(...args: any[]): any;
    useMigrateMutation(...args: any[]): any;
    useMigrateSceneScreenshotsMutation(...args: any[]): any;
    useGroupCreateMutation(...args: any[]): any;
    useGroupDestroyMutation(...args: any[]): any;
    useGroupUpdateMutation(...args: any[]): any;
    useGroupsDestroyMutation(...args: any[]): any;
    useOptimiseDatabaseMutation(...args: any[]): any;
    useParseSceneFilenamesLazyQuery(...args: any[]): any;
    useParseSceneFilenamesQuery(...args: any[]): any;
    useParseSceneFilenamesSuspenseQuery(...args: any[]): any;
    usePerformerCreateMutation(...args: any[]): any;
    usePerformerDestroyMutation(...args: any[]): any;
    usePerformerUpdateMutation(...args: any[]): any;
    usePerformersDestroyMutation(...args: any[]): any;
    usePluginTasksLazyQuery(...args: any[]): any;
    usePluginTasksQuery(...args: any[]): any;
    usePluginTasksSuspenseQuery(...args: any[]): any;
    usePluginsLazyQuery(...args: any[]): any;
    usePluginsQuery(...args: any[]): any;
    usePluginsSuspenseQuery(...args: any[]): any;
    useReloadPluginsMutation(...args: any[]): any;
    useReloadScrapersMutation(...args: any[]): any;
    useRemoveGalleryImagesMutation(...args: any[]): any;
    useRemoveTempDlnaipMutation(...args: any[]): any;
    useRunPluginTaskMutation(...args: any[]): any;
    useSaveFilterMutation(...args: any[]): any;
    useScanCompleteSubscribeSubscription(...args: any[]): any;
    useSceneAssignFileMutation(...args: any[]): any;
    useSceneCreateMutation(...args: any[]): any;
    useSceneDecrementOMutation(...args: any[]): any;
    useSceneDestroyMutation(...args: any[]): any;
    useSceneGenerateScreenshotMutation(...args: any[]): any;
    useSceneIncrementOMutation(...args: any[]): any;
    useSceneIncrementPlayCountMutation(...args: any[]): any;
    useSceneMarkerCreateMutation(...args: any[]): any;
    useSceneMarkerDestroyMutation(...args: any[]): any;
    useSceneMarkerUpdateMutation(...args: any[]): any;
    useSceneMergeMutation(...args: any[]): any;
    useSceneResetOMutation(...args: any[]): any;
    useSceneSaveActivityMutation(...args: any[]): any;
    useSceneStreamsLazyQuery(...args: any[]): any;
    useSceneStreamsQuery(...args: any[]): any;
    useSceneStreamsSuspenseQuery(...args: any[]): any;
    useSceneUpdateMutation(...args: any[]): any;
    useSceneWallLazyQuery(...args: any[]): any;
    useSceneWallQuery(...args: any[]): any;
    useSceneWallSuspenseQuery(...args: any[]): any;
    useScenesDestroyMutation(...args: any[]): any;
    useScenesUpdateMutation(...args: any[]): any;
    useScrapeGalleryUrlLazyQuery(...args: any[]): any;
    useScrapeGalleryUrlQuery(...args: any[]): any;
    useScrapeGalleryUrlSuspenseQuery(...args: any[]): any;
    useScrapeGroupUrlLazyQuery(...args: any[]): any;
    useScrapeGroupUrlQuery(...args: any[]): any;
    useScrapeGroupUrlSuspenseQuery(...args: any[]): any;
    useScrapeMultiPerformersLazyQuery(...args: any[]): any;
    useScrapeMultiPerformersQuery(...args: any[]): any;
    useScrapeMultiPerformersSuspenseQuery(...args: any[]): any;
    useScrapeMultiScenesLazyQuery(...args: any[]): any;
    useScrapeMultiScenesQuery(...args: any[]): any;
    useScrapeMultiScenesSuspenseQuery(...args: any[]): any;
    useScrapePerformerUrlLazyQuery(...args: any[]): any;
    useScrapePerformerUrlQuery(...args: any[]): any;
    useScrapePerformerUrlSuspenseQuery(...args: any[]): any;
    useScrapeSceneUrlLazyQuery(...args: any[]): any;
    useScrapeSceneUrlQuery(...args: any[]): any;
    useScrapeSceneUrlSuspenseQuery(...args: any[]): any;
    useScrapeSingleGalleryLazyQuery(...args: any[]): any;
    useScrapeSingleGalleryQuery(...args: any[]): any;
    useScrapeSingleGallerySuspenseQuery(...args: any[]): any;
    useScrapeSinglePerformerLazyQuery(...args: any[]): any;
    useScrapeSinglePerformerQuery(...args: any[]): any;
    useScrapeSinglePerformerSuspenseQuery(...args: any[]): any;
    useScrapeSingleSceneLazyQuery(...args: any[]): any;
    useScrapeSingleSceneQuery(...args: any[]): any;
    useScrapeSingleSceneSuspenseQuery(...args: any[]): any;
    useScrapeSingleStudioLazyQuery(...args: any[]): any;
    useScrapeSingleStudioQuery(...args: any[]): any;
    useScrapeSingleStudioSuspenseQuery(...args: any[]): any;
    useSetDefaultFilterMutation(...args: any[]): any;
    useSetPluginsEnabledMutation(...args: any[]): any;
    useSetupMutation(...args: any[]): any;
    useStashBoxBatchPerformerTagMutation(...args: any[]): any;
    useStashBoxBatchStudioTagMutation(...args: any[]): any;
    useStatsLazyQuery(...args: any[]): any;
    useStatsQuery(...args: any[]): any;
    useStatsSuspenseQuery(...args: any[]): any;
    useStopAllJobsMutation(...args: any[]): any;
    useStopJobMutation(...args: any[]): any;
    useStudioCreateMutation(...args: any[]): any;
    useStudioDestroyMutation(...args: any[]): any;
    useStudioUpdateMutation(...args: any[]): any;
    useStudiosDestroyMutation(...args: any[]): any;
    useSubmitStashBoxFingerprintsMutation(...args: any[]): any;
    useSubmitStashBoxPerformerDraftMutation(...args: any[]): any;
    useSubmitStashBoxSceneDraftMutation(...args: any[]): any;
    useSystemStatusLazyQuery(...args: any[]): any;
    useSystemStatusQuery(...args: any[]): any;
    useSystemStatusSuspenseQuery(...args: any[]): any;
    useTagCreateMutation(...args: any[]): any;
    useTagDestroyMutation(...args: any[]): any;
    useTagUpdateMutation(...args: any[]): any;
    useTagsDestroyMutation(...args: any[]): any;
    useTagsMergeMutation(...args: any[]): any;
    useUninstallPluginPackagesMutation(...args: any[]): any;
    useUninstallScraperPackagesMutation(...args: any[]): any;
    useUpdatePluginPackagesMutation(...args: any[]): any;
    useUpdateScraperPackagesMutation(...args: any[]): any;
    useValidateStashBoxLazyQuery(...args: any[]): any;
    useValidateStashBoxQuery(...args: any[]): any;
    useValidateStashBoxSuspenseQuery(...args: any[]): any;
    useVersionLazyQuery(...args: any[]): any;
    useVersionQuery(...args: any[]): any;
    useVersionSuspenseQuery(...args: any[]): any;
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
      ButtonGroup: React.FC<any>;
      Card: React.FC<any> & {
        Body: React.FC<any>;
        Footer: React.FC<any>;
        Header: React.FC<any>;
      }
      Modal: React.FC<any> & {
        Body: React.FC<any>;
        Dialog: React.FC<any>;
        Footer: React.FC<any>;
        Header: React.FC<any>;
        Title: React.FC<any>;
      };
      Nav: React.FC<any> & {
        Link: React.FC<any>;
        Item: React.FC<any>;
      };
      Spinner: React.FC<any>;
      Tabs: React.FC<any>;
      Tab: React.FC<any> & {
        Pane: React.FC<any>;
      };
    };
    Apollo: {};
    FontAwesomeRegular: {
      [key: string]: IconDefinition;
    };
    FontAwesomeSolid: {
      faBox: IconDefinition;
      faEye: IconDefinition;
      faEthernet: IconDefinition;
      faMars: IconDefinition;
      faStar: IconDefinition;
      faTansgenderAlt: IconDefinition;
      faVenus: IconDefinition;
      [key: string]: IconDefinition;
    };
    FontAwesomeBrands: {
      [key: string]: IconDefinition;
    };
    Intl: {
      FormattedMessage: React.FC<any>;
      useIntl: Function;
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
    StashService: {
      evictQueries(...args: any[]): any;
      getClient(...args: any[]): any;
      mutateAddGalleryImages(...args: any[]): any;
      mutateAnonymiseDatabase(...args: any[]): any;
      mutateBackupDatabase(...args: any[]): any;
      mutateCreateScene(...args: any[]): any;
      mutateDeleteFiles(...args: any[]): any;
      mutateExportObjects(...args: any[]): any;
      mutateGallerySetPrimaryFile(...args: any[]): any;
      mutateImageDecrementO(...args: any[]): any;
      mutateImageIncrementO(...args: any[]): any;
      mutateImageResetO(...args: any[]): any;
      mutateImageSetPrimaryFile(...args: any[]): any;
      mutateImportObjects(...args: any[]): any;
      mutateInstallPluginPackages(...args: any[]): any;
      mutateInstallScraperPackages(...args: any[]): any;
      mutateMetadataAutoTag(...args: any[]): any;
      mutateMetadataClean(...args: any[]): any;
      mutateMetadataExport(...args: any[]): any;
      mutateMetadataGenerate(...args: any[]): any;
      mutateMetadataIdentify(...args: any[]): any;
      mutateMetadataImport(...args: any[]): any;
      mutateMetadataScan(...args: any[]): any;
      mutateMigrate(...args: any[]): any;
      mutateMigrateBlobs(...args: any[]): any;
      mutateMigrateHashNaming(...args: any[]): any;
      mutateMigrateSceneScreenshots(...args: any[]): any;
      mutateOptimiseDatabase(...args: any[]): any;
      mutateReloadPlugins(...args: any[]): any;
      mutateReloadScrapers(...args: any[]): any;
      mutateRemoveGalleryImages(...args: any[]): any;
      mutateRunPluginTask(...args: any[]): any;
      mutateSceneAssignFile(...args: any[]): any;
      mutateSceneMerge(...args: any[]): any;
      mutateSceneSetPrimaryFile(...args: any[]): any;
      mutateSetPluginsEnabled(...args: any[]): any;
      mutateSetup(...args: any[]): any;
      mutateStashBoxBatchPerformerTag(...args: any[]): any;
      mutateStashBoxBatchStudioTag(...args: any[]): any;
      mutateStopJob(...args: any[]): any;
      mutateSubmitStashBoxPerformerDraft(...args: any[]): any;
      mutateSubmitStashBoxSceneDraft(...args: any[]): any;
      mutateUninstallPluginPackages(...args: any[]): any;
      mutateUninstallScraperPackages(...args: any[]): any;
      mutateUpdatePluginPackages(...args: any[]): any;
      mutateUpdateScraperPackages(...args: any[]): any;
      queryAvailablePluginPackages(...args: any[]): any;
      queryAvailableScraperPackages(...args: any[]): any;
      queryFindGalleries(...args: any[]): any;
      queryFindGalleriesByIDForSelect(...args: any[]): any;
      queryFindGalleriesForSelect(...args: any[]): any;
      queryFindImages(...args: any[]): any;
      queryFindGroups(...args: any[]): any;
      queryFindGroupsByIDForSelect(...args: any[]): any;
      queryFindGroupsForSelect(...args: any[]): any;
      queryFindPerformer(...args: any[]): any;
      queryFindPerformers(...args: any[]): any;
      queryFindPerformersByIDForSelect(...args: any[]): any;
      queryFindPerformersForSelect(...args: any[]): any;
      queryFindSceneMarkers(...args: any[]): any;
      queryFindScenes(...args: any[]): any;
      queryFindScenesByID(...args: any[]): any;
      queryFindStudio(...args: any[]): any;
      queryFindStudios(...args: any[]): any;
      queryFindStudiosByIDForSelect(...args: any[]): any;
      queryFindStudiosForSelect(...args: any[]): any;
      queryFindTags(filter: ListFilterModel): any;
      queryFindTagsByIDForSelect(tagIDs: string[]): any;
      queryFindTagsForSelect(filter: ListFilterModel): any;
      queryLogs(...args: any[]): any;
      queryParseSceneFilenames(...args: any[]): any;
      querySceneByPathRegex(...args: any[]): any;
      queryScrapeGallery(...args: any[]): any;
      queryScrapeGalleryURL(...args: any[]): any;
      queryScrapeGroupURL(...args: any[]): any;
      queryScrapePerformer(...args: any[]): any;
      queryScrapePerformerURL(...args: any[]): any;
      queryScrapeScene(...args: any[]): any;
      queryScrapeSceneQuery(...args: any[]): any;
      queryScrapeSceneQueryFragment(...args: any[]): any;
      queryScrapeSceneURL(...args: any[]): any;
      stashBoxPerformerQuery(...args: any[]): any;
      stashBoxSceneBatchQuery(...args: any[]): any;
      stashBoxStudioQuery(...args: any[]): any;
      useAddTempDLNAIP(...args: any[]): any;
      useBulkGalleryUpdate(...args: any[]): any;
      useBulkImageUpdate(...args: any[]): any;
      useBulkGroupUpdate(...args: any[]): any;
      useBulkPerformerUpdate(...args: any[]): any;
      useBulkSceneUpdate(...args: any[]): any;
      useConfiguration(...args: any[]): any;
      useConfigureDLNA(...args: any[]): any;
      useConfigureDefaults(...args: any[]): any;
      useConfigureGeneral(...args: any[]): any;
      useConfigureInterface(...args: any[]): any;
      useConfigurePlugin(...args: any[]): any;
      useConfigureScraping(...args: any[]): any;
      useConfigureUI(...args: any[]): any;
      useDLNAStatus(...args: any[]): any;
      useDirectory(...args: any[]): any;
      useDisableDLNA(...args: any[]): any;
      useEnableDLNA(...args: any[]): any;
      useFindDefaultFilter(...args: any[]): any;
      useFindGalleries(...args: any[]): any;
      useFindGallery(...args: any[]): any;
      useFindImage(...args: any[]): any;
      useFindImages(...args: any[]): any;
      useFindGroup(...args: any[]): any;
      useFindGroups(...args: any[]): any;
      useFindPerformer(...args: any[]): any;
      useFindPerformers(...args: any[]): any;
      useFindSavedFilter(...args: any[]): any;
      useFindSavedFilters(...args: any[]): any;
      useFindScene(...args: any[]): any;
      useFindSceneMarkers(...args: any[]): any;
      useFindScenes(...args: any[]): any;
      useFindStudio(...args: any[]): any;
      useFindStudios(...args: any[]): any;
      useFindTag(...args: any[]): any;
      useFindTags(...args: any[]): any;
      useGalleryChapterCreate(...args: any[]): any;
      useGalleryChapterDestroy(...args: any[]): any;
      useGalleryChapterUpdate(...args: any[]): any;
      useGalleryCreate(...args: any[]): any;
      useGalleryDestroy(...args: any[]): any;
      useGalleryUpdate(...args: any[]): any;
      useGenerateAPIKey(...args: any[]): any;
      useImageDecrementO(...args: any[]): any;
      useImageIncrementO(...args: any[]): any;
      useImageResetO(...args: any[]): any;
      useImageUpdate(...args: any[]): any;
      useImagesDestroy(...args: any[]): any;
      useInstalledPluginPackages(...args: any[]): any;
      useInstalledScraperPackages(...args: any[]): any;
      useJobQueue(...args: any[]): any;
      useJobsSubscribe(...args: any[]): any;
      useLatestVersion(...args: any[]): any;
      useListGalleryScrapers(...args: any[]): any;
      useListGroupScrapers(...args: any[]): any;
      useListPerformerScrapers(...args: any[]): any;
      useListSceneScrapers(...args: any[]): any;
      useLoggingSubscribe(...args: any[]): any;
      useLogs(...args: any[]): any;
      useMarkerStrings(...args: any[]): any;
      useGroupCreate(...args: any[]): any;
      useGroupDestroy(...args: any[]): any;
      useGroupUpdate(...args: any[]): any;
      useGroupsDestroy(...args: any[]): any;
      usePerformerCreate(...args: any[]): any;
      usePerformerDestroy(...args: any[]): any;
      usePerformerUpdate(...args: any[]): any;
      usePerformersDestroy(...args: any[]): any;
      usePluginTasks(...args: any[]): any;
      usePlugins(...args: any[]): any;
      useRemoveTempDLNAIP(...args: any[]): any;
      useSaveFilter(...args: any[]): any;
      useSavedFilterDestroy(...args: any[]): any;
      useSceneDecrementO(...args: any[]): any;
      useSceneDestroy(...args: any[]): any;
      useSceneGenerateScreenshot(...args: any[]): any;
      useSceneIncrementO(...args: any[]): any;
      useSceneIncrementPlayCount(...args: any[]): any;
      useSceneMarkerCreate(...args: any[]): any;
      useSceneMarkerDestroy(...args: any[]): any;
      useSceneMarkerUpdate(...args: any[]): any;
      useSceneResetO(...args: any[]): any;
      useSceneSaveActivity(...args: any[]): any;
      useSceneStreams(...args: any[]): any;
      useSceneUpdate(...args: any[]): any;
      useScenesDestroy(...args: any[]): any;
      useScenesUpdate(...args: any[]): any;
      useScrapePerformerList(...args: any[]): any;
      useSetDefaultFilter(...args: any[]): any;
      useStats(...args: any[]): any;
      useStudioCreate(...args: any[]): any;
      useStudioDestroy(...args: any[]): any;
      useStudioUpdate(...args: any[]): any;
      useStudiosDestroy(...args: any[]): any;
      useSystemStatus(...args: any[]): any;
      useTagCreate(...args: any[]): any;
      useTagDestroy(...args: any[]): any;
      useTagUpdate(...args: any[]): any;
      useTagsDestroy(...args: any[]): any;
      useTagsMerge(...args: any[]): any;
      useVersion(...args: any[]): any;

      performerMutationImpactedQueries: { [key: string]: any }[];
      pluginMutationImpactedQueries: { [key: string]: any }[];
      scraperMutationImpactedQueries: { [key: string]: any }[];
      studioMutationImpactedQueries: { [key: string]: any }[];
    };
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
    useGalleryLightbox(): {
      id: string;
      chapters: any;
    };
    useLightbox(): {
      state: any;
      chapters: any;
    };
    useSpriteInfo(vttPath: string | undefined):
      | {
          url: string;
          start: number;
          end: number;
          x: number;
          y: number;
          w: number;
          h: number;
        }
      | undefined;
    useToast(): {
      toast: any;
      success(message: JSX.Element | string): void;
      error(error: unknown): void;
    };
    /**
     * This is a hook used to load components, using the PluginApi.utils.loadComponents method.
     * @param components The list of components to load. These values should come from the PluginApi.loadableComponents namespace.
     * @returns Returns a boolean which will be true if the components are loading.
     */
    useLoadComponents(toLoad: (() => Promise<unknown>)[]): boolean;
    useSettings(): {
      loading: boolean;
      error: any | undefined;
      general: any;
      interface: any;
      defaults: any;
      scraping: any;
      dlna: any;
      ui: any;
      plugins: any;

      advancedMode: boolean;

      // apikey isn't directly settable, so expose it here
      apiKey: string;

      saveGeneral: (input: any) => void;
      saveInterface: (input: any) => void;
      saveDefaults: (input: any) => void;
      saveScraping: (input: any) => void;
      saveDLNA: (input: any) => void;
      saveUI: (input: any) => void;
      savePluginSettings: (pluginID: string, input: {}) => void;
      setAdvancedMode: (value: boolean) => void;

      refetch: () => void;
    };
  };
  /**
   * This namespace provides methods to patch components to change their behaviour.
   */
  //patch: PatchableComponents;
  patch: {
    before: (target: string, fn: Function) => void;
    instead: (target: string, fn: Function) => void;
    after: (target: string, fn: Function) => void;
  };
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

interface CsLibStoredConfig {
  [key: string]: string
}

interface ICsLib {
  getConfiguration(pluginId: string, fallback: CsLibStoredConfig): Promise<CsLibStoredConfig>;
  setConfiguration(pluginId: string, values: CsLibStoredConfig): Promise<void>;
}

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

interface StashPluginComponents extends Record<string, React.FC<any>> {
    AlertModal: React.FC<any>;
    BackgroundImage: React.FC<any>;
    BooleanSetting: React.FC<any>;
    ChangeButtonSetting: React.FC<any>;
    ConstantSetting: React.FC<any>;
    CountrySelect: React.FC<any>;
    CustomFieldInput: React.FC<any>;
    CustomFields: React.FC<any>;
    DateInput: React.FC<any>;
    DetailImage: React.FC<any>;
    ExternalLinkButtons: React.FC<any>;
    ExternalLinksButton: React.FC<any>;
    FolderSelect: React.FC<any>;
    FrontPage: React.FC<any>;
    GalleryCard: React.FC<any>;
    "GalleryCard.Details": React.FC<any>;
    "GalleryCard.Image": React.FC<any>;
    "GalleryCard.Overlays": React.FC<any>;
    "GalleryCard.Popovers": React.FC<any>;
    GalleryIDSelect: React.FC<any>;
    GallerySelect: React.FC<any>;
    GroupIDSelect: React.FC<any>;
    GroupSelect: React.FC<any>;
    HeaderImage: React.FC<any>;
    HoverPopover: React.FC<any>;
    Icon: React.FC<any>;
    ImageInput: React.FC<any>;
    LightboxLink: React.FC<any>;
    LoadingIndicator: React.FC<any>;
    "MainNavBar.MenuItems": React.FC<any>;
    "MainNavBar.UtilityItems": React.FC<any>;
    ModalSetting: React.FC<any>;
    NumberSetting: React.FC<any>;
    PerformerAppearsWithPanel: React.FC<any>;
    PerformerCard: React.FC<any>;
    "PerformerCard.Details": React.FC<any>;
    "PerformerCard.Image": React.FC<any>;
    "PerformerCard.Overlays": React.FC<any>;
    "PerformerCard.Popovers": React.FC<any>;
    "PerformerCard.Title": React.FC<any>;
    PerformerDetailsPanel: React.FC<any>;
    "PerformerDetailsPanel.DetailGroup": React.FC<any>;
    PerformerGalleriesPanel: React.FC<any>;
    PerformerGroupsPanel: React.FC<any>;
    PerformerHeaderImage: React.FC<any>;
    PerformerIDSelect: React.FC<any>;
    PerformerImagesPanel: React.FC<any>;
    PerformerPage: React.FC<any>;
    PerformerScenesPanel: React.FC<any>;
    PerformerSelect: React.FC<any>;
    PluginSettings: React.FC<any>;
    RatingNumber: React.FC<any>;
    RatingStars: React.FC<any>;
    RatingSystem: React.FC<any>;
    SceneFileInfoPanel: React.FC<any>;
    SceneIDSelect: React.FC<any>;
    ScenePage: React.FC<any>;
    "ScenePage.TabContent": React.FC<any>;
    "ScenePage.Tabs": React.FC<any>;
    ScenePlayer: React.FC<any>;
    SceneSelect: React.FC<any>;
    "SceneCard.Details": React.FC<any>;
    "SceneCard.Image": React.FC<any>;
    "SceneCard.Overlays": React.FC<any>;
    "SceneCard.Popovers": React.FC<any>;
    SelectSetting: React.FC<any>;
    Setting: React.FC<any>;
    SettingGroup: React.FC<any>;
    SettingModal: React.FC<any>;
    StringListSetting: React.FC<any>;
    StringSetting: React.FC<any>;
    StudioIDSelect: React.FC<any>;
    StudioSelect: React.FC<any>;
    SweatDrops: React.FC<any>;
    TabTitleCounter: React.FC<any>;
    TagIDSelect: React.FC<any>;
    "TagCard.Details": React.FC<any>;
    "TagCard.Image": React.FC<any>;
    "TagCard.Overlays": React.FC<any>;
    "TagCard.Popovers": React.FC<any>;
    "TagCard.Title": React.FC<any>;
    TagLink: React.FC<any>;
    TagSelect: React.FC<any>;
    TruncatedText: React.FC<any>;
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

interface IFilterValueProps<T> {
  values?: T[];
  onSelect?: (item: T[]) => void;
}

interface IFilterProps {
  noSelectionString?: string;
  className?: string;
  active?: boolean;
  isMulti?: boolean;
  isClearable?: boolean;
  isDisabled?: boolean;
  creatable?: boolean;
  menuPortalTarget?: HTMLElement | null;
}

interface IFilterComponentProps<T> extends IFilterProps {
  loadOptions: (inputValue: string) => Promise<Option<T>[]>;
  onCreate?: (
    name: string
  ) => Promise<{ value: string; item: T; message: string }>;
  getNamedObject?: (id: string, name: string) => T;
  isValidNewOption?: (inputValue: string, options: T[]) => boolean;
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

type TagSelectProps = IFilterProps &
  IFilterValueProps<Tag> & {
    hoverPlacement?: Placement;
    hoverPlacementLabel?: Placement;
    excludeIds?: string[];
  };

/**
 * @see https://github.com/stashapp/stash/blob/develop/ui/v2.5/src/pluginApi.d.ts
 */
declare namespace PluginApi {
  const React: typeof import("react");
  const ReactDOM: typeof import("react-dom");
  namespace GQL {
    
  }
  namespace libraries {
    const Apollo: typeof import("@apollo/client");
    const Bootstrap: typeof import("react-bootstrap");
    const FontAwesomeRegular: typeof import("@fortawesome/free-regular-svg-icons");
    const FontAwesomeSolid: typeof import("@fortawesome/free-solid-svg-icons");
    const FontAwesomeBrands: typeof import("@fortawesome/free-brands-svg-icons");
    const Intl: typeof import("react-intl");
    const Mousetrap: typeof import("mousetrap");
    const ReactSelect: typeof import("react-select");

    // @ts-expect-error
    import { MousetrapStatic } from "mousetrap";
    function MousetrapPause(mousetrap: MousetrapStatic): MousetrapStatic;

    const ReactRouterDOM: typeof import("react-router-dom");
  }
  namespace loadableComponents {
    interface ISceneCardProps {
      scene: any;
      containerWidth?: number;
      previewHeight?: number;
      index?: number;
      queue?: any;
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
    function SceneCard(): Promise<{
      SceneCard: React.FC<ISceneCardProps>;
      ScenePreview: React.FC<IScenePreviewProps>;
    }>;
  }
  const components: {
    AlertModal: React.FC<any>;
    BackgroundImage: React.FC<any>;
    BooleanSetting: React.FC<any>;
    ChangeButtonSetting: React.FC<any>;
    ConstantSetting: React.FC<any>;
    CountrySelect: React.FC<any>;
    CustomFieldInput: React.FC<any>;
    CustomFields: React.FC<any>;
    DateInput: React.FC<any>;
    DetailImage: React.FC<any>;
    ExternalLinkButtons: React.FC<any>;
    ExternalLinksButton: React.FC<any>;
    FolderSelect: React.FC<any>;
    FrontPage: React.FC<any>;
    GalleryCard: React.FC<any>;
    "GalleryCard.Details": React.FC<any>;
    "GalleryCard.Image": React.FC<any>;
    "GalleryCard.Overlays": React.FC<any>;
    "GalleryCard.Popovers": React.FC<any>;
    GalleryIDSelect: React.FC<any>;
    GallerySelect: React.FC<any>;
    GroupIDSelect: React.FC<any>;
    GroupSelect: React.FC<any>;
    HeaderImage: React.FC<any>;
    HoverPopover: React.FC<any>;
    Icon: React.FC<any>;
    ImageInput: React.FC<any>;
    LightboxLink: React.FC<any>;
    LoadingIndicator: React.FC<any>;
    "MainNavBar.MenuItems": React.FC<any>;
    "MainNavBar.UtilityItems": React.FC<any>;
    ModalSetting: React.FC<any>;
    NumberSetting: React.FC<any>;
    PerformerAppearsWithPanel: React.FC<any>;
    PerformerCard: React.FC<any>;
    "PerformerCard.Details": React.FC<any>;
    "PerformerCard.Image": React.FC<any>;
    "PerformerCard.Overlays": React.FC<any>;
    "PerformerCard.Popovers": React.FC<any>;
    "PerformerCard.Title": React.FC<any>;
    PerformerDetailsPanel: React.FC<any>;
    "PerformerDetailsPanel.DetailGroup": React.FC<any>;
    PerformerGalleriesPanel: React.FC<any>;
    PerformerGroupsPanel: React.FC<any>;
    PerformerHeaderImage: React.FC<any>;
    PerformerIDSelect: React.FC<any>;
    PerformerImagesPanel: React.FC<any>;
    PerformerPage: React.FC<any>;
    PerformerScenesPanel: React.FC<any>;
    PerformerSelect: React.FC<any>;
    PluginSettings: React.FC<any>;
    RatingNumber: React.FC<any>;
    RatingStars: React.FC<any>;
    RatingSystem: React.FC<any>;
    SceneFileInfoPanel: React.FC<any>;
    SceneIDSelect: React.FC<any>;
    ScenePage: React.FC<any>;
    "ScenePage.TabContent": React.FC<any>;
    "ScenePage.Tabs": React.FC<any>;
    ScenePlayer: React.FC<any>;
    SceneSelect: React.FC<any>;
    "SceneCard.Details": React.FC<any>;
    "SceneCard.Image": React.FC<any>;
    "SceneCard.Overlays": React.FC<any>;
    "SceneCard.Popovers": React.FC<any>;
    SelectSetting: React.FC<any>;
    Setting: React.FC<any>;
    SettingGroup: React.FC<any>;
    SettingModal: React.FC<any>;
    StringListSetting: React.FC<any>;
    StringSetting: React.FC<any>;
    StudioIDSelect: React.FC<any>;
    StudioSelect: React.FC<any>;
    SweatDrops: React.FC<any>;
    TabTitleCounter: React.FC<any>;
    TagIDSelect: React.FC<any>;
    "TagCard.Details": React.FC<any>;
    "TagCard.Image": React.FC<any>;
    "TagCard.Overlays": React.FC<any>;
    "TagCard.Popovers": React.FC<any>;
    "TagCard.Title": React.FC<any>;
    TagLink: React.FC<any>;
    TagSelect: React.FC<any>;
    TruncatedText: React.FC<any>;
  };
  type PatchableComponentNames = keyof typeof components | string;
  namespace utils {
    namespace NavUtils {
      function makePerformerScenesUrl(...args: any[]): any;
      function makePerformerImagesUrl(...args: any[]): any;
      function makePerformerGalleriesUrl(...args: any[]): any;
      function makePerformerGroupsUrl(...args: any[]): any;
      function makePerformersCountryUrl(...args: any[]): any;
      function makeStudioScenesUrl(...args: any[]): any;
      function makeStudioImagesUrl(...args: any[]): any;
      function makeStudioGalleriesUrl(...args: any[]): any;
      function makeStudioGroupsUrl(...args: any[]): any;
      function makeStudioPerformersUrl(...args: any[]): any;
      function makeTagUrl(...args: any[]): any;
      function makeParentTagsUrl(...args: any[]): any;
      function makeChildTagsUrl(...args: any[]): any;
      function makeTagSceneMarkersUrl(...args: any[]): any;
      function makeTagScenesUrl(...args: any[]): any;
      function makeTagPerformersUrl(...args: any[]): any;
      function makeTagGalleriesUrl(...args: any[]): any;
      function makeTagImagesUrl(...args: any[]): any;
      function makeScenesPHashMatchUrl(...args: any[]): any;
      function makeSceneMarkerUrl(...args: any[]): any;
      function makeGroupScenesUrl(...args: any[]): any;
      function makeChildStudiosUrl(...args: any[]): any;
      function makeGalleryImagesUrl(...args: any[]): any;
    }
    namespace StashService {
      function evictQueries(...args: any[]): any;
      function getClient(...args: any[]): any;
      function mutateAddGalleryImages(...args: any[]): any;
      function mutateAnonymiseDatabase(...args: any[]): any;
      function mutateBackupDatabase(...args: any[]): any;
      function mutateCreateScene(...args: any[]): any;
      function mutateDeleteFiles(...args: any[]): any;
      function mutateExportObjects(...args: any[]): any;
      function mutateGallerySetPrimaryFile(...args: any[]): any;
      function mutateImageDecrementO(...args: any[]): any;
      function mutateImageIncrementO(...args: any[]): any;
      function mutateImageResetO(...args: any[]): any;
      function mutateImageSetPrimaryFile(...args: any[]): any;
      function mutateImportObjects(...args: any[]): any;
      function mutateInstallPluginPackages(...args: any[]): any;
      function mutateInstallScraperPackages(...args: any[]): any;
      function mutateMetadataAutoTag(...args: any[]): any;
      function mutateMetadataClean(...args: any[]): any;
      function mutateMetadataExport(...args: any[]): any;
      function mutateMetadataGenerate(...args: any[]): any;
      function mutateMetadataIdentify(...args: any[]): any;
      function mutateMetadataImport(...args: any[]): any;
      function mutateMetadataScan(...args: any[]): any;
      function mutateMigrate(...args: any[]): any;
      function mutateMigrateBlobs(...args: any[]): any;
      function mutateMigrateHashNaming(...args: any[]): any;
      function mutateMigrateSceneScreenshots(...args: any[]): any;
      function mutateOptimiseDatabase(...args: any[]): any;
      function mutateReloadPlugins(...args: any[]): any;
      function mutateReloadScrapers(...args: any[]): any;
      function mutateRemoveGalleryImages(...args: any[]): any;
      function mutateRunPluginTask(...args: any[]): any;
      function mutateSceneAssignFile(...args: any[]): any;
      function mutateSceneMerge(...args: any[]): any;
      function mutateSceneSetPrimaryFile(...args: any[]): any;
      function mutateSetPluginsEnabled(...args: any[]): any;
      function mutateSetup(...args: any[]): any;
      function mutateStashBoxBatchPerformerTag(...args: any[]): any;
      function mutateStashBoxBatchStudioTag(...args: any[]): any;
      function mutateStopJob(...args: any[]): any;
      function mutateSubmitStashBoxPerformerDraft(...args: any[]): any;
      function mutateSubmitStashBoxSceneDraft(...args: any[]): any;
      function mutateUninstallPluginPackages(...args: any[]): any;
      function mutateUninstallScraperPackages(...args: any[]): any;
      function mutateUpdatePluginPackages(...args: any[]): any;
      function mutateUpdateScraperPackages(...args: any[]): any;
      function queryAvailablePluginPackages(...args: any[]): any;
      function queryAvailableScraperPackages(...args: any[]): any;
      function queryFindGalleries(...args: any[]): any;
      function queryFindGalleriesByIDForSelect(...args: any[]): any;
      function queryFindGalleriesForSelect(...args: any[]): any;
      function queryFindImages(...args: any[]): any;
      function queryFindGroups(...args: any[]): any;
      function queryFindGroupsByIDForSelect(...args: any[]): any;
      function queryFindGroupsForSelect(...args: any[]): any;
      function queryFindPerformer(...args: any[]): any;
      function queryFindPerformers(...args: any[]): any;
      function queryFindPerformersByIDForSelect(...args: any[]): any;
      function queryFindPerformersForSelect(...args: any[]): any;
      function queryFindSceneMarkers(...args: any[]): any;
      function queryFindScenes(...args: any[]): any;
      function queryFindScenesByID(...args: any[]): any;
      function queryFindStudio(...args: any[]): any;
      function queryFindStudios(...args: any[]): any;
      function queryFindStudiosByIDForSelect(...args: any[]): any;
      function queryFindStudiosForSelect(...args: any[]): any;
      function queryFindTags(...args: any[]): any;
      function queryFindTagsByIDForSelect(...args: any[]): any;
      function queryFindTagsForSelect(...args: any[]): any;
      function queryLogs(...args: any[]): any;
      function queryParseSceneFilenames(...args: any[]): any;
      function querySceneByPathRegex(...args: any[]): any;
      function queryScrapeGallery(...args: any[]): any;
      function queryScrapeGalleryURL(...args: any[]): any;
      function queryScrapeGroupURL(...args: any[]): any;
      function queryScrapePerformer(...args: any[]): any;
      function queryScrapePerformerURL(...args: any[]): any;
      function queryScrapeScene(...args: any[]): any;
      function queryScrapeSceneQuery(...args: any[]): any;
      function queryScrapeSceneQueryFragment(...args: any[]): any;
      function queryScrapeSceneURL(...args: any[]): any;
      function stashBoxPerformerQuery(...args: any[]): any;
      function stashBoxSceneBatchQuery(...args: any[]): any;
      function stashBoxStudioQuery(...args: any[]): any;
      function useAddTempDLNAIP(...args: any[]): any;
      function useBulkGalleryUpdate(...args: any[]): any;
      function useBulkImageUpdate(...args: any[]): any;
      function useBulkGroupUpdate(...args: any[]): any;
      function useBulkPerformerUpdate(...args: any[]): any;
      function useBulkSceneUpdate(...args: any[]): any;
      function useConfiguration(...args: any[]): any;
      function useConfigureDLNA(...args: any[]): any;
      function useConfigureDefaults(...args: any[]): any;
      function useConfigureGeneral(...args: any[]): any;
      function useConfigureInterface(...args: any[]): any;
      function useConfigurePlugin(...args: any[]): any;
      function useConfigureScraping(...args: any[]): any;
      function useConfigureUI(...args: any[]): any;
      function useDLNAStatus(...args: any[]): any;
      function useDirectory(...args: any[]): any;
      function useDisableDLNA(...args: any[]): any;
      function useEnableDLNA(...args: any[]): any;
      function useFindDefaultFilter(...args: any[]): any;
      function useFindGalleries(...args: any[]): any;
      function useFindGallery(...args: any[]): any;
      function useFindImage(...args: any[]): any;
      function useFindImages(...args: any[]): any;
      function useFindGroup(...args: any[]): any;
      function useFindGroups(...args: any[]): any;
      function useFindPerformer(...args: any[]): any;
      function useFindPerformers(...args: any[]): any;
      function useFindSavedFilter(...args: any[]): any;
      function useFindSavedFilters(...args: any[]): any;
      function useFindScene(...args: any[]): any;
      function useFindSceneMarkers(...args: any[]): any;
      function useFindScenes(...args: any[]): any;
      function useFindStudio(...args: any[]): any;
      function useFindStudios(...args: any[]): any;
      function useFindTag(...args: any[]): any;
      function useFindTags(...args: any[]): any;
      function useGalleryChapterCreate(...args: any[]): any;
      function useGalleryChapterDestroy(...args: any[]): any;
      function useGalleryChapterUpdate(...args: any[]): any;
      function useGalleryCreate(...args: any[]): any;
      function useGalleryDestroy(...args: any[]): any;
      function useGalleryUpdate(...args: any[]): any;
      function useGenerateAPIKey(...args: any[]): any;
      function useImageDecrementO(...args: any[]): any;
      function useImageIncrementO(...args: any[]): any;
      function useImageResetO(...args: any[]): any;
      function useImageUpdate(...args: any[]): any;
      function useImagesDestroy(...args: any[]): any;
      function useInstalledPluginPackages(...args: any[]): any;
      function useInstalledScraperPackages(...args: any[]): any;
      function useJobQueue(...args: any[]): any;
      function useJobsSubscribe(...args: any[]): any;
      function useLatestVersion(...args: any[]): any;
      function useListGalleryScrapers(...args: any[]): any;
      function useListGroupScrapers(...args: any[]): any;
      function useListPerformerScrapers(...args: any[]): any;
      function useListSceneScrapers(...args: any[]): any;
      function useLoggingSubscribe(...args: any[]): any;
      function useLogs(...args: any[]): any;
      function useMarkerStrings(...args: any[]): any;
      function useGroupCreate(...args: any[]): any;
      function useGroupDestroy(...args: any[]): any;
      function useGroupUpdate(...args: any[]): any;
      function useGroupsDestroy(...args: any[]): any;
      function usePerformerCreate(...args: any[]): any;
      function usePerformerDestroy(...args: any[]): any;
      function usePerformerUpdate(...args: any[]): any;
      function usePerformersDestroy(...args: any[]): any;
      function usePluginTasks(...args: any[]): any;
      function usePlugins(...args: any[]): any;
      function useRemoveTempDLNAIP(...args: any[]): any;
      function useSaveFilter(...args: any[]): any;
      function useSavedFilterDestroy(...args: any[]): any;
      function useSceneDecrementO(...args: any[]): any;
      function useSceneDestroy(...args: any[]): any;
      function useSceneGenerateScreenshot(...args: any[]): any;
      function useSceneIncrementO(...args: any[]): any;
      function useSceneIncrementPlayCount(...args: any[]): any;
      function useSceneMarkerCreate(...args: any[]): any;
      function useSceneMarkerDestroy(...args: any[]): any;
      function useSceneMarkerUpdate(...args: any[]): any;
      function useSceneResetO(...args: any[]): any;
      function useSceneSaveActivity(...args: any[]): any;
      function useSceneStreams(...args: any[]): any;
      function useSceneUpdate(...args: any[]): any;
      function useScenesDestroy(...args: any[]): any;
      function useScenesUpdate(...args: any[]): any;
      function useScrapePerformerList(...args: any[]): any;
      function useSetDefaultFilter(...args: any[]): any;
      function useStats(...args: any[]): any;
      function useStudioCreate(...args: any[]): any;
      function useStudioDestroy(...args: any[]): any;
      function useStudioUpdate(...args: any[]): any;
      function useStudiosDestroy(...args: any[]): any;
      function useSystemStatus(...args: any[]): any;
      function useTagCreate(...args: any[]): any;
      function useTagDestroy(...args: any[]): any;
      function useTagUpdate(...args: any[]): any;
      function useTagsDestroy(...args: any[]): any;
      function useTagsMerge(...args: any[]): any;
      function useVersion(...args: any[]): any;

      const performerMutationImpactedQueries: { [key: string]: any }[];
      const pluginMutationImpactedQueries: { [key: string]: any }[];
      const scraperMutationImpactedQueries: { [key: string]: any }[];
      const studioMutationImpactedQueries: { [key: string]: any }[];
    }
    function loadComponents(components: (() => Promise<unknown>)[]): void;
  }
  namespace hooks {
    function useLoadComponents(toLoad: (() => Promise<unknown>)[]): boolean;
    function useSpriteInfo(vttPath: string | undefined):
      | {
          url: string;
          start: number;
          end: number;
          x: number;
          y: number;
          w: number;
          h: number;
        }
      | undefined;

    function useToast(): {
      toast: any;
      success(message: JSX.Element | string): void;
      error(error: unknown): void;
    };

    function useSettings(): {
      loading: boolean;
      error: any | undefined;
      general: any;
      interface: any;
      defaults: any;
      scraping: any;
      dlna: any;
      ui: any;
      plugins: any;

      advancedMode: boolean;

      // apikey isn't directly settable, so expose it here
      apiKey: string;

      saveGeneral: (input: any) => void;
      saveInterface: (input: any) => void;
      saveDefaults: (input: any) => void;
      saveScraping: (input: any) => void;
      saveDLNA: (input: any) => void;
      saveUI: (input: any) => void;
      savePluginSettings: (pluginID: string, input: {}) => void;
      setAdvancedMode: (value: boolean) => void;

      refetch: () => void;
    };
    export enum ConnectionState {
      Missing,
      Disconnected,
      Error,
      Connecting,
      Syncing,
      Uploading,
      Ready,
    }

    type Handy = typeof import("thehandy").default;
    export type InteractiveAPI = {
      readonly _connected: boolean;
      readonly _playing: boolean;
      readonly _scriptOffset: number;
      readonly _handy: Handy;
      readonly _useStashHostedFunscript: boolean;
      connect(): Promise<void>;
      set handyKey(key: string);
      get handyKey(): string;
      set useStashHostedFunscript(useStashHostedFunscript: boolean);
      get useStashHostedFunscript(): boolean;
      set scriptOffset(offset: number);
      uploadScript(funscriptPath: string, apiKey?: string): Promise<void>;
      sync(): Promise<number>;
      setServerTimeOffset(offset: number): void;
      play(position: number): Promise<void>;
      pause(): Promise<void>;
      ensurePlaying(position: number): Promise<void>;
      setLooping(looping: boolean): Promise<void>;
    };

    function useInteractive(): {
      interactive: InteractiveAPI;
      state: ConnectionState;
      serverOffset: number;
      initialised: boolean;
      currentScript?: string;
      error?: string;
      initialise: () => Promise<void>;
      uploadScript: (funscriptPath: string) => Promise<void>;
      sync: () => Promise<void>;
    };

    function useLightbox(): {
      state: any;
      chapters: any;
    };

    function useGalleryLightbox(): {
      id: string;
      chapters: any;
    };
  }
  namespace patch {
    function before(target: PatchableComponentNames, fn: Function): void;
    function instead(target: PatchableComponentNames, fn: Function): void;
    function after(target: PatchableComponentNames, fn: Function): void;
  }
  namespace register {
    function route(path: string, component: React.FC<any>): void;
  }
}

declare module "mousetrap-pause" {
  import { MousetrapStatic } from "mousetrap";

  function MousetrapPause(mousetrap: MousetrapStatic): MousetrapStatic;

  export default MousetrapPause;

  module "mousetrap" {
    interface MousetrapStatic {
      pause(): void;
      unpause(): void;
      pauseCombo(combo: string): void;
      unpauseCombo(combo: string): void;
    }
    interface MousetrapInstance {
      pause(): void;
      unpause(): void;
      pauseCombo(combo: string): void;
      unpauseCombo(combo: string): void;
    }
  }
}

export interface ListFilterModel {
  makeFindFilter(): FindFilterType;
  makeFilter() : Record<string, unknown>;
}
