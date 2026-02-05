import { createSlice } from "@reduxjs/toolkit";

interface item {
	productId: number;
	quantity: number;
	price: number;
}

// Uniquely Identifying Carts with respect to email
interface CartState {
	email: string;
	cartItems: item[];
	totalPrice: number;
}

// Load cart from localStorage based on user's email
const loadCartFromStorage = (email: string): CartState => {
	if (typeof window !== "undefined") {
		// Get all carts from localStorage
		const allCarts = JSON.parse(localStorage.getItem("carts") || "[]");
		// Find the cart for this specific email
		const userCart = allCarts.find(
			(cart: CartState) => cart.email === email,
		);
		if (userCart) {
			return userCart;
		}
	}
	return {
		email: email,
		cartItems: [],
		totalPrice: 0,
	};
};

// Save cart to localStorage
const saveCartToStorage = (cartState: CartState) => {
	if (typeof window !== "undefined" && cartState.email) {
		// Get all existing carts
		const allCarts = JSON.parse(localStorage.getItem("carts") || "[]");
		// Find if cart for this email already exists
		const existingCartIndex = allCarts.findIndex(
			(cart: CartState) => cart.email === cartState.email,
		);

		if (existingCartIndex !== -1) {
			// Update existing cart
			allCarts[existingCartIndex] = cartState;
		} else {
			// Add new cart
			allCarts.push(cartState);
		}

		// Save back to localStorage
		localStorage.setItem("carts", JSON.stringify(allCarts));
	}
};

const initialState: CartState = {
	email: "",
	cartItems: [],
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		// Load user's cart when they login
		loadUserCart: (state, action: { payload: string }) => {
			const userCart = loadCartFromStorage(action.payload);
			state.email = userCart.email;
			state.cartItems = userCart.cartItems;
			state.totalPrice = userCart.totalPrice;
		},
		addToCart: (state, action: { payload: item }) => {
			// Check if item already exists in cart
			const existingItem = state.cartItems.find(
				(item) => item.productId === action.payload.productId,
			);
			// if yes , then increment quantity
			if (existingItem) {
				existingItem.quantity += action.payload.quantity;
				state.totalPrice +=
					action.payload.price * action.payload.quantity;
			} else {
				state.cartItems.push(action.payload);
				state.totalPrice +=
					action.payload.price * action.payload.quantity;
			}
			saveCartToStorage(state);
		},
		// Only ItemID needed to remove item from cart
		removeFromCart: (state, action: { payload: number }) => {
			const itemToRemove = state.cartItems.find(
				(item) => item.productId === action.payload,
			);
			if (itemToRemove) {
				state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
				state.cartItems = state.cartItems.filter(
					(item) => item.productId !== action.payload,
				);
			}
			saveCartToStorage(state);
		},
		// Calculate Total Price based on cart items and their quantity
		calculateTotalPrice: (state, action: { payload: item }) => {
			const { productId, price } = action.payload;
			const item = state.cartItems.find(
				(item) => item.productId === productId,
			);
			if (item) {
				state.totalPrice += price * item.quantity;
			}
		},
		// Increase Quantity of an item in cart
		increaseQuantity: (state, action: { payload: number }) => {
			const item = state.cartItems.find(
				(item) => item.productId === action.payload,
			);
			if (item) {
				item.quantity += 1;
				// Update Price
				state.totalPrice += item.price;
			}
			saveCartToStorage(state);
		},
		// Decrease Quantity of an item in cart
		decreaseQuantity: (state, action: { payload: number }) => {
			const item = state.cartItems.find(
				(item) => item.productId === action.payload,
			);
			if (item && item.quantity > 1) {
				item.quantity -= 1;
				// Update Price
				state.totalPrice -= item.price;
			} else if (item) {
				// If quantity is 1, remove item from cart
				state.totalPrice -= item.price;
				state.cartItems = state.cartItems.filter(
					(item) => item.productId !== action.payload,
				);
			}
			saveCartToStorage(state);
		},
		// Clear Cart
		clearCart: (state) => {
			state.cartItems = [];
			state.totalPrice = 0;
			saveCartToStorage(state);
		},
	},
});

export const {
	loadUserCart,
	addToCart,
	removeFromCart,
	increaseQuantity,
	decreaseQuantity,
	clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
