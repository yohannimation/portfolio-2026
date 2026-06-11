"use client";

// UI components
import Anchor from "@/components/ui/anchor";
import FlowingMenu from "@/components/FlowingMenu";
import AnimatedContent from "../AnimatedContent";

interface category {
  id: number,
  name: string,
  description: string,
  slug: string
}

export default function CategorySection() {
  const categories: category[] = [
    {
      id: 1,
      name: "Category 1",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, velit.",
      slug: "cat-1"
    },
    {
      id: 2,
      name: "Category 2",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, velit.",
      slug: "cat-2"
    },
  ]

  const categoryItems = categories.map((category, index) => ({
    link: `category/${category.id}-${category.slug}`,
    text: category.name,
    image: `https://picsum.photos/600/400?random=${index + 1}`,
  }));

  return (
    <section id="categories" className="relative h-dvh px-5 sm:px-20 py-30">
      <AnimatedContent
        container="categories"
        delay={.5}
      >
        <h2>CATEGORIES</h2>
        <p>Lorem ipsum <Anchor href={`/category`} prefetch={true}>dolor</Anchor> sit amet,<br/>consectetur adipisicing elit. Eos odio unde, possimus distinctio nobis quis dolor blanditiis veritatis sed sequi!</p>

        <div className="relative h-[20dvh] mx-auto my-20 max-w-full lg:max-w-[75%] overflow-hidden">
          <FlowingMenu
            items={categoryItems}
            speed={10}
            bgColor="var(--primary-foreground)"
            textColor="var(--foreground)"
            marqueeBgColor="var(--secondary)"
            borderColor="var(--primary)"
          />
        </div>
      </AnimatedContent>
    </section>
  );
}