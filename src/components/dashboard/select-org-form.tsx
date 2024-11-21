"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { fetchUserOrgs } from "@/lib/dashboard/data";
import React from "react";
import { useServerAction } from "zsa-react";
import { setActiveOrganisation } from "@/actions/dashboard";
import { toast } from "@/hooks/use-toast";

interface SelectOrgFormProps {
  organisations: Awaited<ReturnType<typeof fetchUserOrgs>>["organisations"];
  defaultOrg: SelectOrgFormProps["organisations"][0];
}
const SelectOrgForm: React.FC<SelectOrgFormProps> = ({
  organisations,
  defaultOrg,
}) => {
  const [value, setValue] = React.useState(defaultOrg.id);

  const { execute, isPending } = useServerAction(setActiveOrganisation);

  const handleOnValueChange = async (value: string) => {
    try {
      await execute({ orgId: value });
      setValue(value);
    } catch (err) {
      toast({
        variant: "destructive",
        description: "'Failed to update organisation",
      });
    }
  };

  return (
    <>
      <form>
        <Select
          name="currentOrg"
          defaultValue={defaultOrg.id}
          value={value}
          onValueChange={handleOnValueChange}
          disabled={isPending}
        >
          <SelectTrigger className="w-[176px]">
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
