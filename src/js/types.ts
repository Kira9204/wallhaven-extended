/**
 * Wallhaven Extended V2 - Type Definitions
 * By: Erik Welander (erik.welander@hotmail.com)
 */

import { DATE_TIME_FORMAT, WALLHAVEN_RATIO, WALLHAVEN_SORT_BY, WALLHAVEN_SORT_BY_AGE } from './constants';

//
// Constants used as types
//
export type TDateTimeFormat = (typeof DATE_TIME_FORMAT)[keyof typeof DATE_TIME_FORMAT];
export type TWallhavenSortBy = (typeof WALLHAVEN_SORT_BY)[keyof typeof WALLHAVEN_SORT_BY];
export type TWallhavenSortByAge = (typeof WALLHAVEN_SORT_BY_AGE)[keyof typeof WALLHAVEN_SORT_BY_AGE];
export type TWallhavenRatio = (typeof WALLHAVEN_RATIO)[keyof typeof WALLHAVEN_RATIO];

/**
 * Application settings that are specific to Wallhaven.
 */
export type TWallhavenSettings = {
  search: string;
  sorting: {
    sortBy: TWallhavenSortBy;
    sortByAge: TWallhavenSortByAge;
    maxPage: number;
  };
  category: {
    general: boolean;
    people: boolean;
    anime: boolean;
  };
  purity: {
    sfw: boolean;
    sketchy: boolean;
    nsfw: boolean;
    nsfwApiKey: string;
  };
  size: {
    minimumDimensions: string;
    ratio: TWallhavenRatio;
  };
};

/**
 * Application settings that are specific to Wallpaper Engine.
 */
export type TWPESettings = {
  baseFontSize: number;
  positionBottom: number;
  displayDebugInfo: boolean;
  displayTimeDate: boolean;
  dateTimeFormat: TDateTimeFormat;
  staticWallpaper: string;
  changeFrequencyMinutes: number;
  clicksToChange: number;
};

export type TAppSettings = {
  wallhavenSettings: TWallhavenSettings;
  wpeSettings: TWPESettings;
};

/**
 * Event type for user property changes received from Wallpaper Engine.
 */
export type TWPEUserPropertiesEvent = {
  wpe_baseFontSize?: { value: string };
  wpe_positionBottom?: { value: string };
  wpe_debugInfo?: { value: boolean };
  wpe_displayTimeDate?: { value: boolean };
  wpe_dateTimeFormat?: { value: TDateTimeFormat };
  wpe_staticWallpaper?: { value: string };
  wpe_changeFrequencyMinutes?: { value: string };
  wpe_clicksToChange?: { value: string };
  wh_search?: { value: string };
  wh_sortBy?: { value: TWallhavenSortBy };
  wh_sortByAge?: { value: TWallhavenSortByAge };
  wh_maxRandomPage?: { value: string };
  wh_categoryGeneral?: { value: boolean };
  wh_categoryPeople?: { value: boolean };
  wh_categoryAnime?: { value: boolean };
  wh_puritySfw?: { value: boolean };
  wh_puritySketchy?: { value: boolean };
  wh_purityNsfw?: { value: boolean };
  wh_purityNsfwApiKey?: { value: string };
  wh_wallpaperPropertySize?: { value: string };
  wh_wallpaperPropertyRatio?: { value: TWallhavenRatio };
};
