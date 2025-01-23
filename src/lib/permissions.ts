import { CheckAuthorizationWithCustomPermissions } from "./auth";

export const ALL_PERMISSIONS = [
  // Organization profile permissions
  "org:profile:create", // Create organization profiles
  "org:profile:read", // View organization profiles
  "org:profile:update", // Update organization profiles
  "org:profile:delete", // Delete organization profiles

  // Organization member permissions
  "org:members:invite", // Invite new members
  "org:members:read", // View organization members
  "org:members:update", // Update member roles and permissions
  "org:members:remove", // Remove members from the organization

  // Role management permissions
  "org:roles:create", // Create roles
  "org:roles:read", // View roles
  "org:roles:update", // Update roles
  "org:roles:delete", // Delete roles

  // Permission management permissions
  "org:permissions:read", // View permissions
  "org:permissions:update", // Update permissions assigned to roles

  // Billing and subscription permissions
  "org:billing:read", // View billing and subscription details
  "org:billing:update", // Update billing information and manage subscriptions

  // Settings permissions
  "org:settings:read", // View organization settings
  "org:settings:update", // Update organization settings

  // Resource management permissions (e.g., invoices, projects)
  "org:invoices:create", // Create invoices
  "org:invoices:read", // View invoices
  "org:invoices:update", // Update invoices
  "org:invoices:delete", // Delete invoices

  // Audit log permissions
  "org:audit_logs:read", // View audit logs

  // Custom permissions placeholder
  // "org:custom_resource:action", // Custom resources as needed
] as const;

const PERMISSIONS = ALL_PERMISSIONS.reduce(
  (acc, value) => {
    acc[value] = value;
    return acc;
  },
  {} as Record<
    (typeof ALL_PERMISSIONS)[number],
    (typeof ALL_PERMISSIONS)[number]
  >
);

/**
 * System-defined roles in order of decreasing privileges:
 * - OWNER: Has full control and can't be removed
 * - ADMIN: Has full control except ownership transfer
 * - MANAGER: Can manage members and content
 * - MEMBER: Basic access with limited permissions
 */
export const SYSTEM_ROLES = {
  OWNER: "owner",
  ADMIN: "admin",
  MANAGER: "manager",
  MEMBER: "member",
} as const;

export const OWNER_ROLE_PERMISSIONS = [...ALL_PERMISSIONS] as const;

export const ADMIN_ROLE_PERMISSIONS = [
  ...ALL_PERMISSIONS.filter(
    (p) =>
      !p.startsWith("org:profile:create") || !p.startsWith("org:profile:delete")
  ),
] as const;

export const MANAGER_ROLE_PERMISSIONS = [
  PERMISSIONS["org:profile:read"],
  PERMISSIONS["org:profile:update"],
  PERMISSIONS["org:members:invite"],
  PERMISSIONS["org:members:read"],
  PERMISSIONS["org:members:update"],
  PERMISSIONS["org:roles:read"],
  PERMISSIONS["org:roles:update"],
  PERMISSIONS["org:permissions:read"],
  PERMISSIONS["org:billing:read"],
  PERMISSIONS["org:billing:update"],
  PERMISSIONS["org:settings:read"],
  PERMISSIONS["org:settings:update"],
  PERMISSIONS["org:invoices:create"],
  PERMISSIONS["org:invoices:read"],
  PERMISSIONS["org:invoices:update"],
  PERMISSIONS["org:invoices:delete"],
  PERMISSIONS["org:audit_logs:read"],
] as const;

export const MEMBER_ROLE_PERMISSIONS = [
  PERMISSIONS["org:profile:read"],
  PERMISSIONS["org:members:read"],
  PERMISSIONS["org:invoices:read"],
  PERMISSIONS["org:invoices:update"],
] as const;

export type SystemRole = (typeof SYSTEM_ROLES)[keyof typeof SYSTEM_ROLES];

export const getPermissionByRole = (role: SystemRole) => {
  switch (role) {
    case "admin":
      return ADMIN_ROLE_PERMISSIONS;
    case "manager":
      return MANAGER_ROLE_PERMISSIONS;
    case "owner":
      return OWNER_ROLE_PERMISSIONS;
    case "member":
      return MEMBER_ROLE_PERMISSIONS;
  }
};

export const hasPermissions = (
  has: CheckAuthorizationWithCustomPermissions,
  permissions: (typeof PERMISSIONS)[keyof typeof PERMISSIONS][],
  haveAll: boolean = false
) => {
  return permissions.reduce((prev, permission) => {
    return haveAll
      ? has({ permission: permission as any }) && prev
      : has({ permission: permission as any }) || prev;
  }, haveAll);
};
