"use client";
import { onboardingSchema } from "@/app/_lib/definitions";
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createOrgAction } from "./actions";
import { useServerAction } from "zsa-react";
import { toast } from "@/hooks/use-toast";

const createOrgSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["individual", "organisation"]),
});

export const CreateOrganisationForm = () => {
  const form = useForm<z.infer<typeof createOrgSchema>>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: {
      name: "",
      type: "individual",
    },
  });

  const { execute, isPending } = useServerAction(createOrgAction, {
    onError({ err }) {
      toast({
        variant: "destructive",
        description: err.message,
      });
    },

    onSuccess() {
      toast({
        title: "Hurray, we did it!",
        description: "Your organisation has been successfully created",
      });
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createOrgSchema>> = (values) => {
    execute(values);
  };

  return (
    <>
      <Form {...form}>
        <form
          className="grid gap-4 py-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel>Organisation Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g Jane's Organisation" {...field} />
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
                        <SelectItem value="individual">Individual</SelectItem>
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

            <LoadingBtn loading={isPending} type="submit" className="w-full">
              Submit
            </LoadingBtn>
          </div>
        </form>
      </Form>
    </>
  );
};
