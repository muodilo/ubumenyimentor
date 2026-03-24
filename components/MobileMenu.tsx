"use client"

import dynamic from "next/dynamic";
import { MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

// Dynamically import Sheet components to avoid SSR hydration issues
const Sheet = dynamic(() => import("@/components/ui/sheet").then(mod => mod.Sheet), { ssr: false });
const SheetContent = dynamic(() => import("@/components/ui/sheet").then(mod => mod.SheetContent), { ssr: false });
const SheetHeader = dynamic(() => import("@/components/ui/sheet").then(mod => mod.SheetHeader), { ssr: false });
const SheetTitle = dynamic(() => import("@/components/ui/sheet").then(mod => mod.SheetTitle), { ssr: false });
const SheetTrigger = dynamic(() => import("@/components/ui/sheet").then(mod => mod.SheetTrigger), { ssr: false });

import Logo from "@/components/Logo";

type MobileMenuDictionary = {
  nav: {
    features: string;
    pricing: string;
    signin: string;
    signup: string;
    mobileMenuTitle: string;
  };
};

type MobileMenuProps = {
  lang: string;
  dict: MobileMenuDictionary;
};

export function MobileMenu({ lang, dict }: MobileMenuProps) {
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

  const featuresHref = `/${lang}#features`;
  const pricingHref = `/${lang}#pricing`;
  const signinHref = `/${lang}/signin`;
  const signupHref = `/${lang}/signup`;

  return (
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
          <Logo />
        </SheetHeader>
        <div className="space-y-4 p-5">
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
        </div>
      </SheetContent>
    </Sheet>
  );
}