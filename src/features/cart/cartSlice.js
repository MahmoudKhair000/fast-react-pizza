import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      // payload = new item
      const newItem = action.payload;
      state.cart.push(newItem);
    },
    removeFromCart(state, action) {
      // payload = item to remove id
      const itemId = action.payload;
      state.cart = state.cart.filter((cartItem) => cartItem.pizzaId !== itemId);
    },
    increaseItemQuantity(state, action) {
      // payload = item to increase id
      const itemId = action.payload;
      const item = state.cart.find((cartItem) => cartItem.pizzaId === itemId);
      if (item && item.quantity) {
        item.quantity++;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    decreaseItemQuantity(state, action) {
      // payload = item to decrease id
      const itemId = action.payload;
      const item = state.cart.find((cartItem) => cartItem.pizzaId === itemId);
      if (item && item.quantity > 1) {
        item.quantity--;
        item.totalPrice = item.unitPrice * item.quantity;
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

/* All these functions are to be used as a callback function,
 *  for useSelector() 'react-redux' hook */
export const getCart = (state) => state.cart.cart;

export const getTotalCartCount = (state) =>
  state.cart.cart.reduce((count, item) => count + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((total, item) => total + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// Exorting the reducer itself as the default export
export default cartSlice.reducer;
