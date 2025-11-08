/**
 * Wallhaven Extended V2 - Application settings
 * By: Erik Welander (erik.welander@hotmail.com)
 */
import { WALLHAVEN_DEFAULT_SETTINGS, WPE_DEFAULT_SETTINGS } from './constants.js';
const wallhavenSettings = {
    ...WALLHAVEN_DEFAULT_SETTINGS,
};
const wpeSettings = {
    ...WPE_DEFAULT_SETTINGS,
};
export const appSettings = {
    wallhavenSettings: wallhavenSettings,
    wpeSettings: wpeSettings,
};
