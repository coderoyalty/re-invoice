export type PermissionAction =
  | "CREATE"
  | "READ"
  | "UPDATE"
  | "DELETE"
  | "MANAGE"
  | "UPDATE_ROLE"
  | "VIEW";
export type PermissionEntity = "USER" | "INVOICE" | "ORGANIZATION";
export type PermissionScope = "OWN" | "ORGANIZATION";
