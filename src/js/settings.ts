/**
 * Wallhaven Extended V2 - Application settings
 * By: Erik Welander (erik.welander@hotmail.com)
 */

import { WALLHAVEN_DEFAULT_SETTINGS, WPE_DEFAULT_SETTINGS } from './constants.js';
import { TAppSettings, TWallhavenSettings, TWPESettings } from './types.js';

const wallhavenSettings: TWallhavenSettings = {
  ...WALLHAVEN_DEFAULT_SETTINGS,
};
const wpeSettings: TWPESettings = {
  ...WPE_DEFAULT_SETTINGS,
};

export const appSettings: TAppSettings = {
  wallhavenSettings: wallhavenSettings,
  wpeSettings: wpeSettings,
};
