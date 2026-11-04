import Hero from "@/components/home/Hero";
import Advantages from "@/components/home/Advantages";
import RecommendedTabs from "@/components/home/RecommendedTabs";
import CategoryCircles from "@/components/home/CategoryCircles";
import CategorySquares from "@/components/home/CategorySquares";
import EventCollections from "@/components/home/EventCollections";
import Testimonials from "@/components/home/Testimonials";
import EditorialIntro from "@/components/home/EditorialIntro";

export default function Home() {
  return (
    <>
      <Hero />
      <Advantages />
      <RecommendedTabs />
      <CategoryCircles />
      <CategorySquares />
      <EventCollections />
      <Testimonials />
      <EditorialIntro />
    </>
  );
}
