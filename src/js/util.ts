/**
 * Wallhaven Extended V2 - Utility Functions
 * By: Erik Welander (erik.welander@hotmail.com)
 */

/**
 * Waits until a function hasn't been called for a specified delay before executing it.
 * @param {Function} callback The function to execute
 * @param {number} delay The number of ms to wait after the last trigger before execution
 * @returns {Function} A debounced version of the original function
 */
export const debounce = <T extends unknown[]>(callback: (...args: T) => void, delay: number) => {
  let timeoutTimer: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    clearTimeout(timeoutTimer);

    timeoutTimer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
