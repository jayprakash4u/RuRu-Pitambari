import {
  HomeBestsellers,
  HomeCategories,
  HomeDealer,
  HomeDealsOfDay,
  HomeHero,
  HomePosters,
  HomeTransformation,
} from "@/features/home";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeCategories />
      <HomePosters />
      <HomeDealsOfDay />
      <HomeTransformation />
      <HomeBestsellers />
      <HomeDealer />
    </>
  );
}
