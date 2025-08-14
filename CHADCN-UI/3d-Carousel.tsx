"use client"
import { useEffect, useRef, useState } from 'react';
import { useIsMobile, useTouchGestures, useMobileAnimations } from '@/components/ui/use-mobile';

const Carousel3D = () => {
  const dragContainer = useRef<HTMLDivElement>(null);
  const spinContainer = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(240);
  const { isMobile, screenSize } = useIsMobile();
  const { onTouchStart, onTouchMove, onTouchEnd } = useTouchGestures();
  const { isVisible, fadeInUp, scaleIn } = useMobileAnimations();
  
  const config = {
    autoRotate: true,
    rotateSpeed: -60,
    imgWidth: isMobile ? 80 : 120,
    imgHeight: isMobile ? 120 : 170
  };

  const images = [
    '/api/placeholder/120/170',
    '/api/placeholder/120/170',
    '/api/placeholder/120/170',
    '/api/placeholder/120/170',
    '/api/placeholder/120/170',
    '/api/placeholder/120/170',
    '/api/placeholder/120/170'
  ];

  const videoSrc = "https://player.vimeo.com/external/322244668.sd.mp4?s=338c48ac2dfcb1d4c0689968b5baf94eee6ca0c1&profile_id=165&oauth2_token_id=57447761";

  // Initialize mobile animations
  useEffect(() => {
    if (isMobile) {
      fadeInUp();
      setTimeout(() => scaleIn(), 300);
    }
  }, [isMobile, fadeInUp, scaleIn]);

  useEffect(() => {
    let tX = 0, tY = 10;
    let desX = 0, desY = 0;

    const init = (delayTime?: number) => {
      if (!spinContainer.current) return;
      
      const aEle = [...spinContainer.current.getElementsByTagName('img'), 
                    ...spinContainer.current.getElementsByTagName('video')];
      
      aEle.forEach((ele, i) => {
        ele.style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius}px)`;
        ele.style.transition = "transform 1s";
        ele.style.transitionDelay = delayTime?.toString() + "s" || (aEle.length - i) / 4 + "s";
      });
    };

    const applyTransform = (obj: HTMLElement) => {
      if(tY > 180) tY = 180;
      if(tY < 0) tY = 0;
      obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
    };

    const playSpin = (yes: boolean) => {
      if (spinContainer.current) {
        spinContainer.current.style.animationPlayState = yes ? 'running' : 'paused';
      }
    };

    // Initialize
    setTimeout(() => init(), 1000);

    // Auto rotate - slower on mobile for better performance
    if (config.autoRotate && spinContainer.current) {
      const speed = isMobile ? config.rotateSpeed * 0.5 : config.rotateSpeed;
      const animationName = speed > 0 ? 'spin' : 'spinRevert';
      spinContainer.current.style.animation = `${animationName} ${Math.abs(speed)}s infinite linear`;
    }

    // Enhanced touch and pointer event handlers
    const handlePointerDown = (e: PointerEvent) => {
      if (!dragContainer.current) return;
      
      if ((dragContainer.current as any).timer) {
        clearInterval((dragContainer.current as any).timer);
      }
      
      let sX = e.clientX;
      let sY = e.clientY;

      const handlePointerMove = (e: PointerEvent) => {
        const nX = e.clientX;
        const nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        
        // Adjust sensitivity for mobile
        const sensitivity = isMobile ? 0.05 : 0.1;
        tX += desX * sensitivity;
        tY += desY * sensitivity;
        
        if (dragContainer.current) {
          applyTransform(dragContainer.current);
        }
        sX = nX;
        sY = nY;
      };

      const handlePointerUp = () => {
        if (!dragContainer.current) return;
        
        (dragContainer.current as any).timer = setInterval(() => {
          desX *= 0.95;
          desY *= 0.95;
          const sensitivity = isMobile ? 0.05 : 0.1;
          tX += desX * sensitivity;
          tY += desY * sensitivity;
          if (dragContainer.current) {
            applyTransform(dragContainer.current);
          }
          playSpin(false);
          if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
            if (dragContainer.current && (dragContainer.current as any).timer) {
              clearInterval((dragContainer.current as any).timer);
            }
            playSpin(true);
          }
        }, 17);
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
    };

    // Mobile-specific touch handlers
    const handleTouchStart = (e: TouchEvent) => {
      if (!dragContainer.current) return;
      
      if ((dragContainer.current as any).timer) {
        clearInterval((dragContainer.current as any).timer);
      }
      
      let sX = e.touches[0].clientX;
      let sY = e.touches[0].clientY;

      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        const nX = e.touches[0].clientX;
        const nY = e.touches[0].clientY;
        desX = nX - sX;
        desY = nY - sY;
        
        // Mobile-optimized sensitivity
        const sensitivity = 0.08;
        tX += desX * sensitivity;
        tY += desY * sensitivity;
        
        if (dragContainer.current) {
          applyTransform(dragContainer.current);
        }
        sX = nX;
        sY = nY;
      };

      const handleTouchEnd = () => {
        if (!dragContainer.current) return;
        
        (dragContainer.current as any).timer = setInterval(() => {
          desX *= 0.9;
          desY *= 0.9;
          const sensitivity = 0.08;
          tX += desX * sensitivity;
          tY += desY * sensitivity;
          if (dragContainer.current) {
            applyTransform(dragContainer.current);
          }
          playSpin(false);
          if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
            if (dragContainer.current && (dragContainer.current as any).timer) {
              clearInterval((dragContainer.current as any).timer);
            }
            playSpin(true);
          }
        }, 17);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };

      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isMobile) return; // Disable wheel on mobile
      const d = (e as any).wheelDelta / 20 || -e.deltaY / 40;
      setRadius(prev => Math.max(120, Math.min(400, prev + d))); // Limit radius
      init(1);
    };

    const dragElement = dragContainer.current;
    
    if (dragElement) {
      dragElement.addEventListener('pointerdown', handlePointerDown);
      dragElement.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (dragElement) {
        dragElement.removeEventListener('pointerdown', handlePointerDown);
        dragElement.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('wheel', handleWheel);
        if ((dragElement as any).timer) {
          clearInterval((dragElement as any).timer);
        }
      }
    };
  }, [radius, isMobile]);

  // Responsive radius adjustment
  useEffect(() => {
    if (isMobile) {
      setRadius(screenSize === 'xs' ? 160 : 200);
    } else {
      setRadius(240);
    }
  }, [isMobile, screenSize]);

  const carouselStyles = {
    carouselContainer: {
      height: isMobile ? '70vh' : '100vh',
      touchAction: 'none' as const,
      overflow: 'hidden' as const,
      display: 'flex',
      background: '#111',
      perspective: '1000px',
      transformStyle: 'preserve-3d' as const,
      position: 'relative' as const,
    },
    dragContainer: {
      position: 'relative' as const,
      display: 'flex',
      margin: 'auto',
      transformStyle: 'preserve-3d' as const,
      transform: `rotateX(${isMobile ? '-5deg' : '-10deg'})`,
    },
    spinContainer: {
      position: 'relative' as const,
      display: 'flex',
      margin: 'auto',
      transformStyle: 'preserve-3d' as const,
      transform: `rotateX(${isMobile ? '-5deg' : '-10deg'})`,
      width: config.imgWidth,
      height: config.imgHeight,
    },
    media: {
      transformStyle: 'preserve-3d' as const,
      position: 'absolute' as const,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      lineHeight: isMobile ? '120px' : '200px',
      fontSize: isMobile ? '30px' : '50px',
      textAlign: 'center' as const,
      boxShadow: '0 0 8px #fff',
      transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      borderRadius: isMobile ? '8px' : '12px',
      cursor: 'pointer',
    },
    text: {
      fontFamily: 'serif',
      position: 'absolute' as const,
      top: '100%',
      left: '50%',
      transform: 'translate(-50%,-50%) rotateX(90deg)',
      color: '#fff',
      fontSize: isMobile ? '14px' : '18px',
    },
    ground: {
      position: 'absolute' as const,
      top: '100%',
      left: '50%',
      transform: 'translate(-50%,-50%) rotateX(90deg)',
      background: 'radial-gradient(center center, farthest-side, rgba(153, 153, 153, 0.3), transparent)',
      width: radius * 3,
      height: radius * 3,
    },
    mobileControls: {
      position: 'absolute' as const,
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '10px',
      zIndex: 10,
    },
    controlButton: {
      padding: '8px 16px',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '20px',
      color: 'white',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      backdropFilter: 'blur(10px)',
    }
  };

  const handleMediaClick = (index: number) => {
    if (isMobile) {
      // Mobile-specific interaction
      const element = spinContainer.current?.children[index] as HTMLElement;
      if (element) {
        element.style.transform += ' scale(1.1)';
        setTimeout(() => {
          element.style.transform = element.style.transform.replace(' scale(1.1)', '');
        }, 300);
      }
    }
  };

  const resetCarousel = () => {
    setRadius(isMobile ? 200 : 240);
    if (spinContainer.current) {
      setTimeout(() => {
        if (spinContainer.current) {
          const aEle = [...spinContainer.current.getElementsByTagName('img'), 
                        ...spinContainer.current.getElementsByTagName('video')];
          aEle.forEach((ele, i) => {
            ele.style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${isMobile ? 200 : 240}px)`;
          });
        }
      }, 100);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
          }
          
          @keyframes spinRevert {
            from { transform: rotateY(360deg); }
            to { transform: rotateY(0deg); }
          }
          
          .carousel-media:hover {
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.9) !important;
            transform: scale(1.05) !important;
          }
          
          .carousel-media {
            -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.3));
            box-reflect: below 10px linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.3));
          }
          
          .carousel-media:hover {
            -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.4));
            box-reflect: below 10px linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.4));
          }

          /* Mobile-specific styles */
          @media (max-width: 768px) {
            .carousel-media {
              -webkit-box-reflect: none;
              box-reflect: none;
            }
            
            .carousel-media:active {
              transform: scale(0.95) !important;
            }
          }

          /* Mobile animation classes */
          .mobile-carousel-enter {
            animation: mobile-fade-in-up 0.6s ease-out;
          }

          .mobile-carousel-scale {
            animation: mobile-scale-in 0.4s ease-out;
          }
        `}
      </style>
      <div style={carouselStyles.carouselContainer} className={isMobile ? 'mobile-carousel-enter' : ''}>
        <div 
          ref={dragContainer} 
          style={carouselStyles.dragContainer}
        >
          <div 
            ref={spinContainer} 
            style={carouselStyles.spinContainer}
            className={isMobile ? 'mobile-carousel-scale' : ''}
          >
            {images.map((src, index) => (
              <img 
                key={index} 
                src={src} 
                alt={`Carousel item ${index + 1}`}
                style={carouselStyles.media}
                className="carousel-media touch-feedback"
                onClick={() => handleMediaClick(index)}
              />
            ))}
            <video 
              controls 
              autoPlay 
              loop 
              muted
              style={carouselStyles.media}
              className="carousel-media touch-feedback"
              onClick={() => handleMediaClick(images.length)}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            <p style={carouselStyles.text}>ChadCn ♥</p>
          </div>
          <div style={carouselStyles.ground} />
        </div>

        {/* Mobile Controls */}
        {isMobile && (
          <div style={carouselStyles.mobileControls}>
            <button 
              style={carouselStyles.controlButton}
              onClick={resetCarousel}
              className="touch-feedback"
            >
              Reset
            </button>
            <div style={carouselStyles.controlButton}>
              <span>Radius: {radius}</span>
            </div>
          </div>
        )}

        {/* Mobile Instructions */}
        {isMobile && (
          <div className="absolute top-4 left-4 text-white/60 text-sm bg-black/20 px-3 py-2 rounded-lg backdrop-blur-sm">
            <p>Touch and drag to rotate</p>
            <p>Tap items to interact</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Carousel3D;