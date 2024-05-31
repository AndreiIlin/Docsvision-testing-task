export const isCountValid = (count: string) => {
  if (/^\d+$/.test(count)) {
    return parseInt(count, 10) > 0;
  }

  return false;
};
