"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useChat } from "@ai-sdk/react";

const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-[1200px] px-4 md:px-8 lg:px-12 ${className}`}>
    {children}
  </div>
);

// Fade in on scroll component
const FadeInSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`fade-in-section ${isVisible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
};

// Swipe slider with scroll tracking
const SwipeSlider = ({ children, itemCount }: { children: React.ReactNode; itemCount: number }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const itemWidth = scrollRef.current.scrollWidth / (itemCount + 0.5);
        const index = Math.round(scrollLeft / itemWidth);
        setActiveIndex(Math.min(index, itemCount - 1));
      }
    };

    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [itemCount]);

  return (
    <div className="swipe-slider pl-4 md:pl-8 lg:pl-12">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {children}
        <div className="flex-shrink-0 w-4 md:w-8"></div>
      </div>
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {Array.from({ length: itemCount }).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-[var(--primary)]' : 'w-2 bg-[var(--border)]'}`}
          />
        ))}
      </div>
    </div>
  );
};

// Confetti celebration
const Confetti = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
    {Array.from({ length: 30 }).map((_, i) => (
      <div
        key={i}
        className="absolute"
        style={{
          left: `${5 + Math.random() * 90}%`,
          top: '-4px',
          width: `${6 + Math.random() * 6}px`,
          height: `${6 + Math.random() * 6}px`,
          backgroundColor: ['#D4899B', '#E8A8B8', '#B8707E', '#FFD700', '#FF69B4', '#FFC0CB'][i % 6],
          borderRadius: i % 3 === 0 ? '50%' : '2px',
          animation: `confetti-fall ${1.5 + Math.random() * 2}s ease-out ${Math.random() * 0.8}s forwards`,
        }}
      />
    ))}
  </div>
);

// Spin-to-Win Wheel
const SpinWheel = () => {
  const [show, setShow] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [hadFreeSpin, setHadFreeSpin] = useState(false);
  const [copied, setCopied] = useState(false);

  const segments = [
    { label: "FREE\nSPIN", value: "free", textColor: "#B8707E" },
    { label: "10%\nOFF", value: "10", textColor: "#ffffff" },
    { label: "20%\nOFF", value: "20", textColor: "#B8707E" },
    { label: "30%\nOFF", value: "30", textColor: "#ffffff" },
    { label: "FREE\nSPIN", value: "free", textColor: "#B8707E" },
    { label: "10%\nOFF", value: "10", textColor: "#ffffff" },
    { label: "20%\nOFF", value: "20", textColor: "#B8707E" },
    { label: "30%\nOFF", value: "30", textColor: "#ffffff" },
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("rlr-wheel-done")) return;

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        setShow(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // Rigged: always land on Free Spin or 20% Off
    let targetIdx: number;
    if (!hadFreeSpin && Math.random() < 0.35) {
      targetIdx = Math.random() < 0.5 ? 0 : 4;
    } else {
      targetIdx = Math.random() < 0.5 ? 2 : 6;
    }

    const targetAngle = (360 - targetIdx * 45) % 360;
    const offset = (Math.random() - 0.5) * 30;
    const currentMod = rotation % 360;
    const diff = ((targetAngle + offset - currentMod) % 360 + 360) % 360;
    const spins = 5 + Math.floor(Math.random() * 3);
    setRotation((prev) => prev + spins * 360 + diff);

    setTimeout(() => {
      setSpinning(false);
      if (segments[targetIdx].value === "free") {
        setHadFreeSpin(true);
        setResult("free");
      } else {
        setResult("20");
        localStorage.setItem("rlr-wheel-done", "true");
      }
    }, 4500);
  };

  const close = () => {
    setShow(false);
    localStorage.setItem("rlr-wheel-done", "true");
  };

  const copyCode = () => {
    navigator.clipboard.writeText("SPIN20");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={close}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" style={{ animation: 'fadeIn 0.3s ease-out' }} />
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-[360px] w-full overflow-hidden"
        style={{ animation: 'scaleIn 0.3s ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        {result === "20" && <Confetti />}

        <button
          onClick={close}
          className="absolute top-3 right-3 w-8 h-8 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center z-10 transition-colors"
        >
          <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" /><path d="M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 pt-8">
          {result === "20" ? (
            <div className="text-center relative z-10">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-2xl font-bold text-[var(--text)] mb-1">You Won 20% Off!</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-5">Use the code below at checkout</p>
              <div className="bg-[var(--bg-secondary)] border-2 border-dashed border-[var(--primary)] rounded-lg p-4 mb-4 flex items-center justify-between gap-3">
                <span className="text-2xl font-bold tracking-[0.2em] text-[var(--primary-dark)]">SPIN20</span>
                <button
                  onClick={copyCode}
                  className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded hover:bg-[var(--primary-dark)] transition-colors flex-shrink-0"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <a
                href="#product"
                onClick={close}
                className="block w-full btn-primary py-4 text-center uppercase tracking-wider text-sm font-semibold"
              >
                Shop Now — 20% Off
              </a>
            </div>
          ) : (
            <>
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-[var(--text)] mb-1">
                  {result === "free" ? "Free Spin! Go Again!" : "Spin to Win!"}
                </h3>
                <p className="text-[var(--text-secondary)] text-sm">
                  {result === "free" ? "You get another chance!" : "Try your luck for a discount"}
                </p>
              </div>

              <div className="relative mx-auto mb-5" style={{ width: 240, height: 240 }}>
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-10">
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '10px solid transparent',
                      borderRight: '10px solid transparent',
                      borderTop: '18px solid var(--primary-dark)',
                      filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))',
                    }}
                  />
                </div>

                {/* Wheel */}
                <div
                  className="w-full h-full rounded-full border-[5px] border-[var(--primary-dark)] relative overflow-hidden"
                  style={{
                    background: `conic-gradient(from 337.5deg, #FFF5F7 0deg 45deg, #E8A8B8 45deg 90deg, #FFF5F7 90deg 135deg, #D4899B 135deg 180deg, #FFF5F7 180deg 225deg, #E8A8B8 225deg 270deg, #FFF5F7 270deg 315deg, #D4899B 315deg 360deg)`,
                    transform: `rotate(${rotation}deg)`,
                    transition: spinning ? 'transform 4.5s cubic-bezier(0.15, 0.6, 0.15, 1)' : 'none',
                  }}
                >
                  {segments.map((seg, i) => (
                    <div key={i} className="absolute inset-0" style={{ transform: `rotate(${i * 45}deg)` }}>
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 text-center leading-tight">
                        {seg.label.split("\n").map((line, j) => (
                          <span key={j} className="block text-[10px] font-bold" style={{ color: seg.textColor }}>
                            {line}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Center circle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 bg-white rounded-full shadow-md border-[3px] border-[var(--primary-dark)] flex items-center justify-center">
                    <span className="text-[9px] font-bold text-[var(--primary-dark)] uppercase tracking-wider">RLR</span>
                  </div>
                </div>
              </div>

              <button
                onClick={spin}
                disabled={spinning}
                className="w-full btn-primary py-3.5 text-center uppercase tracking-wider text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {spinning ? "Spinning..." : result === "free" ? "Spin Again!" : "SPIN!"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "submitted" || status === "streaming";

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const productImages = [
    { src: "/images/Product_cart1_white.jpg", label: "Front View", desc: "Premium silicone design with ventilation for comfort" },
    { src: "/images/Product_cart2_white.jpg", label: "Side Profile", desc: "Ergonomic shape conforms naturally to your face" },
    { src: "/images/Product_cart3_white.jpg", label: "Adjustable Fit", desc: "Velcro straps for a secure, comfortable fit" },
    { src: "/images/Inside_of_Mask_2.png", label: "360 Medical-Grade LEDs", desc: "4 wavelengths (415nm, 590nm, 633nm, 850nm+1072nm)" },
    { src: "/images/Mask_unboxing_white_bg.jpg", label: "Premium Packaging", desc: "Arrives in a luxury gift box with all accessories" },
    { src: "/images/Woman_Holding_mask1_white_bg.jpg", label: "Lightweight Design", desc: "Only 180g — barely feel it during your session" },
    { src: "/images/woman_in_mask_white_bg.jpg", label: "Spa Experience", desc: "Professional-grade treatment in the comfort of home" },
    { src: "/images/manual_whats_included.png", label: "What's Included", desc: "Mask, controller, strap, USB-C cable, carrying bag & manual" },
    { src: "/images/manual_modes.png", label: "6 Treatment Modes", desc: "Repairing, Rejuvenation, Anti-Aging, Morning, Anti-Acne, Bedtime" },
    { src: "/images/manual_wavelengths.png", label: "4 Light Wavelengths", desc: "Yellow, Red, Near-infrared & Blue light for complete skincare" },
    { src: "/images/manual_controller.png", label: "Smart Controller", desc: "TFT screen with mode, brightness & pulse controls" },
    { src: "/images/manual_specs.png", label: "Specifications", desc: "360 LEDs, USB Type-C, 4000mAh battery, 10Hz pulsing" },
  ];

  const faqs = [
    { q: "How long until I see results?", a: "Most users notice improvements in skin texture and tone within 4-8 weeks of consistent use. Full results typically appear around 12 weeks. We recommend using the mask 3-4 times per week for 10-20 minutes per session." },
    { q: "Is it safe for my eyes?", a: "We recommend closing your eyes during treatment. The silicone design sits comfortably over the eye area while directing light to the surrounding skin. If you have a hereditary eye condition, please consult your doctor before use." },
    { q: "What are the 6 treatment modes?", a: "The mask comes with 6 preset modes: Repairing (red light), Rejuvenation (yellow + red), Anti-Aging (red + near-infrared), Morning Skincare (yellow + red + near-infrared), Anti-Acne (blue light), and Bedtime Skincare (all wavelengths). Each runs for 10 minutes with adjustable brightness." },
    { q: "What if it doesn't work for me?", a: "Try it for 60 days. If you're not seeing the improvements you hoped for, return it for a full refund. No questions, no hassle. We cover return shipping too." },
    { q: "How do I use it?", a: "Cleanse your face and make sure skin is dry with no makeup. Secure the mask with the adjustable strap, connect the controller, and press and hold the power button for 3 seconds. Select your mode, adjust brightness if desired, and relax for 10 minutes. Apply your skincare products after the session." },
    { q: "How long does shipping take?", a: "We offer free express shipping on all orders. Most orders arrive within 3-7 business days. You'll receive tracking information via email as soon as your order ships." },
    { q: "Can I use it with my skincare products?", a: "Use the mask on clean, dry skin without makeup for best light penetration. Apply serums and moisturisers after your session — they'll absorb better when your skin is in renewal mode. Avoid photosensitive skincare ingredients on the same day." },
    { q: "What's included in the box?", a: "Everything you need: the LED mask, smart controller with TFT display, adjustable strap, USB Type-C charging cable, carrying bag, and user manual. The 4000mAh battery charges in about 3 hours via USB-C." },
    { q: "How do I contact support?", a: "You can reach us at support@redlightrejuve.com or use the chat widget on our website. We typically respond within 24 hours on business days." },
    { q: "How do I track my order?", a: "Once your order ships, you'll receive a tracking link via email. If you haven't received it, check your spam folder or contact us at support@redlightrejuve.com." },
    { q: "What is your return policy?", a: "We offer a 60-day money-back guarantee. If you're not happy with your results, contact us at support@redlightrejuve.com to arrange a return. We cover return shipping — no questions asked." },
  ];

  const reviews = [
    { name: "Sarah M.", location: "Verified Buyer", weeks: "8 weeks", concern: "Fine lines", text: "I was skeptical after trying two other LED masks that just collected dust. This one is different. It's so comfortable I actually look forward to using it. Around week 6, my husband asked what I'd been doing differently.", bonus: "Didn't expect it to help with the redness around my nose too.", image: "/images/Mirror_Selfie1.jpg" },
    { name: "Jennifer L.", location: "Verified Buyer", weeks: "12 weeks", concern: "Firmness", text: "I've spent thousands on facials and serums. This is the first thing that's made a noticeable difference to my jawline. The fact that it's so easy to use means I actually stick with it.", bonus: "The 10 minutes has become my evening ritual. It's oddly relaxing.", image: "/images/Woman_Mirror2_asian.jpg" },
    { name: "Michelle T.", location: "Verified Buyer", weeks: "6 weeks", concern: "Skin tone", text: "My skin looks more even and has this healthy glow now. People keep asking if I've been on holiday. I just smile and say I've been taking better care of myself.", bonus: "Way more comfortable than I expected. My last mask felt like wearing a vice.", image: "/images/Mirror_Selfie3_blonde.jpg" },
  ];

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'var(--font-sans)' }}>
      {/* Announcement Bar */}
      <div className="bg-[var(--primary)] text-white py-2.5 text-center text-sm font-medium">
        <Container>
          <div className="flex items-center justify-center gap-6 md:gap-12">
            <span>Free Express Shipping</span>
            <span className="hidden sm:inline">|</span>
            <span>60-Day Guarantee</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">2-Year Warranty</span>
          </div>
        </Container>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-[var(--border)] sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between py-4">
            <a href="/" className="text-xl font-semibold text-[var(--text)] uppercase tracking-wider">
              Red Light Rejuve
            </a>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#how-it-works" className="text-[var(--text-secondary)] hover:text-[var(--primary-dark)] transition-colors">How It Works</a>
              <a href="#results" className="text-[var(--text-secondary)] hover:text-[var(--primary-dark)] transition-colors">Results</a>
              <a href="#reviews" className="text-[var(--text-secondary)] hover:text-[var(--primary-dark)] transition-colors">Reviews</a>
              <a href="#faq" className="text-[var(--text-secondary)] hover:text-[var(--primary-dark)] transition-colors">FAQ</a>
            </nav>
            <a href="#product" className="btn-primary px-6 py-2.5 text-sm uppercase tracking-wider">
              Shop Now
            </a>
          </div>
        </Container>
      </header>

      {/* Hero Section - Mobile: Full screen cinematic */}
      <section ref={heroRef} className="relative md:py-24 bg-white">
        {/* Mobile: Full-screen hero image */}
        <div className="md:hidden relative h-[calc(100svh-100px)] w-full overflow-hidden">
          <Image
            src="/images/Landing_pic_new.png"
            alt="Woman using LED Light Therapy Mask"
            fill
            className="object-cover object-center will-change-transform"
            priority
            sizes="100vw"
          />
          {/* Gradient overlays for text readability at top and bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          {/* Mobile text overlay - positioned at top */}
          <div className="absolute top-0 left-0 right-0 p-6 pt-2 text-white text-center">
            <FadeInSection>
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="flex text-yellow-400 text-sm">{"★★★★★"}</div>
                <span className="text-white/90 text-sm">2,147+ happy customers</span>
              </div>
              <h1 className="text-3xl font-bold leading-tight mb-3">
                TIRED OF LOOKING TIRED?
              </h1>
              <p className="text-base text-white/90 mb-4">10 Minutes. 3x a week. Zero Needles.</p>
              <h2 className="text-2xl font-bold leading-tight">
                <span className="font-extrabold">BETTER SKIN</span> DOESN&apos;T HAVE<br />TO BE COMPLICATED.
              </h2>
            </FadeInSection>
          </div>
        </div>

        {/* Desktop: Side-by-side layout with new messaging */}
        <Container className="hidden md:block">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeInSection>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-[var(--primary-dark)]">{"★★★★★".split("").map((star, i) => <span key={i} className="text-xl">{star}</span>)}</div>
                <span className="text-sm text-[var(--text-light)]">2,147+ happy customers</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-[var(--text)]">
                TIRED OF LOOKING TIRED?
              </h1>
              <p className="text-lg text-[var(--text-secondary)] mb-6">10 Minutes. 3x a week. Zero Needles.</p>
              <h2 className="text-2xl lg:text-3xl font-bold leading-tight mb-6 text-[var(--text)]">
                <span className="font-extrabold">BETTER SKIN</span> DOESN&apos;T HAVE TO BE COMPLICATED.
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mb-8 flex items-center gap-2">
                <span className="text-[var(--primary-dark)]">✓</span>
                60-Day Money-Back Guarantee — Love it or return it, no questions asked
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#results" className="border-2 border-[var(--border)] text-[var(--text)] px-8 py-4 text-center font-medium hover:border-[var(--primary)] transition-colors">
                  See Real Results
                </a>
              </div>
            </FadeInSection>
            <FadeInSection>
              <Image src="/images/Landing_pic_new.png" alt="Woman using LED Light Therapy Mask" width={600} height={700} className="w-full h-auto rounded-lg" priority />
            </FadeInSection>
          </div>
        </Container>
      </section>

      {/* Trust Badges - Auto-scrolling marquee */}
      <section className="py-4 bg-[var(--bg-secondary)] border-y border-[var(--border)] overflow-hidden">
        <div className="marquee-container">
          <div className="marquee-content">
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center">
                {[
                  { text: "Clinically-studied wavelengths", icon: (
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/>
                      <path d="M9 3v4a2 2 0 0 0 2 2h4"/>
                      <path d="M14 3l6 6"/>
                      <path d="M9 14l2 2 4-4"/>
                    </svg>
                  )},
                  { text: "Backed by 3,000+ clinical studies", icon: (
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                      <path d="M8 7h8"/><path d="M8 11h6"/>
                    </svg>
                  )},
                  { text: "60-day money-back guarantee", icon: (
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                  )},
                  { text: "2-year warranty included", icon: (
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--primary-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  )},
                ].map((item, i) => (
                  <div key={`${setIndex}-${i}`} className="flex items-center gap-2 mx-8 whitespace-nowrap">
                    {item.icon}
                    <span className="text-sm font-medium text-[var(--text-secondary)]">{item.text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Manual swipe slider */}
      <section className="pt-10 md:pt-16 pb-6 md:pb-10 bg-white">
        <Container>
          <FadeInSection>
            <div className="text-center mb-6">
              <span className="subheading mb-4 block">Feel Confident</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text)]">
                Supported by science
              </h2>
            </div>
          </FadeInSection>
        </Container>
        <FadeInSection>
          <SwipeSlider itemCount={4}>
            {[
              { title: "Clinically Proven", desc: "Clinically-studied wavelengths that support skin's natural renewal", icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/>
                  <path d="M9 3v4a2 2 0 0 0 2 2h4"/>
                  <path d="M14 3l6 6"/>
                  <path d="M9 14l2 2 4-4"/>
                </svg>
              )},
              { title: "Comfortable Design", desc: "Lightweight, flexible design you'll actually enjoy wearing", icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              )},
              { title: "Eye Safe", desc: "Built-in eye protection for complete peace of mind", icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )},
              { title: "Simple to Use", desc: "Simple one-button operation — no apps, no confusion", icon: (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10 8 16 12 10 16 10 8"/>
                </svg>
              )},
            ].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] md:w-[320px] snap-start bg-[var(--bg-secondary)] rounded-lg p-6 border border-[var(--border)]">
                <span className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-white mb-4">{item.icon}</span>
                <h3 className="font-semibold text-[var(--text)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </SwipeSlider>
        </FadeInSection>
      </section>

      {/* Featured Image Slider */}
      <section className="w-full pt-6 md:pt-10 pb-6 md:pb-10">
        <FadeInSection>
          <SwipeSlider itemCount={4}>
            {[
              { src: "/images/pink_mask_hero.png", alt: "LED Light Therapy Mask - Pink Satin" },
              { src: "/images/mask_unboxing.jpg", alt: "LED Light Therapy Mask - Unboxing" },
              { src: "/images/flatlay_marble.png", alt: "LED Light Therapy Mask flatlay on marble" },
              { src: "/images/woman_paris_balcony.jpg", alt: "Woman using mask on Paris balcony" },
            ].map((img, i) => (
              <div key={i} className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[50vw] snap-center">
                <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 50vw"
                    priority={i === 0}
                  />
                </div>
              </div>
            ))}
          </SwipeSlider>
        </FadeInSection>
      </section>

      {/* How It Works - Manual swipe slider */}
      <section id="how-it-works" className="pt-10 md:pt-16 pb-6 md:pb-10 bg-[var(--bg-secondary)]">
        <Container>
          <FadeInSection>
            <div className="text-center mb-6">
              <span className="subheading mb-4 block">The Science</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text)]">
                How red light therapy works
              </h2>
            </div>
          </FadeInSection>
        </Container>
        <FadeInSection>
          <SwipeSlider itemCount={4}>
            {[
              { step: "01", title: "Light penetrates skin", desc: "Four clinically-proven wavelengths (415nm–1072nm) reach different depths" },
              { step: "02", title: "Cells absorb energy", desc: "Mitochondria absorb light, increasing ATP production" },
              { step: "03", title: "Natural processes activate", desc: "Enhanced cellular energy supports collagen/elastin production" },
              { step: "04", title: "Visible improvement", desc: "Skin appears firmer, smoother, more even over time" },
            ].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] md:w-[300px] snap-start bg-white rounded-lg p-6 border border-[var(--border)] text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text)]">{item.title}</h3>
                <p className="text-sm text-[var(--text-light)]">{item.desc}</p>
              </div>
            ))}
          </SwipeSlider>
        </FadeInSection>
      </section>

      {/* Before/After - Real Results */}
      <section className="pt-10 md:pt-16 pb-6 md:pb-10 bg-white">
        <Container>
          <FadeInSection>
            <div className="text-center mb-6">
              <span className="subheading mb-4 block">Real Results</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text)]">
                See the difference
              </h2>
            </div>
          </FadeInSection>
        </Container>
        <FadeInSection>
          <SwipeSlider itemCount={7}>
            {[
              { image: "/images/Before_and_After1.jpg", name: "Rachel, 42", weeks: "12 weeks", concern: "Fine lines around eyes and forehead" },
              { image: "/images/Before_and_After2.jpg", name: "Linda, 38", weeks: "12 weeks", concern: "Loss of firmness, uneven skin tone" },
              { image: "/images/before_after_3.jpg", name: "Sandra, 58", weeks: "12 weeks", concern: "Deep wrinkles, sagging skin" },
              { image: "/images/before_after_4.jpg", name: "Mai, 40", weeks: "12 weeks", concern: "Under-eye bags, uneven texture" },
              { image: "/images/before_after_5.jpg", name: "Emma, 34", weeks: "12 weeks", concern: "Redness, inflammation" },
              { image: "/images/before_after_6.jpg", name: "Catherine, 52", weeks: "12 weeks", concern: "Sun damage, age spots" },
              { image: "/images/before_after_7.jpg", name: "Nicole, 43", weeks: "12 weeks", concern: "Dull skin, fine lines" },
            ].map((result, i) => (
              <div key={i} className="flex-shrink-0 w-[320px] md:w-[400px] snap-start bg-[var(--bg-secondary)] rounded-lg overflow-hidden border border-[var(--border)]">
                <Image src={result.image} alt={result.name} width={600} height={450} className="w-full" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-[var(--text)]">{result.name}</span>
                    <span className="px-3 py-1 bg-[var(--primary)] text-white text-sm font-medium rounded">{result.weeks}</span>
                  </div>
                  <p className="text-sm text-[var(--text-light)]">{result.concern}</p>
                </div>
              </div>
            ))}
          </SwipeSlider>
          <Container>
            <p className="text-center mt-4 text-xs text-[var(--text-light)]">Individual results may vary.</p>
          </Container>
        </FadeInSection>
      </section>

      {/* Wavelengths - Manual swipe slider */}
      <section className="pt-10 md:pt-16 pb-6 md:pb-10 bg-[var(--bg-secondary)]">
        <Container>
          <FadeInSection>
            <div className="text-center mb-6">
              <span className="subheading mb-4 block">Four Wavelengths</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text)]">
                Complete skincare coverage
              </h2>
            </div>
          </FadeInSection>
        </Container>
        <FadeInSection>
          <SwipeSlider itemCount={4}>
            <div className="flex-shrink-0 w-[320px] md:w-[400px] snap-start p-6 md:p-8 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-blue-500"></div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--text)]">Blue Light (415nm)</h3>
                  <p className="text-sm text-[var(--text-light)]">Surface level treatment</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] mb-4 text-sm">Targets acne-causing bacteria at the skin surface. Clinically proven to reduce breakouts and improve skin clarity.</p>
              <ul className="space-y-2">
                {["Sterilizes acne-producing bacteria", "Reduces inflammation and scarring", "Increases skin oxygenation", "Improves overall skin clarity"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="text-[var(--primary-dark)] font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0 w-[320px] md:w-[400px] snap-start p-6 md:p-8 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-yellow-400"></div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--text)]">Yellow Light (590nm)</h3>
                  <p className="text-sm text-[var(--text-light)]">Epidermis penetration</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] mb-4 text-sm">Gentle wavelength that balances skin tone and reduces visible redness. Ideal for sensitive skin types.</p>
              <ul className="space-y-2">
                {["Balances skin texture and tone", "Stimulates red blood cell activity", "Reduces redness and swelling", "Minimizes fine lines"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="text-[var(--primary-dark)] font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0 w-[320px] md:w-[400px] snap-start p-6 md:p-8 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-red-500"></div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--text)]">Red Light (633nm)</h3>
                  <p className="text-sm text-[var(--text-light)]">Mid-dermis penetration</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] mb-4 text-sm">Penetrates 2-3mm into skin. The gold standard for anti-aging, targeting collagen production in the dermis.</p>
              <ul className="space-y-2">
                {["Promotes collagen production", "Tightens and firms skin", "Increases skin elasticity", "Reduces fine lines and wrinkles"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="text-[var(--primary-dark)] font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-shrink-0 w-[320px] md:w-[400px] snap-start p-6 md:p-8 bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-rose-900"></div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--text)]">Near-Infrared (850nm+1072nm)</h3>
                  <p className="text-sm text-[var(--text-light)]">Deep tissue penetration</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] mb-4 text-sm">Penetrates 5-10mm deep. Reaches subcutaneous tissue for deep cellular repair and regeneration.</p>
              <ul className="space-y-2">
                {["Repairs skin at cellular level", "Improves blood circulation", "Increases skin moisture", "Enhances deep tissue healing"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="text-[var(--primary-dark)] font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SwipeSlider>
        </FadeInSection>
      </section>

      {/* Product Section */}
      <section id="product" className="pt-10 md:pt-14 pb-10 md:pb-14 bg-[var(--bg-secondary)]">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <FadeInSection>
              <div className="relative bg-white rounded-lg p-4 mb-4 border border-[var(--border)] overflow-hidden">
                <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
                  <Image
                    src={productImages[selectedImage].src}
                    alt={productImages[selectedImage].label}
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                {/* Left/Right Arrow Navigation */}
                <button
                  onClick={() => setSelectedImage(prev => prev === 0 ? productImages.length - 1 : prev - 1)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all"
                  aria-label="Previous image"
                >
                  <svg className="w-5 h-5 text-[var(--text)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedImage(prev => prev === productImages.length - 1 ? 0 : prev + 1)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all"
                  aria-label="Next image"
                >
                  <svg className="w-5 h-5 text-[var(--text)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
                {/* Image counter */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                  {selectedImage + 1} / {productImages.length}
                </div>
              </div>
              <div className="bg-[var(--primary-fade)] p-4 rounded-lg mb-4">
                <p className="font-medium text-sm text-[var(--text)]">{productImages[selectedImage].label}</p>
                <p className="text-xs text-[var(--text-light)]">{productImages[selectedImage].desc}</p>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {productImages.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`flex-shrink-0 w-[calc(25%-6px)] aspect-square rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-[var(--primary)]" : "border-[var(--border)]"}`}>
                    <Image src={img.src} alt={img.label} width={100} height={100} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </FadeInSection>
            <FadeInSection>
              <span className="subheading mb-2 block">Red Light Rejuve</span>
              <h2 className="text-3xl font-semibold mb-4 text-[var(--text)]">LED Light Therapy Mask</h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-[var(--primary-dark)]">★★★★★</div>
                <span className="text-sm text-[var(--text-light)]">4.9 (2,147 reviews)</span>
              </div>
              <div className="mb-6 pb-6 border-b border-[var(--border)]">
                <span className="text-3xl font-bold text-[var(--text)]">$699</span>
                <span className="text-[var(--text-light)] ml-3 line-through">$899</span>
                <span className="ml-3 px-3 py-1 bg-[var(--primary)] text-white text-sm font-medium rounded">Save $200</span>
              </div>
              <div className="space-y-3 mb-8">
                {["360 medical-grade LED chips", "4 wavelengths — Blue, Yellow, Red & Near-Infrared", "6 preset treatment modes", "Medical-grade silicone — foldable & portable", "10-minute auto shutoff", "2-year warranty"].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-5 h-5 bg-[var(--primary)] rounded-full flex items-center justify-center text-xs font-bold text-white">✓</span>
                    <span className="text-[var(--text-secondary)]">{feature}</span>
                  </div>
                ))}
              </div>
              <button className="w-full btn-primary py-4 text-center uppercase tracking-wider mb-4">
                Add to Cart — $699
              </button>
              <p className="text-center text-sm text-[var(--text-light)]">Free express shipping | 60-day guarantee</p>
            </FadeInSection>
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <section id="reviews" className="pt-10 md:pt-16 pb-6 md:pb-10 bg-white">
        <Container>
          <FadeInSection>
            <div className="text-center mb-6">
              <span className="subheading mb-4 block">Customer Reviews</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text)]">
                What our customers say
              </h2>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="flex text-[var(--primary-dark)]">★★★★★</div>
                <span className="text-[var(--text-light)]">4.9 average from 2,147 reviews</span>
              </div>
            </div>
          </FadeInSection>
        </Container>
        <FadeInSection>
          <SwipeSlider itemCount={3}>
            {reviews.map((review, i) => (
              <div key={i} className="flex-shrink-0 w-[300px] md:w-[340px] snap-start bg-[var(--bg-secondary)] rounded-lg overflow-hidden border border-[var(--border)]">
                <Image src={review.image} alt={review.name} width={400} height={300} className="w-full h-44 object-cover" />
                <div className="p-5">
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-1 bg-[var(--primary)] text-white text-xs font-medium rounded">{review.weeks}</span>
                    <span className="px-2 py-1 bg-[var(--bg-secondary)] text-[var(--text-light)] text-xs rounded">{review.concern}</span>
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm mb-3">&ldquo;{review.text}&rdquo;</p>
                  <p className="text-[var(--text-light)] text-xs italic mb-3">Unexpected benefit: &ldquo;{review.bonus}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-[var(--border)]">
                    <div className="w-9 h-9 bg-[var(--primary)] rounded-full flex items-center justify-center font-semibold text-white text-sm">{review.name[0]}</div>
                    <div>
                      <p className="font-medium text-sm text-[var(--text)]">{review.name}</p>
                      <p className="text-xs text-[var(--text-light)]">{review.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </SwipeSlider>
          <Container>
            <p className="text-center mt-4 text-[var(--primary-dark)] font-medium text-sm cursor-pointer hover:underline">Read all 2,147 reviews →</p>
          </Container>
        </FadeInSection>
      </section>

      {/* How To Use */}
      <section className="pt-10 md:pt-16 pb-6 md:pb-10 bg-[var(--bg-secondary)]">
        <Container>
          <FadeInSection>
            <div className="text-center mb-6">
              <span className="subheading mb-4 block">Simple Routine</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text)]">
                Simple enough to actually stick with
              </h2>
            </div>
          </FadeInSection>
        </Container>
        <FadeInSection>
          <SwipeSlider itemCount={4}>
            {[
              { step: "1", title: "Cleanse", desc: "Start with clean, dry skin. Remove makeup and moisturizer for best light penetration." },
              { step: "2", title: "Position", desc: "Place mask on face. The flexible silicone naturally conforms to your features." },
              { step: "3", title: "Activate", desc: "Press the single button. The mask auto-shuts off after 10 minutes." },
              { step: "4", title: "Continue", desc: "Apply your regular skincare after. Use 3x per week for best results." },
            ].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-[260px] md:w-[280px] snap-start bg-[var(--bg-secondary)] rounded-lg p-6 border border-[var(--border)] text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-[var(--primary)] rounded-full flex items-center justify-center text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2 text-[var(--text)]">{item.title}</h3>
                <p className="text-sm text-[var(--text-light)]">{item.desc}</p>
              </div>
            ))}
          </SwipeSlider>
        </FadeInSection>
        <FadeInSection>
          <Container>
            <div className="mt-6 bg-white rounded-lg border border-[var(--border)] p-4 md:p-6">
              <div className="flex items-center justify-center gap-4 md:gap-8">
                <div className="text-center flex-1">
                  <p className="text-lg md:text-2xl font-bold text-[var(--primary-dark)]">10 min</p>
                  <p className="text-[var(--text-light)] text-xs md:text-sm">per session</p>
                </div>
                <div className="h-10 w-px bg-[var(--border)]"></div>
                <div className="text-center flex-1">
                  <p className="text-lg md:text-2xl font-bold text-[var(--primary-dark)]">3x/week</p>
                  <p className="text-[var(--text-light)] text-xs md:text-sm">recommended</p>
                </div>
                <div className="h-10 w-px bg-[var(--border)]"></div>
                <div className="text-center flex-1">
                  <p className="text-lg md:text-2xl font-bold text-[var(--primary-dark)]">4-12 wks</p>
                  <p className="text-[var(--text-light)] text-xs md:text-sm">to see results</p>
                </div>
              </div>
            </div>
          </Container>
        </FadeInSection>
      </section>

      {/* Lifestyle Image Slider */}
      <section className="w-full pt-6 md:pt-10 pb-6 md:pb-10">
        <FadeInSection>
          <SwipeSlider itemCount={4}>
            {[
              { src: "/images/Advert_3.png", alt: "The choice is yours - clinic vs at home" },
              { src: "/images/Woman_Lounge1.jpg", alt: "Woman relaxing at home with LED mask" },
              { src: "/images/Woman_on_Bed2.jpg", alt: "Woman using LED mask in bed" },
              { src: "/images/woman_on_bed5.jpg", alt: "Woman using LED mask in hotel room" },
            ].map((img, i) => (
              <div key={i} className="flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[50vw] snap-center">
                <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 60vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </SwipeSlider>
        </FadeInSection>
      </section>

      {/* Results Timeline */}
      <section id="results" className="pt-10 md:pt-16 pb-6 md:pb-10 bg-white">
        <Container>
          <FadeInSection>
            <div className="text-center mb-6">
              <span className="subheading mb-4 block">Expected Timeline</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text)]">
                What to expect, and when
              </h2>
            </div>
          </FadeInSection>
        </Container>
        <FadeInSection>
          <SwipeSlider itemCount={4}>
            {[
              { week: "Week 2", title: "Skin feels softer", desc: "You may not see visible changes yet. That's normal. The light is working beneath the surface." },
              { week: "Week 4", title: "Subtle glow", desc: "Skin starts to look more even. Friends might ask if you changed your skincare routine." },
              { week: "Week 8", title: "Visible improvement", desc: "Fine lines appear softer. Skin looks firmer. This is when most people become believers." },
              { week: "Week 12+", title: "Full results", desc: "Continued improvement with consistent use. Many customers reorder for family members." },
            ].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-[260px] md:w-[280px] snap-start bg-white rounded-lg p-6 border border-[var(--border)]">
                <span className="subheading mb-2 block">{item.week}</span>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text)]">{item.title}</h3>
                <p className="text-sm text-[var(--text-light)]">{item.desc}</p>
              </div>
            ))}
          </SwipeSlider>
        </FadeInSection>
      </section>

      {/* Comparison */}
      <section className="pt-10 md:pt-16 pb-10 md:pb-14 bg-white">
        <Container>
          <FadeInSection>
            <div className="text-center mb-4">
              <span className="subheading mb-4 block">Comparison</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text)]">
                Why Red Light Rejuve?
              </h2>
            </div>
            <p className="text-center text-[var(--text-secondary)] mb-12">See how we compare to traditional LED masks</p>
          </FadeInSection>
          <FadeInSection>
            <div className="max-w-3xl mx-auto bg-[var(--bg-secondary)] rounded-lg overflow-hidden border border-[var(--border)]">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--border)]">
                    <th className="text-left py-4 px-6 text-sm text-[var(--text-light)]">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-[var(--primary-dark)]">Red Light Rejuve</th>
                    <th className="text-center py-4 px-6 text-[var(--text-light)]">Other Masks</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "LED Count", ours: "360 LED Chips", theirs: "60-100 Standard" },
                    { feature: "Wavelengths", ours: "4 (415nm–1072nm)", theirs: "1-2 Wavelengths" },
                    { feature: "Treatment Modes", ours: "6 Preset Modes", theirs: "1-3 Modes" },
                    { feature: "Battery", ours: "4000mAh Rechargeable", theirs: "Corded / Small Battery" },
                    { feature: "Material", ours: "Medical-Grade Silicone", theirs: "Hard Plastic Shell" },
                    { feature: "Controller", ours: "Smart TFT Display", theirs: "Basic Buttons" },
                    { feature: "Warranty", ours: "2 Years", theirs: "6-12 Months" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-[var(--border)]">
                      <td className="py-4 px-6 text-sm text-[var(--text-secondary)]">{row.feature}</td>
                      <td className="py-4 px-6 text-center font-medium text-[var(--text)]">✓ {row.ours}</td>
                      <td className="py-4 px-6 text-center text-[var(--text-light)]">{row.theirs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="pt-10 md:pt-16 pb-10 md:pb-14 bg-white">
        <Container>
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="subheading mb-4 block">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--text)]">
                Frequently asked
              </h2>
            </div>
          </FadeInSection>
          <div className="max-w-2xl mx-auto">
            {faqs.map((faq, i) => (
              <FadeInSection key={i}>
                <div className="stagger-child bg-[var(--bg-secondary)] rounded-lg overflow-hidden mb-4 border border-[var(--border)]">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                    <span className="font-medium text-[var(--text)]">{faq.q}</span>
                    <span className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center font-bold text-white">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6">
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Guarantee */}
      <section className="py-20 md:py-28 bg-[var(--primary)]">
        <Container>
          <FadeInSection>
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-3xl text-[var(--primary)]">✓</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
                60-day guarantee
              </h2>
              <p className="text-lg text-white/80 mb-4">
                We know you&apos;ve been burned before. That&apos;s why we give you 60 days to decide. Use it. See how your skin responds. If it&apos;s not for you, send it back. We&apos;ll cover return shipping.
              </p>
              <p className="text-white font-medium mb-8">No questions. No hassle. That&apos;s the promise.</p>
              <a href="#product" className="inline-block bg-white text-[var(--primary)] px-8 py-4 font-medium uppercase tracking-wider hover:bg-white/90 transition-colors">
                Shop the Mask
              </a>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Ready When You Are */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <Container>
          <FadeInSection>
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text)] mb-2">Ready when you are</h2>
              <p className="text-[var(--text-secondary)]">Try it for 60 days. Love it or return it.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {["60-Day Guarantee", "Free Express Shipping", "2-Year Warranty"].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 bg-[var(--primary)] rounded-full flex items-center justify-center text-xs font-bold text-white">✓</span>
                  <span className="text-sm font-medium text-[var(--text-secondary)]">{text}</span>
                </div>
              ))}
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[var(--text)]">
        <Container>
          <FadeInSection>
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">Join 10,000+ in our community</h2>
              <p className="text-white/60 mb-6 text-sm">Skincare tips, exclusive offers, and honest advice. No spam.</p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input type="email" placeholder="Your email" className="flex-1 px-4 py-3 rounded bg-white text-[var(--text)] placeholder:text-[var(--text-light)]" />
                <button type="submit" className="btn-primary px-6 py-3 uppercase tracking-wider">Subscribe</button>
              </form>
            </div>
          </FadeInSection>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[var(--text)] border-t border-white/10">
        <Container>
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Red Light Rejuve</h3>
              <p className="text-sm text-white/50">Premium LED light therapy for healthier skin.</p>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4 text-white/70">Shop</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#product" className="hover:text-white transition-colors">The Mask</a></li>
                <li><a href="#results" className="hover:text-white transition-colors">Results</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4 text-white/70">Support</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Track Order</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-wider mb-4 text-white/70">Company</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#how-it-works" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Science</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Reviews</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/30">&copy; 2026 Red Light Rejuve. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-white/30">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms</a>
              <a href="#faq" className="hover:text-white transition-colors">Shipping</a>
            </div>
          </div>
        </Container>
      </footer>

      {/* Chat Bubble */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-200 hover:scale-105"
        aria-label={chatOpen ? "Close chat" : "Open chat"}
      >
        {chatOpen ? (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" /><path d="M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      <div className={`fixed bottom-24 right-4 md:right-6 w-[calc(100vw-2rem)] md:w-[400px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-[var(--border)] z-50 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${chatOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="bg-[var(--primary)] text-white px-5 py-4 flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-sm">Skin Care Advisor</p>
            <p className="text-xs text-white/70">Ask me anything about the mask</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px] max-h-[calc(70vh-140px)]">
          {messages.length === 0 && (
            <div className="text-center py-6">
              <p className="text-sm text-[var(--text-light)] mb-4">Hi! I&apos;m here to help you learn about the Red Light Rejuve mask. Ask me anything!</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["How does it work?", "What results can I expect?", "Is it safe for my skin type?"].map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage({ text: q })}
                    className="text-xs px-3 py-2 bg-[var(--primary-fade)] text-[var(--primary-dark)] rounded-full hover:bg-[var(--primary-light)] hover:text-white transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "bg-[var(--primary)] text-white rounded-br-md" : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-bl-md"}`}>
                {m.parts?.filter(p => p.type === "text").map(p => p.text).join("") || ""}
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="bg-[var(--bg-secondary)] px-4 py-2.5 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[var(--text-light)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-[var(--text-light)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-[var(--text-light)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!chatInput.trim() || isLoading) return;
            sendMessage({ text: chatInput });
            setChatInput("");
          }}
          className="border-t border-[var(--border)] p-3 flex gap-2 flex-shrink-0"
        >
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask about the mask..."
            className="flex-1 px-4 py-2.5 bg-[var(--bg-secondary)] rounded-full text-sm text-[var(--text)] placeholder:text-[var(--text-light)] outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || isLoading}
            className="w-10 h-10 bg-[var(--primary)] hover:bg-[var(--primary-dark)] disabled:opacity-40 disabled:hover:bg-[var(--primary)] text-white rounded-full flex items-center justify-center transition-colors flex-shrink-0"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </form>
      </div>

      {/* Spin-to-Win Wheel */}
      <SpinWheel />

    </div>
  );
}
