import { createOrganisation } from "@/lib/users/data";

export async function createOrg(formData: FormData) {
  const { name, type, userId } = Object.fromEntries(formData.entries());

  const org = await createOrganisation({
    userId: userId.toString(),
    orgName: name.toString(),
    businessType: type.toString(),
  });

  return org;
}
