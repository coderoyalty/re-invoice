import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Organization = {
  id: string;
  name: string;
};

export interface DashboardNavType {
  organizations: Organization[];
  setSelectedOrg?: React.Dispatch<React.SetStateAction<Organization["id"]>>;
  selectedOrg?: Organization["id"];
}

const DashboardNav: React.FC<DashboardNavType> = ({
  organizations,
  setSelectedOrg = () => {},
  selectedOrg = "",
}) => {
  return (
    <nav className="ml-auto flex items-center gap-4 sm:gap-6">
      <Select value={selectedOrg} onValueChange={setSelectedOrg}>
        <SelectTrigger className="w-[176px]">
          <SelectValue placeholder="Select organization" />
        </SelectTrigger>
        <SelectContent>
          {organizations.map((org) => (
            <SelectItem key={org.id} value={org.id}>
              {org.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </nav>
  );
};

export default DashboardNav;
