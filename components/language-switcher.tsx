"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  function changeLanguage(nextLocale: string) {
    if (nextLocale === currentLocale) return;

    const nextSegments = [...segments];
    nextSegments[1] = nextLocale;
    const nextPathname = nextSegments.join("/") || "/";

    router.push(nextPathname);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          aria-label={label}
        >
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline-flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-6 h-4 text-xs font-semibold bg-muted rounded text-muted-foreground">
              {currentLanguage?.flag}
            </span>
            {currentLanguage?.label}
          </span>
          <span className="sm:hidden inline-flex items-center justify-center w-6 h-4 text-xs font-semibold bg-muted rounded text-muted-foreground">
            {currentLanguage?.flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="inline-flex items-center justify-center w-6 h-4 text-xs font-semibold bg-muted rounded text-muted-foreground">
              {lang.flag}
            </span>
            <span className="flex-1">{lang.label}</span>
            {currentLocale === lang.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

