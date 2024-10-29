import React from "react";

import { fetchUserOrgs } from "@/lib/dashboard/data";
import SelectOrgForm from "./select-org-form";

const fetchOrgs = React.cache(fetchUserOrgs);

const DashboardNav: React.FC<{}> = async () => {
  const { organisations, defaultOrg } = await fetchOrgs();
  return (
    <nav className="ml-auto flex items-center gap-4 sm:gap-6">
      <SelectOrgForm organisations={organisations} defaultOrg={defaultOrg!} />
    </nav>
  );
};

export default DashboardNav;
