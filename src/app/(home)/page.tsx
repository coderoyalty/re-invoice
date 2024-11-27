import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { auth } from "@/lib";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await auth();

  if (user) {
    return redirect("dashboard");
  }

  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
    </>
  );
}
