"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Facebook, Linkedin, Music2, Instagram } from "lucide-react";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1U3gDJRLbu/",
    icon: Facebook,
    color: "#1877F2",
    bg: "hover:bg-[#1877F2]",
    border: "hover:border-[#1877F2]",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@asbc.company?_r=1&_t=ZS-95fbJHMlvH7",
    icon: Music2,
    color: "#69C9D0",
    bg: "hover:bg-[#010101]",
    border: "hover:border-[#69C9D0]",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/arabian-solutions-beacon/",
    icon: Linkedin,
    color: "#0A66C2",
    bg: "hover:bg-[#0A66C2]",
    border: "hover:border-[#0A66C2]",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/asbc.subs?igsh=Y29yd203ajMyajZ1",
    icon: Instagram,
    color: "#E1306C",
    bg: "hover:bg-gradient-to-br hover:from-[#833ab4] hover:via-[#E1306C] hover:to-[#FCAF45]",
    border: "hover:border-[#E1306C]",
  },
];

export default function SocialMedia() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({ paused: true });

    tl.fromTo(
      titleRef.current,
      { autoAlpha: 0, y: -30 },
      { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
    )
      .fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "center" },
        { scaleX: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3",
      )
      .fromTo(
        cardsRef.current ? Array.from(cardsRef.current.children) : [],
        { autoAlpha: 0, y: 40, scale: 0.85 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: "back.out(1.4)",
          stagger: 0.12,
        },
        "-=0.2",
      );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        tl.play();
        observer.unobserve(section);
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4">
      {/* heading */}
      <div ref={titleRef} className="text-center mb-10">
        <p className="text-sm uppercase tracking-widest text-secondary-dark mb-2 font-medium">
          Stay connected
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-600 dark:text-slate-100">
          Follow us on <span className="text-secondary-dark">social media</span>
        </h2>
        <span
          ref={lineRef}
          className="mt-4 block mx-auto h-1 w-20 rounded-full bg-secondary-dark"
        />
      </div>

      {/* cards */}
      <div
        ref={cardsRef}
        className="flex flex-wrap items-center justify-center gap-5 max-w-2xl mx-auto"
      >
        {socials.map(({ label, href, icon: Icon, color, bg, border }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-col items-center gap-3 w-36 py-7 px-4 rounded-2xl border-2 border-slate-200 bg-white shadow-sm ${bg} ${border} hover:text-white hover:shadow-xl transition-all duration-300 cursor-pointer`}
          >
            <span className="p-3 rounded-full bg-slate-100 group-hover:bg-white/20 transition-colors duration-300">
              <Icon
                size={28}
                style={{ color }}
                className="group-hover:text-white! transition-colors duration-300"
              />
            </span>
            <span className="text-sm font-semibold text-slate-700 group-hover:text-white transition-colors duration-300">
              {label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
