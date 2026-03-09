import {
  Home,
  BarChartIcon as ChartColumn,
  Map,
  UserCheck,
  FileText,
  Brain,
  MessageSquare,
  Bell,
  GitBranch,
  BarChartBigIcon as ChartBarBig,
  Settings,
} from "lucide-react";
import { RoleEnum } from "@/types/user-slice"; 
import { ProtectedRoute } from "@/types/auth";

export const protectedRoutes: ProtectedRoute[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    role: [RoleEnum.TEACHER, RoleEnum.STUDENT, RoleEnum.ADMIN],
  },
  {
    title: "My courses",
    url: "/dashboard/productivity-scorecard",
    icon: ChartColumn,
    role: [RoleEnum.STUDENT],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    role: [RoleEnum.TEACHER, RoleEnum.STUDENT, RoleEnum.ADMIN],
  },
];

export const publicPaths = ["/", "/login", "/register", "/unauthorized"];