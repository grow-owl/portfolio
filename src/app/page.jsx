import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PlatformMarquee from "../components/PlatformMarquee";
import Services from "../components/Services";
import VideoSolutions from "../components/VideoSolutions";
import WatchOurWork from "../components/WatchOurWork";
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
        <Services sectionNumber="/002/" isLanding={true} />
        <VideoSolutions sectionNumber="/003/" />
        <WatchOurWork sectionNumber="/004/" />
        <Work sectionNumber="/005/" />
        <Collaborations />
        <ClientMarquee />
      </main>
      <Footer />
    </>
  );
}

