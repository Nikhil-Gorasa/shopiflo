import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/auth/authSlice";
import cartReducer from "./Slices/cart/cartSlice";
import favouritesReducer from "./Slices/favourites/favouritesSlice";
const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
		favourites: favouritesReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
