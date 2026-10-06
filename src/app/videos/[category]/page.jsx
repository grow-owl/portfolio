import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { videoCategories } from "../../../data/videoCategoriesData";
import { getCategoryDeepDive, getVideoTypeExamples } from "../../../data/videoDeepDiveData";
import { CategoryIcon } from "../../../components/VideoCategoryIcons";

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

          {/* Format-by-Format Detailed Sections with 3 Examples Each */}
          <div className="space-y-10 sm:space-y-14 mb-14 sm:mb-20">
            {category.videoTypes.map((video, vIdx) => {
              const examples = getVideoTypeExamples(category.categorySlug, video.id, video);

              return (
                <section
                  key={video.id}
                  id={video.id}
                  className="bg-card rounded-3xl sm:rounded-[36px] border border-ink/10 p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)]"
                >
                  {/* Video Type Section Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 sm:mb-8 border-b border-ink/8">
                    <div className="max-w-[760px]">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-black/5 text-ink/80 font-mono text-[11px] font-bold">
                          ⏱️ {video.duration}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
                        {vIdx + 1}. {video.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-ink/65 mt-1.5 leading-relaxed">
                        {video.subtitle}
                      </p>
                    </div>

                    <Link
                      href={`/videos/${category.categorySlug}/${video.id}`}
                      className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-ink text-white hover:bg-accent font-bold text-xs sm:text-sm transition-all shadow-xs shrink-0 self-start lg:self-center"
                    >
                      <span>View Full 60s Script &amp; Blueprint</span>
                      <span>→</span>
                    </Link>
                  </div>

                  {/* 3 Real Examples / Angles Grid */}
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                      {examples.map((ex, exIdx) => (
                        <Link
                          key={ex.id || exIdx}
                          href={`/videos/${category.categorySlug}/${video.id}`}
                          className="group relative bg-cream/35 rounded-2xl sm:rounded-3xl border border-ink/8 overflow-hidden hover:border-accent/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                        >
                          <div>
                            {/* Thumbnail with overlay - 9:16 Reel Aspect Ratio */}
                            <div className="relative aspect-[9/14] w-full overflow-hidden bg-ink/5">
                              <Image
                                src={ex.image || video.image}
                                alt={ex.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                              {/* Duration badge */}
                              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white font-mono text-[9px] font-semibold">
                                {ex.duration || video.duration}
                              </div>

                              {/* Play Icon */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md text-ink flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            </div>

                            {/* Body */}
                            <div className="p-4 sm:p-5">
                              <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-1">
                                {ex.angle || "Strategic Hook"}
                              </span>
                              <h3 className="text-sm sm:text-base font-bold text-ink group-hover:text-accent transition-colors leading-snug mb-2">
                                {ex.title}
                              </h3>
                              <p className="text-[11px] sm:text-xs text-ink/70 italic leading-relaxed line-clamp-2">
                                &ldquo;{ex.hook}&rdquo;
                              </p>
                            </div>
                          </div>

                          {/* Footer Action */}
                          <div className="px-4 sm:px-5 py-3 border-t border-ink/6 flex items-center justify-between text-[11px] sm:text-xs font-bold text-ink group-hover:text-accent transition-colors bg-white/40">
                            <span>View Script Blueprint</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

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
