import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { videoCategories } from "../../../data/videoCategoriesData";
import { getCategoryDeepDive } from "../../../data/videoDeepDiveData";
import { CategoryIcon } from "../../../components/VideoCategoryIcons";
import CategoryVideoList from "../../../components/CategoryVideoList";

export async function generateStaticParams() {
  return videoCategories.map((cat) => ({
    category: cat.categorySlug,
  }));
}

export async function generateMetadata({ params }) {
  const { category: categorySlug } = await params;
  const category = videoCategories.find((c) => c.categorySlug === categorySlug);

  if (!category) {
    return {
      title: "Video Marketing Strategy | GrowOwl Studio",
      description: "High-converting short-form video strategies, reel scripts, and production blueprints.",
    };
  }

  const deepDive = getCategoryDeepDive(categorySlug);

  return {
    title: `${category.fullName} - Video Marketing Strategy & Reel Formats | GrowOwl`,
    description: deepDive.metaDescription || `Explore 60-second viral reel blueprints, hooks, and script templates for ${category.fullName}.`,
    alternates: {
      canonical: `https://www.growowl.online/videos/${categorySlug}`,
    },
    openGraph: {
      title: `${category.fullName} - Video Marketing Strategy & Scripts`,
      description: deepDive.heroTagline,
      url: `https://www.growowl.online/videos/${categorySlug}`,
    },
  };
}

export default async function CategoryVideosPage({ params }) {
  const { category: categorySlug } = await params;
  const category = videoCategories.find((c) => c.categorySlug === categorySlug);

  if (!category) {
    notFound();
  }

  const deepDive = getCategoryDeepDive(categorySlug);

  // JSON-LD Schema for rich SEO
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
            name: "Video Solutions",
            item: "https://www.growowl.online/#video-solutions",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: category.fullName,
            item: `https://www.growowl.online/videos/${categorySlug}`,
          },
        ],
      },
      {
        "@type": "Service",
        name: `${category.fullName} Video Production & Marketing`,
        description: deepDive.whyVideoWorks,
        provider: {
          "@type": "Organization",
          name: "GrowOwl Studio",
          url: "https://www.growowl.online",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24 bg-cream min-h-screen">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-ink/60 flex-wrap">
              <li>
                <Link href="/" className="hover:text-accent transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li className="text-ink/30">/</li>
              <li>
                <Link href="/#video-solutions" className="hover:text-accent transition-colors font-medium">
                  Video Content
                </Link>
              </li>
              <li className="text-ink/30">/</li>
              <li className="text-accent font-semibold truncate max-w-[200px] sm:max-w-none">
                {category.name}
              </li>
            </ol>
          </nav>

          {/* Page Heading */}
          <div className="text-center max-w-[900px] mx-auto mb-10 sm:mb-14">
            <h1 className="text-[clamp(28px,4.2vw,48px)] font-sans font-bold leading-[1.2] tracking-[-0.03em] text-ink">
              Video Formats For{" "}
              <span className="text-accent font-serif italic font-medium">
                {category.fullName}
              </span>
            </h1>
          </div>

          {/* Interactive Format List with Real Playable Reference Reels & Read More */}
          <CategoryVideoList category={category} />

          {/* Recommended Content Mix Strategy Section (e.g. for Dental Clinics) */}
          {category.recommendedContentMix && category.recommendedContentMix.length > 0 && (
            <div className="bg-gradient-to-br from-white via-card to-cream rounded-3xl sm:rounded-[36px] border border-ink/10 p-6 sm:p-10 lg:p-12 mb-14 sm:mb-20 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
              <div className="max-w-[760px] mb-8">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-accent px-3 py-1 bg-accent/10 rounded-full mb-3">
                  Strategic Content Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight mb-2">
                  Recommended Content Mix Strategy
                </h3>
                <p className="text-xs sm:text-sm text-ink/70 leading-relaxed">
                  To turn Instagram viewers into booked clinic appointments, we recommend balancing high-reach top-of-funnel entertainment with mid-funnel doctor authority and conversion-focused social proof.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.recommendedContentMix.map((mix, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-4 sm:p-5 rounded-2xl bg-white/80 border border-ink/8 shadow-xs hover:border-accent/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-5 h-5 rounded-full bg-accent/10 text-accent font-bold text-xs flex items-center justify-center shrink-0">
                        {mIdx + 1}
                      </span>
                      <h4 className="text-sm font-bold text-ink">{mix.format}</h4>
                    </div>
                    <p className="text-xs text-ink/65 leading-relaxed">{mix.purpose}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom All Categories Navigation Bar */}
          <div className="bg-card rounded-3xl border border-ink/10 p-6 sm:p-8 text-center shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            <h3 className="text-base sm:text-lg font-bold text-ink mb-4">
              Explore Video Strategies for Other Industries
            </h3>
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              {videoCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/videos/${cat.categorySlug}`}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    cat.categorySlug === categorySlug
                      ? "bg-accent text-white shadow-sm"
                      : "bg-ink/5 text-ink/75 hover:bg-ink/10 hover:text-ink"
                  }`}
                >
                  <CategoryIcon
                    name={cat.iconName}
                    className={`w-3.5 h-3.5 ${
                      cat.categorySlug === categorySlug ? "text-white" : "text-accent"
                    }`}
                  />
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
