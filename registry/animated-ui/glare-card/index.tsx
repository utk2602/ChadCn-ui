'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

export const GlareCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const state = useRef({
    glare: {
      x: 50,
      y: 50,
    },
    background: {
      x: 50,
      y: 50,
    },
    rotate: {
      x: 0,
      y: 0,
    },
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rotateFactor = 0.4;
    const rect = event.currentTarget.getBoundingClientRect();
    const position = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    const percentage = {
      x: (100 / rect.width) * position.x,
      y: (100 / rect.height) * position.y,
    };
    const delta = {
      x: percentage.x - 50,
      y: percentage.y - 50,
    };

    const { background, rotate, glare } = state.current;
    background.x = 50 + percentage.x / 4 - 12.5;
    background.y = 50 + percentage.y / 3 - 16.67;
    rotate.x = -(delta.x / 3.5);
    rotate.y = delta.y / 2;
    rotate.x *= rotateFactor;
    rotate.y *= rotateFactor;
    glare.x = percentage.x;
    glare.y = percentage.y;

    updateStyles();
  };

  const handlePointerEnter = () => {
    isPointerInside.current = true;
    if (refElement.current) {
      setTimeout(() => {
        if (isPointerInside.current) {
          refElement.current?.style.setProperty('--duration', '0s');
        }
      }, 300);
    }
  };

  const handlePointerLeave = () => {
    isPointerInside.current = false;
    if (refElement.current) {
      refElement.current.style.removeProperty('--duration');
      refElement.current?.style.setProperty('--r-x', `0deg`);
      refElement.current?.style.setProperty('--r-y', `0deg`);
    }
  };

  const updateStyles = () => {
    if (refElement.current) {
      const { background, rotate, glare } = state.current;
      refElement.current?.style.setProperty('--m-x', `${glare.x}%`);
      refElement.current?.style.setProperty('--m-y', `${glare.y}%`);
      refElement.current?.style.setProperty('--r-x', `${rotate.x}deg`);
      refElement.current?.style.setProperty('--r-y', `${rotate.y}deg`);
      refElement.current?.style.setProperty('--bg-x', `${background.x}%`);
      refElement.current?.style.setProperty('--bg-y', `${background.y}%`);
    }
  };

  return (
    <div
      style={
        {
          '--m-x': '50%',
          '--m-y': '50%',
          '--r-x': '0deg',
          '--r-y': '0deg',
          '--bg-x': '50%',
          '--bg-y': '50%',
          '--duration': '300ms',
          '--foil-size': '100%',
          '--opacity': '0',
          '--radius': '24px',
          '--easing': 'ease',
          '--transition': 'var(--duration) var(--easing)',
        } as React.CSSProperties
      }
      className="group relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-transform w-[320px] [aspect-ratio:17/21]"
      ref={refElement}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <div className="h-full grid origin-center overflow-hidden rounded-[var(--radius)] bg-black text-slate-500 [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] hover:filter-none transition-[filter,transform] duration-[var(--duration)] ease-[var(--easing)] will-change-transform hover:[--opacity:1] hover:[--duration:200ms] hover:[--easing:linear]">
        {/* Red Border Glow */}
        <div className="absolute inset-0 opacity-[var(--opacity)] transition-opacity duration-[var(--duration)] [background:radial-gradient(circle_at_var(--m-x)_var(--m-y),_#ef4444_0%,_transparent_80%)]" />

        {/* Inner Content */}
        <div className="absolute inset-[1px] rounded-[calc(var(--radius)-1px)] bg-black overflow-hidden">
          <div className={cn('h-full w-full bg-black', className)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
