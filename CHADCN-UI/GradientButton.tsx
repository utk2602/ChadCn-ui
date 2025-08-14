"use client"
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ButtonHTMLAttributes, useState, useEffect } from "react";
import { useIsMobile, useMobileAnimations, useTouchGestures } from "@/components/ui/use-mobile";

const buttonVariants = cva(
  "font-head transition-all outline-hidden cursor-pointer duration-200 font-medium flex items-center justify-center mobile-transition",
  {
    variants: {
      variant: {
        default:
          "shadow-md hover:shadow-none bg-primary text-black border-2 border-black transition-all hover:translate-y-1 hover:bg-primary-hover active:scale-95",
        secondary:
          "shadow-md hover:shadow-none bg-secondary shadow-primary text-secondary-foreground border-2 border-black transition-all hover:translate-y-1 active:scale-95",
        outline:
          "shadow-md hover:shadow-none bg-transparent border-2 transition-all hover:translate-y-1 active:scale-95",
        link: "bg-transparent hover:underline active:scale-95",
        gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl active:scale-95",
        mobile: "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 shadow-lg active:scale-95 touch-feedback",
      },
      size: {
        sm: "px-3 py-1 text-sm shadow hover:shadow-none min-h-[32px]",
        md: "px-4 py-1.5 text-base min-h-[40px]",
        lg: "px-8 py-3 text-lg min-h-[48px]",
        xl: "px-10 py-4 text-xl min-h-[56px]",
        icon: "p-2 min-h-[40px] min-w-[40px]",
        mobile: "px-6 py-3 text-base min-h-[48px] w-full sm:w-auto",
      },
      mobile: {
        true: "touch-feedback mobile-button mobile-transition",
        false: "",
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      mobile: false,
    },
  },
);

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  mobileVariant?: "default" | "gradient" | "outline";
  showMobileAnimation?: boolean;
  mobileFullWidth?: boolean;
  rippleEffect?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      children,
      size = "md",
      className = "",
      variant = "default",
      mobile = false,
      mobileVariant,
      showMobileAnimation = true,
      mobileFullWidth = false,
      rippleEffect = true,
      ...props
    }: IButtonProps,
    forwardedRef,
  ) => {
    const { isMobile, screenSize } = useIsMobile();
    const { fadeInUp, scaleIn } = useMobileAnimations();
    const { onTouchStart, onTouchMove, onTouchEnd } = useTouchGestures();
    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const [rippleId, setRippleId] = useState(0);

    // Initialize mobile animations
    useEffect(() => {
      if (isMobile && showMobileAnimation) {
        fadeInUp();
        setTimeout(() => scaleIn(), 200);
      }
    }, [isMobile, showMobileAnimation, fadeInUp, scaleIn]);

    // Handle touch interactions
    const handleTouchEnd = () => {
      const result = onTouchEnd();
      if (result?.direction === 'up' && isMobile) {
        // Trigger some mobile-specific action
        console.log('Swipe up detected on button');
      }
    };

    // Handle ripple effect
    const handleRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!rippleEffect) return;
      
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const newRipple = { id: rippleId, x, y };
      setRipples(prev => [...prev, newRipple]);
      setRippleId(prev => prev + 1);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    };

    // Determine effective variant and size for mobile
    const effectiveVariant = isMobile && mobileVariant ? mobileVariant : variant;
    const effectiveSize = isMobile ? (mobileFullWidth ? "mobile" : size) : size;
    const isMobileButton = isMobile || mobile;

    // Mobile-specific styles
    const mobileStyles = {
      container: isMobileButton ? "relative overflow-hidden" : "",
      text: isMobileButton ? "mobile-text-base font-semibold" : "",
      icon: isMobileButton ? "h-5 w-5" : "h-4 w-4",
    };

    return (
      <button
        ref={forwardedRef}
        className={cn(
          buttonVariants({ 
            variant: effectiveVariant, 
            size: effectiveSize, 
            mobile: isMobileButton 
          }), 
          mobileStyles.container,
          className,
          isMobile && showMobileAnimation ? "mobile-fade-in-up" : "",
          isPressed && "scale-95"
        )}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleRipple}
        {...props}
      >
        {/* Ripple effects */}
        {rippleEffect && ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 animate-ping"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}

        {/* Button content */}
        <div className={cn(
          "flex items-center justify-center gap-2",
          mobileStyles.text
        )}>
          {children}
        </div>

        {/* Mobile-specific loading state */}
        {isMobileButton && props.disabled && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          </div>
        )}

        {/* Mobile touch indicator */}
        {isMobileButton && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white/50 rounded-full opacity-0 group-hover:opacity-100 mobile-transition" />
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

// Mobile-specific button variants
export const MobileButton: React.FC<Omit<IButtonProps, 'mobile'> & { 
  variant?: "primary" | "secondary" | "outline" | "gradient";
  size?: "sm" | "md" | "lg" | "full";
}> = ({ 
  variant = "primary", 
  size = "md", 
  className = "", 
  ...props 
}) => {
  const { isMobile } = useIsMobile();
  
  const mobileVariants = {
    primary: "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg",
    secondary: "bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg",
    outline: "bg-transparent border-2 border-blue-500 text-blue-500",
    gradient: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg",
  };

  const mobileSizes = {
    sm: "px-4 py-2 text-sm min-h-[40px]",
    md: "px-6 py-3 text-base min-h-[48px]",
    lg: "px-8 py-4 text-lg min-h-[56px]",
    full: "px-6 py-3 text-base min-h-[48px] w-full",
  };

  return (
    <Button
      {...props}
      mobile={true}
      variant={mobileVariants[variant] as any}
      size={mobileSizes[size] as any}
      className={cn(
        "mobile-button touch-feedback mobile-transition",
        mobileVariants[variant],
        mobileSizes[size],
        className
      )}
    />
  );
};