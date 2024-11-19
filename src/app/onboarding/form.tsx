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
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { defaultOrgAction } from "./actions";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Stepper } from "@/components/stepper";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { onboardingSchema, OnboardingSchemaType } from "@/app/_lib/definitions";
import { CountriesCombobox } from "./components";

const createOrgSchema = onboardingSchema.pick({
  name: true,
  type: true,
});

const businessProfileSchema = onboardingSchema.omit({
  name: true,
  type: true,
});

const DefaultOrgForm = ({
  data,
  updateData,
  gotoNextForm,
}: {
  data: z.infer<typeof createOrgSchema>;
  updateData: React.Dispatch<React.SetStateAction<OnboardingSchemaType>>;
  gotoNextForm: () => void;
}) => {
  const form = useForm<typeof data>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: data,
  });

  const onSubmit: SubmitHandler<typeof data> = (data) => {
    updateData((value) => ({ ...value, ...data }));
    gotoNextForm();
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

                <LoadingBtn type="submit" className="w-full">
                  Next
                </LoadingBtn>
              </div>
            </CardContent>
          </form>
        </Card>
      </Form>
    </>
  );
};

const BusinessProfileForm = ({
  data,
  updateData,
  gotoPrevious,
  gotoNext,
}: {
  data: z.infer<typeof businessProfileSchema>;
  updateData: React.Dispatch<React.SetStateAction<OnboardingSchemaType>>;
  gotoPrevious: () => void;
  gotoNext: () => void;
}) => {
  const form = useForm<typeof data>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: data,
  });

  const handleSubmit: SubmitHandler<typeof data> = (data) => {
    updateData((value) => {
      return {
        ...value,
        ...data,
      };
    });

    gotoNext();
  };

  return (
    <>
      <Form {...form}>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle className="text-3xl sm:text-2xl">
              Business Profile
            </CardTitle>
            <CardDescription>Enter your business details below</CardDescription>
          </CardHeader>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <CardContent>
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

                <div className="grid sm:grid-cols-2 gap-2">
                  <LoadingBtn
                    variant={"outline"}
                    onClick={() => {
                      const formValues = form.getValues();
                      updateData((value) => ({ ...value, ...formValues }));
                      gotoPrevious();
                    }}
                  >
                    Previous
                  </LoadingBtn>
                  <LoadingBtn type="submit">Submit</LoadingBtn>
                </div>
              </div>
            </CardContent>
          </form>
        </Card>
      </Form>
    </>
  );
};

const OnboardingForm = () => {
  const [data, setData] = useState<OnboardingSchemaType>({
    name: "my organisation",
    type: "individual",

    emailAddress: "",
    firstName: "",
    lastName: "",

    city: "",
    country: "",
    postalCode: "",
    state: "",

    addressLine1: "",
    addressLine2: "",
    websiteUrl: undefined,
  });

  const [index, setIndex] = useState(1);

  const { execute, isPending, error } = useServerAction(defaultOrgAction, {
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

  // Trigger the submit
  React.useEffect(() => {
    if (index === 3) {
      execute(data);
    }
  }, [index]);

  React.useEffect(() => {
    if (error) {
      setIndex(1);
    }
  }, [error]);

  return (
    <div className="space-y-8 max-w-sm sm:max-w-lg">
      <Stepper amount={2} currentStep={index} />
      {index === 1 && (
        <DefaultOrgForm
          data={{ name: data.name, type: data.type }}
          updateData={setData}
          gotoNextForm={() => setIndex(2)}
        />
      )}
      {index === 2 && (
        <ScrollArea className="h-96 sm:px-6 py-4">
          <BusinessProfileForm
            data={{ ...data }}
            updateData={setData}
            gotoPrevious={() => setIndex(1)}
            gotoNext={() => setIndex(3)}
          />
        </ScrollArea>
      )}

      {index === 3 && (
        <div className="flex flex-col items-center justify-center bg-background text-foreground p-4">
          <div className="w-full max-w-md space-y-8 text-center">
            <CheckCircle className="w-16 h-16 mx-auto text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">
              Setup Complete!
            </h1>
            <p className="text-xl text-muted-foreground">
              Your account has been successfully set up and is ready to use.
            </p>

            <div className="pt-8">
              <div
                className={cn(
                  "w-full cursor-default",
                  buttonVariants({
                    size: "lg",
                    variant: "outline",
                  })
                )}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Preparing Dashboard
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Go To Dashboard
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingForm;
