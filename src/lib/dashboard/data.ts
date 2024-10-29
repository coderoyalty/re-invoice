import prisma from "../prisma";
import { auth } from "..";
import { redirect } from "next/navigation";

export async function fetchUserOrgs() {
  const { user } = await auth();

  if (!user) {
    return redirect("/login");
  }

  const organisations = await prisma.organisation.findMany({
    where: {
      members: {
        some: {
          userId: user.id,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
    take: 10,
  });

  return {
    organisations,
    defaultOrg: user.defaultOrganisation,
  };
}

export async function fetchRecentInvoices(orgId: string | undefined) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return [
    { id: "#inv-001", status: "pending", client: "TechCorp", amount: 5000 },
    { id: "#inv-002", status: "completed", client: "InnoTech", amount: 3000 },
    {
      id: "#inv-003",
      status: "pending",
      client: "DevSolutions",
      amount: 4500,
    },
    { id: "#inv-004", status: "failed", client: "SoftWorks", amount: 1500 },
    {
      id: "#inv-005",
      status: "completed",
      client: "NextGen Systems",
      amount: 2200,
    },
    {
      id: "#inv-006",
      status: "pending",
      client: "Quantum Enterprises",
      amount: 7800,
    },
    {
      id: "#inv-007",
      status: "failed",
      client: "Digital Minds",
      amount: 3600,
    },
    {
      id: "#inv-008",
      status: "completed",
      client: "Vertex Solutions",
      amount: 5400,
    },
    { id: "#inv-009", status: "pending", client: "CloudNet", amount: 6700 },
    { id: "#inv-010", status: "failed", client: "SoftPoint", amount: 1200 },
    {
      id: "#inv-011",
      status: "completed",
      client: "AI Innovations",
      amount: 9100,
    },
    { id: "#inv-012", status: "pending", client: "ByteWorks", amount: 2600 },
    { id: "#inv-013", status: "completed", client: "DataFlow", amount: 4900 },
    {
      id: "#inv-014",
      status: "failed",
      client: "Alpha Technologies",
      amount: 3100,
    },
    { id: "#inv-015", status: "pending", client: "HyperNet", amount: 8200 },
  ];
}

export async function fetchInvoiceSummary(orgId?: string) {
  const { user } = await auth();

  if (!user) {
    return redirect("/login");
  }

  const memberships = await prisma.organisationMember.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      organisation: {
        include: { members: true },
      },
    },
  });

  const teamMembers = memberships.reduce((total, value) => {
    const eachMembers = value.organisation.members.length ?? 0;
    return total + Math.max(0, eachMembers - 1);
  }, 0);

  return {
    totalRevenue: 5000.0,
    totalPending: 178.2,
    totalInvoices: 20,
    teamMembers,
    invoiceSent: 10,
    activeOrganizations: memberships.length,
  };
}
