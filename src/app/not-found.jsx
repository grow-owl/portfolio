import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "404 - Page Not Found | GrowOwl Studio",
  description:
    "The page you are looking for does not exist or has been moved. Explore GrowOwl web development, web design & SEO services.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[75vh] flex items-center justify-center pt-32 pb-20 px-5 text-center bg-cream">
        <div className="max-w-[600px] mx-auto">
          <span className="font-serif italic text-6xl md:text-8xl text-accent font-medium block mb-4">
            404
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-4">
            Page Not Found
          </h1>
          <p className="text-base text-ink/80 leading-[1.7] mb-8 max-w-[480px] mx-auto">
            Sorry, the page you're looking for doesn't exist, was removed, or had its name changed. Let's get you back on track!
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap mb-10">
            <a
              href="/"
              aria-label="Return to GrowOwl homepage"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 py-3.5 bg-ink text-white rounded-full hover:bg-accent transition-all min-h-[44px]"
            >
              Return Home
            </a>
            <a
              href="/services/web-development"
              aria-label="Explore GrowOwl web development services"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 py-3.5 bg-transparent text-ink border-[1.5px] border-ink/20 rounded-full hover:border-ink hover:bg-ink hover:text-white transition-all min-h-[44px]"
            >
              Explore Services
            </a>
            <a
              href="/contact"
              aria-label="Contact GrowOwl support"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold px-7 py-3.5 bg-transparent text-accent border-[1.5px] border-accent/30 rounded-full hover:bg-accent hover:text-white transition-all min-h-[44px]"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
