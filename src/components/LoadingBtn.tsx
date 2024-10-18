import React from "react";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

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
      <Button {...props} disabled={props.disabled || loading}>
        {loading && !props.disabled && (
          <Loader className="mr-2 w-4 h-4 animate-spin" />
        )}
        {children}
      </Button>
    </>
  );
};

export default LoadingBtn;
