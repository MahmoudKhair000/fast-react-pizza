import { configureStore } from '@reduxjs/toolkit';
import userReducer from './featutes/user/userSlice';
import cartReducer from './featutes/cart/cartSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
