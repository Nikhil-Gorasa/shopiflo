import React from "react";
import Link from "next/link";
import {
	EnvelopeIcon,
	PhoneIcon,
	MapPinIcon,
} from "@heroicons/react/24/outline";

import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mx-6 mb-6 text-white bg-gray-900 rounded-lg">
			{/* Main Footer Content */}
			<div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{/* Company Information */}
					<div className="space-y-4">
						<h3 className="text-2xl font-bold text-primary">
							Shopiflo
						</h3>
						<p className="text-sm text-gray-300">
							Your trusted online marketplace for quality products
							at unbeatable prices. Shop with confidence and enjoy
							fast, reliable delivery.
						</p>
						<div className="flex space-x-4">
							<a
								href="#"
								className="text-gray-400 transition-colors hover:text-white">
								<FaFacebookF className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="text-gray-400 transition-colors hover:text-white">
								<FaTwitter className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="text-gray-400 transition-colors hover:text-white">
								<FaInstagram className="w-5 h-5" />
							</a>
							<a
								href="#"
								className="text-gray-400 transition-colors hover:text-white">
								<FaLinkedinIn className="w-5 h-5" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold">Quick Links</h4>
						<ul className="space-y-2">
							<li>
								<Link
									href="/dashboard/products"
									className="text-sm text-gray-300 transition-colors hover:text-white">
									All Products
								</Link>
							</li>
							<li>
								<Link
									href="/dashboard/favourites"
									className="text-sm text-gray-300 transition-colors hover:text-white">
									Favourites
								</Link>
							</li>
							<li>
								<Link
									href="/dashboard/cart"
									className="text-sm text-gray-300 transition-colors hover:text-white">
									Shopping Cart
								</Link>
							</li>
							<li>
								<Link
									href="/dashboard/profile"
									className="text-sm text-gray-300 transition-colors hover:text-white">
									My Account
								</Link>
							</li>
							<li>
								<a
									href="#"
									className="text-sm text-gray-300 transition-colors hover:text-white">
									Track Order
								</a>
							</li>
						</ul>
					</div>

					{/* Customer Service */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold">
							Customer Service
						</h4>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-sm text-gray-300 transition-colors hover:text-white">
									Contact Us
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-sm text-gray-300 transition-colors hover:text-white">
									FAQ
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-sm text-gray-300 transition-colors hover:text-white">
									Shipping Info
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-sm text-gray-300 transition-colors hover:text-white">
									Returns & Exchanges
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-sm text-gray-300 transition-colors hover:text-white">
									Size Guide
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-sm text-gray-300 transition-colors hover:text-white">
									Privacy Policy
								</a>
							</li>
						</ul>
					</div>

					{/* Contact Information & Newsletter */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold">
							Stay Connected
						</h4>

						{/* Contact Info */}
						<div className="space-y-3">
							<div className="flex items-center space-x-2">
								<PhoneIcon className="w-4 h-4 text-primary" />
								<span className="text-sm text-gray-300">
									+1 (555) 123-4567
								</span>
							</div>
							<div className="flex items-center space-x-2">
								<EnvelopeIcon className="w-4 h-4 text-primary" />
								<span className="text-sm text-gray-300">
									support@shopiflo.com
								</span>
							</div>
							<div className="flex items-start space-x-2">
								<MapPinIcon className="w-4 h-4 mt-1 text-primary" />
								<span className="text-sm text-gray-300">
									123 Main Street
									<br />
								</span>
							</div>
						</div>

						{/* Newsletter Signup */}
						<div className="space-y-2">
							<p className="text-sm text-gray-300">
								Subscribe for updates and exclusive offers
							</p>
							<div className="flex space-x-2">
								<input
									type="email"
									placeholder="Enter your email"
									className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-primary"
								/>
								<button className="px-4 py-2 text-sm text-white transition-colors rounded-md bg-primary hover:bg-primary-dark">
									Subscribe
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Footer */}
			<div className="border-t border-gray-800">
				<div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
						{/* Copyright */}
						<div className="text-sm text-gray-400">
							© {currentYear} Shopiflo. All rights reserved.
						</div>

						{/* Legal Links */}
						<div className="flex space-x-4 text-sm">
							<a
								href="#"
								className="text-gray-400 transition-colors hover:text-white">
								Terms of Service
							</a>
							<a
								href="#"
								className="text-gray-400 transition-colors hover:text-white">
								Privacy Policy
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
