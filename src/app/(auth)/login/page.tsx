import { auth } from "@/lib/auth";
import LoginForm from "./form";
import { redirect } from "next/navigation";

export default async () => {
  const { userId } = await auth();

  if (userId !== null) {
    return redirect("/dashboard");
  }

  return (
    <div className="min-h-dvh flex items-center">
      <LoginForm />
    </div>
  );
};
