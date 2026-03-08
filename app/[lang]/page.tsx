import { notFound } from "next/navigation";

import { getDictionary, hasLocale } from "../dictionaries";
import NavBar from "@/components/navbar";
import HeroSection from "@/components/HeroSection";

export default async function HomePage({
  params,
}: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <main className="">
      <NavBar lang={lang} dict={dict} />
      <HeroSection  dict={dict}/>
    </main>
  );
}

