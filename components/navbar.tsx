"use client"

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import Logo from "@/components/Logo";
import { ClientLanguageSwitcher } from "@/components/ClientLanguageSwitcher";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when resizing to large screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full h-[80vh] sm:h-[70vh]">
              <SheetTitle className="sr-only">{dict.nav.mobileMenuTitle}</SheetTitle>
              <SheetHeader>
                <Logo/>
              </SheetHeader>
              <div className=" space-y-4 p-5">
                <ul className="space-y-2">
                  <li>
                    <Link
                      href={featuresHref}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      {dict.nav.features}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={pricingHref}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
                      onClick={() => setIsOpen(false)}
                    >
                      {dict.nav.pricing}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={signinHref}
                      className="block rounded-md px-3 py-2 text-sm border hover:bg-accent hover:text-accent-foreground text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {dict.nav.signin}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={signupHref}
                      className="block rounded-md px-3 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {dict.nav.signup}
                    </Link>
                  </li>
                </ul>
                {/* <div className="border-t pt-4 flex items-center gap-2">
                  <LanguageSwitcher label={dict.home.languageLabel} />
                  <ModeToggle
                    labelLight={dict.theme.light}
                    labelDark={dict.theme.dark}
                    labelSystem={dict.theme.system}
                    toggleLabel={dict.theme.toggle}
                  />
                </div> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;