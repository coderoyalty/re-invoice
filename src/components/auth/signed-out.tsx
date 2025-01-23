import { auth } from "@/lib/auth";
import * as React from "react";
export const SignedOut = async ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const { userId } = await auth();

  if (userId) {
    return <></>;
  } else {
    return <>{children}</>;
  }
};
