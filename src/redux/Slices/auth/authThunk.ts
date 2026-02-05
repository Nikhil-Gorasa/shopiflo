import { createAsyncThunk } from "@reduxjs/toolkit";
import bcrypt from "bcryptjs";

interface LoginPayload {
	email: string;
	password: string;
}

interface SignupPayload {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export const login = createAsyncThunk(
	"auth/login",
	async (payload: LoginPayload) => {
		console.log("Entered Login Thunk");
		// Fetching LocalStorage data and verifying the user credentials
		const users = JSON.parse(localStorage.getItem("users") || "[]");
		// Check if user exists
		const user = users.find(
			(u: SignupPayload) => u.email === payload.email,
		);
		// If user found, verify password
		const passwordMatch = user
			? await bcrypt.compare(payload.password, user.password)
			: false;

		if (user && passwordMatch) {
			console.log("Found User in LocalStorage right pass");
			// Storing Current User Session
			localStorage.setItem("currentUser", JSON.stringify(user));
			// Reflecting current user to redux

			return {
				email: user.email,
			};
		} else if (user && !passwordMatch) {
			throw new Error("INVALID_CREDENTIALS");
		} else {
			console.log("No User Found in LocalStorage");
			throw new Error("NO_SUCH_USER");
		}
	},
);

export const signup = createAsyncThunk(
	"auth/signup",
	async (payload: SignupPayload) => {
		// Fetching LocalStorage data
		const users = JSON.parse(localStorage.getItem("users") || "[]");
		// Check if user email already exists
		const userExists = users.find(
			(u: SignupPayload) => u.email === payload.email,
		);
		if (userExists) {
			throw new Error("USER_ALREADY_EXISTS");
		}
		// Hash the password and store the new user if not exists
		else {
			const hashedPassword = await bcrypt.hash(payload.password, 10);
			localStorage.setItem(
				"users",
				JSON.stringify([
					...users,
					{
						...payload,
						password: hashedPassword,
					},
				]),
			);
			return {
				email: payload.email,
			};
		}
	},
);
