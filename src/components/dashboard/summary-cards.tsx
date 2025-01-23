"use client";
import React, { ComponentProps } from "react";
import { DollarSign, User, Building, Users, Table2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { fetchInvoiceSummary } from "@/lib/dashboard/data";
import SummaryCardsSkeleton from "../ui/skeletons/summary-cards";
import { AwaitedReturnType } from "@/lib/types";
import { InvoiceSummaryResponse } from "@/app/api/organisations/summary/route";
import { cn } from "@/lib/utils";

function formatWithSign(value: number) {
  return value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2);
}

const OverlayCard = React.forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Card>
>(({ className, ...props }, ref) => (
  <Card
    className={cn(
      className,
      " transition-all duration-700 hover:scale-[1.1] hover:-rotate-1",
      "drop-shadow-[6px_6px_gray] dark:drop-shadow-[6px_6px_gray] border-2 border-black dark:border-white"
    )}
    {...props}
  />
));

const TotalRevenueCard: React.FC<{
  value: number;
  lastMonthPercent?: number;
}> = ({ value, lastMonthPercent = 0.0 }) => {
  return (
    <>
      <OverlayCard>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* total invoices */}
          <div className="text-2xl font-bold">${value.toFixed(2)}</div>
        </CardContent>
      </OverlayCard>
    </>
  );
};

const TotalInvoiceCard: React.FC<{
  value: number;
}> = ({ value }) => {
  return (
    <>
      <OverlayCard>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Invoice</CardTitle>
          <Table2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* total invoices */}
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">
            Across the current organization
          </p>
        </CardContent>
      </OverlayCard>
    </>
  );
};

const InvoiceSentCard: React.FC<{
  value: number;
  percentDiff: number;
  lastMonthValue: number;
}> = ({ value, percentDiff = 0.0, lastMonthValue }) => {
  return (
    <>
      <OverlayCard>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Invoices Sent</CardTitle>
          <User className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* invoices sent */}
          <div className="text-2xl font-bold">+{value}</div>
          <p className="text-xs text-muted-foreground">
            {formatWithSign(percentDiff)}% from last month ({lastMonthValue})
          </p>
        </CardContent>
      </OverlayCard>
    </>
  );
};

const TeamMembersCard: React.FC<{ value: number }> = ({ value }) => {
  return (
    <>
      <OverlayCard>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Team Members</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* team members */}
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">
            Across all organizations
          </p>
        </CardContent>
      </OverlayCard>
    </>
  );
};

const ActiveOrgCard: React.FC<{ value: number }> = ({ value }) => {
  return (
    <>
      <OverlayCard>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Organizations
          </CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* active organization */}
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">
            {value} active organizations
          </p>
        </CardContent>
      </OverlayCard>
    </>
  );
};

export default function SummaryCards({ orgId }: { orgId: string }) {
  const [data, setData] = React.useState<
    AwaitedReturnType<typeof fetchInvoiceSummary>
  >({} as any);

  const [state, setState] = React.useState({
    error: false,
    pending: true,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      setState({ pending: true, error: false });
      try {
        const url = `/api/organisations/summary`; // TODO: should take orgId? (currently fetches the active organisation summary)
        const res = await fetch(url, { method: "GET" });

        if (!res.ok) {
          throw new Error();
        }

        const result: InvoiceSummaryResponse = await res.json();
        setData(result.data);
      } catch (err) {
        setState((prev) => ({ ...prev, error: true }));
      } finally {
        setState((prev) => ({ ...prev, pending: false }));
      }
    };

    fetchData();
  }, [orgId]);

  if (state.pending) {
    return <SummaryCardsSkeleton />;
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TotalRevenueCard value={data.totalRevenue} />
        <TotalInvoiceCard value={data.totalInvoices} />
        <InvoiceSentCard
          value={data.thisMonth.sent}
          percentDiff={data.thisMonth.percentDiff}
          lastMonthValue={data.thisMonth.lastMonthValue}
        />
        <ActiveOrgCard value={data.activeOrganisations} />
        <TeamMembersCard value={data.teamMembers} />
      </div>
    </>
  );
}
