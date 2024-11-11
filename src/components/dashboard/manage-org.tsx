import React from "react";
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
} from "../ui/table";
import Link from "next/link";
import { fetchOrgsWithDetails } from "@/lib/dashboard/data";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const ManageOrgCard = async () => {
  const organizations = await fetchOrgsWithDetails();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Your Organizations</CardTitle>
          <CardDescription>
            Manage the organizations you're a part of.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Role</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Members
                  </TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead className="text-center">Business Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organizations.map((org) => (
                  <TableRow key={org.id}>
                    <TableCell className="font-medium">
                      <Link href={`/dashboard/org/${org.id}`}>{org.name}</Link>
                      <div className="sm:hidden text-sm text-muted-foreground">
                        Admin • {org.members} members
                        {/*TODO: add role */}
                      </div>
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      Admin
                    </TableCell>

                    <TableCell className="hidden sm:table-cell">
                      {org.members}
                    </TableCell>

                    <TableCell>{org.createdAt.toLocaleString()}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        className={cn(
                          "capitalize py-1",
                          org.businessType === "individual"
                            ? "bg-orange-600"
                            : "bg-rose-600"
                        )}
                      >
                        {org.businessType}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ManageOrgCard;
