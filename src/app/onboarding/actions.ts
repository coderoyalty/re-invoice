"use server";

import { onboardingSchema } from "@/app/_lib/definitions";
import { authenticatedAction } from "@/lib/safe-action";
import { createOrganisation } from "@/lib/users/data";
import { redirect } from "next/navigation";

export const defaultOrgAction = authenticatedAction
  .createServerAction()
  .input(onboardingSchema)
  .handler(async ({ input, ctx }) => {
    const org = await createOrganisation({ ...input, userId: ctx.user.id });
    redirect("/dashboard");
  });
