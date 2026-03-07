import { notFound } from "next/navigation";

import { getDictionary, hasLocale } from "../dictionaries";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import NavBar from "@/components/navbar";

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    // <div className="space-y-4 p-4">
    //   <div className="flex items-center gap-2">
    //     <ModeToggle
    //       labelLight={dict.theme.light}
    //       labelDark={dict.theme.dark}
    //       labelSystem={dict.theme.system}
    //       toggleLabel={dict.theme.toggle}
    //     />
    //     <label className="text-sm">
    //       {dict.home.languageLabel}
    //       <LanguageSwitcher />
    //     </label>
    //   </div>
    //   <h1 className="text-2xl font-semibold">{dict.home.title}</h1>
    //   <Button>{dict.home.button}</Button>
    // </div>
    <main className="lg:px-30 md:px-16 px-5">
      <NavBar/>
      <h1 className="text-2xl font-semibold">Welcome</h1>
    </main>
  );
}

