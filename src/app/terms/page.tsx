import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Red Light Rejuve",
};

export default function TermsPage() {
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
        <h1 className="text-3xl md:text-4xl font-semibold text-[var(--text)] mb-8">Terms of Service</h1>
        <p className="text-sm text-[var(--text-light)] mb-8">Last updated: February 2026</p>

        <div className="space-y-8 text-[var(--text-secondary)] text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">Overview</h2>
            <p>By purchasing from Red Light Rejuve, you agree to these terms. Our products are intended for personal, non-commercial use only.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">Products</h2>
            <p>We strive to display our products as accurately as possible. Colours and appearance may vary slightly due to screen settings. Our LED mask is a cosmetic wellness device and is not intended to diagnose, treat, cure, or prevent any medical condition.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">Pricing &amp; Payment</h2>
            <p>All prices are listed in AUD and include applicable taxes. We reserve the right to change pricing at any time. Payment is processed securely at checkout.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">Shipping</h2>
            <p>We offer free express shipping on all orders. Delivery times are estimates and may vary. We are not responsible for delays caused by shipping carriers.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">60-Day Money-Back Guarantee</h2>
            <p>If you are not satisfied with your purchase, you may return it within 60 days for a full refund. Items must be returned in their original packaging. We cover return shipping costs. Contact support@redlightrejuve.com to initiate a return.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">Warranty</h2>
            <p>All Red Light Rejuve masks come with a 2-year manufacturer warranty covering defects in materials and workmanship. The warranty does not cover damage from misuse, accidents, or unauthorised modifications.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">Limitation of Liability</h2>
            <p>Red Light Rejuve is not liable for any indirect, incidental, or consequential damages arising from the use of our products. Our total liability is limited to the purchase price of the product.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--text)] mb-3">Contact</h2>
            <p>For questions about these terms, contact us at support@redlightrejuve.com.</p>
          </section>
        </div>
      </main>

      <footer className="py-8 bg-[var(--text)] text-center">
        <p className="text-sm text-white/30">&copy; 2026 Red Light Rejuve. All rights reserved.</p>
      </footer>
    </div>
  );
}
