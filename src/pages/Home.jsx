import Blog from "../components/home/Blog";
import Destinations from "../components/home/Destinations";
import FAQ from "../components/home/FAQ";
import Hero from "../components/home/Hero";
import Whyus from "../components/home/Whyus";

const Home = () => {
  return (
    <div>
      <Hero />
      <Destinations />
      <Whyus />
      <FAQ />
      <Blog />
    </div>
  );
};

export default Home;
