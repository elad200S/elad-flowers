import Hero from "@/components/home/Hero";
import EditorialIntro from "@/components/home/EditorialIntro";
import CategoryCircles from "@/components/home/CategoryCircles";
import CategorySquares from "@/components/home/CategorySquares";
import NewArrivalsGrid from "@/components/home/NewArrivalsGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <EditorialIntro />
      <CategoryCircles />
      <CategorySquares />
      <NewArrivalsGrid />
    </>
  );
}
