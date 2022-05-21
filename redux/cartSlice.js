import { createSlice } from "@reduxjs/toolkit";

const cartslice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += 1;
            state.total += action.payload.price * action.payload.quantity;
        },
        emptyCart: (state) => {
            state.products.splice(0, state.products.length);
            state.quantity = 0;
        }, reset: (state) => {
            state = initialState;
        }
    }
});

export const { addProduct, emptyCart, reset } = cartslice.actions;
export default cartslice.reducer;