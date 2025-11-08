/**
 * Wallhaven Extended V2 - Wallhaven wallpaper functions
 * By: Erik Welander (erik.welander@hotmail.com)
 */
import { getBodyEl, getDebugStatusEl, getDebugWallPathEl, getWallPathPrevEl } from '../dom.js';
import { appSettings } from '../settings.js';
import { debounce } from '../util.js';
import { generateWallhavenApiUrl } from './util.js';
const bodyEl = getBodyEl();
const debugStatusEl = getDebugStatusEl();
const debugWallPathEl = getDebugWallPathEl();
const debugWallPathPrevEl = getWallPathPrevEl();
const wpeSettings = appSettings.wpeSettings;
const generateCssUrl = (wallpaperPath) => {
    if (wpeSettings.staticWallpaper) {
        return 'url("file://' + wallpaperPath + '")';
    }
    return 'url("' + wallpaperPath + '")';
};
const setWallpaper = (wallpaperPath) => {
    bodyEl.dataset.rawVal = wallpaperPath;
    const url = generateCssUrl(wallpaperPath);
    bodyEl.style.backgroundImage = url;
};
const changeWallpaper = () => {
    if (wpeSettings.staticWallpaper) {
        const wallpaperPath = wpeSettings.staticWallpaper;
        // This wallpaper is already set
        if (bodyEl.dataset.rawVal === wallpaperPath) {
            return;
        }
        setWallpaper(wallpaperPath);
        return;
    }
    if (debugWallPathEl.innerText) {
        debugWallPathPrevEl.innerText = 'Prev: ' + debugWallPathEl.innerText.substring('Current: '.length);
    }
    debugWallPathEl.innerText = '';
    const url = generateWallhavenApiUrl();
    debugStatusEl.innerText = url;
    fetch(url)
        .then((response) => {
        if (!response.ok) {
            debugStatusEl.innerText = 'Error: ' + response.statusText + ': ' + url;
            return;
        }
        response
            .json()
            .then((json) => {
            if (!json.data || json.data.length === 0) {
                debugStatusEl.innerText = 'Error: No data found in response. Lower the max page!';
                return;
            }
            const max = json.data.length - 1;
            const index = Math.floor(Math.random() * max) + 1;
            const wallpaperPage = json.data[index].url;
            const wallpaperPath = json.data[index].path;
            setWallpaper(wallpaperPath);
            debugWallPathEl.innerText = 'Current: ' + wallpaperPage;
        })
            .catch((error) => {
            debugStatusEl.innerText = 'Error: ' + error.message + ': ' + url;
        });
    })
        .catch((error) => {
        debugStatusEl.innerText = 'Error: ' + error.message + ': ' + url;
    });
};
export const debouncedChangeWallpaper = debounce(changeWallpaper, 1000);
let switchWallpaperInterval;
export const setSwitchWallpaperInterval = (intervalMs) => {
    if (switchWallpaperInterval) {
        clearInterval(switchWallpaperInterval);
    }
    if (intervalMs > 0) {
        switchWallpaperInterval = setInterval(() => {
            if (switchWallpaperInterval) {
                debouncedChangeWallpaper();
            }
        }, intervalMs);
    }
};
let clickToChangeTimeout;
export const addSwitchWallpaperClickListener = () => {
    // The amount of time to wait before resetting the click count
    const desktopTimeoutMs = 300;
    // The amount of times clicked within the timeout
    let desktopClickedTimes = 0;
    window.addEventListener('click', (event) => {
        if (clickToChangeTimeout) {
            clearTimeout(clickToChangeTimeout);
        }
        if (wpeSettings.clicksToChange < 1) {
            return;
        }
        if (++desktopClickedTimes >= wpeSettings.clicksToChange) {
            desktopClickedTimes = 0;
            debouncedChangeWallpaper();
            return;
        }
        clickToChangeTimeout = setTimeout(() => {
            desktopClickedTimes = 0;
        }, desktopTimeoutMs);
    });
};
