"use client";
import { set, useForm } from "react-hook-form";
import { login, signup } from "../../redux/Slices/auth/authThunk";
import { useAppDispatch } from "../../hooks/reduxhooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

interface SignupFormData {
	username: string;
	email: string;
	password: string;
}

export default function Page() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [loginButton, setLoginButton] = useState(false);
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<SignupFormData>();

	const onSubmitHandler = async (data: SignupFormData) => {
		console.log("Signup Data : ", data);
		// If Successful clear the form
		try {
			const a = await dispatch(signup(data)).unwrap();
			console.log("Signup Success:", a);
			router.replace("/login");
		} catch (error) {
			if ((error as Error).message === "USER_ALREADY_EXISTS") {
				console.log("User already exists, Please login");
				setLoginButton(true);
			} else {
				console.log("Signup failed, Please try again");
			}
		} finally {
			reset();
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-primary">
			<div className="bg-ui-card shadow-lg rounded-xl p-8 w-full max-w-md border border-ui-border">
				<h2 className="text-2xl font-bold mb-6 text-primary text-center">
					Sign Up
				</h2>
				<form
					className="flex flex-col gap-4"
					onSubmit={handleSubmit(onSubmitHandler)}>
					<div>
						<label className="text-primary font-bold p-2">
							Username:
						</label>
						<input
							type="text"
							className="w-full p-2 border border-ui-border rounded text-black"
							{...register("username", {
								required: "Username is required",
							})}
						/>
					</div>
					{errors.username?.message && (
						<span>{errors.username.message as String}</span>
					)}
					<div>
						<label className="text-primary font-bold p-2">
							Email:
						</label>
						<input
							type="email"
							className="w-full p-2 border border-ui-border rounded text-black"
							{...register("email", {
								required: "Email is required",
							})}
						/>
					</div>
					{errors.email?.message && (
						<span>{errors.email.message as String}</span>
					)}
					<div>
						<label className="text-primary font-bold p-2">
							Password:
						</label>
						<input
							type="password"
							className="w-full p-2 border border-ui-border rounded text-black"
							{...register("password", {
								required: "Password is required",
							})}
						/>
						{errors.password?.message && (
							<span>{errors.password.message as String}</span>
						)}
					</div>
					<button
						type="submit"
						className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark">
						Sign Up
					</button>
					{loginButton && (
						<p className="text-status-error mt-2">
							User already exists. Please{" "}
							<Link
								href="/login"
								className="text-blue-500 underline">
								login here
							</Link>
							.
						</p>
					)}
				</form>
			</div>
		</div>
	);
}
