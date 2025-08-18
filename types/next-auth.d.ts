import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    role: string
    organizationId?: string
    organization?: {
      id: string
      name: string
      type: string
    }
    image?: string
    phone?: string
    jobTitle?: string
    preferences?: any
  }
  
  interface Session {
    user: {
      id: string
      email: string
      name: string
      role: string
      organizationId?: string
      organization?: {
        id: string
        name: string
        type: string
      }
      image?: string
      phone?: string
      jobTitle?: string
      preferences?: any
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: string
    organizationId?: string
    organization?: {
      id: string
      name: string
      type: string
    }
    image?: string
    phone?: string
    jobTitle?: string
    preferences?: any
  }
} 