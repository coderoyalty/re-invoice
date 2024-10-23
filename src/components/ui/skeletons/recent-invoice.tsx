import SummarySection from "@/components/dashboard/summary-cards";
import UserDropDown from "@/components/dashboard/user-dropdown";
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
import { Skeleton } from "@/components/ui/skeleton";

const orgs = [
  { id: "default", name: "My Organization" },
  { id: "org1", name: "Client A Inc." },
  { id: "org2", name: "Client B Ltd." },
  { id: "org2", name: "Client C Inc." },
];

export default function RecentInvoiceSkeleton() {
  const invoices = Array.from({ length: 10 });

  return (
    <>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
            <CardDescription>
              <Skeleton className="w-full h-6" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-center">
                  <TableHead className="w-[100px] text-center">
                    Invoice
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Client</TableHead>
                  <TableHead className="text-center">Amount</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {invoices.map((_, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      <Skeleton className="w-full h-6" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-6" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="w-full h-6" />
                    </TableCell>
                    <TableCell className="text-right">
                      <Skeleton className="w-full h-6" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="md:col-span-4 lg:col-span-3 self-start lg:top-20 lg:sticky">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              <Skeleton className="w-full h-6" />
            </CardDescription>
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
