"use client";

import type * as React from "react";
import {
  IconBook,
  IconDashboard,
  IconFileDescription,
  IconHelp,
  IconListDetails,
  IconSearch,
  IconSettings,
  IconUsers,
  IconStairs,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/mystical-forest-spirit.png",
  },
  navMain: [
    {
      title: "Tableau de bord",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Programmes",
      url: "/programs",
      icon: IconBook,
    },
    {
      title: "Niveaux",
      url: "/levels",
      icon: IconStairs,
    },
    {
      title: "Étudiants",
      url: "/students",
      icon: IconUsers,
    },
  ],
  navClouds: [
    {
      title: "Inscriptions",
      icon: IconListDetails,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Inscriptions actives",
          url: "#",
        },
        {
          title: "Archives",
          url: "#",
        },
      ],
    },
    {
      title: "Examens",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Examens à venir",
          url: "#",
        },
        {
          title: "Résultats",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Paramètres",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Aide",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Recherche",
      url: "#",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#">
                <IconStairs className="!size-5" />
                <span className="text-base font-semibold">
                  Sup Management Admin Académique
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
