"use client";
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
import { AwaitedReturnType } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import RecentInvoiceSkeleton from "../ui/skeletons/recent-invoice";
import Link from "next/link";

export default function RecentInvoice({ defaultOrg }: { defaultOrg: string }) {
  // const recentInvoices = await fetchRecentInvoices("");

  const [invoices, setInvoices] = React.useState<
    AwaitedReturnType<typeof fetchRecentInvoices>
  >([]);

  const [state, setState] = React.useState({
    error: false,
    pending: true,
  });

  const searchParams = useSearchParams();
  const currentOrg = searchParams.get("currentOrg");

  React.useEffect(() => {
    const fetchData = async () => {
      setState({ pending: true, error: false });

      const org = currentOrg ?? defaultOrg;

      const url = `/api/organisations/${org}/invoices/recent`;

      try {
        const req = await fetch(url, { method: "GET" });

        if (!req.ok) {
          throw new Error("Something went wrong");
        }

        const result = await req.json();

        setInvoices(result);
      } catch (err: any) {
        setState((prev) => ({ ...prev, error: true }));
      } finally {
        setState((prev) => ({ ...prev, pending: false }));
      }
    };

    fetchData();
  }, [currentOrg]);

  if (state.pending) {
    return <RecentInvoiceSkeleton />;
  }

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>
              You have created {invoices.length} invoices this month.
            </CardDescription>
            {state.error && (
              <p className="text-red-500">
                We couldn't fetch your recent invoice
              </p>
            )}
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
                {invoices.map((inv) => (
                  <TableRow key={inv.shortId}>
                    <TableCell className="font-medium text-center">
                      <Link
                        className="underline-offset-4 hover:underline"
                        href={`/dashboard/invoices/${inv.id}`}
                      >
                        {inv.shortId}
                      </Link>
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
