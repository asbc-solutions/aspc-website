import logo from "@/app/assets/logo.png";
import dayjs from "dayjs";
import {
  Copyright,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "ASPC ERP Suite", href: "/" },
  { label: "ASPC CRM Pro", href: "/services" },
  { label: "ASPC Shield", href: "/solutions" },
  { label: "Cloud Platform", href: "/about" },
  { label: "Custom Development", href: "/portfolio" },
];

const serviceLinks = [
  { label: "Custom Software Development", href: "/services" },
  { label: "Software Licensing & Warehouse", href: "/services" },
  { label: "IT Infrastructure", href: "/services" },
  { label: "ERP & CRM Systems", href: "/services" },
  { label: "Digital Transformation", href: "/services" },
];

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
];

const Footer = () => {
  return (
    <footer
      style={{
        background:
          "linear-gradient(0deg, var(--color-blue-28, #1B2472), var(--color-blue-28, #1B2472)), radial-gradient(70.71% 70.71% at 50% 50%, rgba(170, 200, 227, 0.3) 3.54%, rgba(170, 200, 227, 0) 3.54%)",
      }}
      className="text-secondary "
    >
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <Image
              src={logo}
              alt="ASPC logo"
              className="w-24 h-auto"
              priority={false}
            />
            <p className="max-w-sm text-sm leading-6">
              Empowering businesses across the Arab world with innovative
              software solutions and enterprise-grade technology.
            </p>
            <p>Arabian Solution Beacon</p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="transition-colors hover:text-white bg-white/20 rounded-full p-2"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Our Services
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Software Solutions & Products
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-3">
              {/* <li className="flex items-start gap-2">
                <Building2 size={18} className="mt-0.5 shrink-0" />
                <span>ASPC Solutions</span>
              </li> */}

              <li>
                <a
                  href="mailto:hello@aspc.solutions"
                  className="flex items-start gap-2 transition-colors hover:text-white"
                >
                  <Mail size={18} className="mt-0.5 shrink-0 text-primary" />
                  info@aspc.sa
                </a>
              </li>
              <li>
                <a
                  href="tel:+966500000000"
                  className="flex items-start gap-2 transition-colors hover:text-white"
                >
                  <Phone size={18} className="mt-0.5 shrink-0 text-primary" />
                  +966 50 000 0000
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                <span>Mansoura — Ashjar District, Ali Hegazy Street</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-sm flex items-center justify-between">
          <p className="flex items-center gap-1">
            <Copyright size={15} />
            {dayjs().year()} ASPC Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p>Privacy Policy</p>
            <p> Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
