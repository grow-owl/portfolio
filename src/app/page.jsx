import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PlatformMarquee from "../components/PlatformMarquee";
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
        <PlatformMarquee />
        <Work sectionNumber="/002/" />
        <Collaborations />
        <ClientMarquee />
      </main>
      <Footer />
    </>
  );
}

