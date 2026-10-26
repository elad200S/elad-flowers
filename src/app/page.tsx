import Hero from "@/components/home/Hero";
import RecommendedCarousel from "@/components/home/RecommendedCarousel";
import CategoryBanners from "@/components/home/CategoryBanners";
import SpecialServices from "@/components/home/SpecialServices";
import VideoGallery from "@/components/home/VideoGallery";
import Testimonials from "@/components/home/Testimonials";
import FinalCta from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <RecommendedCarousel />
      <CategoryBanners />
      <SpecialServices />
      <VideoGallery />
      <Testimonials />
      <FinalCta />
    </>
  );
}
