import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Plus, Download, Users } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import React from "react";
import { Protect } from "../control-component";
import { hasPermissions } from "@/lib/permissions";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface QuickActionProps extends React.ComponentPropsWithRef<typeof Card> {}

const QuickAction: React.FC<QuickActionProps> = (props) => {
  return (
    <>
      <Card {...props}>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage invoices and team.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Protect
            condition={(has) => {
              return hasPermissions(
                has,
                ["org:invoices:create", "org:members:invite"],
                true
              );
            }}
            fallback={
              <>
                <p className="text-xl uppercase text-center text-secondary-foreground">
                  Your role does not grant you an access to this
                </p>
              </>
            }
          >
            <Link
              href={"dashboard/invoice/new"}
              className={cn(buttonVariants(), "w-full")}
            >
              <Plus className="mr-2 h-4 w-4" /> Create New Invoice
            </Link>
            <Button variant={"outline"} className={cn("w-full")}>
              <Download className="mr-2 h-4 w-4" /> Download Reports
            </Button>
            <Button variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" /> Invite Team Member
            </Button>
          </Protect>
        </CardContent>
      </Card>
    </>
  );
};

export default QuickAction;
