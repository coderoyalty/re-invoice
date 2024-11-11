"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { defaultOrgAction } from "./actions";

const formSchema = z.object({
  name: z.string().min(2).max(40),
  type: z.enum(["individual", "organisation"]),
});

type AwaitedReturnTypeNonNullable<
  T extends (...args: any) => any,
  F extends keyof Awaited<ReturnType<T>>
> = Awaited<ReturnType<T>>[F] & {};

type FormFieldType = z.infer<typeof formSchema>;

export default function CreateOrgForm() {
  const form = useForm<FormFieldType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: `my organisation`,
      type: "individual",
    },
  });

  const { execute, isPending } = useServerAction(defaultOrgAction, {
    onSuccess() {
      toast({
        title: "Hurray, we did it 🙌",
        description: "Congrats, You've created your first organisation",
      });
    },
    onError({ err }) {
      toast({
        title: "We encountered an error",
        description: err.message,
      });
    },
  });

  const onSubmit: SubmitHandler<FormFieldType> = (data) => {
    execute(data);
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
                  loading={isPending}
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
