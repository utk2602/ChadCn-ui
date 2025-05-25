"use client";
import { useState, useEffect } from "react";
import AnimatedTestimonialPage from "./animated-testimonial/page";
import GradientButtonPage from "./gradient-button/page";
import HeroCardPage from "./hero-card/page";
import Carousel3DPage from "./3d-Carousel/page";
import CustomDataTablePage from "./data-table/page";
import FeatureTabsPage from "./Content-display/page";
import TextHoverEffectPage from "./Hero-text/page";
import MacOsIdCardPage from "./Mac-ID/page";
import DraggableModalPage from "./Modal/page";
import MultiStepFormDocumentationPage from "./form/page";
import CustomDropdownPage from "./Dropdown/page";
import ImportedInstallationPage from "./installation/page";
import UsagePage from "./usage/page";
import { ChevronDown } from "lucide-react";

function ComponentPage({ name }: { name: string }) {
  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">{name}</h1>
      <p className="text-gray-400">Documentation for {name} component.</p>
    </div>
  );
}

export default function MinimalistDocsPage() {
  const [activeComponent, setActiveComponent] = useState("installation");
  const [isComponentsOpen, setIsComponentsOpen] = useState(true);

  const components = [
    { id: "animated-testimonial", name: "Testimonial" },
    { id: "gradient-button", name: "Button" },
    { id: "hero-card", name: "Card" },
    { id: "data-table", name: "Table" },
    { id: "modal-dialog", name: "Modal" },
    { id: "dropdown-menu", name: "Dropdown" },
    { id: "form-elements", name: "Form" },
    { id: "3d-carousel", name: "Carousel" },
    { id: "feature-tabs", name: "Tabs" },
    { id: "text-reveal", name: "Text Effects" },
    { id: "mac-os-id-card", name: "ID Card" },
  ];

  const essentialPages = [
    { id: "installation", name: "Installation" },
    { id: "usage", name: "Usage" },
  ];

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
  };

  const renderContent = () => {
    return componentMap[activeComponent] || <ComponentPage name="Unknown Component" />;
  };

  // Scroll to top on component change
  useEffect(() => {
    const main = document.querySelector(".main-content-scroll");
    if (main) {
      main.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeComponent]);

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <div className="relative z-10 w-64 bg-[#111111] border-r border-gray-800/50">
        <div className="p-6">
          <h1 className="text-xl font-semibold text-white mb-8">Documentation</h1>

          {/* Getting Started */}
          <div className="mb-8">
            <h2 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-medium">
              Getting Started
            </h2>
            <div className="space-y-1">
              {essentialPages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setActiveComponent(page.id)}
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
              <h2 className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                Components
              </h2>
              <ChevronDown
                size={14}
                className={`text-gray-500 transition-transform ${
                  isComponentsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isComponentsOpen && (
              <div className="space-y-1">
                {components.map((component) => (
                  <button
                    key={component.id}
                    onClick={() => setActiveComponent(component.id)}
                    className={`w-full text-left py-2 px-3 rounded-lg text-sm transition-colors ${
                      activeComponent === component.id
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {component.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-0 flex-1 overflow-auto main-content-scroll">
        {renderContent()}
      </div>
    </div>
  );
}
