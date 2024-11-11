import prisma from "../prisma";
import { auth } from "..";
import { redirect } from "next/navigation";
import { getPercentDiff, getRelativeMonthAndDays } from "../utils";

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

export async function fetchOrgsWithDetails() {
  const { user } = await auth();

  if (!user) {
    return redirect("/login");
  }

  const orgMembers = await prisma.organisationMember.findMany({
    where: {
      userId: user.id,
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
      members: membersCount,
    };

    return result;
  });
}

export async function fetchRecentInvoices(orgId: string) {
  const { user } = await auth();

  if (!user) {
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

export async function fetchInvoiceSummary(orgId: string | null = null) {
  const { user } = await auth();
  if (!user) return redirect("/login");

  const userId = user.id;
  const orgIdToUse = orgId ?? user.defaultOrganisation?.id;
  if (!orgIdToUse) throw new Error("No organization ID provided.");

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
          orgId: orgIdToUse,
        },
      })
    )._sum.amount?.toNumber() ?? 0;

  const [newInvoices, oldInvoices, totalInvoices, totalPending] =
    await prisma.$transaction([
      prisma.invoice.count({
        // new invoices
        where: {
          createdAt: { gte: dateRanges.thisMonth.firstDay },
          orgId: orgIdToUse,
        },
      }),
      prisma.invoice.count({
        // old invoices
        where: {
          createdAt: {
            gte: dateRanges.prevMonth.firstDay,
            lt: dateRanges.thisMonth.firstDay,
          },
          orgId: orgIdToUse,
        },
      }),
      prisma.invoice.count({ where: { orgId: orgIdToUse } }), //total invoices
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
