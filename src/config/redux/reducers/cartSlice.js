import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        snackbarMessage: '',
        snackbarOpen: false,
    },
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.items.find(item => item.id === action.payload.id);

            if (existingProduct) {
                existingProduct.quantity += 1;
                state.snackbarMessage = 'Quantity increased!';
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                });
                state.snackbarMessage = 'Item added to cart!';
            }

            state.snackbarOpen = true;
        },
        deleteCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        increaseQuantity: (state, action) => {
            const product = state.items.find(item => item.id === action.payload.id);
            if (product) {
                product.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const product = state.items.find(item => item.id === action.payload.id);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            }
        },
        closeSnackbar: (state) => {
            state.snackbarOpen = false;
        },
    },
});

export const { addToCart, deleteCart, increaseQuantity, decreaseQuantity, closeSnackbar } = cartSlice.actions;
export default cartSlice.reducer;
