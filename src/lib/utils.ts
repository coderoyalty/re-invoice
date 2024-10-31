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

export function slugifyInitials(text: string): string {
  return text
    .trim()
    .split(/\s+/) // Split by spaces
    .map((word) => word[0]?.toUpperCase() || "") // Get the first letter of each word and capitalize it
    .join(""); // Join them without spaces or hyphens
}

export function getRelativeMonthAndDays(monthOffset: number | undefined = 0) {
  const date = new Date();

  const targetDate = new Date(
    date.getFullYear(),
    date.getMonth() + monthOffset,
    1
  );

  const currentMonth = targetDate.getMonth() + 1;
  const firstDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), 1);
  const lastDay = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth() + 1,
    0
  );

  return { currentMonth, firstDay, lastDay };
}

export function getPercentDiff(newValue: number, oldValue: number) {
  if (oldValue === 0) {
    return newValue === 0 ? 0.0 : 100.0;
  }
  return ((newValue - oldValue) / oldValue) * 100.0;
}
