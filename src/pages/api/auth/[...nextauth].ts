import { PrismaAdapter } from "@next-auth/prisma-adapter"

import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import db from '../../../../lib/db'

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(db),
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    GoogleProvider ({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  callbacks: {
    session: async (session: any, user: any) => {
      session.userId = user?.id;    
      return Promise.resolve(session);
    }
  }
})


// 91200325722-n84l0jbio8q0282uhbkp1m1p70bc6265.apps.googleusercontent.com

// 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