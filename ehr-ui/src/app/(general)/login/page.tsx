"use client";

import { SyntheticEvent, useContext, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from 'next/navigation'
import { Jomolhari } from "next/font/google";
import { ClassNames } from "@emotion/react";
import Link from "next/link";

export default function Login() {
    //const { loginUser } = {};
    const router = useRouter();
    const handleSubmit = (event:any) => {
        event.preventDefault();
        // Handle form submission here
        const action = event.target.action.value;
      
      switch (action) {
        case 'register':
          // Execute save action
          router.push('/register')
          break;
        case 'login':
          // Execute delete action
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
                            />
                        </div>

                        <p className="pb-6"> 
                            Don't have an account? 
                            <Link href="/register" className="font-bold hover:underline"> Sign up </Link>
                        </p>

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