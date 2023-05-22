const calculateOrderAmount = (items) => {
  let total = 0;
  const shipping = 50;
  let vat = 0;
  let grandTotal = 0;

  items.forEach((item) => {
    const { products, quantity } = item;
    const { price } = products;

    const currentProductTotal = price * quantity;

    total += currentProductTotal;
  });

  vat = total * 0.2;

  grandTotal = shipping + total;

  return { grandTotal, vat, total, shipping };
};

module.exports = calculateOrderAmount;
