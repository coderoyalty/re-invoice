import { CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import ComingSoon from "./ComingSoon";

export default function Pricing() {
  return (
    <>
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
            Simple Pricing
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 place-items-center mx-auto">
            <PricingCard
              title="Free"
              description="Perfect for small businesses"
              price="$0"
              features={[
                "Up to 5 invoices per month",
                "Basic templates",
                "Email support",
              ]}
              buttonLabel="Get Started"
            />
            <PricingCard
              title="Pro"
              description="For growing businesses"
              price="$29"
              features={[
                "Unlimited invoices",
                "Custom templates",
                "Priority support",
              ]}
              buttonLabel="Get Started"
              customColor={{
                bg: "bg-blue-600 text-white dark:bg-blue-700",
                desc: "text-blue-100",
                btn: "bg-white text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-200",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

type PricingCardProps = {
  title: string;
  description: string;
  price: string;
  features: string[];
  buttonLabel: string;
  customColor?: {
    bg: string;
    desc: string;
    btn: string;
  };
};

export function PricingCard({
  title,
  description,
  price,
  features,
  buttonLabel,
  customColor,
}: PricingCardProps) {
  return (
    <div
      className={`flex flex-col p-6 rounded-lg shadow-lg dark:bg-gray-800 w-full max-w-xs ${
        customColor?.bg ?? "bg-white"
      }`}
    >
      <ComingSoon />
      <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>
      <p
        className={`text-center mb-4 ${
          customColor?.desc ?? "text-gray-500 dark:text-gray-400"
        }`}
      >
        {description}
      </p>
      <p className="text-4xl font-bold text-center mb-6">
        {price}
        <span className="text-sm font-normal">/month</span>
      </p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className={`mt-auto ${customColor?.btn ?? ""}`} disabled>
        {buttonLabel}
      </Button>
    </div>
  );
}
