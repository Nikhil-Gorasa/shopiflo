"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/reduxhooks";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import {
	UserIcon,
	EnvelopeIcon,
	ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { clearSession } from "@/redux/Slices/auth/authSlice";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
	useProtectedRoute(); // Protect this route

	const router = useRouter();
	const dispatch = useAppDispatch();
	const [currentUser, setCurrentUser] = useState<{
		firstname?: string;
		lastname?: string;
		email?: string;
		username?: string;
	} | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// fetching user data from localStorage on component mount
	useEffect(() => {
		// Check localStorage only on client side
		const savedUser =
			typeof window !== "undefined"
				? localStorage.getItem("currentUser")
				: null;

		if (savedUser) {
			setCurrentUser(JSON.parse(savedUser));
			console.log("Current User:", JSON.parse(savedUser));
		}
		setIsLoading(false);
	}, []);

	const handleLogout = () => {
		// Clear all Redux state
		toast.success("Logged out successfully!");
		dispatch(clearSession());
		// Clear localStorage
		localStorage.removeItem("currentUser");
		// Redirect to login
		router.push("/login");
	};

	// Show loading state while checking authentication
	if (isLoading) {
		return (
			<div className="min-h-screen px-8 py-12 text-black bg-gray-100">
				<div className="flex flex-col items-center justify-center h-96">
					<div className="w-8 h-8 border-2 rounded-full border-primary border-t-transparent animate-spin"></div>
					<p className="mt-4 text-gray-600">Loading...</p>
				</div>
			</div>
		);
	}

	if (!currentUser) {
		return (
			<div className="min-h-screen px-8 py-12 text-black bg-gray-100">
				<div className="flex flex-col items-center justify-center h-96">
					<UserIcon className="w-16 h-16 mb-4 text-gray-400" />
					<h2 className="mb-2 text-2xl font-bold text-gray-600">
						Please Login to View Profile
					</h2>
					<p className="text-gray-500">
						You need to be logged in to access your profile.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen px-8 py-12 text-black bg-gray-100">
			<div className="max-w-4xl mx-auto">
				<h1 className="mb-8 text-3xl font-bold">My Profile</h1>

				{/* Profile Information Card */}
				<div className="p-8 mb-8 bg-white rounded-lg shadow-sm">
					<div className="flex items-center mb-6">
						<div className="flex items-center justify-center w-16 h-16 mr-4 rounded-full bg-primary/10">
							<UserIcon className="w-8 h-8 text-primary" />
						</div>
						<div>
							<h2 className="text-2xl font-semibold text-gray-900">
								Welcome back!
							</h2>
							<p className="text-gray-600">
								Manage your account information
							</p>
						</div>
					</div>

					{/* User Information */}
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{/* First Name */}
						<div className="p-4 border border-gray-200 rounded-lg">
							<div className="flex items-center mb-2">
								<UserIcon className="w-5 h-5 mr-2 text-gray-500" />
								<label className="text-sm font-medium text-gray-700">
									First Name
								</label>
							</div>
							<p className="text-lg font-semibold text-gray-900">
								{currentUser.firstname || "Not specified"}
							</p>
						</div>

						{/* Last Name */}
						<div className="p-4 border border-gray-200 rounded-lg">
							<div className="flex items-center mb-2">
								<UserIcon className="w-5 h-5 mr-2 text-gray-500" />
								<label className="text-sm font-medium text-gray-700">
									Last Name
								</label>
							</div>
							<p className="text-lg font-semibold text-gray-900">
								{currentUser.lastname || "Not specified"}
							</p>
						</div>

						{/* Email - Full Width */}
						<div className="p-4 border border-gray-200 rounded-lg md:col-span-2">
							<div className="flex items-center mb-2">
								<EnvelopeIcon className="w-5 h-5 mr-2 text-gray-500" />
								<label className="text-sm font-medium text-gray-700">
									Email Address
								</label>
							</div>
							<p className="text-lg font-semibold text-gray-900">
								{currentUser.email || "Not specified"}
							</p>
						</div>
					</div>
				</div>

				{/* Logout Section */}
				<div className="p-6 bg-white rounded-lg shadow-sm">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-lg font-semibold text-gray-900">
								Account Actions
							</h3>
							<p className="text-gray-600">
								Sign out of your account securely
							</p>
						</div>
						<button
							onClick={() => handleLogout()}
							className="flex items-center gap-2 px-6 py-3 text-white transition-all duration-200 bg-red-600 rounded-lg hover:bg-red-700 hover:shadow-lg">
							<ArrowRightOnRectangleIcon className="w-5 h-5" />
							Logout
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
