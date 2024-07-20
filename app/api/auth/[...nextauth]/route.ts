// app/api/auth/[...nextauth]/route.ts

import { connectToDB } from "@/lib/db";
import { comparePassword } from "@/lib/utils";
import { UserModel } from "@/schemas/user";
import nextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = nextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin'
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: {},
                password: {}
            },
        /**
         * Authenticates a user with the provided credentials.
         *
         * @param {object} credentials - The user's credentials.
         * @param {object} req - The request object.
         * @return {Promise<object|null>} The authenticated user object if successful, otherwise null.
         */
            authorize: async function (credentials, req) {
                try {
                    await connectToDB();

                    const user = await UserModel.findOne({
                        email: credentials?.email
                    });

                    if (user) {
                        const passwordMatch = await comparePassword(
                            credentials?.password || '', user.password
                        );

                        if (passwordMatch) {
                            return user;
                        }
                    }

                    return null;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            }
        })
    ]
});

export {
    handler as GET,
    handler as POST
};