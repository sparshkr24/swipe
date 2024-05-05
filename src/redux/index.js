import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoicesSlice"; // Import your other reducers
import invoiceModalReducer from "./invoiceModalSlice";
import productsReducer from "./productsSlice"

const rootReducer = combineReducers({
  invoices: invoicesReducer,
  invoiceModal: invoiceModalReducer,
  products: productsReducer
});

export default rootReducer;
