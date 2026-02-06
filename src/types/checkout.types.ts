export interface CheckoutState {
	email: string;
	shippingAddress: ShippingAddress | null;
	paymentDetails: PaymentDetails | null;
}

export interface ShippingAddress {
	firstName: string;
	lastName: string;
	address: string;
	apartment?: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
	countryCode: string;
	phone: string;
	email: string;
}

export interface PaymentDetails {
	cardName: string;
	cardNumber: string;
	expiry: string;
	cvv: string;
}
