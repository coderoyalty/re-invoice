import { redirect } from "next/navigation";
import RegistrationForm from "./form";
import { auth } from "@/lib";

export default async () => {
  const { user } = await auth();

  if (user !== null) {
    return redirect("/");
  }

  return (
    <>
      <div className="min-h-dvh flex items-center">
        <RegistrationForm />
      </div>
    </>
  );
};
