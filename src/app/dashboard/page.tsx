import React from "react";
import UserDropDown from "@/components/dashboard/user-dropdown";
import RecentInvoiceSkeleton from "@/components/ui/skeletons/recent-invoice";
import RecentInvoice from "../../components/dashboard/recent-invoice";
import SummaryCards from "@/components/dashboard/summary-cards";
import SummaryCardsSkeleton from "@/components/ui/skeletons/summary-cards";
import { auth } from "@/lib";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { user } = await auth();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="w-full flex items-center">
          <div className="flex-grow flex flex-col">
            <h1 className="text-xl md:text-2xl xl:text-3xl font-bold">
              Welcome Back!
            </h1>
            <span className="text-muted-foreground max-[340px]:sr-only">
              Here's an insight of your data for this month
            </span>
          </div>
          {/* avatar */}
          <div className="flex-none">
            <UserDropDown user={user} />
          </div>
        </div>
        <div className="bg-primary-foreground py-4 px-1 sm:px-2 md:px-3 lg:px-4 rounded-md shadow-md">
          <React.Suspense fallback={<SummaryCardsSkeleton />}>
            <SummaryCards />
          </React.Suspense>
          <React.Suspense fallback={<RecentInvoiceSkeleton />}>
            <RecentInvoice />
          </React.Suspense>
        </div>
      </div>
    </>
  );
}
