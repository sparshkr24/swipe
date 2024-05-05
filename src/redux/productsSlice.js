import { createSlice } from "@reduxjs/toolkit";
import { dummyProducts } from "../data/products";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [...dummyProducts],
    editItemId: null
  },
  reducers: {
    addProduct: (state, action) => {
      const { newProduct } = action.payload;
      return {
        ...state,
        data: [
          ...state.data, 
          newProduct
        ]
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
      const { updatedProduct } = action.payload;
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
    
      return state;
    },
    updateEditState: (state, action) => {
      const { value } = action.payload;

      // If one item is already in edit state, can't edit another item
      if( value && state.editItemId ) return state
    
      return {
        ...state,
        editItemId: value
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
