/**
 * Wallhaven Extended V2 - DOM Operation utility functions
 * By: Erik Welander (erik.welander@hotmail.com)
 */

export const getCssVarEl = (): HTMLElement => {
  return document.querySelector(':root') as HTMLElement;
};
export const getBodyEl = (): HTMLBodyElement => {
  return document.querySelector('body') as HTMLBodyElement;
};
export const getDebugEl = (): HTMLElement => {
  return document.querySelector('#debug') as HTMLElement;
};
export const getDebugTitleEl = (): HTMLElement => {
  return document.querySelector('#debug-title') as HTMLElement;
};
export const getDebugStatusEl = (): HTMLElement => {
  return document.querySelector('#debug-status') as HTMLElement;
};
export const getDebugWallPathEl = (): HTMLElement => {
  return document.querySelector('#debug-wallpaper-path') as HTMLElement;
};
export const getWallPathPrevEl = (): HTMLElement => {
  return document.querySelector('#debug-wallpaper-path-previous') as HTMLElement;
};

export const showDebugInfoEl = (show: boolean) => {
  const infoEl = getDebugEl();
  infoEl.style.visibility = show ? 'visible' : 'hidden';
};

export const getClockWidgetEl = (): HTMLElement => {
  return document.querySelector('#clock-widget') as HTMLElement;
};

export const showClockWidgetEl = (show: boolean) => {
  const clockEl = getClockWidgetEl();
  clockEl.style.visibility = show ? 'visible' : 'hidden';
};

export const getClockWidgetTimeEl = (): HTMLElement => {
  return document.querySelector('#clock-widget .time') as HTMLElement;
};

export const getCalendarWidgetEl = (): HTMLElement => {
  return document.querySelector('#calendar-widget') as HTMLElement;
};

export const showCalendarWidgetEl = (show: boolean) => {
  const calendarEl = getCalendarWidgetEl();
  calendarEl.style.visibility = show ? 'visible' : 'hidden';
};
