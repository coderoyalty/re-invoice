import React from "react";

import SummaryCards from "@/components/dashboard/summary-cards";
import { auth } from "@/lib";
import { redirect } from "next/navigation";
import QuickAction from "@/components/dashboard/quick-action";
import RecentInvoiceTable from "../../components/dashboard/recent-invoice";

export default async function Dashboard() {
  const { user } = await auth();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-8 px-2">
        <div className="w-full flex items-center">
          <div className="flex-grow flex flex-col">
            <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">
              Welcome Back!
            </h1>
            <span className="text-muted-foreground max-[340px]:sr-only">
              Here's an insight of your data for this month
            </span>
          </div>
        </div>
        <section className="bg-primary-foreground py-4 px-1 sm:px-2 md:px-3 lg:px-4 rounded-md shadow-md">
          <SummaryCards
            defaultOrg={
              user.activeOrganisation?.id ?? user.defaultOrganisation?.id ?? ""
            }
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <RecentInvoiceTable
              className="md:col-span-4"
              defaultOrg={
                user.activeOrganisation?.id ??
                user.defaultOrganisation?.id ??
                ""
              }
            />
            <QuickAction className="md:col-span-4 lg:col-span-3 self-start lg:top-20 lg:sticky" />
          </div>
        </section>
      </div>
    </>
  );
}
