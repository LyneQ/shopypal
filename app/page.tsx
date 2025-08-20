import Hero from "./components/Hero";
import Features from "./components/Features";
import Categories from "./components/Categories";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <Features />
      <Categories />
    </div>
  );
}
