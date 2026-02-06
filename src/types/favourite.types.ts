import { Product } from "./product.types";

export interface FavouriteItem {
	product: Product;
	dateAdded?: string; // Optional ISO date string when item was added to favourites
}

export interface FavouritesState {
	email: string;
	favouriteItems: FavouriteItem[];
}
