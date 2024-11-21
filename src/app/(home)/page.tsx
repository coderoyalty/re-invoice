import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { auth } from "@/lib/auth";

export default async function Home() {
  const { userId } = await auth();
  return (
    <>
      <Hero authenticated={userId ? true : false} />
      <Features />
      <Pricing />
      <Testimonials />
    </>
  );
}
