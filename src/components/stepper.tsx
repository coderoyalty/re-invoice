import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";
import { CheckIcon } from "lucide-react";
import React from "react";

export const Stepper = ({
  amount,
  currentStep = 1,
}: {
  amount: number;
  currentStep?: number;
}) => {
  const steps = Array.from({ length: amount }, (_, i) => i + 1);

  return (
    <>
      <div className="w-full mx-auto">
        <div className="flex items-center">
          {steps.map((_, index) => {
            const isCompleted = index < currentStep - 1;
            const isCurrent = index === currentStep - 1;

            return (
              <>
                <React.Fragment key={index}>
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200",
                      isCompleted
                        ? "bg-blue-600 text-primary-foreground"
                        : isCurrent
                        ? "bg-blue-600 text-primary-foreground"
                        : "bg-blue-300 text-white"
                    )}
                  >
                    {isCompleted ? (
                      <CheckIcon className="w-6 h-6" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <Separator
                      className={cn(
                        "flex-1 h-0.5 transition-all duration-200 mx-2",
                        index < currentStep - 1 ? "bg-blue-700" : "bg-blue-300"
                      )}
                    />
                  )}
                </React.Fragment>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
