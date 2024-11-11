"use client";
import { signOut } from "@/actions/auth";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib";
import React from "react";
import { useRouter } from "next/navigation";
import { slugifyInitials } from "@/lib/utils";
import { AwaitedReturnType } from "@/lib/types";
import Link from "next/link";

export interface UserDropDownProps {
  user: AwaitedReturnType<typeof auth>["user"] & {};
}

const UserDropDown: React.FC<UserDropDownProps> = ({ user }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/placeholder-user.jpg"
              alt={`${user.displayName}`}
            />
            <AvatarFallback>{slugifyInitials(user.displayName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-base font-semibold leading-none">
              {user.displayName}
            </p>
            <p className="text-sm text-muted-foreground leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/dashboard"}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href={"/dashboard/org"}>Manage Organizations</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          Account Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-red-600 cursor-pointer" asChild>
          <Link
            href={"/"}
            onClick={async (e) => {
              e.preventDefault();
              await signOut();

              router.push("/login");
            }}
          >
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
