"use server";

import { authenticatedAction } from "@/lib/safe-action";
import { createOrganisation } from "@/lib/users/data";
import { redirect } from "next/navigation";
import { z } from "zod";

export const defaultOrgAction = authenticatedAction
  .createServerAction()
  .input(
    z.object({
      name: z.string().min(1).trim(),
      type: z.enum(["individual", "organisation"]),
    })
  )
  .handler(async ({ input, ctx }) => {
    const org = await createOrganisation({ ...input, userId: ctx.user.id });
    redirect("/dashboard");
  });
