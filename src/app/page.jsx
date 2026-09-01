import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Work from "../components/Work";
import Collaborations from "../components/Collaborations";
import ClientMarquee from "../components/ClientMarquee";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work sectionNumber="/002/" />
        <Collaborations />
        <ClientMarquee />
      </main>
      <Footer />
    </>
  );
}

