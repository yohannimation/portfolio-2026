"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BlobState {
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
  pointCount: number;
  spread: number;
  colorStart: string;
  colorEnd: string;
}

const BLOB_STATES: BlobState[] = [
  { centerX: 80, centerY: 15, radiusX: 25, radiusY: 25, rotation: -15, pointCount: 3, spread: 0.2,  colorStart: '#388423', colorEnd: '#388423' },
  { centerX: 10,  centerY: 30, radiusX: 15, radiusY: 30, rotation: 30,  pointCount: 3, spread: 0.18, colorStart: '#48C634', colorEnd: '#48C634' },
  { centerX: 70, centerY: 40, radiusX: 45, radiusY: 45, rotation: -40, pointCount: 3, spread: 0.22, colorStart: '#388423', colorEnd: '#388423' },
];

export default function OrganicBlob() {
  const canvasRef        = useRef<HTMLCanvasElement>(null);
  const scrollProgress   = useRef({ current: 0 });
  const animationFrameId = useRef<number>(0);
  const morphTime        = useRef(0);
  const isScrolling      = useRef(false);
  const scrollTimeoutId  = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d')!;

    const handleResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const scrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        // Mark as scrolling and reset the idle timer
        isScrolling.current = true;
        if (scrollTimeoutId.current !== null) {
          clearTimeout(scrollTimeoutId.current);
        }
        scrollTimeoutId.current = setTimeout(() => {
          isScrolling.current = false;
        }, 150);

        gsap.to(scrollProgress.current, {
          current: self.progress,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: true,
        });
      },
    });

    const linearInterpolation = (valueA: number, valueB: number, factor: number): number =>
      valueA + (valueB - valueA) * factor;

    const easeInOut = (factor: number): number =>
      factor < 0.5 ? 2 * factor * factor : -1 + (4 - 2 * factor) * factor;

    const hexToRgb = (hex: string): [number, number, number] => [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ];

    const interpolateColor = (colorA: string, colorB: string, factor: number) => {
      const [redA, greenA, blueA] = hexToRgb(colorA);
      const [redB, greenB, blueB] = hexToRgb(colorB);
      const red   = Math.round(linearInterpolation(redA,   redB,   factor));
      const green = Math.round(linearInterpolation(greenA, greenB, factor));
      const blue  = Math.round(linearInterpolation(blueA,  blueB,  factor));
      return {
        solid:       `rgb(${red},${green},${blue})`,
        transparent: `rgba(${red},${green},${blue},0.13)`,
      };
    };

    const getInterpolatedState = (progress: number) => {
      const indexFloat  = progress * (BLOB_STATES.length - 1);
      const indexLow    = Math.floor(indexFloat);
      const indexHigh   = Math.min(indexLow + 1, BLOB_STATES.length - 1);
      const blendFactor = easeInOut(indexFloat - indexLow);

      const stateA = BLOB_STATES[indexLow];
      const stateB = BLOB_STATES[indexHigh];

      const colorStart = interpolateColor(stateA.colorStart, stateB.colorStart, blendFactor);
      const colorEnd   = interpolateColor(stateA.colorEnd,   stateB.colorEnd,   blendFactor);

      return {
        centerX:          linearInterpolation(stateA.centerX,    stateB.centerX,    blendFactor) / 100,
        centerY:          linearInterpolation(stateA.centerY,    stateB.centerY,    blendFactor) / 100,
        radiusX:          linearInterpolation(stateA.radiusX,    stateB.radiusX,    blendFactor) / 100,
        radiusY:          linearInterpolation(stateA.radiusY,    stateB.radiusY,    blendFactor) / 100,
        rotation:         linearInterpolation(stateA.rotation,   stateB.rotation,   blendFactor),
        pointCount:       Math.round(linearInterpolation(stateA.pointCount, stateB.pointCount, blendFactor)),
        spread:           linearInterpolation(stateA.spread,     stateB.spread,     blendFactor),
        colorStart:       colorStart.solid,
        colorEnd:         colorEnd.solid,
      };
    };

    const computeBlobPoints = (
      centerX: number,
      centerY: number,
      radiusX: number,
      radiusY: number,
      rotation: number,
      pointCount: number,
      spread: number,
      time: number,
      canvasWidth: number,
      canvasHeight: number,
    ): [number, number][] => {
      const points: [number, number][] = [];
      const rotationRadians = (rotation * Math.PI) / 180;

      for (let index = 0; index < pointCount * 2; index++) {
        const angle = (index / (pointCount * 2)) * Math.PI * 2;

        const noise1 = Math.sin(angle * pointCount       + time * 0.8) * spread;
        const noise2 = Math.cos(angle * (pointCount + 1) + time * 0.5) * spread * 0.6;
        const noise3 = Math.sin(angle * 2                + time * 1.2) * spread * 0.3;
        const radius = 1 + noise1 + noise2 + noise3;

        // Local position before rotation
        const localX = centerX + radiusX * radius * Math.cos(angle);
        const localY = centerY + radiusY * radius * Math.sin(angle);

        // Apply rotation around center
        const rotatedX = centerX + (localX - centerX) * Math.cos(rotationRadians) - (localY - centerY) * Math.sin(rotationRadians);
        const rotatedY = centerY + (localX - centerX) * Math.sin(rotationRadians) + (localY - centerY) * Math.cos(rotationRadians);

        points.push([rotatedX * canvasWidth, rotatedY * canvasHeight]);
      }

      return points;
    };

    const drawBlobFromPoints = (
      points: [number, number][],
      colorStart: string,
      colorEnd: string,
      canvasWidth: number,
      canvasHeight: number,
    ) => {
      if (points.length < 3) return;

      // Start at the midpoint between the last and first point so the curve
      // is smooth all the way around — no straight closing segment.
      const startMidX = (points[points.length - 1][0] + points[0][0]) / 2;
      const startMidY = (points[points.length - 1][1] + points[0][1]) / 2;

      context.beginPath();
      context.moveTo(startMidX, startMidY);

      for (let index = 0; index < points.length; index++) {
        const nextIndex = (index + 1) % points.length;
        const midX = (points[index][0] + points[nextIndex][0]) / 2;
        const midY = (points[index][1] + points[nextIndex][1]) / 2;
        context.quadraticCurveTo(points[index][0], points[index][1], midX, midY);
      }

      context.closePath();

      const gradient = context.createRadialGradient(
        canvasWidth * 0.5, canvasHeight * 0.45, 0,
        canvasWidth * 0.5, canvasHeight * 0.45, Math.max(canvasWidth, canvasHeight) * 0.6,
      );
      gradient.addColorStop(0, colorStart);
      gradient.addColorStop(1, colorEnd);

      context.fillStyle = gradient;
      context.fill();
    };

    const render = () => {
      const canvasWidth  = canvas.width;
      const canvasHeight = canvas.height;

      // Advance morph time only while the user is scrolling
      if (isScrolling.current) {
        morphTime.current += 0.012;
      }

      const state = getInterpolatedState(scrollProgress.current.current);

      context.clearRect(0, 0, canvasWidth, canvasHeight);

      const blobPoints = computeBlobPoints(
        state.centerX,
        state.centerY,
        state.radiusX,
        state.radiusY,
        state.rotation,
        state.pointCount,
        state.spread,
        morphTime.current,
        canvasWidth,
        canvasHeight,
      );

      context.globalAlpha = 0.65;
      drawBlobFromPoints(blobPoints, state.colorStart, state.colorEnd, canvasWidth, canvasHeight);
      context.globalAlpha = 1;

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId.current);
      scrollTrigger.kill();
      window.removeEventListener('resize', handleResize);
      if (scrollTimeoutId.current !== null) clearTimeout(scrollTimeoutId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="blur-xl fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
