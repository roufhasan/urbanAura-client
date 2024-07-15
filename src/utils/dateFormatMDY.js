import { format } from "date-fns";

// this funtion format date in this formart => Jul 13, 2024 [Month day, Year];
export const dateFormatMDY = (isoDate) => {
  const date = new Date(isoDate);
  return format(date, "MMM d, yyy");
};
