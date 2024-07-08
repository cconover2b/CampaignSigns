// /pages/api/auth/[...nextauth].ts
import { connectToDB } from '@/lib/db';
import { comparePassword } from '@/lib/utils';
import { UserModel } from '@/schemas/user';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          await connectToDB();

          const user = await UserModel.findOne({
            email: credentials?.email,
          });

          if (user) {
            const passwordMatch = await comparePassword(
              credentials?.password || '',
              user.password
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
      },
    }),
  ],
});

export { handler as GET, handler as POST };