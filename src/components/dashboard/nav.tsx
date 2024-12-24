import React from "react";

import { fetchUserOrgs } from "@/lib/dashboard/data";
import SelectOrgForm from "./select-org-form";
import { redirect } from "next/navigation";

const fetchOrgs = React.cache(fetchUserOrgs);

const DashboardNav: React.FC<{}> = async () => {
  const { organisations, currentOrg } = await fetchOrgs();

  if (!currentOrg) {
    return redirect("/onboarding");
  }

  return (
    <nav className="w-full flex items-center gap-4 sm:gap-6">
      <SelectOrgForm organisations={organisations} defaultOrg={currentOrg} />
    </nav>
  );
};

export default DashboardNav;
