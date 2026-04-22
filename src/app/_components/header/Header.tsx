import logo from "@/app/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { SideMenu } from "./SideMenu";
import { NavLinks } from "./NavLinks";

const Header = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Solutions", href: "/solutions" },
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    // i will remove you again
    { label: "Careers", href: "/careers" },
    { label: "event", href: "/event" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <div className="flex container mx-auto p-4 items-center justify-between bg-transparent absolute top-0 left-0 right-0">
      <Link href={"/"}>
        <Image src={logo} alt="logo" className="w-20" priority={true} />
      </Link>
      <nav className="hidden md:block">
        <NavLinks items={navItems.slice(0, -1)} />
      </nav>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link
          prefetch={true}
          href={"/contact-us"}
          className="hidden md:flex bg-white dark:bg-black/10 dark:text-white dark:border-white/25 dark:border text-primary font-medium  rounded-full capitalize px-4 py-2"
        >
          contact
        </Link>
        <SideMenu />
      </div>
    </div>
  );
};

export default Header;
