import LoginForm from "./form";
import { redirect } from "next/navigation";
import { auth } from "@/lib";

export default async () => {
  const { user } = await auth();

  if (user !== null) {
    return redirect("/");
  }

  return (
    <div className="min-h-dvh flex items-center">
      <LoginForm />
    </div>
  );
};
