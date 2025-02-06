import PermissionGuard from "@/components/auth/permission-guard";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchMembers } from "@/lib/dashboard/data";
import { cn } from "@/lib/utils";
import Link from "next/link";

async function MembersTable({ orgId }: { orgId: string }) {
  const members = await fetchMembers(orgId);

  return (
    <>
      {members.map((member) => (
        <TableRow key={member.id}>
          <TableCell className="font-semibold">
            <Link href={`/dashboard/members/${member.id}`}>
              {member.user.displayName}
            </Link>
          </TableCell>
          <TableCell className="font-semibold text-center">
            {member.user.email}
          </TableCell>
          <TableCell className="font-semibold text-center">
            <span
              className={cn(
                buttonVariants({ size: "sm", variant: "outline" }),
                "cursor-default uppercase"
              )}
            >
              {member.role.name}
            </span>
          </TableCell>
          <PermissionGuard action="VIEW" entity="USER" orgId={orgId}>
            <TableCell className="font-semibold  uppercase text-sm text-center">
              <Button
                disabled={member.role.name.toLowerCase() === "owner"}
                size={"sm"}
                variant={"destructive"}
              >
                Block
              </Button>
            </TableCell>
          </PermissionGuard>
        </TableRow>
      ))}
    </>
  );
}

export default function OrganizationMembers({ orgId }: { orgId: string }) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="text-base uppercase">
                  <TableHead>Name</TableHead>
                  <TableHead className="text-center">Email</TableHead>
                  <TableHead className="text-center">Role</TableHead>
                  <PermissionGuard action="VIEW" entity="USER" orgId={orgId}>
                    <TableHead className="text-center">Action</TableHead>
                  </PermissionGuard>
                </TableRow>
              </TableHeader>
              <TableBody>
                <MembersTable orgId={orgId} />
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
