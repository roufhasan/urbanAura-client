export const discountedPrice = (orginalPrice, discountPercentage) => {
  const offerPrice = orginalPrice - (orginalPrice * discountPercentage) / 100;

  if (Math.floor(offerPrice) !== offerPrice) {
    return offerPrice.toFixed(2);
  }
  return offerPrice;
};
