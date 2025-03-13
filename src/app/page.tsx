import Contact from "./components/Contact";
import CTA from "./components/Cta";
import Faq from "./components/Faq";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import PricingServer from "./components/PricingServer";
import Testimonial from "./components/Testimonials";

const Home = async () => {
  return (
    <>
      <Hero />
      <Features />
      <Testimonial />
      <PricingServer />
      <Faq />
      <CTA />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
