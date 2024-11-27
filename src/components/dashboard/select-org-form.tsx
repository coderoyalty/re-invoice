"use client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { fetchUserOrgs } from "@/lib/dashboard/data";
import React from "react";

interface SelectOrgFormProps {
  organisations: Awaited<ReturnType<typeof fetchUserOrgs>>["organisations"];
  defaultOrg: SelectOrgFormProps["organisations"][0];
}
const SelectOrgForm: React.FC<SelectOrgFormProps> = ({
  organisations,
  defaultOrg,
}) => {
  const router = useRouter();
  const [value, setValue] = React.useState(defaultOrg.id);
  const handleOnValueChange = (value: string) => {
    setValue(value);
    router.push(`?currentOrg=${value}`);
  };

  return (
    <>
      <form>
        <Select
          name="currentOrg"
          defaultValue={defaultOrg.id}
          value={value}
          onValueChange={handleOnValueChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select organization" />
          </SelectTrigger>
          <SelectContent>
            {organisations.map((org) => (
              <SelectItem key={org.id} value={org.id}>
                {org.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </form>
    </>
  );
};

export default SelectOrgForm;
