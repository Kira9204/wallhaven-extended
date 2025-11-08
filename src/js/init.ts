/**
 * Wallhaven Extended V2 - Main application Initialization
 * By: Erik Welander (erik.welander@hotmail.com)
 */

import { TWPEUserPropertiesEvent } from './types.js';
import { appSettings } from './settings.js';
import { debounce } from './util.js';
import {
  addSwitchWallpaperClickListener,
  debouncedChangeWallpaper,
  setSwitchWallpaperInterval,
} from './wallhaven/wallhaven.js';
import { getCssVarEl, getDebugTitleEl, showCalendarWidgetEl, showClockWidgetEl, showDebugInfoEl } from './dom.js';
import { WALLHAVEN_DEFAULT_SETTINGS, WPE_DEFAULT_SETTINGS } from './constants.js';
import { setUpdateClockInterval } from './clock-widget/clock-widget.js';
import { setUpdateCalendarInterval } from './calendar-widget/calendar-widget.js';

const cssVarEl = getCssVarEl();
const titleEl = getDebugTitleEl();
const wpeSettings = appSettings.wpeSettings;
const wallhavenSettings = appSettings.wallhavenSettings;

const startApp = () => {
  titleEl.innerText = 'Wallhaven Extended v2';
  cssVarEl.style.setProperty('--base-font-size', wpeSettings.baseFontSize + 'px');
  cssVarEl.style.setProperty('--bottom-position', wpeSettings.positionBottom + '%');
  showDebugInfoEl(wpeSettings.displayDebugInfo);

  setSwitchWallpaperInterval(wpeSettings.changeFrequencyMinutes * 60 * 1000);
  addSwitchWallpaperClickListener();

  showClockWidgetEl(wpeSettings.displayTimeDate);
  setUpdateClockInterval(wpeSettings.displayTimeDate ? 1000 : 0);

  showCalendarWidgetEl(wpeSettings.displayTimeDate);
  setUpdateCalendarInterval(wpeSettings.displayTimeDate ? 60 * 1000 : 0);
};

const debouncedStartApp = debounce(startApp, 1000);
const applyUserProperties = (properties: TWPEUserPropertiesEvent) => {
  if (properties.wpe_baseFontSize) {
    const value = properties.wpe_baseFontSize.value;
    if (value === '') {
      wpeSettings.baseFontSize = WPE_DEFAULT_SETTINGS.baseFontSize;
    } else if (!isNaN(Number(value))) {
      wpeSettings.baseFontSize = Number(value);
    } else {
      wpeSettings.baseFontSize = WPE_DEFAULT_SETTINGS.baseFontSize;
    }
  }
  if (properties.wpe_positionBottom) {
    const value = properties.wpe_positionBottom.value;
    if (value === '') {
      wpeSettings.positionBottom = WPE_DEFAULT_SETTINGS.positionBottom;
    } else if (!isNaN(Number(value))) {
      wpeSettings.positionBottom = Number(value);
    } else {
      wpeSettings.positionBottom = WPE_DEFAULT_SETTINGS.positionBottom;
    }
  }
  if (properties.wpe_debugInfo) {
    wpeSettings.displayDebugInfo = properties.wpe_debugInfo.value;
  }
  if (properties.wpe_displayTimeDate) {
    wpeSettings.displayTimeDate = properties.wpe_displayTimeDate.value;
  }
  if (properties.wpe_dateTimeFormat) {
    wpeSettings.dateTimeFormat = properties.wpe_dateTimeFormat.value;
  }
  if (properties.wpe_staticWallpaper) {
    wpeSettings.staticWallpaper = properties.wpe_staticWallpaper.value;
    debouncedChangeWallpaper();
  }
  if (properties.wpe_changeFrequencyMinutes) {
    const value = properties.wpe_changeFrequencyMinutes.value;
    if (value === '') {
      wpeSettings.changeFrequencyMinutes = 0;
    } else if (!isNaN(Number(value))) {
      wpeSettings.changeFrequencyMinutes = Number(value);
    } else {
      wpeSettings.changeFrequencyMinutes = 0;
    }
  }
  if (properties.wpe_clicksToChange) {
    const value = properties.wpe_clicksToChange.value;
    if (value === '') {
      wpeSettings.clicksToChange = 0;
    } else if (!isNaN(Number(value))) {
      wpeSettings.clicksToChange = Number(value);
    } else {
      wpeSettings.clicksToChange = 0;
    }
  }
  if (properties.wh_search) {
    wallhavenSettings.search = properties.wh_search.value;
    debouncedChangeWallpaper();
  }
  if (properties.wh_sortBy) {
    wallhavenSettings.sorting.sortBy = properties.wh_sortBy.value;
    debouncedChangeWallpaper();
  }
  if (properties.wh_sortByAge) {
    wallhavenSettings.sorting.sortByAge = properties.wh_sortByAge.value;
    debouncedChangeWallpaper();
  }
  if (properties.wh_maxRandomPage) {
    const value = properties.wh_maxRandomPage.value;
    if (value === '') {
      wallhavenSettings.sorting.maxPage = WALLHAVEN_DEFAULT_SETTINGS.sorting.maxPage;
    } else if (!isNaN(Number(value))) {
      wallhavenSettings.sorting.maxPage = Number(value);
    } else {
      wallhavenSettings.sorting.maxPage = WALLHAVEN_DEFAULT_SETTINGS.sorting.maxPage;
    }
  }
  if (properties.wh_categoryGeneral) {
    wallhavenSettings.category.general = properties.wh_categoryGeneral.value;
    debouncedChangeWallpaper();
  }
  if (properties.wh_categoryPeople) {
    wallhavenSettings.category.people = properties.wh_categoryPeople.value;
    debouncedChangeWallpaper();
  }
  if (properties.wh_categoryAnime) {
    wallhavenSettings.category.anime = properties.wh_categoryAnime.value;
    debouncedChangeWallpaper();
  }
  if (properties.wh_puritySfw) {
    wallhavenSettings.purity.sfw = properties.wh_puritySfw.value;
    debouncedChangeWallpaper();
  }
  if (properties.wh_puritySketchy) {
    wallhavenSettings.purity.sketchy = properties.wh_puritySketchy.value;
    debouncedChangeWallpaper();
  }
  if (properties.wh_purityNsfw) {
    wallhavenSettings.purity.nsfw = properties.wh_purityNsfw.value;
    debouncedChangeWallpaper();
  }
  if (properties.wh_purityNsfwApiKey) {
    wallhavenSettings.purity.nsfwApiKey = properties.wh_purityNsfwApiKey.value;
    debouncedChangeWallpaper();
  }
  if (properties.wh_wallpaperPropertySize) {
    wallhavenSettings.size.minimumDimensions = properties.wh_wallpaperPropertySize.value;
    debouncedChangeWallpaper();
  }
  if (properties.wh_wallpaperPropertyRatio) {
    wallhavenSettings.size.ratio = properties.wh_wallpaperPropertyRatio.value;
    debouncedChangeWallpaper();
  }

  debouncedStartApp();
};

document.addEventListener('DOMContentLoaded', () => {
  // @ts-ignore
  window.wallpaperPropertyListener = {
    applyUserProperties: applyUserProperties,
  };
  debouncedStartApp();
});
