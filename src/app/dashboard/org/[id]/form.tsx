"use client";
import { CountriesCombobox } from "@/app/onboarding/components";
import { businessProfileSchema } from "@/app/onboarding/form";
import LoadingBtn from "@/components/LoadingBtn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createBusinessProfileAction } from "./actions";
import { toast } from "@/hooks/use-toast";
import { useServerAction } from "zsa-react";

type BusinessProfileFormProps = {
  orgId: string;
};

export function BusinessProfileForm({ orgId }: BusinessProfileFormProps) {
  const form = useForm<z.infer<typeof businessProfileSchema>>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {},
  });

  const { execute, isPending, error } = useServerAction(
    createBusinessProfileAction,
    {
      onSuccess() {
        toast({
          title: "Hurray, we did it 🙌",
          description: "Your business profile has been created",
        });
      },
      onError({ err }) {
        toast({
          title: "We encountered an error",
          description: err.message,
        });
      },
    }
  );

  const onSubmit: SubmitHandler<z.infer<typeof businessProfileSchema>> = async (
    values
  ) => {
    execute({ ...values, orgId });
  };

  return (
    <Form {...form}>
      <form
        className="w-full p-1 sm:p-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-4">
          <div className="grid sm:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g jane@business.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="grid sm:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <CountriesCombobox
                        value={field.value}
                        setValue={(value) => {
                          form.setValue(field.name, value, {
                            shouldValidate: true,
                          });
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressLine2"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <FormLabel>Address Line 2 (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="websiteUrl"
            render={({ field }) => (
              <FormItem>
                <div className="grid gap-2">
                  <FormLabel>Website URL (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingBtn loading={isPending} type="submit">
            Submit
          </LoadingBtn>
        </div>
      </form>
    </Form>
  );
}
