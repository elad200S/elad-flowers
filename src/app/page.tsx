import Hero from "@/components/home/Hero";
import EditorialIntro from "@/components/home/EditorialIntro";
import CategoryCircles from "@/components/home/CategoryCircles";
import CategorySquares from "@/components/home/CategorySquares";
import EventCollections from "@/components/home/EventCollections";
import BestSellers from "@/components/home/BestSellers";
import NewArrivalsGrid from "@/components/home/NewArrivalsGrid";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <EditorialIntro />
      <CategoryCircles />
      <CategorySquares />
      <EventCollections />
      <BestSellers />
      <NewArrivalsGrid />
      <Testimonials />
    </>
  );
}
