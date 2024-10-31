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

type AwaitedReturnType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;

interface UserDropDownProps {
  user: AwaitedReturnType<typeof auth>["user"] & {};
}

const UserDropDown: React.FC<UserDropDownProps> = ({ user }) => {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer text-secondary-foreground hover:bg-primary-foreground px-4 py-2 rounded-md h-auto flex items-center space-x-2">
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src="/placeholder-user.jpg"
                alt={`${user.displayName}`}
              />
              <AvatarFallback>
                {slugifyInitials(user.displayName)}
              </AvatarFallback>
            </Avatar>
          </Button>
          <div>{user.displayName}</div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Manage Organizations</DropdownMenuItem>
        <DropdownMenuItem>Account Settings</DropdownMenuItem>
        <DropdownMenuItem
          className="hover:bg-red-600"
          onClick={async () => {
            await signOut();

            router.push("/login");
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
