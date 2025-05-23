"use client";
import { useState } from "react";
import InstallationPage from "./installation/page";
import UsagePage from "./usage/page";
import AnimatedTestimonialPage from "./animated-testimonial/page";
import GradientButtonPage from "./gradient-button/page";
import HeroCardPage from "./hero-card/page";
import Carousel3DPage from "./3d-Carousel/page";
import CustomDataTablePage from "./data-table/page";
import FeatureTabsPage from "./Content-display/page";
import TextHoverEffectPage from "./Hero-text/page";
export default function BlackScreenWithNavbar() {
  const [activeComponent, setActiveComponent] = useState("installation");

  // Component metadata
  const components = [
    { id: "animated-testimonial", name: "Animated Testimonial" },
    { id: "gradient-button", name: "Gradient Button" },
    { id: "hero-card", name: "Hero Card" },
    { id: "data-table", name: "Data Table" },
    { id: "modal-dialog", name: "Modal Dialog" },
    { id: "dropdown-menu", name: "Dropdown Menu" },
    { id: "tab-navigation", name: "Tab Navigation" },
    { id: "accordion", name: "Accordion" },
    { id: "toast-notification", name: "Toast Notification" },
    { id: "form-elements", name: "Form Elements" },
    { id: "3d-carousel", name: "3D Carousel" },
    { id: "feature-tabs", name: "Feature Tabs" },
    { id: "text-reveal", name: "Text Reveal" },
  ];

  // Common pages
  const commonPages = [
    { id: "installation", name: "Installation" },
    { id: "usage", name: "Usage" },
    { id: "customization", name: "Customization" },
  ];

  // Render content based on active component
  const renderContent = () => {
    switch (activeComponent) {
      case "installation":
        return <InstallationPage />;
      case "usage":
        return <UsagePage/>;
      case "animated-testimonial":
        return <AnimatedTestimonialPage />;
      case "gradient-button": 
        return <GradientButtonPage />;
      case "hero-card":
        return <HeroCardPage />;
      case "data-table":
        return <CustomDataTablePage />; 
      case "3d-carousel":
        return <Carousel3DPage />;
      case "feature-tabs":
        return <FeatureTabsPage />;
      case "text-reveal":
        return <TextHoverEffectPage/>;
      default:
        return (
          <div className="p-8 text-white">
            <h1 className="text-2xl font-bold mb-4">
              {activeComponent
                .charAt(0)
                .toUpperCase() +
                activeComponent.slice(1).replace(/-/g, " ")}
            </h1>
            <p>Selected component: {activeComponent}</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-black p-1">
      <div className="flex w-full h-full bg-black">
        {/* Left section - 1/5 width - scrollable navbar */}
        <div className="w-1/5 h-full border-r border-black overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-black-700">
            <h2 className="text-lg font-bold text-white">Components</h2>
          </div>

          {/* Scrollable component list */}
          <div className="overflow-y-auto flex-1 hide-scrollbar">
            <div className="p-4">
              {/* Common pages */}
              <div className="mb-6">
                {commonPages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => setActiveComponent(page.id)}
                    className={`w-full text-left py-2 px-3 rounded-md mb-1 ${
                      activeComponent === page.id
                        ? "bg-gray-800 text-white font-medium"
                        : "text-gray-400 hover:bg-gray-900"
                    }`}
                  >
                    {page.name}
                  </button>
                ))}
              </div>

              {/* Component list */}
              <div className="mb-2">
                <h3 className="text-sm font-medium text-gray-400 px-3 mb-2">
                  UI COMPONENTS
                </h3>
              </div>

              {components.map((component) => (
                <button
                  key={component.id}
                  onClick={() => setActiveComponent(component.id)}
                  className={`w-full text-left py-2 px-3 rounded-md mb-1 ${
                    activeComponent === component.id
                      ? "bg-gray-800 text-white font-medium"
                      : "text-gray-400 hover:bg-gray-900"
                  }`}
                >
                  {component.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right section - component render area */}
        <div className="w-4/5 h-full overflow-y-auto bg-black">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}