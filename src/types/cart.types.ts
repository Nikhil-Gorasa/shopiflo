export interface item {
	product: {
		id: number;
		title: string;
		description: string;
		image: string;
		price: number;
	};
	quantity: number;
}

export interface CartState {
	email: string;
	cartItems: item[];
	totalPrice: number;
}
