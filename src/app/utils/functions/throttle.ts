let timeout: unknown | null;

export default (callback: () => void, delay: number = 100) => {
  if (timeout) return;
  callback();
  timeout = setTimeout(() => {
    timeout = null;
  }, delay);
};
