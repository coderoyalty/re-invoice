"use server";

import { registerSchema } from "@/app/_lib/definitions";
import { rateLimitByIp } from "@/lib/rate-limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { createAccount } from "@/lib/users/data";
import { redirect } from "next/navigation";

const schema = registerSchema;

export const registerAction = unauthenticatedAction
  .createServerAction()
  .input(schema)
  .handler(async ({ input }) => {
    await rateLimitByIp({ key: "register", limit: 3, window: 30_000 });
    await createAccount({ ...input });
    return redirect("/login");
  });
