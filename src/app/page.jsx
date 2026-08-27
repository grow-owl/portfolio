import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Work from "../components/Work";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work sectionNumber="/002/" />
        <Testimonials sectionNumber="/003/" />
      </main>
      <Footer />
    </>
  );
}
