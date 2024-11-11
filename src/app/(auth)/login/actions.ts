"use server";
import { signIn } from "@/actions/auth";
import { loginSchema } from "@/app/_lib/definitions";
import { rateLimitByIp } from "@/lib/rate-limiter";
import { unauthenticatedAction } from "@/lib/safe-action";
import { setSession } from "@/lib/server/session";
import { redirect } from "next/navigation";

const schema = loginSchema;

export const loginAction = unauthenticatedAction
  .createServerAction()
  .input(schema)
  .handler(async ({ input }) => {
    await rateLimitByIp({ key: "sign-in", limit: 3, window: 30_000 });
    const id = await signIn(input);
    await setSession(id);

    redirect("/dashboard");
  });
