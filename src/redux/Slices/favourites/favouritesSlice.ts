import { createSlice } from "@reduxjs/toolkit";
import { FavouriteItem, FavouritesState } from "@/types/favourite.types";

// Load favourites from localStorage based on user's email
const loadFavouritesFromStorage = (email: string): FavouritesState => {
	if (typeof window !== "undefined") {
		// Get all favourites from localStorage
		const allFavourites = JSON.parse(
			localStorage.getItem("favourites") || "[]",
		);
		// Find the favourites for this specific email
		const userFavourites = allFavourites.find(
			(favourites: FavouritesState) => favourites.email === email,
		);
		if (userFavourites) {
			return userFavourites;
		}
	}
	return {
		email: email,
		favouriteItems: [],
	};
};

// Save favourites to localStorage
const saveFavouritesToStorage = (favouritesState: FavouritesState) => {
	if (typeof window !== "undefined" && favouritesState.email) {
		// Get all existing favourites
		const allFavourites = JSON.parse(
			localStorage.getItem("favourites") || "[]",
		);
		// Find if favourites for this email already exists
		const existingFavouritesIndex = allFavourites.findIndex(
			(favourites: FavouritesState) =>
				favourites.email === favouritesState.email,
		);

		if (existingFavouritesIndex !== -1) {
			// Update existing favourites
			allFavourites[existingFavouritesIndex] = favouritesState;
		} else {
			// Add new favourites
			allFavourites.push(favouritesState);
		}
		// Save back to localStorage
		localStorage.setItem("favourites", JSON.stringify(allFavourites));
	}
};

const initialState: FavouritesState = {
	email: "",
	favouriteItems: [],
};

const favouritesSlice = createSlice({
	name: "favourites",
	initialState,
	reducers: {
		// Load user's favourites into Redux when they login
		loadUserFavourites: (state, action: { payload: string }) => {
			const userFavourites = loadFavouritesFromStorage(action.payload);
			state.email = userFavourites.email;
			state.favouriteItems = userFavourites.favouriteItems;
		},
		addToFavourites: (state, action: { payload: FavouriteItem }) => {
			// If item already exists in favourites, do not add again
			const existingItem = state.favouriteItems.find(
				(item) => item.product.id === action.payload.product.id,
			);
			// If not exists, add to favourites
			if (!existingItem) {
				state.favouriteItems.push(action.payload);
				saveFavouritesToStorage(state);
			}
		},
		// Only ItemID needed to remove item from favourites
		removeFromFavourites: (state, action: { payload: number }) => {
			state.favouriteItems = state.favouriteItems.filter(
				(item) => item.product.id !== action.payload,
			);
			saveFavouritesToStorage(state);
		},
		// Toggle favourite status
		toggleFavourite: (state, action: { payload: FavouriteItem }) => {
			const existingItem = state.favouriteItems.find(
				(item) => item.product.id === action.payload.product.id,
			);
			if (existingItem) {
				// Remove from favourites
				state.favouriteItems = state.favouriteItems.filter(
					(item) => item.product.id !== action.payload.product.id,
				);
			} else {
				// Add to favourites
				state.favouriteItems.push(action.payload);
			}
			saveFavouritesToStorage(state);
		},
		// Clear all favourites
		clearFavourites: (state) => {
			state.favouriteItems = [];
			saveFavouritesToStorage(state);
		},
	},
});

export const {
	loadUserFavourites,
	addToFavourites,
	removeFromFavourites,
	toggleFavourite,
	clearFavourites,
} = favouritesSlice.actions;
export default favouritesSlice.reducer;
