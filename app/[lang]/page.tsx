import { notFound } from "next/navigation";

import { getDictionary, hasLocale } from "../dictionaries";
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
    <main className="">
      <NavBar lang={lang} dict={dict} />
      <section className="py-10 px-5 md:px-16 lg:px-30 bg-[#fff0e7] dark:bg-background ">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {dict.home.title}
        </h1>
      </section>
    </main>
  );
}

