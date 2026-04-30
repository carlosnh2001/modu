import Hero from "@/components/home/Hero";
import BenefitsSection from "@/components/home/BenefitsSection";
import ProductsGrid from "@/components/home/ProductsGrid";
import WhyModu from "@/components/home/WhyModu";
import HowItWorks from "@/components/home/HowItWorks";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import ShowroomsPreview from "@/components/home/ShowroomsPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BenefitsSection />
      <ProductsGrid />
      <WhyModu />
      <HowItWorks />
      <TestimonialsCarousel />
      <ShowroomsPreview />
    </>
  );
}
