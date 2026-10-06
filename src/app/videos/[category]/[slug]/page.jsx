import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { videoCategories } from "../../../../data/videoCategoriesData";
import { getVideoGuide, getCategoryDeepDive } from "../../../../data/videoDeepDiveData";
import { CategoryIcon } from "../../../../components/VideoCategoryIcons";

export async function generateStaticParams() {
  const params = [];
  videoCategories.forEach((cat) => {
    cat.videoTypes.forEach((video) => {
      params.push({
        category: cat.categorySlug,
        slug: video.id,
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }) {
  const { category: categorySlug, slug } = await params;
  const category = videoCategories.find((c) => c.categorySlug === categorySlug);
  const guide = getVideoGuide(categorySlug, slug);

  if (!category || !guide) {
    return {
      title: "Video Script Blueprint | GrowOwl Studio",
      description: "High-converting 60-second video script template and production guide.",
    };
  }

  return {
    title: `${guide.title} (Script Blueprint & Viral Hooks) | GrowOwl`,
    description: `Complete 60-second script timeline, 3 viral hooks, camera setups, and production checklist for ${guide.title} in ${category.fullName}.`,
    alternates: {
      canonical: `https://www.growowl.online/videos/${categorySlug}/${slug}`,
    },
    openGraph: {
      title: `${guide.title} - 60s Script Blueprint | GrowOwl`,
      description: `Step-by-step production blueprint and viral hooks tailored for ${category.fullName}.`,
      url: `https://www.growowl.online/videos/${categorySlug}/${slug}`,
    },
  };
}

export default async function VideoBlueprintDetailPage({ params }) {
  const { category: categorySlug, slug } = await params;
  const category = videoCategories.find((c) => c.categorySlug === categorySlug);

  if (!category) {
    notFound();
  }

  const guide = getVideoGuide(categorySlug, slug);
  const otherFormats = category.videoTypes.filter((v) => v.id !== slug);

  // SEO Schema
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
            name: category.name,
            item: `https://www.growowl.online/videos/${categorySlug}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: guide.title,
            item: `https://www.growowl.online/videos/${categorySlug}/${slug}`,
          },
        ],
      },
      {
        "@type": "HowTo",
        name: `How to Script & Shoot ${guide.title}`,
        description: `Complete 60-second script blueprint and viral hooks for ${category.fullName}.`,
        totalTime: "PT1M",
        step: guide.scriptTimeline.map((item, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: item.name,
          text: `${item.action} Spoken line: "${item.spokenLine}"`,
        })),
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
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10">
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
                <Link
                  href={`/videos/${category.categorySlug}`}
                  className="hover:text-accent transition-colors font-medium"
                >
                  {category.name}
                </Link>
              </li>
              <li className="text-ink/30">/</li>
              <li className="text-accent font-semibold truncate max-w-[200px] sm:max-w-none">
                {guide.title}
              </li>
            </ol>
          </nav>

          {/* Hero Header Card */}
          <div className="bg-card rounded-3xl sm:rounded-[36px] border border-ink/10 p-6 sm:p-10 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.04)] mb-8 sm:mb-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-[800px]">
                {/* Meta Badges */}
                <div className="flex items-center gap-2 sm:gap-3 mb-4 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider text-accent border border-accent/20">
                    <CategoryIcon name={category.iconName} className="w-3.5 h-3.5" />
                    {category.name}
                  </span>
                  <span className="px-2.5 py-1 bg-black/5 rounded-full text-[11px] sm:text-xs font-mono font-bold text-ink/80">
                    ⏱️ {guide.idealDuration}
                  </span>
                </div>

                <h1 className="text-[clamp(28px,4.5vw,48px)] font-sans font-bold leading-[1.15] tracking-[-0.03em] text-ink mb-3">
                  {guide.title}
                </h1>

                <p className="text-[15px] sm:text-[17px] text-ink/75 leading-[1.6]">
                  Primary Strategic Objective:{" "}
                  <strong className="text-ink font-semibold">{guide.objective}</strong>
                </p>
              </div>

              {/* Action Button */}
              <div className="shrink-0 w-full lg:w-auto">
                <Link
                  href="/contact"
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-accent text-white font-bold text-sm rounded-full shadow-[0_8px_24px_rgba(252,54,55,0.3)] hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span>Produce This Reel With GrowOwl</span>
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Viral Hooks Library Section */}
          <div className="bg-cream-light rounded-3xl border border-dashed border-ink/12 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-accent">
                Viral Opening Hooks
              </h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mb-5">
              3 Scroll-Stopping Hooks
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {guide.hooks.map((hook, idx) => (
                <div
                  key={idx}
                  className="bg-card rounded-2xl border border-ink/10 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent mb-2 block">
                      Option {idx + 1}
                    </span>
                    <p className="text-[14px] font-semibold text-ink leading-[1.5]">
                      &ldquo;{hook}&rdquo;
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-ink/6 text-[11px] font-medium text-ink/50 flex items-center justify-between">
                    <span>High Retention Hook</span>
                    <span className="text-accent font-bold">✓ Tested</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 60-Second Script Blueprint Timeline */}
          <div className="bg-card rounded-3xl sm:rounded-[36px] border border-ink/10 p-6 sm:p-10 lg:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.04)] mb-8 sm:mb-12">
            <div className="text-center max-w-[700px] mx-auto mb-8 sm:mb-10">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-accent px-3 py-1 bg-accent/10 rounded-full mb-3">
                Script Blueprint
              </span>
              <h2 className="text-[clamp(24px,3.5vw,36px)] font-sans font-bold leading-tight text-ink">
                60-Second Timeline &amp; Script
              </h2>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-6">
              {guide.scriptTimeline.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-cream/40 rounded-2xl border border-ink/8 p-5 sm:p-7 relative overflow-hidden group hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 sm:gap-4 mb-4 pb-4 border-b border-ink/8">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-accent text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-ink">
                          {step.name}
                        </h3>
                        <span className="text-[11px] font-mono text-ink/50">
                          {step.camera}
                        </span>
                      </div>
                    </div>

                    <div className="px-3 py-1 bg-ink text-white font-mono text-xs font-bold rounded-full">
                      {step.phase}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Visual Action */}
                    <div className="bg-white/80 p-4 rounded-xl border border-ink/6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 block mb-1">
                        🎬 Visual Action / B-Roll
                      </span>
                      <p className="text-[13px] sm:text-[14px] text-ink/80 leading-[1.5]">
                        {step.action}
                      </p>
                    </div>

                    {/* Spoken Voiceover Line */}
                    <div className="bg-white/80 p-4 rounded-xl border border-accent/20 bg-accent/[0.02]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-1">
                        🎙️ Spoken Line / Voiceover
                      </span>
                      <p className="text-[13px] sm:text-[14px] text-ink font-medium italic leading-[1.5]">
                        &ldquo;{step.spokenLine}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Director's Production Checklist */}
          {guide.productionTips && guide.productionTips.length > 0 && (
            <div className="bg-card rounded-3xl border border-ink/10 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-accent">
                  Director&apos;s Checklist
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-ink mb-6">
                Cinematic Filming &amp; Audio Tips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {guide.productionTips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-ink/[0.02] p-4 rounded-2xl border border-ink/6">
                    <span className="text-accent font-bold text-lg leading-none mt-0.5">✦</span>
                    <p className="text-xs sm:text-sm text-ink/75 leading-[1.6]">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Formats in Same Category */}
          {otherFormats.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <h3 className="text-xl sm:text-2xl font-bold text-ink">
                  More Video Types For {category.name}
                </h3>
                <Link
                  href={`/videos/${category.categorySlug}`}
                  className="text-xs sm:text-sm font-bold text-accent hover:underline"
                >
                  View All {category.name} Formats →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {otherFormats.slice(0, 3).map((video) => (
                  <Link
                    key={video.id}
                    href={`/videos/${category.categorySlug}/${video.id}`}
                    className="bg-card rounded-2xl border border-ink/10 p-4 shadow-xs hover:shadow-md hover:border-accent/40 transition-all block group"
                  >
                    <div className="flex items-center justify-between text-[11px] font-semibold text-accent mb-1">
                      <span>{video.tag || "Video Type"}</span>
                      <span className="font-mono text-ink/50">{video.duration}</span>
                    </div>
                    <h4 className="text-base font-bold text-ink group-hover:text-accent transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-xs text-ink/60 mt-1 line-clamp-1">{video.subtitle}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Lead Capture / Booking CTA Box */}
          <div className="bg-dark text-white rounded-3xl sm:rounded-[36px] p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.2)]">
            <div className="max-w-[700px] mx-auto relative z-10">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-accent px-3 py-1 bg-white/10 rounded-full mb-3">
                Done-For-You Production
              </span>
              <h2 className="text-[clamp(26px,4vw,42px)] font-sans font-bold leading-tight mb-4">
                Want GrowOwl to Script, Shoot &amp; Edit This Exact Reel For You?
              </h2>
              <p className="text-sm sm:text-base text-white/70 mb-8 leading-[1.6]">
                From cinematic 4K camera gear, professional lighting, viral hook writing to color grading — we deliver conversion-ready reels that grow your revenue.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-accent text-white font-bold text-sm rounded-full shadow-[0_8px_24px_rgba(252,54,55,0.4)] hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-300"
                >
                  Book Your Video Shoot
                </Link>
                <Link
                  href={`/videos/${category.categorySlug}`}
                  className="px-7 py-4 bg-white/10 text-white font-semibold text-sm rounded-full hover:bg-white/20 transition-colors"
                >
                  Explore Other Formats
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
