"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, BookOpen, Package, Lightbulb } from "lucide-react"
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

const docsNav = [
  {
    title: "Getting Started",
    icon: BookOpen,
    items: [
      {
        title: "Introduction",
        href: "/docs",
      },
      {
        title: "Installation",
        href: "/docs/installation",
      },
    ],
  },
  {
    title: "Components",
    icon: Package,
    items: [
      {
        title: "AnimatedTestimonial",
        href: "/docs/animated-testimonial",
      },
      {
        title: "HeroCard",
        href: "/docs/hero-card",
      },
      {
        title: "GradientButton",
        href: "/docs/gradient-button",
      },
    ],
  },
  {
    title: "Guides",
    icon: Lightbulb,
    items: [
      {
        title: "Styling",
        href: "/docs/styling",
      },
      {
        title: "Customization",
        href: "/docs/customization",
      },
    ],
  },
]

export function DocsNav() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search documentation..." className="w-full bg-background pl-8 text-sm" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {docsNav.map((group) => (
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
