import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Internship from "../../components/Internship";

export const metadata = {
  title: "Internship Program | Video Editor & Full-Stack Developer | GrowOwl",
  description:
    "Join the 3-month GrowOwl Internship Program for Video Editors & Full-Stack Developers. Work on real projects, get direct 1-on-1 mentorship, and unlock potential full-time career opportunities.",
  keywords: [
    "GrowOwl internship program",
    "video editor internship",
    "full stack developer internship",
    "frontend developer intern",
    "motion graphics internship",
    "web development internship India",
    "remote tech internship",
  ],
  alternates: {
    canonical: "https://www.growowl.online/internship",
  },
  openGraph: {
    title: "Internship Program | Video Editor & Full-Stack Developer | GrowOwl",
    description:
      "A simple, practical 3-month internship program designed around real project work, mentorship, skill development, and career opportunities.",
    url: "https://www.growowl.online/internship",
    siteName: "GrowOwl Studio",
    images: [
      {
        url: "/images/growowl-logo.webp",
        width: 1200,
        height: 630,
        alt: "GrowOwl Internship Program",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.growowl.online",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Internship Program",
          item: "https://www.growowl.online/internship",
        },
      ],
    },
    {
      "@type": "EducationalOccupationalProgram",
      name: "GrowOwl Practical 3-Month Internship",
      description:
        "Practical 3-month internship in Video Editing and Full-Stack Web Development featuring real project deliverables, mentorship, and career pathways.",
      provider: {
        "@type": "Organization",
        name: "GrowOwl Studio",
        url: "https://www.growowl.online",
      },
      timeToComplete: "P3M",
      occupationalCategory: [
        "Video Editor",
        "Full-Stack Web Developer",
        "Frontend Developer",
      ],
    },
  ],
};

export default function InternshipPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Internship sectionNumber="/001/" />
      </main>
      <Footer />
    </>
  );
}
