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
import { Plus, Download, Users, Cross, Ellipsis, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { fetchRecentInvoices } from "@/lib/dashboard/data";
import { AwaitedReturnType } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import RecentInvoiceSkeleton from "../ui/skeletons/recent-invoice";
import Link from "next/link";
import { Badge } from "../ui/badge";
import QuickAction from "./quick-action";

const statusToBadge = (
  status: AwaitedReturnType<typeof fetchRecentInvoices>[0]["status"]
) => {
  switch (status) {
    case "completed":
      return (
        <Badge className="bg-green-500 hover:bg-green-600 lowercase px-1 lg:px-2">
          Completed
          <Check className="ml-1 h-4 w-4" />
        </Badge>
      );
    case "failed":
      return (
        <Badge className="bg-red-600 hover:bg-red-700 lowercase px-1 lg:px-2">
          Failed
          <Cross className="ml-1 h-4 w-4" />
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600 lowercase px-1 lg:px-2">
          Pending
          <Ellipsis className="ml-1 h-4 w-4" />
        </Badge>
      );
    default:
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-600 lowercase px-1 lg:px-2">
          Pending
          <Ellipsis className="ml-1 h-4 w-4" />
        </Badge>
      );
  }
};

interface RecentInvoiceTableProps
  extends React.ComponentPropsWithRef<typeof Card> {
  defaultOrg: string;
}

const RecentInvoiceTable: React.FC<RecentInvoiceTableProps> = ({
  defaultOrg,
  ...props
}: {
  defaultOrg: string;
}) => {
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
      <Card {...props}>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>
            You have created {invoices.length} invoices this month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-center">Invoice</TableHead>
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
                  <TableCell className="text-center">
                    {statusToBadge(inv.status)}
                  </TableCell>
                  <TableCell>{inv.client}</TableCell>
                  <TableCell className="text-right">${inv.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default RecentInvoiceTable;
