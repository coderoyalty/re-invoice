import { auth } from "@/lib/auth";
import * as React from "react";
export const SignedIn = async ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { userId } = await auth();

  if (userId) {
    return <>{children}</>;
  } else {
    return <></>;
  }
};
