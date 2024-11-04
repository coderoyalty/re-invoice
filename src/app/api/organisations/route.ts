import { createOrg } from "@/actions/org";
import { auth } from "@/lib";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { user } = await auth();

  if (!user) {
    return redirect("/login");
  }

  const formData = await req.formData();
  formData.append("userId", user.id);

  const { org } = await createOrg(formData);

  return redirect("/dashboard");
}
