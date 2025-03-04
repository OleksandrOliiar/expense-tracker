import Contact7 from "./components/Contact";
import CTA10 from "./components/Cta";
import Faq1 from "./components/Faq";
import Features from "./components/Features";
import Footer2 from "./components/Footer";
import Hero7 from "./components/Hero";
import Navbar1 from "./components/Navbar";
import PricingServer from "./components/PricingServer";
import Testimonial10 from "./components/Testimonials";

const Home = async () => {
  return (
    <>
     
      <Hero7 />
      <Features />
      <Testimonial10 />
      <PricingServer />
      <Faq1 />
      <CTA10 />
      <Contact7 />
      <Footer2 />
    </>
  );
};

export default Home;
