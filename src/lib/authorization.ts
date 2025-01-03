import { CheckAuthorizationWithCustomPermissions } from "./auth";

type CheckOrgAuthorization = (
  params: {
    role?: string | string[];
    permission?: string;
  },
  { orgId, orgRole, orgPermissions }: AuthorizationOptions
) => boolean | null;

type AuthorizationOptions = {
  userId: string;
  orgId: string | null | undefined;
  orgRole: string | null | undefined;
  orgPermissions: string[] | null | undefined;
};

const checkOrgAuthorization: CheckOrgAuthorization = (params, options) => {
  const { orgId, orgRole, orgPermissions } = options;
  if (!params.role && !params.permission) {
    return null;
  }
  if (!orgId || !orgRole || !orgPermissions) {
    return null;
  }

  if (params.permission) {
    return orgPermissions.includes(params.permission);
  }
  if (params.role) {
    if (Array.isArray(params.role)) {
      const rv = params.role.find((role) => orgRole == role);
      return rv !== undefined;
    } else {
      return orgRole === params.role;
    }
  }
  return null;
};

export const createCheckAuthorization = (
  options: AuthorizationOptions
): CheckAuthorizationWithCustomPermissions => {
  return (params): boolean => {
    if (!options.userId) {
      return false;
    }

    const orgAuthorization = checkOrgAuthorization(params, options);

    return orgAuthorization ?? false;
  };
};
