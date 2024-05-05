export const calculateSubTotal = ({ items }) => {
  let subTotal = 0;
  items?.forEach((item) => {
    subTotal += parseFloat(item?.price).toFixed(2) * parseInt(item?.quantity);
  });
  return parseFloat(subTotal).toFixed(2);
};

export const calculateTaxAmount = ({ subTotal, taxRate }) => {
  return parseFloat(subTotal * (taxRate / 100)).toFixed(2);
};

export const calculateDiscount = ({ subTotal, discountRate }) => {
  return parseFloat(subTotal * (discountRate / 100)).toFixed(2);
};
