"use client";

import { useForm } from "react-hook-form";
import { login } from "@/redux/Slices/auth/authThunk";
import { useAppDispatch } from "@/hooks/reduxhooks";
import { loadUserCart } from "@/redux/Slices/cart/cartSlice";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginData } from "@/types/auth.types";

export default function Page() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [SignupButton, setSignupButton] = useState(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginData>();

	const onSubmit = async (data: LoginData) => {
		console.log("Login data:", data);

		try {
			await dispatch(
				login({ email: data.email, password: data.password }),
			).unwrap();
			router.replace("/dashboard/products?category=all");
			// Load user cart after successful login
			dispatch(loadUserCart(data.email));
		} catch (error) {
			console.log("No such user found, Please sign up", error);

			setSignupButton(true);
			reset();
		}
	};

	return (
		<div className="flex items-center justify-center w-full h-screen bg-primary">
			{/* Card */}
			<div className="w-full max-w-sm p-8 shadow-lg login bg-ui-card rounded-xl">
				{/* Logo */}
				<div className="mb-6 text-2xl font-bold text-center text-primary">
					Shopiflo
				</div>
				{/* Form */}
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4">
					<div>
						<label className="p-2 font-bold text-primary">
							Email:
						</label>
						<input
							type="email"
							placeholder="Email"
							{...register("email", {
								required: "Email is required",
							})}
							className="w-full px-4 py-2 border rounded-lg border-ui-border text-primary-light"
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-status-error">
								{errors.email.message as string}
							</p>
						)}
					</div>
					<div>
						<label className="p-2 font-bold text-primary">
							Password:
						</label>
						<input
							type="password"
							placeholder="Password"
							{...register("password", {
								required: "Password is required",
							})}
							className="w-full px-4 py-2 border rounded-lg border-ui-border text-primary-light"
						/>
						{errors.password && (
							<p className="mt-1 text-sm text-status-error">
								{errors.password.message as string}
							</p>
						)}
					</div>
					<button
						type="submit"
						className="w-full px-4 py-3 font-medium text-white transition rounded-lg bg-primary hover:bg-primary-dark">
						Login
					</button>
					{SignupButton && (
						<>
							<p className="mt-2 text-status-error">
								Please Sign up to create your account
								<Link
									href="/sign-up"
									className="mt-2 ml-2 underline text-status-error">
									Sign Up
								</Link>
							</p>
						</>
					)}
				</form>
			</div>
		</div>
	);
}
