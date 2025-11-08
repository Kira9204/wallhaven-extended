/**
 * Wallhaven Extended V2 - Application Constants
 * These constants represents enums, types and default settings used throughout the application.
 * The Constants are later converted to TS types in types.ts for strong typing.
 * By: Erik Welander (erik.welander@hotmail.com)
 */

import { TWallhavenSettings, TWPESettings } from './types.js';

export const DATE_TIME_FORMAT = {
  ISO: 'iso',
  US: 'us',
} as const;

export const WALLHAVEN_SORT_BY = {
  None: 'none',
  Random: 'random',
  DateAdded: 'date_added',
  Views: 'views',
  Favorites: 'favorites',
  Toplist: 'toplist',
} as const;

export const WALLHAVEN_SORT_BY_AGE = {
  None: 'none',
  OneDay: '1d',
  ThreeDays: '3d',
  OneWeek: '1w',
  OneMonth: '1m',
  ThreeMonths: '3m',
  SixMonths: '6m',
  OneYear: '1y',
} as const;

export const WALLHAVEN_RATIO = {
  None: 'none',
  Landscape: 'landscape',
  R16x9: '16x9',
  R16x10: '16x10',
  R21x9: '21x9',
  R32x9: '32x9',
  R48x9: '48x9',
  Portrait: 'portrait',
  R9x16: '9x16',
  R10x16: '10x16',
  R9x18: '9x18',
  R1x1: '1x1',
  R3x2: '3x2',
  R4x3: '4x3',
} as const;

export const WALLHAVEN_API_URL = 'https://wallhaven.cc/api/v1/search?purity=';
export const WALLHAVEN_DEFAULT_SETTINGS: TWallhavenSettings = {
  search: '',
  sorting: {
    sortBy: WALLHAVEN_SORT_BY.DateAdded,
    sortByAge: WALLHAVEN_SORT_BY_AGE.None,
    maxPage: 20,
  },
  category: {
    general: false,
    people: false,
    anime: true,
  },
  purity: {
    sfw: true,
    sketchy: false,
    nsfw: false,
    nsfwApiKey: '',
  },
  size: {
    minimumDimensions: '',
    ratio: WALLHAVEN_RATIO.R16x9,
  },
};

export const WPE_DEFAULT_SETTINGS: TWPESettings = {
  baseFontSize: 16,
  positionBottom: 6,
  displayDebugInfo: true,
  displayTimeDate: true,
  dateTimeFormat: DATE_TIME_FORMAT.ISO,
  staticWallpaper: '',
  changeFrequencyMinutes: 30,
  clicksToChange: 2,
};
