"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { COUNTRIES_LIST } from "../_lib/definitions";
import { ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";

type CountriesComboboxProps<T = string> = {
  value?: T;
  setValue?: (value: T) => void;
};

export function CountriesCombobox({
  value = "",
  setValue = (_: any) => {},
}: CountriesComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between"
            >
              {value
                ? COUNTRIES_LIST.find((country) => country.name === value)?.name
                : "Select country..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <CountryList
              setOpen={setOpen}
              setSelectedCountry={(value) => {
                setValue(value);
              }}
            />
          </PopoverContent>
        </Popover>
      </>
    );
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            {value
              ? COUNTRIES_LIST.find((country) => country.name === value)?.name
              : "Select country..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <CountryList
              setOpen={setOpen}
              setSelectedCountry={(value) => {
                setValue(value);
              }}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

function CountryList({
  setOpen,
  setSelectedCountry,
}: {
  setOpen: (open: boolean) => void;
  setSelectedCountry: (status: string) => void;
}) {
  return (
    <>
      <Command>
        <CommandInput placeholder="Search country..." />
        <CommandList>
          <CommandEmpty>No Country found.</CommandEmpty>
          <CommandGroup>
            {COUNTRIES_LIST.map((country, idx) => (
              <CommandItem
                key={idx}
                value={country.name}
                onSelect={(value) => {
                  setSelectedCountry(value);
                  setOpen(false);
                }}
              >
                {country.name} {country.currency}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
}
