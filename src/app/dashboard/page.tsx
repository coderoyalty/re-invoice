"use client";
import React from "react";
import UserDropDown from "@/components/dashboard/user-dropdown";
import RecentInvoiceSkeleton from "@/components/ui/skeletons/recent-invoice";
import RecentInvoice from "../../components/dashboard/recent-invoice";
import SummaryCards from "@/components/dashboard/summary-cards";
import SummaryCardsSkeleton from "@/components/ui/skeletons/summary-cards";

const orgs = [
  { id: "default", name: "My Organization" },
  { id: "org1", name: "Client A Inc." },
  { id: "org2", name: "Client B Ltd." },
  { id: "org2", name: "Client C Inc." },
];

export default function Dashboard() {
  const [selectedOrg, setSelectedOrg] = React.useState("default");

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="w-full flex items-center">
          <div className="flex-grow flex flex-col">
            <h1 className="text-2xl font-bold">Welcome Back!</h1>
            <span className="text-muted-foreground">
              Here's an insight of your data for this month
            </span>
          </div>
          {/* avatar */}
          <div className="flex-none">
            <UserDropDown />
          </div>
        </div>
        <div className="bg-primary-foreground p-4 rounded-md shadow-md">
          <React.Suspense fallback={<SummaryCardsSkeleton />}>
            <SummaryCards />
          </React.Suspense>
          <React.Suspense fallback={<RecentInvoiceSkeleton />}>
            <RecentInvoice organizations={orgs} selectedOrg={selectedOrg} />
          </React.Suspense>
        </div>
      </div>
    </>
  );
}
