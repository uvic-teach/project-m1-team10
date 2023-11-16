"use client";
import { Inter } from "next/font/google";
import { useAuth } from "../../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    let { user } = useAuth();

    return (
        <>
            <h1>This is the home page</h1>
            {!user && <p>You are not logged in</p>}
            {user && <p>Name: {user.name}</p>}
            {user && <p>PHN: {user.phn}</p>}
        </>
    );
}