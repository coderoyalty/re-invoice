import Link from "next/link";
import ComingSoon from "./ComingSoon";
import { Button } from "./ui/button";
import clsx from "clsx";
import { Inconsolata } from "next/font/google";

export const inconsolata = Inconsolata({
  subsets: ["latin"],
});

export default function Hero() {
  return (
    <>
      <section className="w-full min-h-[70dvh] flex items-center py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <ComingSoon />
              <h1
                className={clsx(
                  "text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none",
                  inconsolata.className
                )}
              >
                Create Professional Invoices in Minutes
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Invoicely helps you generate, manage, and send invoices
                effortlessly. Save time and get paid faster.
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild className={`"bg-green-500 hover:bg-green-600"`}>
                <Link href="/login">Get Started for Free</Link>
              </Button>
              <Button variant="outline" disabled>
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
