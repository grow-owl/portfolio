import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PlatformMarquee from "../components/PlatformMarquee";
import VideoSolutions from "../components/VideoSolutions";
import Work from "../components/Work";
import WatchOurWork from "../components/WatchOurWork";
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
        <VideoSolutions sectionNumber="/002/" />
        <Work sectionNumber="/003/" />
        <WatchOurWork sectionNumber="/004/" />
        <Collaborations />
        <ClientMarquee />
      </main>
      <Footer />
    </>
  );
}

