import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractFirstName(name: string) {
  if (!name) throw new Error("value provided cannot be empty");

  // Get the first name or word in the name
  const firstName = name.split(" ")[0];

  // Convert to lowercase and replace any non-alphanumeric characters with a hyphen
  return firstName.toLowerCase().replace(/[^a-z0-9]/g, "-");
}
