"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { protectedRoutes as items } from "@/lib/constants/protected-routes";
import { Separator } from "../ui/separator";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "../Logo";

export function AppSidebar({ dict, lang, ...props }: { dict?: any; lang?: string } & React.ComponentProps<typeof Sidebar>) {
  //   const { data: sessionData, status } = useSession();
  let userItems = items;
  //   if (sessionData) {
  //     userItems = items.filter((item) =>
  //       item.role.includes(sessionData.user.role)
  //     );
  //   }
  const path = usePathname();
  const prefix = lang ? `/${lang}` : "";

  // translate route titles if a dictionary is provided
  if (dict?.sidebar) {
    userItems = userItems.map((item) => {
      const key = item.title.toLowerCase();
      return {
        ...item,
        title: dict.sidebar[key] || item.title,
      };
    });
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-18">
        <Link href={"/"} className="flex items-center gap-2 h-18">
          <p className="p-2 bg-violet h-10 w-10 flex items-center justify-center text-xl aspect-square font-black rounded-sm bg-[#ff7500] text-white">
                M
          </p>
          <div className="flex flex-col font-bold text-xl">
            <Logo/>
          </div>
        </Link>
        <Separator orientation="horizontal" />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarGroup>
          {/* <SidebarGroupLabel>{item.title}</SidebarGroupLabel> */}
          <SidebarGroupContent>
            {false && (
              <div className="w-full py-4 flex items-center justify-center">
              <Loader size={24} strokeWidth={1.5} className="animate-spin" />
              </div>
            )}
            {true &&(
              <SidebarMenu className="space-y-3">
                {userItems.map(({ title, url, icon: Icon }) => (
                  <SidebarMenuItem key={title}>
                    <SidebarMenuButton asChild isActive={path === `${prefix}${url}` || path === url}>
                      <Link href={`${prefix}${url}`}>  
                        <Icon size={20} strokeWidth={1.5} />
                        {title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        {/* {sessionData && <SidebarAccountInfo user={sessionData.user} />} */}
      </SidebarFooter>
    </Sidebar>
  );
}