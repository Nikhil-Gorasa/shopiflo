export interface LoginData {
	email: string;
	password: string;
}

export interface SignUpData {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export interface AuthState {
	isAuthenticated: boolean;
	user: string | null;
}
