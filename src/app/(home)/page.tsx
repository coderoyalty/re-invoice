import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import { auth } from "@/lib";

export default async function Home() {
  const { user } = await auth();
  return (
    <>
      <Hero authenticated={user ? true : false} />
      <Features />
      <Pricing />
      <Testimonials />
    </>
  );
}
