import { countries } from "countries-list";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export type LoginFormFieldType = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  displayName: z.string().min(2),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const COUNTRIES_LIST = Object.values(countries);

export const onboardingSchema = z.object({
  name: z.string().min(2).max(40),
  type: z.enum(["individual", "organisation"]),

  firstName: z.string().min(2).max(40),
  lastName: z.string().min(2).max(40),
  emailAddress: z.string().email(),

  websiteUrl: z.string().url().optional(),

  addressLine1: z.string().min(5).max(60),
  addressLine2: z.string().optional(),

  postalCode: z.string().min(4),
  city: z.string().min(1),
  state: z.string().min(1),
  country: z
    .string()
    .min(1, { message: "Country is required" })
    .refine(
      (value) => COUNTRIES_LIST.find((country) => country.name === value),
      {
        message: "Invalid Country",
      }
    ),
});

export type SignUpFormFieldType = z.infer<typeof registerSchema>;
export type OnboardingSchemaType = z.infer<typeof onboardingSchema>;
