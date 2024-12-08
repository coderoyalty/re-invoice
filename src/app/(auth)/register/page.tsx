import { redirect } from "next/navigation";
import RegistrationForm from "./form";
import { auth } from "@/lib/auth";

export default async () => {
  const { userId } = await auth();

  if (userId !== null) {
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
