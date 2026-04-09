"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";
import gsap from "gsap";

export function SideMenu() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  const animateMenu = () => {
    if (!panelRef.current) return;
    const links = linkRefs.current.filter(Boolean);
    const timeline = gsap.timeline();

    timeline.fromTo(
      panelRef.current,
      { x: 64, autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        duration: 0.38,
        ease: "power3.out",
        clearProps: "opacity,visibility,transform",
      }
    );

    timeline.fromTo(
      links,
      { y: 20, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.42,
        stagger: { each: 0.06, from: "end" },
        ease: "power2.out",
        clearProps: "opacity,visibility,transform",
      },
      "-=0.22"
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden  text-white hover:bg-white/10 dark:text-indigo-300 dark:hover:bg-indigo-950/50 transition-colors"
        >
          <Menu className="h-8 w-8" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        ref={panelRef}
        onOpenAutoFocus={animateMenu}
        className="w-[80%] max-w-sm bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 px-0"
      >
        <SheetDescription className="sr-only">
          Mobile navigation menu with links to all main pages.
        </SheetDescription>
        <nav className="pt-8 space-y-2">
          {navItems.map((item, index) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                ref={(el) => {
                  linkRefs.current[index] = el;
                }}
                className="block px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 border-l-4 border-transparent hover:border-indigo-600 dark:hover:border-indigo-400"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
