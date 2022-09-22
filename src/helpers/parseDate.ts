export const parseDate = (date: Date): string[] => {
  const split = date.toString().split("T");
  const yyyy_mm_dd = split[0];
  let time;
  let hh_mm_ss;
  if (split[1].includes(".")) {
    time = split[1].split(".");
    // hh_mm_ss = time.pop();
    hh_mm_ss = time[0];
  } else {
    time = split[1];
    hh_mm_ss = time.slice(0, time.length - 1);
  }
  // console.log(time);
  // time.slice(0, time.length - 1);
  // console.log(time[time.length - 1]);

  return [yyyy_mm_dd, hh_mm_ss];
};
