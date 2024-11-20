export const ALL_PERMISSIONS = [
  "org:sys_profile:manage", // manage organisation
  "org:sys_profile:delete", // delete organisation

  // organisation members
  "org:sys_members:read", // view members
  "org:sys_members:manage", // manage members
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

export const USER_ROLE_PERMISSIONS = [PERMISSIONS["org:sys_members:read"]];

export const SYSTEM_ROLES = {
  ADMIN: "admin",
  MEMBER: "member",
};
