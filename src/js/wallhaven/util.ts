/**
 * Wallhaven Extended V2 - Wallhaven Wallpaper utility functions
 * By: Erik Welander (erik.welander@hotmail.com)
 */

import { WALLHAVEN_API_URL, WALLHAVEN_RATIO, WALLHAVEN_SORT_BY, WALLHAVEN_SORT_BY_AGE } from '../constants.js';
import { appSettings } from '../settings.js';
const wallhavenSettings = appSettings.wallhavenSettings;

const WALLHAVEN_SEARCH_PARAM = {
  Sorting: 'sorting',
  Page: 'page',
  TopRange: 'topRange',
  Categories: 'categories',
  Purity: 'purity',
  AtLeast: 'atleast',
  Ratios: 'ratios',
  ApiKey: 'apikey',
  search: 'q',
} as const;

const setWallhavenSortByUrlParam = (url: URL) => {
  if (wallhavenSettings.sorting.sortBy !== WALLHAVEN_SORT_BY.None) {
    url.searchParams.set(WALLHAVEN_SEARCH_PARAM.Sorting, wallhavenSettings.sorting.sortBy);
  }
};
const setWallhavenPageUrlParam = (url: URL) => {
  if (wallhavenSettings.sorting.sortBy !== WALLHAVEN_SORT_BY.Random) {
    // If the sorting is not random, we set a random page number, but only if the maxPage is larger than 1
    if (wallhavenSettings.sorting.maxPage > 1) {
      const randomPage = Math.floor(Math.random() * wallhavenSettings.sorting.maxPage) + 1;
      url.searchParams.set(WALLHAVEN_SEARCH_PARAM.Page, String(randomPage));
    }
  }
};

const setWallhavenTopRangeUrlParam = (url: URL) => {
  if (
    wallhavenSettings.sorting.sortByAge !== WALLHAVEN_SORT_BY_AGE.None &&
    wallhavenSettings.sorting.sortBy === WALLHAVEN_SORT_BY.Toplist
  ) {
    url.searchParams.set(WALLHAVEN_SEARCH_PARAM.TopRange, wallhavenSettings.sorting.sortByAge);
  }
};

const setWallhavenCategoryUrlParam = (url: URL) => {
  let categoriesParam = '';
  categoriesParam += wallhavenSettings.category.general ? '1' : '0';
  categoriesParam += wallhavenSettings.category.anime ? '1' : '0';
  categoriesParam += wallhavenSettings.category.people ? '1' : '0';
  url.searchParams.set(WALLHAVEN_SEARCH_PARAM.Categories, categoriesParam);
};

const setWallhavenPurityUrlParam = (url: URL) => {
  let purityParam = '';
  purityParam += wallhavenSettings.purity.sfw ? '1' : '0';
  purityParam += wallhavenSettings.purity.sketchy ? '1' : '0';
  purityParam += wallhavenSettings.purity.nsfw && wallhavenSettings.purity.nsfwApiKey ? '1' : '0';
  url.searchParams.set(WALLHAVEN_SEARCH_PARAM.Purity, purityParam);
};

const setWallhavenMinDimensionsUrlParam = (url: URL) => {
  if (wallhavenSettings.size.minimumDimensions) {
    if (appSettings.wallhavenSettings.size.minimumDimensions.includes('x')) {
      url.searchParams.set(WALLHAVEN_SEARCH_PARAM.AtLeast, appSettings.wallhavenSettings.size.minimumDimensions);
    }
  }
};

const setWallhavenRatioUrlParam = (url: URL) => {
  if (wallhavenSettings.size.ratio !== WALLHAVEN_RATIO.None) {
    url.searchParams.set(WALLHAVEN_SEARCH_PARAM.Ratios, wallhavenSettings.size.ratio);
  }
};

const setWallhavenNsfwApiKeyUrlParam = (url: URL) => {
  if (wallhavenSettings.purity.nsfwApiKey) {
    url.searchParams.set('apikey', wallhavenSettings.purity.nsfwApiKey);
  }
};

export const generateWallhavenApiUrl = (): string => {
  let url = new URL(WALLHAVEN_API_URL);
  setWallhavenSortByUrlParam(url);
  setWallhavenPageUrlParam(url);
  setWallhavenTopRangeUrlParam(url);
  setWallhavenCategoryUrlParam(url);
  setWallhavenPurityUrlParam(url);
  setWallhavenMinDimensionsUrlParam(url);
  setWallhavenRatioUrlParam(url);
  setWallhavenNsfwApiKeyUrlParam(url);

  if (appSettings.wallhavenSettings.search) {
    url.searchParams.set('q', appSettings.wallhavenSettings.search);
    url.searchParams.delete('categories');
    url.searchParams.delete('purity');
    url.searchParams.delete('topRange');
  }

  return url.toString();
};
