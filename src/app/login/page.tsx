"use client";

import { useForm } from "react-hook-form";
import { login } from "@/redux/Slices/auth/authThunk";
import { useAppDispatch } from "@/hooks/reduxhooks";
import { loadUserCart } from "@/redux/Slices/cart/cartSlice";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginData } from "@/types/auth.types";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
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
		<div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-primary via-primary-light to-accent-indigoSoft">
			{/* Decorative Background Elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute rounded-full w-96 h-96 bg-white/10 blur-3xl -top-20 -left-20"></div>
				<div className="absolute rounded-full w-96 h-96 bg-white/10 blur-3xl -bottom-20 -right-20"></div>
			</div>

			{/* Card */}
			<div className="relative z-10 w-full max-w-md p-10 m-4 shadow-2xl bg-ui-card rounded-3xl backdrop-blur-sm">
				{/* Logo & Header */}
				<div className="mb-8 text-center">
					<div className="flex items-center justify-center gap-3 pr-6 mb-2">
						<Image
							src="/shopiflo-icon.png"
							alt="Shopiflo Logo"
							width={40}
							height={40}
						/>
						<h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-primary to-primary-light bg-clip-text">
							Shopiflo
						</h1>
					</div>
					<p className="mt-2 text-sm text-text-muted">
						Welcome back! Please login to your account
					</p>
				</div>

				{/* Form */}
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-5">
					<div>
						<label className="block mb-2 text-sm font-semibold text-text-primary">
							Email Address
						</label>
						<input
							type="email"
							placeholder="Enter your email"
							{...register("email", {
								required: "Email is required",
							})}
							className="w-full px-4 py-3 transition border-2 text-text-primary rounded-xl border-ui-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-ui-bg"
						/>
						{errors.email && (
							<p className="flex items-center gap-1 mt-2 text-sm text-status-error">
								<ExclamationCircleIcon className="w-4 h-4" />
								{errors.email.message as string}
							</p>
						)}
					</div>

					<div>
						<label className="block mb-2 text-sm font-semibold text-text-primary">
							Password
						</label>
						<input
							type="password"
							placeholder="Enter your password"
							{...register("password", {
								required: "Password is required",
							})}
							className="w-full px-4 py-3 transition border-2 text-text-primary rounded-xl border-ui-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-ui-bg"
						/>
						{errors.password && (
							<p className="flex items-center gap-1 mt-2 text-sm text-status-error">
								<ExclamationCircleIcon className="w-4 h-4" />
								{errors.password.message as string}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full px-4 py-3.5 mt-2 font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-light hover:shadow-lg hover:shadow-primary/50 hover:scale-[1.02] active:scale-95">
						Sign In
					</button>

					{SignupButton && (
						<div className="p-4 mt-2 border-2 rounded-xl bg-status-error/5 border-status-error/20">
							<p className="text-sm text-center text-text-primary">
								No account found. Please{" "}
								<Link
									href="/sign-up"
									className="font-semibold transition-colors text-primary hover:text-primary-dark">
									create an account
								</Link>
							</p>
						</div>
					)}

					<div className="mt-4 text-sm text-center text-text-muted">
						Don't have an account?{" "}
						<Link
							href="/sign-up"
							className="font-semibold transition-colors text-primary hover:text-primary-dark">
							Sign Up
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
