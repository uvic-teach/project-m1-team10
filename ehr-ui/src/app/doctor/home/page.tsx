"use client";
import { useAuth } from "../../../../context/AuthContext";

export default function Home() {
    let { doctor } = useAuth();

    return (
        <>
            <h1>This is the Medical Professional home page</h1>
            {!doctor && <p>You are not logged in</p>}
            {doctor && <p>ID: {doctor.id}</p>}
        </>
    );
}