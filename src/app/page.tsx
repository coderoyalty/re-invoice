import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1 dark:bg-black dark:text-white">
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        {/* Add other sections here */}
      </main>
      <Footer />
    </div>
  );
}
