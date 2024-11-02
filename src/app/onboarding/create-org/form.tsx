"use client";
import { createOrg } from "@/actions/org";
import LoadingBtn from "@/components/LoadingBtn";
import {
  Card,
  CardContent,
  CardDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { auth } from "@/lib";
import { extractFirstName } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(40),
  type: z.enum(["individual", "organisation"]),
});

type AwaitedReturnTypeNonNullable<
  T extends (...args: any) => any,
  F extends keyof Awaited<ReturnType<T>>
> = Awaited<ReturnType<T>>[F] & {};

type FormFieldType = z.infer<typeof formSchema>;

type DefaultOrgFormProps = {
  user: AwaitedReturnTypeNonNullable<typeof auth, "user">;
};

export default function CreateOrgForm({ user }: DefaultOrgFormProps) {
  const [isLoading, setLoading] = React.useState(false);
  const form = useForm<FormFieldType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `${extractFirstName(user.displayName)}'s organisation`,
      type: "individual",
    },
  });

  const onSubmit: SubmitHandler<FormFieldType> = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      for (const [name, value] of Object.entries({
        ...data,
        userId: user.id,
      })) {
        formData.append(name, value);
      }

      const res = await fetch("/api/organisations", {
        method: "POST",
        body: formData,
      });

      toast({
        title: "Hurray, we did it 🙌",
        description: "Congrats, You've created your first organisation",
      });
    } catch (err: any) {
      toast({
        title: "We encountered an error",
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
            <CardTitle className="text-3xl sm:text-2xl">
              Create Default Organisation
            </CardTitle>
            <CardDescription>
              Enter your details below to create your default organisation
            </CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <FormLabel>Organisation Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g Jane's Organisation"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type</FormLabel>

                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={(value) => {
                            form.setValue(field.name, value as any);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">
                              Individual
                            </SelectItem>
                            <SelectItem value="organisation">
                              Organisation
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <LoadingBtn
                  loading={isLoading}
                  type="submit"
                  className="w-full"
                >
                  Submit
                </LoadingBtn>
              </div>
            </CardContent>
          </form>
        </Card>
      </Form>
    </>
  );
}
