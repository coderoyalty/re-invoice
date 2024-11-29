import ManageOrgCard from "@/components/dashboard/manage-org";

export default function () {
  return (
    <>
      <div className="max-w-5xl mx-auto space-y-8 px-2 md:px-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 px-4 max-sm:px-6">
          <h1 className="text-xl md:text-2xl xl:text-3xl font-semibold">
            Manage Organisations
          </h1>
        </div>
        <section className="bg-primary-foreground py-4 px-2 sm:px-3 lg:px-4 rounded-md shadow-md">
          <ManageOrgCard />
        </section>
      </div>
    </>
  );
}
