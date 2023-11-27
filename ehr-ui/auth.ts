// import NextAuth from "next-auth";
// import authConfig from "./auth.config";
// import Credentials from "next-auth/providers/credentials";
// import { z } from 'zod';
// import router from "next/router";

// const doctorApiURL: string = "";

// export const { auth, signIn, signOut } = NextAuth({
//     ...authConfig,
//     providers: [
//         Credentials({
//             id: "credentials",
//             name: "Credentials",
//             async authorize(credentials) {
//                 //const parsedCredentials = z.object({ email: z.string(), password: z.string(.min(1) )}).safeParse(credentials);
//                 const userCredentials = { email: credentials.email, password: credentials.password, };

//                 let response = await fetch(`${doctorApiURL}/login`, {
//                     method: "POST",
//                     credentials: "include",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(userCredentials/*{
//                         email: target.email.value,
//                         password: hashPassword(target.password.value),
//                     }*/),
//                 });

//                 if (response.ok) {
//                     let doctorData = await response.json();
//                     console.log(doctorData);

//                     const updatedDoctor = { id: doctorData.id };
//                     //setDoctor(updatedDoctor);

//                     //console.log(doctor);
//                     console.log("Doctor logged in");
//                     //router.push("/doctor/home");
//                 } else {
//                     console.log("Login failed.");
//                 }
//             }
//         }),
//     ],
// });