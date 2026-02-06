"use client";
import { useForm } from "react-hook-form";
import { signup } from "../../redux/Slices/auth/authThunk";
import { useAppDispatch } from "../../hooks/reduxhooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { SignUpData } from "@/types/auth.types";

export default function Page() {
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
		<div className="flex items-center justify-center h-screen bg-primary">
			<div className="w-full max-w-md p-8 border shadow-lg bg-ui-card rounded-xl border-ui-border">
				<h2 className="mb-6 text-2xl font-bold text-center text-primary">
					Sign Up
				</h2>
				<form
					className="flex flex-col gap-4"
					onSubmit={handleSubmit(onSubmitHandler)}>
					<div>
						<label className="p-2 font-bold text-primary">
							First Name:
						</label>
						<input
							type="text"
							className="w-full p-2 text-black border rounded border-ui-border"
							{...register("firstname", {
								required: "First name is required",
							})}
						/>
						{errors.firstname?.message && (
							<span className="text-status-error">
								{errors.firstname.message as string}
							</span>
						)}
					</div>
					<div>
						<label className="p-2 font-bold text-primary">
							Last Name:
						</label>
						<input
							type="text"
							className="w-full p-2 text-black border rounded border-ui-border"
							{...register("lastname", {
								required: "Last name is required",
							})}
						/>
						{errors.lastname?.message && (
							<span className="text-status-error">
								{errors.lastname.message as string}
							</span>
						)}
					</div>
					<div>
						<label className="p-2 font-bold text-primary">
							Email:
						</label>
						<input
							type="email"
							className="w-full p-2 text-black border rounded border-ui-border"
							{...register("email", {
								required: "Email is required",
							})}
						/>
					</div>
					{errors.email?.message && (
						<span>{errors.email.message as string}</span>
					)}
					<div>
						<label className="p-2 font-bold text-primary">
							Password:
						</label>
						<input
							type="password"
							className="w-full p-2 text-black border rounded border-ui-border"
							{...register("password", {
								required: "Password is required",
							})}
						/>
						{errors.password?.message && (
							<span>{errors.password.message as string}</span>
						)}
					</div>
					<button
						type="submit"
						className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-primary-dark">
						Sign Up
					</button>
					{loginButton && (
						<p className="mt-2 text-status-error">
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
