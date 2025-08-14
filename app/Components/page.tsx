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
import { ChevronDown, Menu, X, Search } from "lucide-react"
import DesignerCardPage from "./Design Card/page"
import { useIsMobile, useTouchGestures, useMobileAnimations } from "@/components/ui/use-mobile"
import { cn } from "@/lib/utils"

function ComponentPage({ name }: { name: string }) {
  return (
    <div className="p-4 md:p-8 text-white mobile-fade-in-up">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{name}</h1>
      <p className="text-gray-400 mobile-text-base">Documentation for {name} component.</p>
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
  const [searchQuery, setSearchQuery] = useState("")
  const { isMobile, screenSize } = useIsMobile()
  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchGestures()
  const { isVisible, fadeInUp, slideInLeft, slideInRight } = useMobileAnimations()

  const components = [
    { id: "animated-testimonial", name: "Testimonial", category: "feedback" },
    { id: "gradient-button", name: "Button", category: "input" },
    { id: "hero-card", name: "Card", category: "layout" },
    { id: "designer-card", name: "Design Card", hasNeonTag: true, category: "layout" },
    { id: "data-table", name: "Table", category: "data" },
    { id: "modal-dialog", name: "Modal", category: "overlay" },
    { id: "dropdown-menu", name: "Dropdown", category: "input" },
    { id: "form-elements", name: "Form", category: "input" },
    { id: "3d-carousel", name: "Carousel", hasNeonTag: true, category: "media" },
    { id: "feature-tabs", name: "Tabs", hasNeonTag: true, category: "navigation" },
    { id: "text-reveal", name: "Text Effects", category: "typography" },
    { id: "mac-os-id-card", name: "ID Card", hasNeonTag: true, category: "layout" },
  ]

  const essentialPages = [
    { id: "installation", name: "Installation", category: "getting-started" },
    { id: "usage", name: "Usage", category: "getting-started" },
  ]

  const componentMap: Record<string, JSX.Element> = {
    installation: <ImportedInstallationPage />,
    usage: <UsagePage />,
    "animated-testimonial": <AnimatedTestimonialPage />,
    "gradient-button": <GradientButtonPage />,
    "hero-card": <HeroCardPage />,
    "designer-card": <DesignerCardPage />,
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
    setIsMobileMenuOpen(false)
    // Add mobile animation
    if (isMobile) {
      slideInRight()
    }
  }

  const renderContent = () => {
    return componentMap[activeComponent] || <ComponentPage name="Unknown Component" />
  }

  // Filter components based on search
  const filteredComponents = components.filter(component =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredEssentialPages = essentialPages.filter(page =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  // Initialize mobile animations
  useEffect(() => {
    if (isMobile) {
      fadeInUp()
    }
  }, [isMobile, fadeInUp])

  // Handle touch gestures for mobile menu
  const handleTouchEnd = () => {
    const result = onTouchEnd()
    if (result?.direction === 'left' && isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    } else if (result?.direction === 'right' && !isMobileMenuOpen) {
      setIsMobileMenuOpen(true)
    }
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="mobile-menu-button fixed top-20 left-4 z-50 p-3 rounded-xl bg-[#111111] border border-gray-800/50 text-white lg:hidden touch-feedback mobile-bounce-in"
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden mobile-backdrop" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
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
        mobile-backdrop
        flex flex-col
      `}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Sidebar Header - Fixed */}
        <div className="flex-shrink-0 p-4 md:p-6 border-b border-gray-800/50">
          <div className="flex items-center justify-between">
            <h1 className="text-lg md:text-xl font-semibold text-white">Documentation</h1>
            {/* Close button for mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white touch-feedback"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-700/50 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 mobile-transition"
            />
          </div>
        </div>

        {/* Sidebar Content - Scrollable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden sidebar-scroll">
          <div className="p-4 md:p-6 sidebar-content-fade">
            {/* Getting Started */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">Getting Started</h2>
              <div className="space-y-2">
                {filteredEssentialPages.map((page, index) => (
                  <button
                    key={page.id}
                    onClick={() => handleComponentSelect(page.id)}
                    className={`w-full text-left py-3 px-4 rounded-xl text-sm transition-all duration-200 touch-feedback mobile-nav-item ${
                      activeComponent === page.id
                        ? "bg-white/10 text-white shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
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
                className="flex items-center justify-between w-full mb-3 mobile-nav-item"
              >
                <h2 className="text-xs uppercase tracking-wider text-gray-500 font-medium">Components</h2>
                <ChevronDown
                  size={14}
                  className={`text-gray-500 transition-transform duration-200 ${isComponentsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isComponentsOpen && (
                <div className="space-y-2">
                  {filteredComponents.map((component, index) => (
                    <button
                      key={component.id}
                      onClick={() => handleComponentSelect(component.id)}
                      className={`w-full text-left py-3 px-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-between touch-feedback mobile-nav-item ${
                        activeComponent === component.id
                          ? "bg-white/10 text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-2">
                        <span>{component.name}</span>
                        <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded-full">
                          {component.category}
                        </span>
                      </div>
                      {component.hasNeonTag && <NeonTag />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Swipe Indicator */}
            {isMobile && (
              <div className="lg:hidden mt-6 pt-6 text-center border-t border-gray-800/50">
                <div className="swipe-indicator">
                  <span className="text-xs text-gray-500">Swipe left to close</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-0 flex-1 overflow-auto main-content-scroll pt-16 lg:pt-0">
        <div className={cn(
          "mobile-transition",
          isMobile && "mobile-fade-in-up"
        )}>
          {renderContent()}
        </div>
      </div>

      {/* Mobile Quick Actions */}
      {isMobile && (
        <div className="fixed bottom-4 right-4 z-50 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg touch-feedback mobile-bounce-in"
            aria-label="Quick menu"
          >
            <Menu size={20} className="text-white" />
          </button>
        </div>
      )}
    </div>
  )
}
