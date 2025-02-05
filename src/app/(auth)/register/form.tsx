"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { toast } from "@/hooks/use-toast";
import LoadingBtn from "@/components/LoadingBtn";
import React from "react";
import { SignUpFormFieldType, registerSchema } from "@/app/_lib/definitions";
import { PasswordInput } from "@/components/ui/password-input";
import { GoogleLogoIcon } from "@/components/Google";
import { useServerAction } from "zsa-react";
import { registerAction } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export default function RegistrationForm() {
  const { execute, isPending, error } = useServerAction(registerAction, {
    onSuccess() {
      toast({
        title: "Hurray! It was a success!",
        description: "We've created your account for you",
      });
    },
    onError({ err }) {
      toast({
        title: "Unable to Create Account",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<SignUpFormFieldType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignUpFormFieldType> = (values) => {
    execute(values);
  };

  return (
    <>
      <Form {...form}>
        <Card className="mx-auto w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid gap-4">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g Jane Doe" {...field} />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g john@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <div className="flex items-center">
                          <FormLabel>Password</FormLabel>
                          <Link
                            href="/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>
                        <FormControl>
                          <PasswordInput
                            placeholder="e.g Abcd123@"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <LoadingBtn
                  loading={isPending}
                  type="submit"
                  className="w-full"
                >
                  Sign Up
                </LoadingBtn>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled
                    onClick={() => {}}
                  >
                    <GoogleLogoIcon className="mr-2 w-5 h-5" />
                    Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <Link href={"/api/login/github"}>
                      <GitHubLogoIcon className="mr-2 w-5 h-5" />
                      Github
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid">
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </div>
              <div className="mt-4 text-center text-sm">
                <Link href="/" className="underline">
                  Go Home
                </Link>
              </div>
            </CardFooter>
            {error && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Uhoh, we couldn&apos;t log you in</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
          </form>
        </Card>
      </Form>
    </>
  );
}
