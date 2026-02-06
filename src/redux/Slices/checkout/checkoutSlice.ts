// Checkout Details Slice
import { createSlice } from "@reduxjs/toolkit";
import { CheckoutState, ShippingAddress } from "@/types/checkout.types";

const initialState: CheckoutState = {
	email: "",
	shippingAddress: null,
	paymentDetails: null,
};

const loadCheckoutFromStorage = (email: string): CheckoutState => {
	if (typeof window !== "undefined") {
		const allCheckouts = JSON.parse(
			localStorage.getItem("checkouts") || "[]",
		);
		const userCheckout = allCheckouts.find(
			(checkout: CheckoutState) => checkout.email === email,
		);
		if (userCheckout) {
			return userCheckout;
		}
	}
	return {
		email: email,
		shippingAddress: null,
		paymentDetails: null,
	};
};

const saveCheckoutToStorage = (checkoutState: CheckoutState) => {
	if (typeof window !== "undefined" && checkoutState.email) {
		const allCheckouts = JSON.parse(
			localStorage.getItem("checkouts") || "[]",
		);
		const existingCheckoutIndex = allCheckouts.findIndex(
			(checkout: CheckoutState) => checkout.email === checkoutState.email,
		);
		if (existingCheckoutIndex !== -1) {
			allCheckouts[existingCheckoutIndex] = checkoutState;
		} else {
			allCheckouts.push(checkoutState);
		}
		localStorage.setItem("checkouts", JSON.stringify(allCheckouts));
	}
};

const checkoutSlice = createSlice({
	name: "checkout",
	initialState,
	reducers: {
		loadUserCheckout: (state, action: { payload: string }) => {
			const userCheckout = loadCheckoutFromStorage(action.payload);
			state.email = userCheckout.email;
			state.shippingAddress = userCheckout.shippingAddress;
			state.paymentDetails = userCheckout.paymentDetails;
		},
		saveShippingAddress: (state, action: { payload: ShippingAddress }) => {
			state.shippingAddress = action.payload;
			state.email = action.payload.email;
			saveCheckoutToStorage(state);
		},
		savePaymentDetails: (state, action) => {
			state.paymentDetails = action.payload;
			saveCheckoutToStorage(state);
		},
		clearCheckoutData: (state) => {
			state.shippingAddress = null;
			state.paymentDetails = null;
			saveCheckoutToStorage(state);
		},
	},
});

export const {
	loadUserCheckout,
	saveShippingAddress,
	savePaymentDetails,
	clearCheckoutData,
} = checkoutSlice.actions;
export default checkoutSlice.reducer;
