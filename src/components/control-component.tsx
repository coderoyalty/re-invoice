import { auth, CheckAuthorizationWithCustomPermissions } from "@/lib/auth";

export type ProtectProps = React.PropsWithChildren<
  (
    | {
        condition?: never;
        role: string | string[];
        permission?: never;
      }
    | {
        condition?: never;
        role?: never;
        permission: string;
      }
    | {
        condition: (has: CheckAuthorizationWithCustomPermissions) => boolean;
        role?: never;
        permission?: never;
      }
    | {
        condition?: never;
        role?: never;
        permission?: never;
      }
  ) & {
    fallback?: React.ReactNode;
  }
>;

export async function Protect(
  props: ProtectProps
): Promise<React.JSX.Element | null> {
  const { children, fallback, ...restAuthorizedParams } = props;
  const { has, userId } = await auth();

  /**
   * Fallback to UI provided by user or `null` if authorization checks failed
   */
  const unauthorized = fallback ? <>{fallback}</> : null;

  const authorized = <>{children}</>;

  if (!userId) {
    return unauthorized;
  }

  /**
   * Check against the results of `has` called inside the callback
   */
  if (typeof restAuthorizedParams.condition === "function") {
    return restAuthorizedParams.condition(has) ? authorized : unauthorized;
  }

  if (restAuthorizedParams.role || restAuthorizedParams.permission) {
    return has(restAuthorizedParams as any) ? authorized : unauthorized;
  }

  /**
   * If neither of the authorization params are passed behave as the `<SignedIn/>`.
   * If fallback is present render that instead of rendering nothing.
   */
  return authorized;
}
