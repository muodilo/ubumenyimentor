"use client";

import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { Check, ChevronDown, Languages } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "EN" },
  { code: "fr", label: "Français", flag: "FR" },
  { code: "rw", label: "Kinyarwanda", flag: "RW" },
];

type LanguageSwitcherProps = {
  label?: string;
};

export function LanguageSwitcher({ label = "Language" }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const detailsRef = React.useRef<HTMLDetailsElement | null>(null);

  const supported = React.useMemo(
    () => new Set(languages.map((l) => l.code)),
    []
  );
  const segments = pathname.split("/").filter(Boolean);
  const currentLocale = supported.has(segments[0] ?? "") ? segments[0] : "en";

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  function changeLanguage(nextLocale: string) {
    if (nextLocale === currentLocale) return;

    const nextSegments = [...segments];
    if (supported.has(nextSegments[0] ?? "")) {
      nextSegments[0] = nextLocale;
    } else {
      nextSegments.unshift(nextLocale);
    }

    const nextPathname = `/${nextSegments.join("/")}`;

    router.push(nextPathname);
    if (detailsRef.current) detailsRef.current.open = false;
  }

  return (
    <details ref={detailsRef} className="relative">
      <summary
        aria-label={label}
        className="group flex list-none items-center gap-2 rounded-md border bg-background px-2.5 py-2 text-sm hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <Languages className="h-4 w-4 text-muted-foreground" />
        <span className="inline-flex items-center justify-center rounded bg-muted px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
          {currentLanguage?.flag ?? "EN"}
        </span>
        <span className="hidden sm:inline">{currentLanguage?.label ?? "English"}</span>
        <ChevronDown className="ml-1 h-4 w-4 text-muted-foreground transition group-open:rotate-180" />
      </summary>

      <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-lg border bg-popover p-1 shadow-md">
        {languages.map((lang) => {
          const active = currentLocale === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => changeLanguage(lang.code)}
              className="flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left text-sm hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <span className="inline-flex items-center justify-center rounded bg-muted px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                {lang.flag}
              </span>
              <span className="flex-1">{lang.label}</span>
              {active ? <Check className="h-4 w-4 text-primary" /> : null}
            </button>
          );
        })}
      </div>
    </details>
  );
}

