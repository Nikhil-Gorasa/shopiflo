import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/auth/authSlice";
import cartReducer from "./Slices/cart/cartSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
