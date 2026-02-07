import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Red Light Rejuve",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-sans)" }}>
      <header className="bg-white border-b border-[var(--border)] sticky top-0 z-50">
        <div className="mx-auto max-w-[1200px] px-4 md:px-8 lg:px-12 flex items-center justify-between py-4">
          <a href="/" className="text-xl font-semibold text-[var(--text)] uppercase tracking-wider">
            Red Light Rejuve
          </a>
          <a href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--primary-dark)] transition-colors">
            &larr; Back to Shop
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[800px] px-4 md:px-8 py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text)] mb-8">Privacy Policy</h1>
        <p className="text-sm text-[var(--text-light)] mb-8">Last updated: February 2026</p>

        <div className="space-y-8 text-[var(--text-secondary)] text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">Information We Collect</h2>
            <p>When you make a purchase or sign up for our newsletter, we collect information such as your name, email address, shipping address, and payment details. We also collect browsing data through cookies to improve your experience.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">How We Use Your Information</h2>
            <p>We use your information to process orders, provide customer support, send order updates, and (with your consent) send marketing communications. We never sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">Data Security</h2>
            <p>We use industry-standard encryption and security measures to protect your personal information. Payment processing is handled by secure, PCI-compliant third-party providers.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">Cookies</h2>
            <p>We use cookies to remember your preferences, understand how you use our site, and improve our services. You can manage cookie preferences in your browser settings.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data at any time. To make a request, contact us at support@redlightrejuve.com.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">Contact</h2>
            <p>If you have questions about this privacy policy, email us at support@redlightrejuve.com.</p>
          </section>
        </div>
      </main>

      <footer className="py-8 bg-[var(--text)] text-center">
        <p className="text-sm text-white/30">&copy; 2026 Red Light Rejuve. All rights reserved.</p>
      </footer>
    </div>
  );
}
