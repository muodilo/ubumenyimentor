import { AppSidebar } from "@/components/custom/AppSidebar"; 
import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/mode-toggle"; 
import { Separator } from "@/components/ui/separator";
import { getDictionary,hasLocale } from "@/app/dictionaries";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ClientLanguageSwitcher } from "@/components/ClientLanguageSwitcher";
export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
const {lang} = await params

if(!hasLocale(lang)){
  notFound()
}

const dict = await getDictionary(lang)
  return (
    <SidebarProvider
      toggleLabel={dict.sidebar.toggle}
      sheetTitle={dict.sidebar.mobileTitle}
      sheetDescription={dict.sidebar.mobileDescription}
    >
      <AppSidebar dict={dict} lang={lang}/>
      <SidebarInset>
        <header className="bg-sidebar flex h-16 shrink-0 items-center gap-2 border-b px-4 py-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Link href={`/${lang}`} className="flex gap-2 ">
            <p className="p-2 bg-violet h-10 w-10 flex items-center justify-center text-xl aspect-square font-black rounded-sm bg-[#ff7500] text-white">
              M
            </p>
            <div className="flex flex-col font-bold text-xl">
              <Logo />
              <p className="text-xs font-normal">
                {dict.home.sylogan}
              </p>
            </div>
          </Link>
          <div
            className="flex-1 gap-2
           flex justify-end items-center h-full"
          >
            <ClientLanguageSwitcher label={dict.home.languageLabel} />
            <ModeToggle
              labelLight={dict.theme.light}
              labelDark={dict.theme.dark}
              labelSystem={dict.theme.system}
              toggleLabel={dict.theme.toggle}
            />
          </div>
        </header>
        <div className="w-full h-full  p-3">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}