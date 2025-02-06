export const defaultRoles = [
  {
    name: "Owner",
    isSystem: true,
    permissions: [
      "MANAGE:ORGANIZATION:OWN",
      "INVITE:USER:ORGANIZATION",
      "REMOVE:USER:ORGANIZATION",
      "CREATE:INVOICE:ORGANIZATION",
      "READ:INVOICE:ORGANIZATION",
      "UPDATE:INVOICE:OWN",
      "DELETE:INVOICE:ORGANIZATION",
      "UPDATE_ROLE:USER:ORGANIZATION",
      "VIEW:USER:ORGANIZATION",
    ],
  },
  {
    name: "Admin",
    isSystem: true,
    permissions: [
      "INVITE:USER:ORGANIZATION",
      "REMOVE:USER:ORGANIZATION",
      "CREATE:INVOICE:ORGANIZATION",
      "READ:INVOICE:ORGANIZATION",
      "UPDATE:INVOICE:ORGANIZATION",
      "DELETE:INVOICE:ORGANIZATION",
      "VIEW:USER:ORGANIZATION",
    ],
  },
  {
    name: "Member",
    isSystem: true,
    permissions: [
      "CREATE:INVOICE:ORGANIZATION",
      "READ:INVOICE:ORGANIZATION",
      "UPDATE:INVOICE:OWN",
    ],
  },
];
