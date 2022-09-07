export const parseDate = (date: Date): string[] => {
  const split = date.toString().split("T");
  const yyyy_mm_dd = split[0];
  const time = split[1].split(".");
  const hh_mm_ss = time[0];

  return [yyyy_mm_dd, hh_mm_ss];
};
