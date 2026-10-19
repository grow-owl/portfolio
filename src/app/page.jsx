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

import { getCmsData } from "../lib/cms";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [reels, projects, categories] = await Promise.all([
    getCmsData("reels"),
    getCmsData("projects"),
    getCmsData("categories"),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PlatformMarquee />
        <Services sectionNumber="/002/" isLanding={true} />
        <VideoSolutions sectionNumber="/003/" categories={categories} />
        <WatchOurWork sectionNumber="/004/" videos={reels} />
        <Work sectionNumber="/005/" initialProjects={projects} />
        <Collaborations />
        <ClientMarquee />
      </main>
      <Footer />
    </>
  );
}

