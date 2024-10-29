import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Plus, Download, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { fetchRecentInvoices } from "@/lib/dashboard/data";

export default async function RecentInvoice() {
  const recentInvoices = await fetchRecentInvoices("");

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>
              You have created {recentInvoices.length} invoices this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">
                    Invoice
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {recentInvoices.map((inv, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-center">
                      {inv.id}
                    </TableCell>
                    <TableCell className="text-center">{inv.status}</TableCell>
                    <TableCell>{inv.client}</TableCell>
                    <TableCell className="text-right">${inv.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="md:col-span-4 lg:col-span-3 self-start lg:top-20 lg:sticky">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage invoices and team.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Create New Invoice
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" /> Download Reports
            </Button>
            <Button variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" /> Invite Team Member
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
