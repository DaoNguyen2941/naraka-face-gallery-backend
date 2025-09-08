// src/utils/dayjs.ts
import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import * as timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const toVNTime = (date?: string | Date | number) => {
  return dayjs(date).tz("Asia/Ho_Chi_Minh");
};

export default dayjs;
