import React from "react";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps =
  | React.ComponentProps<typeof Button> & {
      loading?: boolean;
    };

const LoadingBtn: React.FC<ButtonProps> = ({
  loading = false,
  children,
  ...props
}) => {
  return (
    <>
      <Button
        {...props}
        className={cn(
          "font-semibold text-xs md:text-xs xl:text-base p-1 md:p-1.5 xl:p-2",
          props.className
        )}
        disabled={props.disabled || loading}
      >
        {loading && !props.disabled && (
          <Loader className="mr-0.5 w-4 h-4 animate-spin" />
        )}
        {children}
      </Button>
    </>
  );
};

export default LoadingBtn;
