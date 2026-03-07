"use client";

import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "rw", label: "Kinyarwanda" },
];

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";

  function changeLanguage(nextLocale: string) {
    if (nextLocale === currentLocale) return;

    const nextSegments = [...segments];
    nextSegments[1] = nextLocale;
    const nextPathname = nextSegments.join("/") || "/";

    router.push(nextPathname);
  }

  return (
    <select
      value={currentLocale}
      onChange={(event) => changeLanguage(event.target.value)}
      className="ml-2 rounded border bg-background px-2 py-1 text-sm"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}

