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
import { Skeleton } from "@/components/ui/skeleton";

interface RecentInvoiceSkeletonProps {
  className?: string;
}

export default function RecentInvoiceSkeleton(
  props: RecentInvoiceSkeletonProps
) {
  const invoices = Array.from({ length: 10 });

  return (
    <>
      <Card className={props.className}>
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
                <TableHead className="w-[100px] text-center">Invoice</TableHead>
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
    </>
  );
}
