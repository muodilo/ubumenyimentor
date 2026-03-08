import Link from "next/link";
import { MenuIcon } from "lucide-react";

import Logo from "@/components/Logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ModeToggle } from "@/components/mode-toggle";

type NavbarDictionary = {
  home: {
    languageLabel: string;
  };
  nav: {
    brand: string;
    features: string;
    pricing: string;
    signin: string;
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

  return (
    <header className="sticky top-0 z-50  backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href={homeHref} className="flex items-center gap-2">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href={featuresHref} className="hover:text-primary">
            {dict.nav.features}
          </Link>
          <Link href={pricingHref} className="hover:text-primary">
            {dict.nav.pricing}
          </Link>
          <Link href={signinHref} className="hover:text-primary">
            {dict.nav.signin}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher label={dict.home.languageLabel} />
          <ModeToggle
            labelLight={dict.theme.light}
            labelDark={dict.theme.dark}
            labelSystem={dict.theme.system}
            toggleLabel={dict.theme.toggle}
          />

          <details className="relative md:hidden">
            <summary className="list-none rounded-md border px-2.5 py-2 text-sm hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50">
              <span className="sr-only">Menu</span>
              <MenuIcon className="h-4 w-4" />
            </summary>

            <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-popover p-2 shadow-md">
              <Link
                href={featuresHref}
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                {dict.nav.features}
              </Link>
              <Link
                href={pricingHref}
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                {dict.nav.pricing}
              </Link>
              <Link
                href={signinHref}
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                {dict.nav.signin}
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export default Navbar;