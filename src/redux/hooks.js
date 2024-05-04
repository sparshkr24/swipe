import { useSelector } from "react-redux";
import { selectInvoiceList } from "./invoicesSlice";
import { selectProductList } from "./productsSlice";

export const useInvoiceListData = () => {
  const invoiceList = useSelector(selectInvoiceList);

  const getOneInvoice = (receivedId) => {
    return (
      invoiceList.find(
        (invoice) => invoice.id.toString() === receivedId.toString()
      ) || null
    );
  };

  const listSize = invoiceList.length;

  return {
    invoiceList,
    getOneInvoice,
    listSize,
  };
};

export const useProductListData = () => {
  const { data: productList, isEditingOn } = useSelector(selectProductList);

  const getProductsByIds = ({ productIds }) => {
    return (
      productList.map(
        (product) => productIds.contain(product.id)
      ) || null
    );
  };

  const isProductListEmpty = productList.length === 0;
  
  return {
    productList,
    getProductsByIds,
    isEditingOn,
    isProductListEmpty,
  };
};