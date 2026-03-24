"use client";

import dynamic from "next/dynamic";

const LanguageSwitcher = dynamic(() => import("@/components/language-switcher").then(mod => mod.LanguageSwitcher), { ssr: false });

type LanguageSwitcherProps = {
  label?: string;
};

export function ClientLanguageSwitcher({ label = "Language" }: LanguageSwitcherProps) {
  return <LanguageSwitcher label={label} />;
}