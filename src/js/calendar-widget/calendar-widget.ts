/**
 * Wallhaven Extended V2 - The calendar widget.
 * By: Erik Welander (erik.welander@hotmail.com)
 */

import { getCalendarWidgetEl } from '../dom.js';
import { appSettings } from '../settings.js';
import { DATE_TIME_FORMAT } from '../constants.js';

const calendarItemEl = getCalendarWidgetEl();

// Get week number depending on chosen week start.
// Monday start uses ISO-8601 week numbers.
// Sunday start uses a simplified US-style week number (weeks start Sunday; first week begins on Jan 1).
const getWeekNumber = (date: Date, mondayStart: boolean): number => {
  // ISO-8601 week number: weeks start Monday; first week is the one with the year's first Thursday
  if (mondayStart) {
    const target = new Date(date.valueOf());
    const dayNr = (target.getDay() + 6) % 7; // Monday=0
    target.setDate(target.getDate() - dayNr + 3); // Thursday of current week
    const jan4 = new Date(target.getFullYear(), 0, 4);
    const startOfYear = new Date(jan4.valueOf());
    const jan4DayNr = (jan4.getDay() + 6) % 7;
    startOfYear.setDate(jan4.getDate() - jan4DayNr + 3);
    const diffMs = target.getTime() - startOfYear.getTime();
    return 1 + Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
  }

  // US week number: weeks start Sunday; first week begins Jan 1 (partial week counts as week 1)
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  // Align startOfYear backward to previous Sunday to count partial start week as week 1.
  const startDay = startOfYear.getDay(); // 0=Sun
  startOfYear.setDate(startOfYear.getDate() - startDay); // previous (or same) Sunday
  const diffMs = date.getTime() - startOfYear.getTime();
  return 1 + Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
};

const drawCalendars = () => {
  const weekStartsOnMonday = appSettings.wpeSettings.dateTimeFormat === DATE_TIME_FORMAT.ISO;

  calendarItemEl.innerHTML = '';
  const today = new Date();

  // Draw calendars with the offset being the current month, and then the next two months.
  // You can also draw the previous months by settings a negative offset.
  for (let offset = 0; offset < 2; offset++) {
    const date = new Date(today.getFullYear(), today.getMonth() + offset, 1);
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-based
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
    // Determine index of first day in current header ordering.
    // For Monday-start we convert; for Sunday-start we keep as-is.
    const startDay = weekStartsOnMonday ? (firstDay + 6) % 7 : firstDay;

    // Create calendar wrapper
    const calendarDiv = document.createElement('div');
    calendarDiv.className = 'calendar';

    const monthName = date.toLocaleString('default', { month: 'long' });
    const dayHeaders = weekStartsOnMonday
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    calendarDiv.innerHTML = `<h3>${monthName}</h3>
      <table>
        <thead>
          <tr>
            <th class="week">Week</th>
            ${dayHeaders.map((h) => `<th>${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody></tbody>
      </table>`;

    const tbody = calendarDiv.querySelector('tbody') as HTMLTableSectionElement;
    let row = document.createElement('tr');
    let day = 1;

    // Add week number cell before the empty cells for the first week
    const emptyCellsWeekChildEl = document.createElement('td');
    emptyCellsWeekChildEl.textContent = String(getWeekNumber(new Date(year, month, day), weekStartsOnMonday));
    emptyCellsWeekChildEl.className = 'week';
    row.appendChild(emptyCellsWeekChildEl);

    // Empty cells before first day
    for (let i = 0; i < startDay; i++) {
      row.appendChild(document.createElement('td'));
    }

    // Fill the first week
    for (let i = startDay; i < 7; i++) {
      const cell = document.createElement('td');
      cell.textContent = String(day);

      // Check if this is today
      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      if (isToday) {
        cell.classList.add('today');
      }

      row.appendChild(cell);
      day++;
    }
    tbody.appendChild(row);

    // Fill remaining weeks
    while (day <= daysInMonth) {
      row = document.createElement('tr');

      // Add week number cell for the new row
      const weekEl = document.createElement('td');
      weekEl.textContent = String(getWeekNumber(new Date(year, month, day), weekStartsOnMonday));
      weekEl.className = 'week';
      row.appendChild(weekEl);

      // Add the days of the week
      for (let i = 0; i < 7 && day <= daysInMonth; i++) {
        const cell = document.createElement('td');
        cell.textContent = String(day);

        // Check if this is today
        const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        if (isToday) {
          cell.classList.add('today');
        }

        row.appendChild(cell);
        day++;
      }
      // Fill trailing empty cells if any
      while (row.children.length < 8) {
        // include week number cell already, ensure total columns = 8
        row.appendChild(document.createElement('td'));
      }
      tbody.appendChild(row);
    }

    calendarItemEl.appendChild(calendarDiv);
  }
};

const getDateString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  return `${year}-${month}-${day}`;
};

let lastDate = '';
let updateCalendarInterval: ReturnType<typeof setInterval> | null = null;
export const setUpdateCalendarInterval = (intervalMs: number) => {
  lastDate = getDateString();
  drawCalendars();

  if (updateCalendarInterval) {
    clearInterval(updateCalendarInterval);
  }

  if (intervalMs > 0) {
    updateCalendarInterval = setInterval(() => {
      const currentDate = getDateString();
      if (currentDate === lastDate) {
        return;
      }
      lastDate = currentDate;
      drawCalendars();
    }, intervalMs);
  }
};
