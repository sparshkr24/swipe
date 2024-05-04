import { createSlice } from "@reduxjs/toolkit";
import { dummyProducts } from "../data/products";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [...dummyProducts],
    isEditingOn: null
  },
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

      return {
        ...state,
        data: [...state.data, newProduct]
      }
    },
    deleteProduct: (state, action) => {
      const updatedData = state.data.filter((product) => product.id !== action.payload.id);

      return {
        ...state,
        data: updatedData
      }
    },
    updateProduct: (state, action) => {      
      const updatedProduct = action.payload;
      console.log("updatedProduct: ", updatedProduct);
      const index = state.data.findIndex((product) => product.id === updatedProduct.id);

      if (index !== -1) {
        // Update the product in the array without mutating it
        const updatedData = [...state.data];
        updatedData[index] = updatedProduct;
    
        return {
          ...state,
          data: updatedData
        };
      }
    
      return state; // Return the unchanged state if product not found
    },
    updateEditState: (state, action) => {
      const { value } = action.payload;

      return {
        ...state,
        isEditingOn: value
      }
    }
  },
});

export const {
  addProduct,
  deleteProduct,
  updateProduct,
  updateEditState,
} = productsSlice.actions;

export const selectProductList = (state) => state.products;

export default productsSlice.reducer;
