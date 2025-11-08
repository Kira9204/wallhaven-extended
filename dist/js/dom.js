/**
 * Wallhaven Extended V2 - DOM Operation utility functions
 * By: Erik Welander (erik.welander@hotmail.com)
 */
export const getCssVarEl = () => {
    return document.querySelector(':root');
};
export const getBodyEl = () => {
    return document.querySelector('body');
};
export const getDebugEl = () => {
    return document.querySelector('#debug');
};
export const getDebugTitleEl = () => {
    return document.querySelector('#debug-title');
};
export const getDebugStatusEl = () => {
    return document.querySelector('#debug-status');
};
export const getDebugWallPathEl = () => {
    return document.querySelector('#debug-wallpaper-path');
};
export const getWallPathPrevEl = () => {
    return document.querySelector('#debug-wallpaper-path-previous');
};
export const showDebugInfoEl = (show) => {
    const infoEl = getDebugEl();
    infoEl.style.visibility = show ? 'visible' : 'hidden';
};
export const getClockWidgetEl = () => {
    return document.querySelector('#clock-widget');
};
export const showClockWidgetEl = (show) => {
    const clockEl = getClockWidgetEl();
    clockEl.style.visibility = show ? 'visible' : 'hidden';
};
export const getClockWidgetTimeEl = () => {
    return document.querySelector('#clock-widget .time');
};
export const getCalendarWidgetEl = () => {
    return document.querySelector('#calendar-widget');
};
export const showCalendarWidgetEl = (show) => {
    const calendarEl = getCalendarWidgetEl();
    calendarEl.style.visibility = show ? 'visible' : 'hidden';
};
