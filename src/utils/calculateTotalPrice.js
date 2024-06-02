export const calculateTotalPrice = (items) => {
  const totalPrice = items.reduce((acc, curr) => {
    return acc + curr.quantity * curr.price;
  }, 0);
  return totalPrice;
};
