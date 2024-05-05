import { combineReducers } from "@reduxjs/toolkit";
import invoicesReducer from "./invoicesSlice"; // Import your other reducers
import invoiceModalReducer from "./invoiceModal";
import productsReducer from "./productsSlice"

const rootReducer = combineReducers({
  invoices: invoicesReducer,
  invoiceModal: invoiceModalReducer,
  products: productsReducer
});

export default rootReducer;
