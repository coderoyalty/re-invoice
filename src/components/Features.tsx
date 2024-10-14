import { Zap, DollarSign, Shield } from "lucide-react";

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Zap,
    title: "Quick Generation",
    description:
      "Create professional invoices in just a few clicks with our intuitive interface.",
  },
  {
    icon: DollarSign,
    title: "Multiple Currencies",
    description:
      "Support for multiple currencies to cater to your global clientele.",
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description:
      "Bank-level security and compliance with international invoicing standards.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="w-full sm:min-h-[70dvh] py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl text-center mb-12">
          Key Features
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 sm:justify-center md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description }: Feature) {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 border-gray-800 p-4 rounded-lg">
      <Icon className="h-8 w-8 text-blue-500" />
      <h3 className="text-xl font-bold text-center">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-200 text-center">
        {description}
      </p>
    </div>
  );
}
