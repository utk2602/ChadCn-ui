"use client"

import { motion } from "framer-motion"
import { Pacifico } from "next/font/google"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useIsMobile, useMobileAnimations } from "@/components/ui/use-mobile"
import { useEffect, useState } from "react"

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  isMobile = false,
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
  isMobile?: boolean
}) {
  // Adjust sizes for mobile
  const mobileWidth = isMobile ? width * 0.6 : width
  const mobileHeight = isMobile ? height * 0.6 : height

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: isMobile ? 1.8 : 2.4,
        delay: isMobile ? delay * 0.7 : delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: isMobile ? 0.8 : 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, isMobile ? 10 : 15, 0],
        }}
        transition={{
          duration: isMobile ? 8 : 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width: mobileWidth,
          height: mobileHeight,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function HeroGeometric({
  title1 = "Elevate Your",
  title2 = "Digital Vision",
}: {
  badge?: string
  title1?: string
  title2?: string
}) {
  const { isMobile, screenSize } = useIsMobile()
  const { fadeInUp, scaleIn } = useMobileAnimations()
  const [isVisible, setIsVisible] = useState(false)

  // Initialize mobile animations
  useEffect(() => {
    if (isMobile) {
      fadeInUp()
      setTimeout(() => scaleIn(), 300)
      setIsVisible(true)
    }
  }, [isMobile, fadeInUp, scaleIn])

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.8 : 1,
        delay: isMobile ? 0.3 + i * 0.15 : 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  // Mobile-specific responsive values
  const mobileResponsive = {
    titleSize: isMobile ? (screenSize === 'xs' ? 'text-3xl' : 'text-4xl') : 'text-4xl sm:text-6xl md:text-8xl',
    subtitleSize: isMobile ? 'text-base' : 'text-base sm:text-lg md:text-xl',
    buttonSize: isMobile ? 'px-5 py-2.5 text-sm' : 'px-6 py-3',
    containerPadding: isMobile ? 'px-4' : 'px-4 md:px-6',
    maxWidth: isMobile ? 'max-w-2xl' : 'max-w-3xl',
  }

  return (
    <div className={cn(
      "relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]",
      isMobile && "mobile-fade-in-up"
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          isMobile={isMobile}
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          isMobile={isMobile}
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          isMobile={isMobile}
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          isMobile={isMobile}
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
          isMobile={isMobile}
        />
      </div>

      <div className={cn("relative z-10 container mx-auto", mobileResponsive.containerPadding)}>
        <div className={cn("mx-auto text-center", mobileResponsive.maxWidth)}>
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6 md:mb-8 md:mb-12",
              isMobile && "mobile-bounce-in"
            )}
          >
            <span className="text-sm text-white/60 tracking-wide">
              {isMobile ? "🚀 Mobile Optimized" : "🚀 Ready to Build"}
            </span>
          </motion.div>

          <motion.div 
            custom={1} 
            variants={fadeUpVariants} 
            initial="hidden" 
            animate="visible"
            className={isMobile ? "mobile-scale-in" : ""}
          >
            <h1 className={cn(
              "font-bold mb-4 md:mb-6 md:mb-8 tracking-tight",
              mobileResponsive.titleSize
            )}>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300",
                  pacifico.className,
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div 
            custom={2} 
            variants={fadeUpVariants} 
            initial="hidden" 
            animate="visible"
            className={isMobile ? "mobile-fade-in-up" : ""}
          >
            <p className={cn(
              "text-white/40 mb-6 md:mb-8 leading-relaxed font-light tracking-wide mx-auto px-4",
              mobileResponsive.subtitleSize,
              isMobile ? "max-w-lg" : "max-w-xl"
            )}>
              {isMobile 
                ? "Experience our mobile-first design with touch gestures, smooth animations, and responsive layouts."
                : "Crafting exceptional digital experiences through innovative design and cutting-edge technology."
              }
            </p>
          </motion.div>

          <Link href="/Components">
            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              <button className={cn(
                "bg-gradient-to-r from-indigo-500 to-rose-500 text-white rounded-full shadow-lg hover:from-indigo-600 hover:to-rose-600 transition-all duration-300 touch-feedback",
                mobileResponsive.buttonSize,
                isMobile && "mobile-button w-full sm:w-auto"
              )}>
                {isMobile ? "Explore Components" : "Get Started"}
              </button>
            </motion.div>
          </Link>

          {/* Mobile-specific features showcase */}
          {isMobile && (
            <motion.div
              custom={4}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mt-8 mobile-fade-in-up"
            >
              <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">👆</div>
                  <div className="text-xs text-white/60">Touch Gestures</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">📱</div>
                  <div className="text-xs text-white/60">Responsive</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">✨</div>
                  <div className="text-xs text-white/60">Animations</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl mb-1">🎯</div>
                  <div className="text-xs text-white/60">Mobile First</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
      
      {/* Mobile scroll indicator */}
      {isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  )
}
