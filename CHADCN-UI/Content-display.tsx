"use client";
  
  import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
  import {
    animate,
    motion,
    useMotionTemplate,
    useMotionValue,
    ValueAnimationTransition,
  } from "framer-motion";
  import { LucideLayoutDashboard } from "lucide-react";
  
  export interface FeatureTabItem {
    icon?: React.ReactNode;
    title: string;
    isNew?: boolean;
    backgroundPositionX: number;
    backgroundPositionY: number;
    backgroundSizeX: number;
  }
  
  export interface FeatureTabsProps extends ComponentPropsWithoutRef<"div"> {
    tabs: FeatureTabItem[];
    backgroundImage?: string;
    header?: string;
    subheader?: string;
    defaultSelectedIndex?: number;
    iconComponent?: React.ComponentType<{ icon?: React.ReactNode }>;
    animationDuration?: number;
    highlightColor?: string;
    newBadgeColor?: string;
    iconColor?: string;
  }
  
  const DefaultIconComponent = ({ icon }: { icon?: React.ReactNode }) => {
    return <>{icon || <LucideLayoutDashboard className="h-5 w-5" />}</>;
  };
  
  const FeatureTab = (
    props: FeatureTabItem & {
      selected: boolean;
      onClick: () => void;
      highlightColor?: string;
      newBadgeColor?: string;
      iconColor?: string;
      iconComponent?: React.ComponentType<{ icon?: React.ReactNode }>;
    }
  ) => {
    const tabRef = useRef<HTMLDivElement>(null);
    const xPercentage = useMotionValue(0);
    const yPercentage = useMotionValue(0);
    const maskImage = useMotionTemplate`radial-gradient(80px 80px at ${xPercentage}% ${yPercentage}%, black, transparent)`;
  
    useEffect(() => {
      if (!tabRef.current || !props.selected) return;
      xPercentage.set(0);
      yPercentage.set(0);
      const { height, width } = tabRef.current.getBoundingClientRect();
      const circumference = height * 2 + width * 2;
      const times = [
        0,
        width / circumference,
        (width + height) / circumference,
        (width * 2 + height) / circumference,
        1,
      ];
      const options: ValueAnimationTransition = {
        times,
        duration: 4,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      };
      animate(xPercentage, [0, 100, 100, 0, 0], options);
      animate(yPercentage, [0, 0, 100, 100, 0], options);
    }, [props.selected, xPercentage, yPercentage]);
  
    const IconComponent = props.iconComponent || DefaultIconComponent;
  
    return (
      <div
        ref={tabRef}
        className="border border-white/15 flex p-3 rounded-xl gap-3 items-center lg:flex-1 relative cursor-pointer hover:border-white/30 transition-colors"
        onClick={props.onClick}
      >
        {props.selected && (
          <motion.div
            style={{
              maskImage,
              borderColor: props.highlightColor || "#A369ff",
            }}
            className="absolute inset-0 -m-px rounded-xl border"
          />
        )}
  
        <div
          className="min-h-12 min-w-12 h-12 w-12 border border-white/15 rounded-lg inline-flex justify-center items-center flex-shrink-0"
          style={{ color: props.iconColor || "#A369ff" }}
        >
          <IconComponent icon={props.icon} />
        </div>
        <div className="font-medium text-sm sm:text-base flex-grow">
          {props.title}
        </div>
        {props.isNew && (
          <div
            className="text-xs rounded-full px-2 py-0.5 font-semibold text-black"
            style={{ backgroundColor: props.newBadgeColor || "#8c44ff" }}
          >
            new
          </div>
        )}
      </div>
    );
  };
  
  export const FeatureTabs = ({
    tabs,
    backgroundImage,
    header = "Elevate your SEO efforts.",
    subheader = "For small startups to large enterprise, our AI-driven tool has created revolution",
    defaultSelectedIndex = 0,
    iconComponent,
    animationDuration = 2,
    highlightColor = "#A369ff",
    newBadgeColor = "#8c44ff",
    iconColor = "#A369ff",
    className,
    ...props
  }: FeatureTabsProps) => {
    const [selectedTab, setSelectedTab] = useState(defaultSelectedIndex);
    const initialTab = tabs[defaultSelectedIndex];
    const backgroundPositionX = useMotionValue(initialTab.backgroundPositionX);
    const backgroundPositionY = useMotionValue(initialTab.backgroundPositionY);
    const backgroundSizeX = useMotionValue(initialTab.backgroundSizeX);
  
    const backgroundPosition = useMotionTemplate`${backgroundPositionX}% ${backgroundPositionY}%`;
    const backgroundSize = useMotionTemplate`${backgroundSizeX}% auto`;
  
    const handleSelectTab = (index: number) => {
      setSelectedTab(index);
      const targetTab = tabs[index];
  
      const animateOptions: ValueAnimationTransition = {
        duration: animationDuration,
        ease: "easeInOut",
      };
  
      animate(backgroundSizeX, 100, {
        duration: animationDuration / 2,
        ease: "easeOut",
        onComplete: () => {
          animate(backgroundSizeX, targetTab.backgroundSizeX, {
            duration: animationDuration / 2,
            ease: "easeIn",
          });
        },
      });
  
      animate(backgroundPositionX, targetTab.backgroundPositionX, animateOptions);
      animate(backgroundPositionY, targetTab.backgroundPositionY, animateOptions);
    };
  
    useEffect(() => {
      const initialTab = tabs[defaultSelectedIndex];
      backgroundPositionX.set(initialTab.backgroundPositionX);
      backgroundPositionY.set(initialTab.backgroundPositionY);
      backgroundSizeX.set(initialTab.backgroundSizeX);
    }, [
      backgroundPositionX,
      backgroundPositionY,
      backgroundSizeX,
      defaultSelectedIndex,
      tabs,
    ]);
  
    return (
      <div
        className={`py-3 px-4 pt-0 bg-black text-white rounded-xl w-full mx-auto flex flex-col gap-3 ${className}`}
        {...props}
      >
        <div className="flex flex-col">
          <h2 className="text-3xl md:text-4xl font-medium text-center tracking-tighter">
            {header}
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto tracking-tight text-center">
            {subheader}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-3">
          {tabs.map((tab, tabIndex) => (
            <FeatureTab
              {...tab}
              selected={selectedTab === tabIndex}
              key={tab.title}
              onClick={() => handleSelectTab(tabIndex)}
              highlightColor={highlightColor}
              newBadgeColor={newBadgeColor}
              iconColor={iconColor}
              iconComponent={iconComponent}
            />
          ))}
        </div>
        {backgroundImage && (
          <div className="border border-white/20 rounded-xl overflow-hidden">
            <motion.div
              className="w-full aspect-video bg-cover bg-no-repeat bg-center rounded-lg"
              style={{
                backgroundPosition,
                backgroundSize,
                backgroundImage: `url(${backgroundImage})`,
              }}
            />
          </div>
        )}
      </div>
    );
  };