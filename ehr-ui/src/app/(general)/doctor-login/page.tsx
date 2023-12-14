"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");

    async function handleSubmit(event: any) {
        event.preventDefault();
        // Handle form submission here
        const action = event.target.action.value;

        switch (action) {
            case 'register':
                // Execute save action
                router.push('/register');
                break;
            case 'login':
                const response = await signIn("credentials", {
                    email,
                    password,
                    redirect: false,
                });

                if (response?.ok && response != null) {
                    console.log("Login successful");
                    router.push('/doctor-dashboard');
                } else {
                    setAuthError(" Check credentials and try again");
                }
                break;
            default:
                // Handle other actions
                break;
        }
    }

    return (
        <>
            <div className="flex h-full w-full md:w-1/3 flex-col justify-center px-2 rounded-md">
                {/* Text at the top */}
                <p className="text-white text-center text-2xl pb-[50px] font-['Jomolhari']">
                    We make scheduling with your Healthcare Provider a breeze!
                </p>

                {/* Login Form */}
                <div className="bg-white rounded-md lg:py-12">
                    <form
                        onSubmit={handleSubmit}
                        className="mt-15 sm:mx-auto sm:w-full sm:max-w-sm"
                    >
                        {authError && (
                            <div className="error message">
                                Oops! Something went wrong.
                                {authError}
                            </div>)}
                        <div className="mb-7">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="phn"
                            >
                                Email Address
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email Address*"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password*"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-custom-blue hover:bg-custom-blue-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                name="action"
                                value="login"
                            >
                                Sign In
                            </button>

                        </div>
                    </form>

                </div>

                {/* Logo at the bottom*/}
                <p className="text-white text-center text-5xl pt-[70px] font-['Gigi']">
                    Cedule
                </p>
            </div>

        </>
    );
}