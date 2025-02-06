const orgPermissions = [
  {
    action: "MANAGE",
    entity: "ORGANIZATION",
    scope: "OWN",
    description: "Full organization control (including deletion)",
  },
  {
    action: "INVITE",
    entity: "USER",
    scope: "ORGANIZATION",
    description: "Invite new members to organization",
  },
  {
    action: "REMOVE",
    entity: "USER",
    scope: "ORGANIZATION",
    description: "Remove members from organization",
  },
];

const invoicePermissions = [
  {
    action: "CREATE",
    entity: "INVOICE",
    scope: "ORGANIZATION",
    description: "Create new invoices",
  },
  {
    action: "READ",
    entity: "INVOICE",
    scope: "ORGANIZATION",
    description: "View organization invoices",
  },
  {
    action: "UPDATE",
    entity: "INVOICE",
    scope: "OWN",
    description: "Edit own invoices",
  },
  {
    action: "DELETE",
    entity: "INVOICE",
    scope: "ORGANIZATION",
    description: "Delete any invoice",
  },
];

const userPermissions = [
  {
    action: "UPDATE_ROLE",
    entity: "USER",
    scope: "ORGANIZATION",
    description: "Change member roles",
  },
  {
    action: "VIEW",
    entity: "USER",
    scope: "ORGANIZATION",
    description: "See organization members",
  },
];

export { userPermissions, invoicePermissions, orgPermissions };
