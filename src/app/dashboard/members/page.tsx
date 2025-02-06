import { auth } from "@/lib/auth";
import OrganizationMembers from "./org-members";
import { redirect } from "next/navigation";

export default async function () {
  const { userId, orgId } = await auth();
  if (!userId) {
    return redirect("/login");
  }

  if (!orgId) {
    return redirect("/onboarding");
  }

  return (
    <>
      <div className="max-w-4xl xl:max-w-5xl w-full mx-auto space-y-8 px-2 md:px-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 px-4 max-sm:px-6">
          <h1 className="text-xl md:text-2xl xl:text-3xl font-semibold">
            Members
          </h1>
        </div>
        <section className="bg-primary-foreground py-4 px-2 sm:px-3 lg:px-4 rounded-md shadow-md">
          <OrganizationMembers orgId={orgId} userId={userId} />
        </section>
      </div>
    </>
  );
}
