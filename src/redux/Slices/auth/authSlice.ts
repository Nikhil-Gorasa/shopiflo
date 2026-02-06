import { createSlice } from "@reduxjs/toolkit";
import { login, signup } from "./authThunk";
import { toast } from "react-hot-toast";

interface AuthState {
	isAuthenticated: boolean;
	user: string | null;
}

const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setSession(state, action) {
			state.isAuthenticated = true;
			state.user = action.payload.email;
		},
		// Logout Action
		clearSession(state) {
			state.isAuthenticated = false;
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.isAuthenticated = true;
				state.user = action.payload.email;
				toast.success("Login successful!");
			})
			.addCase(login.rejected, (state, action) => {
				// Display error to user in a user-friendly manner
				if (action.error.message === "INVALID_CREDENTIALS") {
					toast.error("Invalid credentials, Please try again");
				} else if (action.error.message === "NO_SUCH_USER") {
				}
				// Some internal Issue
				else {
					toast.error("Login failed, Please try again");
				}
			})
			.addCase(signup.fulfilled, () => {
				toast.success("Signup successful!");
			})
			.addCase(signup.rejected, (state, action) => {
				// Display error
				if (action.error.message === "USER_ALREADY_EXISTS") {
				} else {
					toast.error("Signup failed, Please try again");
				}
			});
	},
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
