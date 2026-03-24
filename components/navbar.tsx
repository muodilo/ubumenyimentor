"use client"

import Link from "next/link";
import dynamic from "next/dynamic";

import Logo from "@/components/Logo";
import { ClientLanguageSwitcher } from "@/components/ClientLanguageSwitcher";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/MobileMenu";

type NavbarDictionary = {
  home: {
    languageLabel: string;
  };
  nav: {
    brand: string;
    features: string;
    pricing: string;
    signin: string;
    signup: string;
    mobileMenuTitle: string;
    mobileMenuDescription: string;
  };
  theme: {
    toggle: string;
    light: string;
    dark: string;
    system: string;
  };
};

type NavbarProps = {
  lang: string;
  dict: NavbarDictionary;
};

export function Navbar({ lang, dict }: NavbarProps) {
  const homeHref = `/${lang}`;
  const featuresHref = `/${lang}#features`;
  const pricingHref = `/${lang}#pricing`;
  const signinHref = `/${lang}/signin`;
  const signupHref = `/${lang}/signup`;

  return (
    <header className="sticky top-0 z-50  backdrop-blur px-5 md:px-16 lg:px-30 bg-[#fff0e7] dark:bg-background border-b">
      <div className=" flex  items-center justify-between gap-3  py-3">
        <Link href={homeHref} className="flex items-center gap-2">
          <Logo />
        </Link>

        <nav className="hidden lg:flex lg:items-center lg:gap-6">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <Link href={featuresHref} className="hover:text-primary">
                {dict.nav.features}
              </Link>
            </li>
            <li>
              <Link href={pricingHref} className="hover:text-primary">
                {dict.nav.pricing}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex items-center gap-4">
            <Link href={signinHref} className=" rounded-full bg-[#ff7500] px-4 py-1 text-sm text-white hover:bg-[#ff7500] border border-[#ff7500]">
              {dict.nav.signin}
            </Link>
            <Link
              href={signupHref}
              className="px-2 py-1 rounded-full border border-[#ff7500] text-[#ff7500] hover:bg-[#ff7500] hover:text-white duration-150"
            >
              {dict.nav.signup}
            </Link>
          </nav>

          <ClientLanguageSwitcher label={dict.home.languageLabel} />
          <ModeToggle
            labelLight={dict.theme.light}
            labelDark={dict.theme.dark}
            labelSystem={dict.theme.system}
            toggleLabel={dict.theme.toggle}
          />

          <MobileMenu lang={lang} dict={dict} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;