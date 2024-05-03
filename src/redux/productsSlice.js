import { createSlice } from "@reduxjs/toolkit";
import { dummyProducts } from "../data/products";

const productsSlice = createSlice({
  name: "products",
  initialState: [...dummyProducts],
  reducers: {
    addProduct: (state, action) => {
      const { name, desc, price } = action.payload;
      const lastProductId = state.length > 0 ? state[state.length - 1].id : 0;
      const newProduct = {
        id: lastProductId + 1,
        name,
        desc,
        price
      };

      return [...state, newProduct]
    },
    deleteProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.findIndex((product) => product.id === updatedProduct.id);
      if (index !== -1) {
        state[index] = updatedProduct;
      }
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct,
} = productsSlice.actions;

export const selectProductList = (state) => state.products;

export default productsSlice.reducer;
