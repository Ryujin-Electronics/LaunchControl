import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('Authorize called with credentials:', credentials)
        if (!credentials?.email || !credentials?.password) {
          console.error('No credentials provided')
          return null
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: { organization: true }
          })
          console.log('User loaded from DB:', user)

          if (!user) {
            console.error('User not found:', credentials.email)
            return null
          }

          if (!user.password) {
            console.error('User missing password:', credentials.email)
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            console.error('Invalid password for', credentials.email)
            return null
          }
          // Always return all fields for any valid user
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image || '',
            phone: user.phone || '',
            jobTitle: user.jobTitle || '',
            preferences: user.preferences || {},
            organizationId: user.organizationId || undefined,
            organization: user.organization ? {
              id: user.organization.id,
              name: user.organization.name,
              type: user.organization.type
            } : undefined
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
        token.id = user.id
        token.organizationId = user.organizationId
        token.organization = user.organization
        token.image = user.image
        token.phone = user.phone
        token.jobTitle = user.jobTitle
        token.preferences = user.preferences
      }
      return token
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.organizationId = token.organizationId as string
        session.user.organization = token.organization as any
        session.user.image = token.image as string
        session.user.phone = token.phone as string
        session.user.jobTitle = token.jobTitle as string
        session.user.preferences = token.preferences as any
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
} 