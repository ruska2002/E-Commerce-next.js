import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { CartItem, Product } from "../../../interfaces";
import { RootState } from "../store";

export interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const item = state.cartItems.find(pr => pr.product.id === action.payload.id);
            if (item) {
                item.qty += 1;
            } else {
                state.cartItems.push({ product: action.payload, qty: 1 });
            }
        },
        decrement: (state, action: PayloadAction<Product>) => {
            const item = state.cartItems.find(pr => pr.product.id === action.payload.id);
            if (item) {
                item.qty--;
                if (item.qty === 0) {
                    state.cartItems = state.cartItems.filter(pr => pr.product.id !== action.payload.id);
                }
            }
        }
    }
});

const cartItemsSelector = (state: RootState) => state.cart.cartItems;

export const totalPriceSelector = createSelector(
    [cartItemsSelector],
    (cartItems) => cartItems.reduce((total: number, curr: CartItem) => total + curr.qty * curr.product.price, 0)
);

export const productQtySelector = (productId: number) => createSelector(
    [cartItemsSelector],
    (cartItems) => cartItems.find(pr => pr.product.id === productId)?.qty
);

export const { addToCart, decrement } = cartSlice.actions;
export default cartSlice.reducer;
