"use client"
import { useEffect, useRef, useState } from 'react';

const Carousel3D = () => {
  const dragContainer = useRef<HTMLDivElement>(null);
  const spinContainer = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(240);
  
  const config = {
    autoRotate: true,
    rotateSpeed: -60,
    imgWidth: 120,
    imgHeight: 170
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

    // Auto rotate
    if (config.autoRotate && spinContainer.current) {
      const animationName = config.rotateSpeed > 0 ? 'spin' : 'spinRevert';
      spinContainer.current.style.animation = `${animationName} ${Math.abs(config.rotateSpeed)}s infinite linear`;
    }

    // Event handlers
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
        tX += desX * 0.1;
        tY += desY * 0.1;
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
          tX += desX * 0.1;
          tY += desY * 0.1;
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

    const handleWheel = (e: WheelEvent) => {
      const d = (e as any).wheelDelta / 20 || -e.deltaY / 40;
      setRadius(prev => prev + d);
      init(1);
    };

    const dragElement = dragContainer.current;
    
    if (dragElement) {
      dragElement.addEventListener('pointerdown', handlePointerDown);
      document.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (dragElement) {
        dragElement.removeEventListener('pointerdown', handlePointerDown);
        document.removeEventListener('wheel', handleWheel);
        if ((dragElement as any).timer) {
          clearInterval((dragElement as any).timer);
        }
      }
    };
  }, [radius]);

  const carouselStyles = {
    carouselContainer: {
      height: '100vh',
      touchAction: 'none' as const,
      overflow: 'hidden' as const,
      display: 'flex',
      background: '#111',
      perspective: '1000px',
      transformStyle: 'preserve-3d' as const,
    },
    dragContainer: {
      position: 'relative' as const,
      display: 'flex',
      margin: 'auto',
      transformStyle: 'preserve-3d' as const,
      transform: 'rotateX(-10deg)',
    },
    spinContainer: {
      position: 'relative' as const,
      display: 'flex',
      margin: 'auto',
      transformStyle: 'preserve-3d' as const,
      transform: 'rotateX(-10deg)',
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
      lineHeight: '200px',
      fontSize: '50px',
      textAlign: 'center' as const,
      boxShadow: '0 0 8px #fff',
      transition: 'box-shadow 0.3s ease',
    },
    text: {
      fontFamily: 'serif',
      position: 'absolute' as const,
      top: '100%',
      left: '50%',
      transform: 'translate(-50%,-50%) rotateX(90deg)',
      color: '#fff',
    },
    ground: {
      position: 'absolute' as const,
      top: '100%',
      left: '50%',
      transform: 'translate(-50%,-50%) rotateX(90deg)',
      background: 'radial-gradient(center center, farthest-side, rgba(153, 153, 153, 0.3), transparent)',
      width: radius * 3,
      height: radius * 3,
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
          }
          
          .carousel-media {
            -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.3));
            box-reflect: below 10px linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.3));
          }
          
          .carousel-media:hover {
            -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.4));
            box-reflect: below 10px linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.4));
          }
        `}
      </style>
      <div style={carouselStyles.carouselContainer}>
        <div 
          ref={dragContainer} 
          style={carouselStyles.dragContainer}
        >
          <div 
            ref={spinContainer} 
            style={carouselStyles.spinContainer}
          >
            {images.map((src, index) => (
              <img 
                key={index} 
                src={src} 
                alt={`Carousel item ${index + 1}`}
                style={carouselStyles.media}
                className="carousel-media"
              />
            ))}
            <video 
              controls 
              autoPlay 
              loop 
              muted
              style={carouselStyles.media}
              className="carousel-media"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            <p style={carouselStyles.text}>ChadCn ♥</p>
          </div>
          <div style={carouselStyles.ground} />
        </div>
      </div>
    </>
  );
};

export default Carousel3D;