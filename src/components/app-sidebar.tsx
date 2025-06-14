import { Calendar, HelpCircle, PhoneCall, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Link } from "@tanstack/react-router";

// Menu items.
const items = [
  // {
  //   title: "ホーム",
  //   url: "/",
  //   icon: Home,
  // },
  {
    title: "探す",
    url: "/search",
    icon: Search,
  },
  {
    title: "予約する",
    url: "/reserve",
    icon: Calendar,
  },
  {
    title: "このサービスについて",
    url: "/about",
    icon: HelpCircle,
  },
  {
    title: "問い合わせ",
    url: "/contact",
    icon: PhoneCall,
  },
] as const;

export function AppSidebar() {
  return (
    <Sidebar className="bg-blue-600 border-blue-900">
      <SidebarContent>
        <SidebarGroup className="flex gap-3 text-white">
          <SidebarGroupLabel className="font-bold text-3xl">
            Let's sports!
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuContent key={item.title} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

type SidebarMenuContentProps = {
  item: (typeof items)[number];
};

function SidebarMenuContent({ item }: SidebarMenuContentProps) {
  switch (item.title) {
    case "予約する": {
      return (
        <Tooltip>
          <TooltipTrigger>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  to={item.url}
                  className="[&.active]:font-bold [&.active]:bg-blue-700 hover:bg-blue-700"
                  disabled
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </TooltipTrigger>
          <TooltipContent className="bg-black  p-3 rounded-xl">
            <TooltipArrow />
            開発中
          </TooltipContent>
        </Tooltip>
      );
    }

    default: {
      return (
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              to={item.url}
              className="[&.active]:font-bold [&.active]:bg-blue-700 hover:bg-blue-700"
            >
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }
  }
}
