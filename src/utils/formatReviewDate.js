import { formatDistance } from "date-fns";

export const formatReviewDate = (isoDate) => {
  const date = new Date(isoDate);
  const formattedDistance = formatDistance(date, new Date(), {
    addSuffix: true,
  });

  return formattedDistance;
};
