import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { CartItem } from "../interfaces";
import { RootState } from "../store";

export interface CartState {
  cartItems: CartItem[];
}

const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error("Error loading cart from localStorage:", e);
    }
  }
  return [];
};

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeCart: (state) => {
      state.cartItems = loadCartFromLocalStorage();
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
  const existing = state.cartItems.find(item => item.id === action.payload.id);

  if (existing) {
    existing.qty += action.payload.qty;
  } else {
    state.cartItems.push(action.payload);
  }

  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  }
},  removeFromCart: (state, action: PayloadAction<number>) => {
      
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      }
    },

    decrement: (state, action: PayloadAction<number>) => {
  const item = state.cartItems.find(pr => pr.id === action.payload);
  if (item) {
    if (item.qty > 1) {
      item.qty--; 
    } else {
    
      state.cartItems = state.cartItems.filter(pr => pr.id !== action.payload);
    }
  }
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  }
},
    clearCart: (state) => {
      state.cartItems = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },
  },
});


const cartItemsSelector = (state: RootState) => state.cart.cartItems;

export const totalPriceSelector = createSelector(
  [cartItemsSelector],
  (cartItems) =>
    cartItems.reduce((total: number, curr: CartItem) => total + curr.qty * curr.price, 0)
);

export const productQtySelector = (productId: number) =>
  createSelector(
    [cartItemsSelector],
    (cartItems) => cartItems.find((pr) => pr.id === productId)?.qty
  );

export const { addToCart, decrement, clearCart, initializeCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
