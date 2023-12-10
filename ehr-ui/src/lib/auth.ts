import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const doctorApiURL: string = "http://localhost:8000/api";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/doctor-login',
        signOut: '/doctor-login',
        error: '/doctor-login'
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials: any, request) {
                const userCredentials = {
                    email: credentials.email,
                    password: credentials.password
                };

                try {
                    let response = await fetch(`${doctorApiURL}/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(userCredentials),
                    });
                    const doctor = await response.json();
                    console.log("recieved response:");
                    console.log(doctor);

                    if (response.ok && doctor) {
                        if (doctor.error || !doctor.id) {
                            console.log("invalid credentials");
                            return null;
                        }
                        console.log("Doctor logged in");
                        return doctor;
                    } else {
                        console.log(response.json())
                    }
                    return null;

                } catch (error) {
                    console.log("Authentication error:", error);
                    return null;
                }

            },
            credentials: {}
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};

// Use in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
    return getServerSession(...args, authOptions)
}