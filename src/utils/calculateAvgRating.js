export const calculateAvgRating = (reviews) => {
  if (reviews.length === 0) {
    return 0;
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const avgRating = totalRating / reviews.length;

  if (Math.floor(avgRating) !== avgRating) {
    return avgRating.toFixed(1);
  }
  return avgRating;
};
