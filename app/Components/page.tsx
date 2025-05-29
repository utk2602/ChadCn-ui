"use client"
import { useState, useEffect, type JSX } from "react"
import AnimatedTestimonialPage from "./animated-testimonial/page"
import GradientButtonPage from "./gradient-button/page"
import HeroCardPage from "./hero-card/page"
import Carousel3DPage from "./3d-Carousel/page"
import CustomDataTablePage from "./data-table/page"
import FeatureTabsPage from "./Content-display/page"
import TextHoverEffectPage from "./Hero-text/page"
import MacOsIdCardPage from "./Mac-ID/page"
import DraggableModalPage from "./Modal/page"
import MultiStepFormDocumentationPage from "./form/page"
import CustomDropdownPage from "./Dropdown/page"
import ImportedInstallationPage from "./installation/page"
import UsagePage from "./usage/page"
import { ChevronDown, Menu, X } from "lucide-react"

function ComponentPage({ name }: { name: string }) {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">{name}</h1>
      <p className="text-gray-400">Documentation for {name} component.</p>
    </div>
  )
}

function NeonTag() {
  return (
    <span className="ml-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-400/50 shadow-[0_0_10px_rgba(34,211,238,0.3)] animate-pulse">
      New
    </span>
  )
}

export default function MinimalistDocsPage() {
  const [activeComponent, setActiveComponent] = useState("installation")
  const [isComponentsOpen, setIsComponentsOpen] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const components = [
    { id: "animated-testimonial", name: "Testimonial" },
    { id: "gradient-button", name: "Button" },
    { id: "hero-card", name: "Card" },
    { id: "data-table", name: "Table" },
    { id: "modal-dialog", name: "Modal" },
    { id: "dropdown-menu", name: "Dropdown" },
    { id: "form-elements", name: "Form" },
    { id: "3d-carousel", name: "Carousel", hasNeonTag: true },
    { id: "feature-tabs", name: "Tabs", hasNeonTag: true },
    { id: "text-reveal", name: "Text Effects" },
    { id: "mac-os-id-card", name: "ID Card", hasNeonTag: true },
  ]

  const essentialPages = [
    { id: "installation", name: "Installation" },
    { id: "usage", name: "Usage" },
  ]

  const componentMap: Record<string, JSX.Element> = {
    installation: <ImportedInstallationPage />,
    usage: <UsagePage />,
    "animated-testimonial": <AnimatedTestimonialPage />,
    "gradient-button": <GradientButtonPage />,
    "hero-card": <HeroCardPage />,
    "3d-carousel": <Carousel3DPage />,
    "data-table": <CustomDataTablePage />,
    "feature-tabs": <FeatureTabsPage />,
    "text-reveal": <TextHoverEffectPage />,
    "mac-os-id-card": <MacOsIdCardPage />,
    "modal-dialog": <DraggableModalPage />,
    "form-elements": <MultiStepFormDocumentationPage />,
    "dropdown-menu": <CustomDropdownPage />,
  }

  const handleComponentSelect = (componentId: string) => {
    setActiveComponent(componentId)
    setIsMobileMenuOpen(false) // Close mobile menu when selecting a component
  }

  const renderContent = () => {
    return componentMap[activeComponent] || <ComponentPage name="Unknown Component" />
  }

  // Scroll to top on component change
  useEffect(() => {
    const main = document.querySelector(".main-content-scroll")
    if (main) {
      main.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [activeComponent])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector(".mobile-sidebar")
      const menuButton = document.querySelector(".mobile-menu-button")

      if (
        isMobileMenuOpen &&
        sidebar &&
        menuButton &&
        !sidebar.contains(event.target as Node) &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="mobile-menu-button fixed top-4 left-4 z-50 p-2 rounded-lg bg-[#111111] border border-gray-800/50 text-white lg:hidden hover:bg-white/10 transition-colors"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        mobile-sidebar
        fixed lg:relative
        z-40 lg:z-10
        w-64 h-full
        bg-[#111111] border-r border-gray-800/50
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-semibold text-white">Documentation</h1>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1 rounded text-gray-400 hover:text-white"
              aria-label="Close menu"
            >
              <X size={16} />
            </button>
          </div>

          {/* Getting Started */}
          <div className="mb-8">
            <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">Getting Started</h2>
            <div className="space-y-1">
              {essentialPages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => handleComponentSelect(page.id)}
                  className={`w-full text-left py-2 px-3 rounded-lg text-sm transition-colors ${
                    activeComponent === page.id
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {page.name}
                </button>
              ))}
            </div>
          </div>

          {/* Components */}
          <div>
            <button
              onClick={() => setIsComponentsOpen(!isComponentsOpen)}
              className="flex items-center justify-between w-full mb-3"
            >
              <h2 className="text-xs uppercase tracking-wider text-gray-500 font-medium">Components</h2>
              <ChevronDown
                size={14}
                className={`text-gray-500 transition-transform ${isComponentsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isComponentsOpen && (
              <div className="space-y-1">
                {components.map((component) => (
                  <button
                    key={component.id}
                    onClick={() => handleComponentSelect(component.id)}
                    className={`w-full text-left py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      activeComponent === component.id
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{component.name}</span>
                    {component.hasNeonTag && <NeonTag />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-0 flex-1 overflow-auto main-content-scroll pt-16 lg:pt-0">{renderContent()}</div>
    </div>
  )
}
