import prisma from "../prisma";
import { redirect } from "next/navigation";
import { getPercentDiff, getRelativeMonthAndDays } from "../utils";
import { auth } from "../auth";

export async function fetchUserOrgs() {
  const { userId, orgId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  const organisations = await prisma.organisation.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
    take: 10,
    orderBy: {
      createdAt: "asc",
    },
  });

  return {
    organisations,
    currentOrg: organisations.find((org) => org.id === orgId),
  };
}

export async function fetchOrgsWithDetails() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  const orgMembers = await prisma.organisationMember.findMany({
    where: {
      userId,
    },
    include: {
      organisation: {
        include: {
          members: true,
        },
      },
    },
  });

  return orgMembers.map((orgMember) => {
    const membersCount = orgMember.organisation.members.length;
    const result = {
      ...orgMember.organisation,
      joinedAt: orgMember.createdAt,
      members: membersCount,
      owner: orgMember.organisation.creatorId === userId,
    };

    return result;
  });
}

export async function fetchRecentInvoices(orgId: string) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/login");
  }

  const result = await prisma.invoice.findMany({
    where: {
      orgId: orgId,
    },
    take: 15,
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
    select: {
      id: true,
      status: true,
      client: true,
      amount: true,
    },
  });

  return result.map((inv) => ({
    ...inv,
    amount: inv.amount.toNumber(),
    shortId: inv.id.split("-")[0],
  }));
}

export async function fetchInvoiceSummary() {
  const { userId, orgId } = await auth();
  if (!userId) return redirect("/login");

  const dateRanges = {
    thisMonth: getRelativeMonthAndDays(0),
    prevMonth: getRelativeMonthAndDays(-1),
  };

  const memberships = await prisma.organisationMember.findMany({
    where: { userId },
    include: { organisation: { include: { members: true } } },
  });

  const teamMembers = memberships.reduce((total, membership) => {
    const orgMembersCount = membership.organisation.members.length;
    return total + Math.max(0, orgMembersCount - 1);
  }, 0);

  const totalRevenue =
    (
      await prisma.invoice.aggregate({
        _sum: { amount: true },
        where: {
          status: "completed",
          organisation: { members: { some: { userId } } },
          orgId,
        },
      })
    )._sum.amount?.toNumber() ?? 0;

  const [newInvoices, oldInvoices, totalInvoices, totalPending] =
    await prisma.$transaction([
      prisma.invoice.count({
        // new invoices
        where: {
          createdAt: { gte: dateRanges.thisMonth.firstDay },
          orgId,
        },
      }),
      prisma.invoice.count({
        // old invoices
        where: {
          createdAt: {
            gte: dateRanges.prevMonth.firstDay,
            lt: dateRanges.thisMonth.firstDay,
          },
          orgId,
        },
      }),
      prisma.invoice.count({ where: { orgId } }), //total invoices
      prisma.invoice.count({
        //total pending
        where: {
          status: "pending",
          organisation: { members: { some: { userId } } },
        },
      }),
    ]);

  const percentDiff = getPercentDiff(newInvoices, oldInvoices);

  return {
    totalRevenue,
    totalPending,
    totalInvoices,
    teamMembers,
    thisMonth: { sent: newInvoices, percentDiff, lastMonthValue: oldInvoices },
    activeOrganisations: memberships.length,
  };
}
