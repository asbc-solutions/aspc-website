"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface NavItem {
  label: string;
  href: string;
}

interface NavLinksProps {
  items: NavItem[];
}

function AnimatedLink({ label, href }: NavItem) {
  const underlineRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const isActive = pathname === href;

  useEffect(() => {
    gsap.set(underlineRef.current, {
      scaleX: isActive ? 1 : 0,
      transformOrigin: "left center",
    });
  }, [isActive]);

  const handleMouseEnter = () => {
    if (isActive) return;
    gsap.fromTo(
      underlineRef.current,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, transformOrigin: "left center", duration: 0.35, ease: "power2.out" }
    );
  };

  const handleMouseLeave = () => {
    if (isActive) return;
    gsap.to(underlineRef.current, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 0.3,
      ease: "power2.in",
    });
  };

  return (
    <Link
      prefetch={true}
      href={href}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
      <span
        ref={underlineRef}
        className="absolute bottom-0 left-0 h-[2px] w-full bg-current"
        style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
      />
    </Link>
  );
}

export function NavLinks({ items }: NavLinksProps) {
  return (
    <ul className="flex gap-5 text-white dark:text-indigo-300">
      {items.map((item) => (
        <li key={item.href} className="list-none">
          <AnimatedLink {...item} />
        </li>
      ))}
    </ul>
  );
}
