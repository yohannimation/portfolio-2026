"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

import { Button } from '@/components/ui/button';

interface ElasticButtonProps {
  children: React.ReactNode;
  strength?: number;
  onClick?: () => void;
  anchor?: string;
  className?: string;
  buttonClassName?: string;
}

export default function ElasticButton({
  children,
  strength = 0.5,
  onClick,
  anchor,
  className = '',
  buttonClassName = '',
} : ElasticButtonProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const zone = zoneRef.current;
    const btn = btnRef.current;

    if (!zone || !btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = zone.getBoundingClientRect();

      // Map mouse position within the zone to a range of offsets
      // rect.left to rect.right -> -rect.width / 2 to rect.width / 2
      const x = gsap.utils.mapRange(
        rect.left,
        rect.right,
        -rect.width / 2,
        rect.width / 2,
        e.clientX
      );
      const y = gsap.utils.mapRange(
        rect.top,
        rect.bottom,
        -rect.height / 2,
        rect.height / 2,
        e.clientY
      );

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.4)',
        overwrite: true,
      });
    };

    zone.addEventListener('mousemove', handleMouseMove);
    zone.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      zone.removeEventListener('mousemove', handleMouseMove);
      zone.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: zoneRef });

  return (
    <div
      ref={zoneRef}
      className={`mag-zone relative flex items-center justify-center ${className}`}
    >
      {
        anchor ? (
          <a href={anchor}>
            <Button
              size={"xxl"}
              ref={btnRef}
              className={`mag-btn relative group px-6 py-3 rounded-full transition-colors duration-300 overflow-hidden ${buttonClassName}`}
            >
              {children}
            </Button>
          </a>
        ) : (
          <Button
            size={"xxl"}
            ref={btnRef}
            onClick={onClick}
            className={`mag-btn relative group px-6 py-3 rounded-full transition-colors duration-300 overflow-hidden ${buttonClassName}`}
          >
            {children}
          </Button>
        )
      }
    </div>
  );
};
