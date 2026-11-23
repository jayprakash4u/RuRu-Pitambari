import {
  HomeBestsellers,
  HomeCategories,
  HomeDealer,
  HomeHero,
  HomeTransformation,
} from "@/features/home";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeCategories />
      <HomeTransformation />
      <HomeBestsellers />
      <HomeDealer />
    </>
  );
}
