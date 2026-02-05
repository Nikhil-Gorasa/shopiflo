"use client";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxhooks";
import { setSession } from "@/redux/Slices/auth/authSlice";
import { loadUserCart } from "@/redux/Slices/cart/cartSlice";
import { loadUserFavourites } from "@/redux/Slices/favourites/favouritesSlice";
import store from "../../redux/store";

function SessionInitializer() {
	const dispatch = useAppDispatch();

	useEffect(() => {
		// Check if user was previously logged in
		const savedAuth = localStorage.getItem("currentUser");
		if (savedAuth) {
			try {
				const authData = JSON.parse(savedAuth);
				dispatch(setSession({ email: authData.email }));
				dispatch(loadUserCart(authData.email));
				dispatch(loadUserFavourites(authData.email));
			} catch (error) {
				console.error("Error restoring session:", error);
				// If there's an error parsing, clear the invalid session data
				// TODO:
			}
		}
	}, [dispatch]);

	return null;
}

export default function ReduxProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Provider store={store}>
			<SessionInitializer />
			{children}
		</Provider>
	);
}
