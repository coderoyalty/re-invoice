import { DollarSign, User, Building, Users, Table2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { fetchInvoiceSummary } from "@/lib/dashboard/data";

export default async function SummaryCards() {
  const summary = await fetchInvoiceSummary();
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* total invoices */}
            <div className="text-2xl font-bold">${summary.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invoice</CardTitle>
            <Table2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* total invoices */}
            <div className="text-2xl font-bold">{summary.totalInvoices}</div>
            <p className="text-xs text-muted-foreground">
              Accross the current organization
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Invoices Sent</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* invoices sent */}
            <div className="text-2xl font-bold">+{summary.invoiceSent}</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Organizations
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* active organization */}
            <div className="text-2xl font-bold">
              {summary.activeOrganizations}
            </div>
            <p className="text-xs text-muted-foreground">Default + 2 invited</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* team members */}
            <div className="text-2xl font-bold">{summary.teamMembers}</div>
            <p className="text-xs text-muted-foreground">
              Across all organizations
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
