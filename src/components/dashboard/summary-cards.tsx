import { DollarSign, User, Building, Users, Table2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { fetchInvoiceSummary } from "@/lib/dashboard/data";
import React from "react";

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
          <p className="text-xs text-muted-foreground">
            {formatWithSign(lastMonthPercent)}% from last month
          </p>
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
  lastMonthPercent?: number;
}> = ({ value, lastMonthPercent = 0.0 }) => {
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
            {formatWithSign(lastMonthPercent)} from last month
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
            Default + {(value - 1).toFixed(0)} invited
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default async function SummaryCards() {
  const summary = await fetchInvoiceSummary();
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TotalRevenueCard value={summary.totalRevenue} />
        <TotalInvoiceCard value={summary.totalInvoices} />
        <InvoiceSentCard value={summary.invoiceSent} />
        <ActiveOrgCard value={summary.activeOrganizations} />
        <TeamMembersCard value={summary.teamMembers} />
      </div>
    </>
  );
}
