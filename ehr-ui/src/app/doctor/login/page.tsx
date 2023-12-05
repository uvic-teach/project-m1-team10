"use client";

import { SyntheticEvent, useContext, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import router from "next/router";
import { error } from "console";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        console.log("handle submit function");
        try {
            const response = await signIn("credentials", {
                email,
                password,
                callbackUrl: "/doctor/home", //`${process.env.NEXTAUTH_URL}`,
                redirect: false,
            });

            if (response?.ok) {
                console.log("Login successful");
                //return session.user;
            } else {
                console.log("Login failed");
            }

            return response;
        } catch (error: any) {
            console.error("Authentication error:", error);

            if (error.message === 'Invalid credentials') {
                console.log(error.message);
                setAuthError(error);
                return null;
            } else {
                // Handle other errors or log them as needed
                console.error('Unexpected error during login:', error);
                //router.push("/doctor/api/error");
            }
        }
    }

    return (
        <>
            <div className="w-full max-w-xs">
                {authError && (
                    <div className="cred error message text-red-600 text-med font-bold mb-2 px-4">
                        Invalid credentials, please try again
                    </div>)}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email Address
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            type="string"
                            placeholder="example@email.com"
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
                            placeholder="***********"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}