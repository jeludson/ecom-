import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import PromoBanner from "@/components/PromoBanner";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Hero />
      <FeaturedProducts />
      <Categories />
      <PromoBanner />
      <Testimonials />
    </div>
  );
}
