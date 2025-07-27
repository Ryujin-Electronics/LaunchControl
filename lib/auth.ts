import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export type UserRole = 
  | "full_access"      // Client: Full access for IT admin or business owner
  | "it_admin"         // Client: IT admin dashboard
  | "end_user"         // Client: Support tickets, purchase requests
  | "ryujin_admin"     // Ryujin: Full admin access to all clients
  | "ryujin_support"   // Ryujin: Support team access

export type OrganizationType = "client" | "ryujin"

export interface Permission {
  canViewAllOrganizations: boolean
  canManageUsers: boolean
  canCreateTickets: boolean
  canAssignTickets: boolean
  canViewAnalytics: boolean
  canManageProjects: boolean
  canApprovePurchases: boolean
  canViewPurchaseHistory: boolean
  canManageOrganization: boolean
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission> = {
  // Client Roles
  full_access: {
    canViewAllOrganizations: false,
    canManageUsers: true,
    canCreateTickets: true,
    canAssignTickets: true,
    canViewAnalytics: true,
    canManageProjects: true,
    canApprovePurchases: true,
    canViewPurchaseHistory: true,
    canManageOrganization: true,
  },
  it_admin: {
    canViewAllOrganizations: false,
    canManageUsers: true,
    canCreateTickets: true,
    canAssignTickets: true,
    canViewAnalytics: true,
    canManageProjects: true,
    canApprovePurchases: true,
    canViewPurchaseHistory: true,
    canManageOrganization: false,
  },
  end_user: {
    canViewAllOrganizations: false,
    canManageUsers: false,
    canCreateTickets: true,
    canAssignTickets: false,
    canViewAnalytics: false,
    canManageProjects: false,
    canApprovePurchases: false,
    canViewPurchaseHistory: true,
    canManageOrganization: false,
  },
  // Ryujin Roles
  ryujin_admin: {
    canViewAllOrganizations: true,
    canManageUsers: true,
    canCreateTickets: true,
    canAssignTickets: true,
    canViewAnalytics: true,
    canManageProjects: true,
    canApprovePurchases: true,
    canViewPurchaseHistory: true,
    canManageOrganization: true,
  },
  ryujin_support: {
    canViewAllOrganizations: true,
    canManageUsers: false,
    canCreateTickets: true,
    canAssignTickets: true,
    canViewAnalytics: true,
    canManageProjects: false,
    canApprovePurchases: false,
    canViewPurchaseHistory: true,
    canManageOrganization: false,
  },
}

export function getUserPermissions(role: UserRole): Permission {
  return ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.end_user
}

export function hasPermission(userRole: UserRole, permission: keyof Permission): boolean {
  const permissions = getUserPermissions(userRole)
  return permissions[permission] || false
}

export function isRyujinUser(role: UserRole): boolean {
  return role === "ryujin_admin" || role === "ryujin_support"
}

export function isClientUser(role: UserRole): boolean {
  return role === "full_access" || role === "it_admin" || role === "end_user"
}

export function canAccessOrganization(userRole: UserRole, userOrgId: string, targetOrgId: string): boolean {
  // Ryujin users can access all organizations
  if (isRyujinUser(userRole)) {
    return true
  }
  
  // Client users can only access their own organization
  return userOrgId === targetOrgId
}

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  return session?.user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error("Authentication required")
  }
  return user
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await requireAuth()
  if (!allowedRoles.includes(user.role as UserRole)) {
    throw new Error("Insufficient permissions")
  }
  return user
} 