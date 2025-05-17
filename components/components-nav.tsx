"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Package } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const componentsNav = [
  {
    title: "CHADCN-UI",
    icon: Package,
    items: [
      {
        title: "AnimatedTestimonial",
        href: "/components/animated-testimonial",
      },
      {
        title: "HeroCard",
        href: "/components/hero-card",
      },
      {
        title: "GradientButton",
        href: "/components/gradient-button",
      },
    ],
  },
]

export function ComponentsNav() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search components..." className="w-full bg-background pl-8 text-sm" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {componentsNav.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>
              {group.icon && <group.icon className="h-4 w-4 mr-2" />}
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
