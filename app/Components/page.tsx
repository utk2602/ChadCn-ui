"use client"
import { useState } from "react";
import AnimatedTestimonialPage from "./animated-testimonial/page";
import GradientButtonPage from "./gradient-button/page";
import HeroCardPage from "./hero-card/page";
import InstallationPage from "./installation/page";
import UsagePage from "./usage/page";

export default function Component() {
  const [activeComponent, setActiveComponent] = useState("installation");
  
  // Component metadata
  const components = [
    { id: "animated-testimonial", name: "Animated Testimonial", component: AnimatedTestimonialPage },
    { id: "gradient-button", name: "Gradient Button", component: GradientButtonPage },
    { id: "hero-card", name: "Hero Card", component: HeroCardPage },
  ];
  
  // Common pages
  const commonPages = [
    { id: "installation", name: "Installation", component: InstallationPage },
    { id: "usage", name: "Usage", component: UsagePage },
  ];
  
  // Function to render the active component
  const renderActiveComponent = () => {
    // First check if it's a common page
    const commonPage = commonPages.find(page => page.id === activeComponent);
    if (commonPage) {
      return <commonPage.component />;
    }
    
    // Then check if it's a component
    const component = components.find(comp => comp.id === activeComponent);
    if (component) {
      return <component.component />;
    }
    
    // Default to installation if no match found
    return <InstallationPage />;
  };
  
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Left sidebar with fixed header and scrollable content */}
      <div className="w-1/5 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Fixed header */}
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold text-gray-100">Components</h2>
        </div>
        
        {/* Scrollable sidebar content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {/* Common pages */}
            <div className="mb-6">
              {commonPages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setActiveComponent(page.id)}
                  className={`w-full text-left py-2 px-3 rounded-md mb-1 ${
                    activeComponent === page.id
                      ? "bg-blue-900 text-blue-200 font-medium"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {page.name}
                </button>
              ))}
            </div>
            
            {/* Component list */}
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-400 px-3 mb-2">UI COMPONENTS</h3>
            </div>
            
            {components.map((component) => (
              <button
                key={component.id}
                onClick={() => setActiveComponent(component.id)}
                className={`w-full text-left py-2 px-3 rounded-md mb-1 ${
                  activeComponent === component.id
                    ? "bg-blue-900 text-blue-200 font-medium"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {component.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main content area with independent scrolling - full width and height */}
      <div className="w-4/5 flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
}