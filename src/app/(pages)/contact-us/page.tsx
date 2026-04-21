import { ContactForm } from "@/app/_components/contact-us/ContactForm";
import FadeInSection from "@/app/_components/animation/FadeInSection";
import HeadingSection from "@/app/shared/HeadingSection";
import {
  FacebookIcon,
  Globe,
  InstagramIcon,
  LinkedinIcon,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
];

const ContactUs = () => {
  return (
    <>
      <HeadingSection textHeading="contact us" />

      <FadeInSection>
        <div className="bg-main dark:bg-slate-950 px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-stretch gap-6 md:flex-row md:gap-8 lg:gap-10">
            <div className="w-full md:flex-1">
              <ContactForm />
            </div>
            <div
              className="w-full self-stretch rounded-xl p-6 text-secondary dark:text-slate-200 shadow-lg dark:bg-slate-800/50 sm:p-8 md:w-80 lg:w-96 xl:w-105 md:shrink-0"
              style={{
                background:
                  "linear-gradient(0deg, var(--color-blue-28, #1B2472), var(--color-blue-28, #1B2472)), radial-gradient(70.71% 70.71% at 50% 50%, rgba(170, 200, 227, 0.3) 3.54%, rgba(170, 200, 227, 0) 3.54%)",
              }}
            >
              <ul className="space-y-8">
                <li className="flex items-start gap-3">
                  <p className="text-secondary font-bold">ASPC </p>
                </li>

                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold tracking-wide text-secondary/80 uppercase">
                      Address
                    </p>
                    <p className="text-secondary">
                      Mansoura - Ashjar District, Ali Hegazy Street
                    </p>
                  </div>
                </li>

                <li>
                  <a
                    href="mailto:hello@aspc.solutions"
                    className="flex items-start gap-3 text-secondary transition-opacity hover:opacity-90"
                  >
                    <Mail size={18} className="mt-0.5 shrink-0 text-primary " />
                    <span className="space-y-1">
                      <span className="block text-xs font-semibold tracking-wide text-secondary/80 uppercase">
                        Email
                      </span>
                      <span className="block text-secondary">info@aspc.sa</span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href="tel:+966500000000"
                    className="flex items-start gap-3 text-secondary transition-opacity hover:opacity-90"
                  >
                    <Phone size={18} className="mt-0.5 shrink-0 text-primary" />
                    <span className="space-y-1">
                      <span className="block text-xs font-semibold tracking-wide text-secondary/80 uppercase">
                        Phone Number
                      </span>
                      <span className="block text-secondary">
                        +966 50 000 0000
                      </span>
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    href="mailto:hello@aspc.solutions"
                    className="flex items-start gap-3 text-secondary transition-opacity hover:opacity-90"
                  >
                    <Globe
                      size={18}
                      className="mt-0.5 shrink-0 text-primary "
                    />

                    <span className="space-y-1">
                      <span className="block text-xs font-semibold tracking-wide text-secondary/80 uppercase">
                        Website
                      </span>
                      <span className="block text-secondary">
                        arabian-solution-beacon.com
                      </span>
                    </span>
                  </a>
                </li>

                <li className="space-y-3">
                  <h3 className="capitalize">follow us</h3>
                  <div className="flex items-center gap-4">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;

                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          aria-label={social.label}
                          className="rounded-full bg-white/20 p-2 transition-colors hover:text-secondary"
                        >
                          <Icon size={18} />
                        </a>
                      );
                    })}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </FadeInSection>
    </>
  );
};

export default ContactUs;
