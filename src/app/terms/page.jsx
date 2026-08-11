import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Terms of Service | GrowOwl Studio",
  description:
    "Terms of Service for GrowOwl Studio. Understand the terms, conditions, and agreements for our web development and design services.",
  alternates: {
    canonical: "https://www.growowl.online/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-5 bg-cream">
        <div className="max-w-[800px] mx-auto">
          <span className="font-serif italic text-lg text-accent font-medium block mb-2">
            Legal &amp; Transparency
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-6">
            Terms of Service
          </h1>
          <p className="text-sm text-ink/60 mb-8">Last Updated: August 2026</p>

          <div className="space-y-6 text-ink/80 text-base leading-[1.75]">
            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">1. Scope of Services</h2>
              <p>
                GrowOwl Studio provides bespoke full-stack web development, web design (UI/UX), technical search engine optimization (SEO), and digital marketing campaigns as agreed upon in individual client project proposals.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">2. Deliverables &amp; Client Responsibility</h2>
              <p>
                Clients agree to provide required branding assets, content copy, and timely feedback during development phases. Project timelines commence upon receipt of necessary assets and upfront deposit.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">3. Intellectual Property Rights</h2>
              <p>
                Upon final payment, full ownership and copyright of customized visual designs, source code, and assets created specifically for the project transfer to the client, excluding open-source software libraries.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">4. Revisions &amp; Post-Launch Support</h2>
              <p>
                All web plans include specified revision rounds and post-launch technical support as defined in our service tier agreements. Subsequent maintenance or major scope additions are billed under standard retainer rates.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">5. Questions &amp; Support</h2>
              <p>
                For any questions regarding our Terms of Service, please contact us at{" "}
                <a href="/contact" className="text-accent hover:underline">
                  GrowOwl Support
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
