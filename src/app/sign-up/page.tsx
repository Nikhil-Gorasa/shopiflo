"use client";
import { useForm } from "react-hook-form";
import { signup } from "../../redux/Slices/auth/authThunk";
import { useAppDispatch } from "../../hooks/reduxhooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { SignUpData } from "@/types/auth.types";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function Page() {
	useAuthRedirect(); // Redirect if already logged in

	const router = useRouter();
	const dispatch = useAppDispatch();
	const [loginButton, setLoginButton] = useState(false);
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm<SignUpData>();

	const onSubmitHandler = async (data: SignUpData) => {
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
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary via-primary-light to-accent-indigoSoft">
			{/* Decorative Background Elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute rounded-full w-96 h-96 bg-white/10 blur-3xl -top-20 -right-20"></div>
				<div className="absolute rounded-full w-96 h-96 bg-white/10 blur-3xl -bottom-20 -left-20"></div>
			</div>

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
						Create your account to get started
					</p>
				</div>

				<form
					className="flex flex-col gap-5"
					onSubmit={handleSubmit(onSubmitHandler)}>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block mb-2 text-sm font-semibold text-text-primary">
								First Name
							</label>
							<input
								type="text"
								placeholder="John"
								className="w-full px-4 py-3 transition border-2 text-text-primary rounded-xl border-ui-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-ui-bg"
								{...register("firstname", {
									required: "First name is required",
								})}
							/>
							{errors.firstname?.message && (
								<p className="flex items-center gap-1 mt-2 text-xs text-status-error">
									<ExclamationCircleIcon className="w-4 h-4" />
									{errors.firstname.message as string}
								</p>
							)}
						</div>

						<div>
							<label className="block mb-2 text-sm font-semibold text-text-primary">
								Last Name
							</label>
							<input
								type="text"
								placeholder="Doe"
								className="w-full px-4 py-3 transition border-2 text-text-primary rounded-xl border-ui-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-ui-bg"
								{...register("lastname", {
									required: "Last name is required",
								})}
							/>
							{errors.lastname?.message && (
								<p className="flex items-center gap-1 mt-2 text-xs text-status-error">
									<ExclamationCircleIcon className="w-4 h-4" />
									{errors.lastname.message as string}
								</p>
							)}
						</div>
					</div>

					<div>
						<label className="block mb-2 text-sm font-semibold text-text-primary">
							Email Address
						</label>
						<input
							type="email"
							placeholder="john.doe@example.com"
							className="w-full px-4 py-3 transition border-2 text-text-primary rounded-xl border-ui-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-ui-bg"
							{...register("email", {
								required: "Email is required",
							})}
						/>
						{errors.email?.message && (
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
							placeholder="Create a strong password"
							className="w-full px-4 py-3 transition border-2 text-text-primary rounded-xl border-ui-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-ui-bg"
							{...register("password", {
								required: "Password is required",
							})}
						/>
						{errors.password?.message && (
							<p className="flex items-center gap-1 mt-2 text-sm text-status-error">
								<ExclamationCircleIcon className="w-4 h-4" />
								{errors.password.message as string}
							</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full px-4 py-3.5 mt-2 font-semibold text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-primary to-primary-light hover:shadow-lg hover:shadow-primary/50 hover:scale-[1.02] active:scale-95">
						Create Account
					</button>

					{loginButton && (
						<div className="p-4 mt-2 border-2 rounded-xl bg-status-error/5 border-status-error/20">
							<p className="text-sm text-center text-text-primary">
								Account already exists. Please{" "}
								<Link
									href="/login"
									className="font-semibold transition-colors text-primary hover:text-primary-dark">
									sign in here
								</Link>
							</p>
						</div>
					)}

					<div className="mt-4 text-sm text-center text-text-muted">
						Already have an account?{" "}
						<Link
							href="/login"
							className="font-semibold transition-colors text-primary hover:text-primary-dark">
							Sign In
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}
