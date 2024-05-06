import { useSelector } from "react-redux";

import { selectInvoiceModalData } from "./invoiceModalSlice";
import { selectInvoiceList } from "./invoicesSlice";
import { selectProductList } from "./productsSlice";

export const useInvoiceListData = () => {
  const invoiceList = useSelector(selectInvoiceList);
  const { getProductById } = useProductListData();

  const getOneInvoice = ({ invoiceId }) => {
    invoiceId = parseInt(invoiceId);
    return invoiceList.find(
      (invoice) => invoice.id === invoiceId
    ) || null;
  };  

  const getAllProductsByInvoiceId = ({ invoiceId }) => {
    const { products: invoiceProducts } = getOneInvoice({ invoiceId }) || {}
    const allProducts = invoiceProducts?.map(({ id, quantity }) => {
      const productFromStore = getProductById({ productId: id });
      if (productFromStore) {
        return {
          ...productFromStore,
          quantity
        };
      }
      
      return null;
    }).filter(product => product !== null);

    return allProducts || []
  }

  const listSize = invoiceList.length;

  return {
    invoiceList,
    getOneInvoice,
    getAllProductsByInvoiceId,
    listSize,
  };
};

export const useProductListData = () => {
  const { data: productList, editItemId } = useSelector(selectProductList);

  const getProductById = ({ productId }) => {
    return (
      productList.find(
        (product) => product.id === productId
      ) || null
    )
  }

  const len =  productList.length;
  const isProductListEmpty = len === 0;
  const lastProductId = productList[len-1]?.id
  
  return {
    productList,
    getProductById,
    lastProductId,
    editItemId,
    isProductListEmpty,
  };
};

export const useInvoiceModalData = () => {
  const { isOpen, invoice, items } = useSelector(selectInvoiceModalData);
  const { getAllProductsByInvoiceId } = useInvoiceListData()

  const itemsFromInvoice = getAllProductsByInvoiceId({ invoiceId: invoice?.id })
  
  return {
    isOpen,
    invoice,
    items: items || itemsFromInvoice
  };
};