import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Privacy Policy | GrowOwl Studio",
  description:
    "Privacy Policy for GrowOwl Studio. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://www.growowl.online/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-5 bg-cream">
        <div className="max-w-[800px] mx-auto">
          <span className="font-serif italic text-lg text-accent font-medium block mb-2">
            Legal &amp; Transparency
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-6">
            Privacy Policy
          </h1>
          <p className="text-sm text-ink/60 mb-8">Last Updated: August 2026</p>

          <div className="space-y-6 text-ink/80 text-base leading-[1.75]">
            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">1. Information We Collect</h2>
              <p>
                GrowOwl Studio ("we," "our," or "us") respects your privacy. When you interact with our website or contact us via forms, email, or telephone, we may collect personal details such as your name, email address, phone number, and project requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">2. How We Use Information</h2>
              <p>
                We use the information collected solely to respond to project enquiries, deliver customized web development, web design, and SEO services, send project updates, and improve overall website user experience.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">3. Data Security &amp; Sharing</h2>
              <p>
                We enforce strict technical and organizational safeguards to prevent unauthorized access, loss, or disclosure of user data. We do not sell, rent, or trade personal data to third-party marketing companies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">4. Cookies &amp; Analytics</h2>
              <p>
                Our site uses privacy-friendly performance analytics (such as Vercel Analytics) to measure page load speeds and traffic trends. These tools collect anonymized data to improve site performance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink mb-3">5. Contact Us</h2>
              <p>
                If you have questions regarding this Privacy Policy, please reach out directly at{" "}
                <a href="tel:+918609504186" className="text-accent hover:underline">
                  +91 86095 04186
                </a>{" "}
                or via our{" "}
                <a href="/contact" className="text-accent hover:underline">
                  Contact Form
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
