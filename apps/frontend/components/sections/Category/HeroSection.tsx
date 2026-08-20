"use client";

// GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// Types
import type { CategoryInterface } from '@/types/category.interface';

interface HeroSectionInterface {
  category: CategoryInterface
}

export default function HeroSection({ category }: HeroSectionInterface) {
  return (
    <section id="hero" className="flex justify-center items-center flex-col h-dvh duration-200">
      <h1 className="uppercase text-center hero">{category.name}</h1>
      <p dangerouslySetInnerHTML={{ __html: category.description }} />
    </section>
  );
}
