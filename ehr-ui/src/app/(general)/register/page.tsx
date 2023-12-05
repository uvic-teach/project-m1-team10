"use client";

import { use, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { Providers } from "@/app/providers";

export default function Login() {
    const { registerUser } = useAuth();
    const [pass, setPass] = useState<string>("");

    return (
        <>
             <div className="flex h-full w-full md:w-1/3 flex-col justify-center px-2 rounded-md">
                {/* Text at the top */}
                <p className="text-white text-center text-2xl pb-[40px] font-['Jomolhari']">
                    We make scheduling with your Healthcare Provider a breeze!
                </p>

                {/* Login Form */}
                <div className="bg-white rounded-md lg:py-12">
                    <form
                        onSubmit={registerUser}
                        className="mt-15 sm:mx-auto sm:w-full sm:max-w-sm"
                    >
                        <div className="mb-7">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Full Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Full Name*"
                            />
                        </div>

                        <div className="mb-7">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="phn"
                            >
                                Personal Health Number
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="phn"
                                name="phn"
                                type="number"
                                placeholder="Personal Health Number*"
                            />
                        </div>

                        <div className="mb-7">
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
                                type="email"
                                placeholder="Personal Health Number*"
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
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                placeholder="Password*"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                        

                            <button
                                className="bg-custom-blue hover:bg-custom-blue-hover text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                name="action"
                                value="register"
                            >
                                Register
                            </button>

                        </div>
                    </form>

                </div>

                {/* Logo at the bottom*/}
                <p className="text-white text-center text-5xl pt-[40px] font-['Gigi']">
                    Cedule
                </p>
            </div>

            {/* <div className="w-full max-w-xs">
                <form
                    onSubmit={registerUser}
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="phn"
                        >
                            Personal Health Number
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phn"
                            name="phn"
                            type="number"
                            placeholder="PHN"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="phn"
                        >
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
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
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="***********"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div> */}
        </>
    );
}