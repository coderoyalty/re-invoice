import { authUnsafe } from "@/lib";
import CreateOrgForm from "./form";

export default async function () {
  const { user } = await authUnsafe();

  return (
    <>
      <div className="container h-[80dvh] flex items-center justify-center">
        <CreateOrgForm user={user} />
      </div>
    </>
  );
}
