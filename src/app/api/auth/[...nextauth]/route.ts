import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from 'next-auth/providers/google';
import { db } from '@/lib/db';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db as any),
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',
		// newUser: '/register',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			// profile: (profile: any) => {
			// 	return {
			// 		id: profile.sub,
			// 		name: profile.name,
			// 		email: profile.email,
			// 		role: profile.role ?? "user",
			// 	};
			// },
		}),
	],
	callbacks: {
		session: ({ session, token }) => {
		  return {
			...session,
			user: {
			  ...session.user,
			  id: token.id,
			  randomKey: token.randomKey,
			},
		  };
		},
		jwt: ({ token, user }) => {
		  if (user) {
			const u = user as unknown as any;
			return {
			  ...token,
			  id: u.id,
			  randomKey: u.randomKey,
			};
		  }
		  return token;
		},
	  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };