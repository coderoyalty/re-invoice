"use client";
import React from "react";
import { DollarSign, User, Building, Users, Table2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { fetchInvoiceSummary } from "@/lib/dashboard/data";
import SummaryCardsSkeleton from "../ui/skeletons/summary-cards";
import { AwaitedReturnType } from "@/lib/types";
import { InvoiceSummaryResponse } from "@/app/api/organisations/summary/route";

function formatWithSign(value: number) {
  return value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2);
}

const TotalRevenueCard: React.FC<{
  value: number;
  lastMonthPercent?: number;
}> = ({ value, lastMonthPercent = 0.0 }) => {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {/* total invoices */}
          <div className="text-2xl font-bold">${value.toFixed(2)}</div>
        </CardContent>
      </Card>
    </>
  );
};

const TotalInvoiceCard: React.FC<{
  value: number;
}> = ({ value }) => {
  return (
    <>
      <Card>
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
      </Card>
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
      <Card>
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
      </Card>
    </>
  );
};

const TeamMembersCard: React.FC<{ value: number }> = ({ value }) => {
  return (
    <>
      <Card>
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
      </Card>
    </>
  );
};

const ActiveOrgCard: React.FC<{ value: number }> = ({ value }) => {
  return (
    <>
      <Card>
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
      </Card>
    </>
  );
};

export default function SummaryCards() {
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
        const url = `/api/organisations/summary`;
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
  }, []);

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
