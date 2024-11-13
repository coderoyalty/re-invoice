import { assertAuth } from "@/lib";
import OnboardingForm from "./form";

export default async function () {
  return (
    <>
      <div className="container h-[80dvh] flex items-center justify-center">
        <OnboardingForm />
      </div>
    </>
  );
}
