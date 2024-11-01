"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingBtn from "@/components/LoadingBtn";
import React from "react";
import { toast } from "@/hooks/use-toast";
import { signIn } from "@/actions/auth";
import { LoginFormFieldType, loginSchema } from "@/app/_lib/definitions";
import { PasswordInput } from "@/components/ui/password-input";
import { GoogleLogoIcon } from "@/components/Google";

export default function LoginForm() {
  const [isLoading, setLoading] = React.useState(false);

  const form = useForm<LoginFormFieldType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormFieldType> = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      for (const [name, value] of Object.entries(data)) {
        formData.append(name, value);
      }

      await signIn(formData);

      toast({
        title: "Login Successfully",
      });
    } catch (err: any) {
      toast({
        title: "Something went wrong",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <Card className="mx-auto w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl sm:text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your details below to login to your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid gap-4">
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
                            autoComplete="current-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <LoadingBtn
                  loading={isLoading}
                  type="submit"
                  className="w-full"
                >
                  Login
                </LoadingBtn>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled
                    onClick={() => {}}
                  >
                    {/* TODO: google's icon */}
                    <GoogleLogoIcon className="mr-2 w-5 h-5" />
                    Google
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled
                    onClick={() => {}}
                  >
                    <GitHubLogoIcon className="mr-2 w-5 h-5" />
                    Github
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid">
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline">
                  Sign up
                </Link>
              </div>
              <div className="mt-4 text-center text-sm">
                <Link href="/" className="underline">
                  Go Home
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </Form>
    </>
  );
}
