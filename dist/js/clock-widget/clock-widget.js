/**
 * Wallhaven Extended V2 - The clock widget.
 * This represents the clock shown on top of the Calendar widget.
 * By: Erik Welander (erik.welander@hotmail.com)
 */
import { getClockWidgetTimeEl } from '../dom.js';
import { appSettings } from '../settings.js';
import { DATE_TIME_FORMAT } from '../constants.js';
const timeEl = getClockWidgetTimeEl();
const getTimeString = () => {
    const now = new Date();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    if (appSettings.wpeSettings.dateTimeFormat === DATE_TIME_FORMAT.ISO) {
        const hours24 = String(now.getHours()).padStart(2, '0');
        return `${hours24}:${minutes}`;
    }
    // 24h (ISO) vs 12h (US) formatting
    let hours12 = now.getHours() % 12;
    if (hours12 === 0) {
        hours12 = 12; // midnight or noon edge case
    }
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours12}:${minutes} ${ampm}`;
};
const updateTime = () => {
    timeEl.innerText = getTimeString();
};
let lastTime = '';
let updateClockInterval = null;
export const setUpdateClockInterval = (intervalMs) => {
    lastTime = getTimeString();
    updateTime();
    if (updateClockInterval) {
        clearInterval(updateClockInterval);
    }
    if (intervalMs > 0) {
        updateClockInterval = setInterval(() => {
            const currentTime = getTimeString();
            if (currentTime === lastTime) {
                return;
            }
            lastTime = currentTime;
            updateTime();
        }, intervalMs);
    }
};
