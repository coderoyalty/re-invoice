import * as React from "react";
import checkPermission from "@/lib/permission-cache";
import { PermissionAction, PermissionEntity } from "@/@types/permission";

interface PermissionGuardProps {
  action: PermissionAction;
  entity: PermissionEntity;
  orgId: string;
  children?: React.ReactNode;
  fallback?: React.AwaitedReactNode;
}
const PermissionGuard_: React.FC<PermissionGuardProps> = async ({
  action,
  entity,
  orgId,
  children,
  fallback = <></>,
}) => {
  const hasPermission: boolean = await checkPermission({
    action,
    entity,
    orgId,
  });

  return hasPermission ? <>{children}</> : fallback;
};

const PermissionGuard = React.memo(PermissionGuard_);

export default PermissionGuard;
