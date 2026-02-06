import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/auth/authSlice";
import cartReducer from "./Slices/cart/cartSlice";
import favouritesReducer from "./Slices/favourites/favouritesSlice";
import checkoutReducer from "./Slices/checkout/checkoutSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		favourites: favouritesReducer,
		checkout: checkoutReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
