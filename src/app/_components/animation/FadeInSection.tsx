"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type FadeInSectionProps = Readonly<{
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
}>;

export default function FadeInSection({
  children,
  className,
  y = 20,
  duration = 0.6,
  delay = 0,
}: FadeInSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        gsap.fromTo(
          element,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration,
            delay,
            ease: "power2.out",
            clearProps: "opacity,visibility,transform",
          }
        );

        observer.unobserve(element);
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, duration, y]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
