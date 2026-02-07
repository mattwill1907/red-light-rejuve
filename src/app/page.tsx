import Image from "next/image";
import Link from "next/link";

// Icons as inline SVG components
const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const TruckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

// Consistent container component
const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 ${className}`}>
    {children}
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] overflow-x-hidden">
      {/* Announcement Bar */}
      <div className="bg-[var(--secondary)] text-white py-3 px-4 text-center">
        <p className="text-[0.7rem] font-medium tracking-[0.15em] uppercase">
          Free Express Shipping on all Australian orders | <Link href="#guarantee" className="text-[var(--accent)] border-b border-[var(--accent)] hover:opacity-80 transition-opacity">60-Day Money Back Guarantee</Link>
        </p>
      </div>

      {/* Header */}
      <header className="bg-[var(--bg)] py-5 sticky top-0 z-50 border-b border-[var(--border)]">
        <Container>
          <nav className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/logo.jpeg" alt="Red Light Rejuve" width={140} height={40} className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex items-center gap-10">
              <Link href="#results" className="text-[0.75rem] font-medium tracking-[0.12em] uppercase text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                Results
              </Link>
              <Link href="#how-it-works" className="text-[0.75rem] font-medium tracking-[0.12em] uppercase text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                How It Works
              </Link>
              <Link href="#reviews" className="text-[0.75rem] font-medium tracking-[0.12em] uppercase text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                Reviews
              </Link>
              <Link href="#faq" className="text-[0.75rem] font-medium tracking-[0.12em] uppercase text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                FAQ
              </Link>
            </div>
            <Link href="#product" className="text-[var(--text)] hover:text-[var(--accent)] transition-colors">
              <CartIcon />
            </Link>
          </nav>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-[var(--bg)]">
        <Container>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-[3.25rem] font-normal leading-[1.1] text-[var(--secondary)] mb-6">
                Skin that looks firmer, smoother, and healthier over time.
              </h1>
              <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                Without injectables. Without complicated routines. Just 10 minutes, 3 times a week.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="#how-it-works" className="inline-flex items-center justify-center px-8 py-4 border border-[var(--secondary)] text-[var(--secondary)] text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-[var(--secondary)] hover:text-white transition-colors">
                  See How It Works
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[0.7rem] text-[var(--text-light)] tracking-[0.1em] uppercase">
                <span>TGA Listed</span>
                <span>·</span>
                <span>60-Day Guarantee</span>
                <span>·</span>
                <span>Free Shipping</span>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-[4/5] bg-[var(--bg-tertiary)]">
                <Image
                  src="/images/Women_in_penthouse.jpg"
                  alt="Woman using LED face mask in luxury setting"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Problem Reframe Section */}
      <section className="py-16 md:py-24 bg-[var(--bg-secondary)]">
        <Container>
          <div className="text-center mb-12">
            <p className="text-[0.65rem] font-medium tracking-[0.25em] uppercase text-[var(--accent)] mb-4">The Truth About LED Masks</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-normal text-[var(--secondary)]">
              Why most LED masks disappoint.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-12">
            {[
              { title: "Too weak to work", desc: "Most masks use low-powered LEDs that look impressive but deliver a fraction of the therapeutic dose." },
              { title: "Uncomfortable to wear", desc: "Hard plastic shells, tight straps, and eye irritation mean most people give up after a few uses." },
              { title: "Overpromise, underdeliver", desc: "Miracle claims with no timeline. Real improvement takes 4-8 weeks of consistent use." },
            ].map((problem, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center text-[var(--text-light)]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-sm text-[var(--secondary)] mb-3 tracking-[0.05em] uppercase">{problem.title}</h3>
                <p className="text-[0.875rem] text-[var(--text-secondary)] leading-relaxed">{problem.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center font-[family-name:var(--font-cormorant)] text-xl md:text-2xl italic text-[var(--text)] max-w-2xl mx-auto leading-relaxed">
            We designed our mask to solve these problems.
          </p>
        </Container>
      </section>

      {/* Product Section */}
      <section id="product" className="py-16 md:py-24 bg-[var(--bg)]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Product Gallery */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="relative aspect-square bg-[var(--bg-tertiary)] mb-4">
                <Image
                  src="/images/Mask_Static4.jpg"
                  alt="LED Face Mask"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  "/images/Mask_Static4.jpg",
                  "/images/woman_in_mask.jpg",
                  "/images/Woman_Luxury_Wardrobe.jpg",
                  "/images/Mask_unboxing.jpg",
                ].map((img, i) => (
                  <div key={i} className={`relative aspect-square bg-[var(--bg-tertiary)] cursor-pointer border-2 ${i === 0 ? 'border-[var(--secondary)]' : 'border-transparent hover:border-[var(--secondary)]'} transition-colors`}>
                    <Image src={img} alt={`Product view ${i + 1}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex gap-3 mb-6 flex-wrap">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-[var(--secondary)] text-[0.65rem] font-medium tracking-[0.12em] uppercase">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  Bestseller
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border)] text-[var(--text-secondary)] text-[0.65rem] font-medium tracking-[0.12em] uppercase">
                  <ShieldIcon />
                  TGA Listed
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-normal text-[var(--secondary)] mb-4 leading-tight">
                LED Light Therapy Face Mask
              </h1>

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[var(--border)]">
                <span className="text-[var(--accent)] text-sm tracking-[2px]">★★★★★</span>
                <span className="text-[0.8rem] text-[var(--text-secondary)]">4.9 (2,147 reviews) · <Link href="#reviews" className="text-[var(--text)] border-b border-[var(--text)] hover:opacity-70 transition-opacity">Read reviews</Link></span>
              </div>

              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-2xl font-normal text-[var(--secondary)]">$699</span>
                <span className="text-base text-[var(--text-light)] line-through">$899</span>
                <span className="px-3 py-1 border border-[var(--red-accent)] text-[var(--red-accent)] text-[0.7rem] font-medium tracking-[0.08em] uppercase">Save $200</span>
              </div>

              <p className="text-[0.8rem] text-[var(--text-secondary)] mb-8">
                or 4 interest-free payments of <strong className="text-[var(--text)] font-medium">$174.75</strong> with Afterpay
              </p>

              <p className="text-[0.9rem] text-[var(--text-secondary)] leading-relaxed mb-8">
                Clinical-grade red light therapy. 633nm red and 830nm near-infrared wavelengths at therapeutic intensity. Helps improve the appearance of fine lines, skin texture, and overall radiance. 10 minutes, 3 times per week.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Visible results in 4-8 weeks",
                  "10-minute sessions",
                  "Comfortable silicone fit",
                  "Built-in eye protection",
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-[0.8rem] text-[var(--text)]">
                    <span className="text-[var(--accent)]"><CheckIcon /></span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-b border-[var(--border)] py-6 mb-6">
                <button className="w-full py-4 px-8 bg-[var(--secondary)] text-white text-[0.75rem] font-medium tracking-[0.15em] uppercase flex items-center justify-center gap-3 hover:bg-[var(--primary)] transition-colors">
                  <CartIcon />
                  Add to Cart — $699
                </button>
              </div>

              <div className="flex justify-between py-4">
                {[
                  { icon: <TruckIcon />, label: "Free Shipping" },
                  { icon: <ShieldIcon />, label: "60-Day Guarantee" },
                  { icon: <ClockIcon />, label: "2-Year Warranty" },
                ].map((trust, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 text-center">
                    <span className="text-[var(--text)]">{trust.icon}</span>
                    <span className="text-[0.65rem] text-[var(--text-secondary)] font-medium tracking-[0.08em] uppercase">{trust.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Results Timeline Section */}
      <section id="results" className="py-16 md:py-24 bg-[var(--bg)]">
        <Container>
          <div className="text-center mb-12">
            <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4">What to Expect</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-normal text-[var(--secondary)] mb-5">
              Realistic timelines. Honest expectations.
            </h2>
            <p className="text-[0.95rem] text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Red light therapy works gradually. Most people notice improvements in skin texture and radiance within 4-8 weeks of consistent use.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              { week: "Week 2", title: "Subtle changes", desc: "Skin may feel slightly smoother. Some report a subtle glow after sessions." },
              { week: "Week 4", title: "Early signs", desc: "Skin texture often improves. Fine lines may appear softer." },
              { week: "Week 8", title: "Visible improvement", desc: "Firmer-looking skin, reduced appearance of lines. Results vary." },
              { week: "Week 12+", title: "Continued progress", desc: "Ongoing use maintains and enhances results over time." },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 border border-[var(--border)] bg-[var(--bg)]">
                <p className="text-[0.7rem] font-medium tracking-[0.15em] uppercase text-[var(--accent)] mb-3">{item.week}</p>
                <h3 className="text-[0.9rem] font-semibold text-[var(--secondary)] mb-2">{item.title}</h3>
                <p className="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-[var(--bg-tertiary)]">
        <Container>
          <div className="text-center mb-12">
            <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4">Simple Routine</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-normal text-[var(--secondary)] mb-5">
              How It Works
            </h2>
            <p className="text-[0.95rem] text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
              10 minutes, 3 times per week. That&apos;s it.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { num: "1", title: "Cleanse", desc: "Start with clean, dry skin. No serums needed." },
              { num: "2", title: "Wear", desc: "Put on the mask and press the button." },
              { num: "3", title: "Relax", desc: "Enjoy 10 minutes. Auto-shuts off when done." },
              { num: "4", title: "Glow", desc: "Apply moisturizer. See results in 4-8 weeks." },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-[var(--secondary)] text-[var(--accent)] flex items-center justify-center mx-auto mb-5 font-[family-name:var(--font-cormorant)] text-xl font-normal">
                  {step.num}
                </div>
                <h3 className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-[var(--secondary)] mb-2">{step.title}</h3>
                <p className="text-[0.85rem] text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Lifestyle Section */}
      <section className="py-16 md:py-24 bg-[var(--bg)]">
        <Container>
          <div className="text-center mb-12">
            <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4">Fits Your Lifestyle</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-normal text-[var(--secondary)] mb-5">
              Fits your life. Not the other way around.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { stat: "10 minutes", desc: "While you unwind" },
              { stat: "3x per week", desc: "That's it" },
              { stat: "No prep, no cleanup", desc: "Just charge and go" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 border border-[var(--border)] bg-[var(--bg)]">
                <p className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--secondary)] mb-1">{item.stat}</p>
                <p className="text-[0.85rem] text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: "/images/woman_in_chalet.jpg", caption: "Morning meditation" },
              { img: "/images/Woman_Luxury_Wardrobe.jpg", caption: "Getting ready" },
              { img: "/images/meditation2.jpg", caption: "Wind down" },
              { img: "/images/Woman_on_Bed3.jpg", caption: "Before bed" },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="relative aspect-[3/4] bg-[var(--bg-tertiary)] overflow-hidden">
                  <Image src={item.img} alt={item.caption} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="absolute bottom-4 left-4 text-white text-[0.7rem] font-medium tracking-[0.1em] uppercase opacity-0 group-hover:opacity-100 transition-opacity">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 md:py-24 bg-[var(--secondary)] text-white">
        <Container>
          <div className="text-center mb-12">
            <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4">Customer Reviews</p>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-normal text-white mb-5">
              Loved by 2,000+ Australians
            </h2>
            <p className="text-[0.95rem] text-white/60 max-w-xl mx-auto leading-relaxed">
              Real results take time. Here&apos;s what customers say at different stages.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: "I was so skeptical after wasting money on other masks. But after 6 weeks, my husband asked what I was doing different. My fine lines have genuinely softened.",
                name: "Sarah M.",
                location: "Melbourne, VIC",
                timeline: "6 weeks",
                concern: "Fine lines"
              },
              {
                text: "As a new mum with zero time, I needed something simple. 10 minutes while feeding the baby. My skin looks firmer, more awake.",
                name: "Jessica T.",
                location: "Sydney, NSW",
                timeline: "8 weeks",
                concern: "Firmness"
              },
              {
                text: "This is the first device that's actually comfortable enough to use regularly. The silicone feels like nothing on my face. My skin tone has evened out noticeably.",
                name: "Michelle K.",
                location: "Brisbane, QLD",
                timeline: "12 weeks",
                concern: "Skin tone"
              },
            ].map((review, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.08] p-6 md:p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-[var(--accent)]/20 text-[var(--accent)] text-[0.6rem] font-medium tracking-[0.1em] uppercase">{review.timeline}</span>
                  <span className="px-2 py-1 border border-white/20 text-white/70 text-[0.6rem] font-medium tracking-[0.1em] uppercase">{review.concern}</span>
                </div>
                <div className="text-[var(--accent)] mb-4 text-sm tracking-[3px]">★★★★★</div>
                <p className="font-[family-name:var(--font-cormorant)] text-lg leading-relaxed mb-5 text-white/90 italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 border border-white/30 flex items-center justify-center font-[family-name:var(--font-cormorant)] font-medium text-sm">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="text-[0.7rem] font-medium tracking-[0.1em] uppercase">{review.name}</p>
                    <p className="text-[0.65rem] text-white/50">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="#" className="text-[0.75rem] font-medium tracking-[0.12em] uppercase text-white/70 hover:text-white transition-colors border-b border-white/30 pb-1">
              Read All 2,147 Reviews
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-[var(--bg-secondary)]">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--accent)] mb-4">Questions?</p>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-normal text-[var(--secondary)]">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
              {[
                { q: "How long until I see results?", a: "Most customers notice improvements in skin texture within 2-4 weeks. More significant results typically appear around 6-8 weeks. That's why we offer a 60-day guarantee." },
                { q: "Is it safe for my eyes?", a: "Yes! Our mask includes medical-grade eye shields that block the light completely. Simply keep your eyes closed during treatment." },
                { q: "Can I use it with my skincare products?", a: "For best results, use on clean, bare skin. After your session, apply your serums and moisturizers as normal." },
                { q: "How does the 60-day guarantee work?", a: "Use the mask as directed for up to 60 days. If you're not happy, contact us for a full refund—no restocking fees, no hassle." },
                { q: "How often should I use it?", a: "For best results, use 3-5 times per week. Each session is just 10 minutes. Consistency matters more than frequency." },
              ].map((faq, i) => (
                <details key={i} className="group">
                  <summary className="flex justify-between items-center py-5 cursor-pointer list-none text-[0.85rem] font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                    {faq.q}
                    <svg className="w-4 h-4 text-[var(--text-light)] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="pb-5 text-[0.875rem] text-[var(--text-secondary)] leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Guarantee Section */}
      <section id="guarantee" className="py-16 md:py-24 bg-[var(--bg)]">
        <Container>
          <div className="bg-[var(--secondary)] p-10 md:p-16 text-center text-white max-w-3xl mx-auto">
            <div className="w-14 h-14 bg-[var(--accent)] flex items-center justify-center mx-auto mb-6">
              <ShieldIcon />
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-normal mb-4">
              60-Day Results Guarantee
            </h2>
            <p className="text-[0.95rem] opacity-70 max-w-md mx-auto mb-8 leading-relaxed">
              Try it completely risk-free. If you don&apos;t see visible improvement within 60 days, we&apos;ll refund you in full.
            </p>
            <Link href="#product" className="inline-flex items-center gap-3 px-8 py-4 border border-white text-white text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-white hover:text-[var(--secondary)] transition-colors">
              Shop Risk-Free
              <ArrowRightIcon />
            </Link>
          </div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-[var(--bg-secondary)]">
        <Container>
          <div className="text-center">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl font-normal text-[var(--secondary)] mb-4">
              Ready when you are.
            </h2>
            <p className="text-[0.95rem] text-[var(--text-secondary)] mb-8">
              Try it for 60 days. Love it or return it.
            </p>
            <Link href="#product" className="inline-flex items-center justify-center px-10 py-4 bg-[var(--secondary)] text-white text-[0.75rem] font-medium tracking-[0.15em] uppercase hover:bg-[var(--primary)] transition-colors mb-10">
              Shop the Mask
            </Link>
            <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-[var(--border)]">
              {[
                { icon: <ShieldIcon />, label: "60-Day Guarantee" },
                { icon: <TruckIcon />, label: "Free Shipping" },
                { icon: <ClockIcon />, label: "Australian Support" },
              ].map((trust, i) => (
                <div key={i} className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <span className="text-[var(--text)]">{trust.icon}</span>
                  <span className="text-[0.7rem] font-medium tracking-[0.08em] uppercase">{trust.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Email Capture */}
      <section className="py-14 bg-[var(--bg)] border-t border-[var(--border)]">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl font-normal text-[var(--secondary)] mb-3">
              Get 10% Off Your First Order
            </h2>
            <p className="text-[0.85rem] text-[var(--text-secondary)] mb-6">
              Join 15,000+ subscribers for skincare tips and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-[var(--border)] sm:border-r-0 bg-[var(--bg)] text-[0.85rem] focus:outline-none focus:border-[var(--secondary)]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[var(--secondary)] text-white border border-[var(--secondary)] text-[0.7rem] font-medium tracking-[0.12em] uppercase hover:bg-[var(--primary)] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--secondary)] text-white py-14">
        <Container>
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <Image src="/images/logo.jpeg" alt="Red Light Rejuve" width={120} height={35} className="h-8 w-auto brightness-0 invert mb-4" />
              <p className="text-white/50 text-[0.8rem] leading-relaxed">
                Australian-owned beauty technology. TGA listed, science-backed, results guaranteed.
              </p>
            </div>
            {[
              { title: "Shop", links: ["LED Face Mask", "LED Panel", "Accessories", "Gift Cards"] },
              { title: "Support", links: ["Contact Us", "Shipping Info", "Returns", "Track Order"] },
              { title: "Company", links: ["About Us", "The Science", "Blog", "Reviews"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-[0.7rem] font-medium tracking-[0.15em] uppercase mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link href="#" className="text-white/50 text-[0.8rem] hover:text-white transition-colors">{link}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.08] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-[0.7rem]">
              © 2024 Red Light Rejuve Pty Ltd. All rights reserved.
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-6 bg-white/[0.08] rounded" />
              ))}
            </div>
          </div>
        </Container>
      </footer>

      {/* Sticky Mobile Cart */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg)] px-4 py-3 border-t border-[var(--border)] z-50">
        <div className="flex items-center justify-between gap-4">
          <div className="text-lg font-normal text-[var(--secondary)]">
            $699 <span className="text-sm text-[var(--text-light)] line-through ml-1">$899</span>
          </div>
          <button className="flex-1 max-w-[160px] py-3 px-4 bg-[var(--secondary)] text-white text-[0.7rem] font-medium tracking-[0.1em] uppercase">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
