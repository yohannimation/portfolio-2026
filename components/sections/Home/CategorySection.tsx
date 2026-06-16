"use client";

// UI components
import Anchor from "@/components/ui/anchor";
import FlowingMenu from "@/components/FlowingMenu";

// Animation components
import AnimatedContent from "@/components/AnimatedContent";

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
    <section id="category" className="relative h-[101dvh] p-2 py-4 sm:p-3 sm:py-4 bg-primary">
      <div className="h-full px-5 pt-5 sm:px-20 sm:pt-20 bg-background rounded-2xl sm:rounded-4xl">
        <AnimatedContent
          container="category"
          delay={.2}
          className="
            flex
            flex-col
            justify-center
            gap-[12dvh]
            h-full
          "
        >
          <div>
            <h2>CATEGORIES</h2>
            <p>Lorem ipsum <Anchor href={`/category`} prefetch={true}>dolor</Anchor> sit amet,<br/>consectetur adipisicing elit. Eos odio unde, possimus distinctio nobis quis dolor blanditiis veritatis sed sequi!</p>
          </div>

          <div className="relative mx-auto w-full max-w-full h-full lg:max-w-[75%] overflow-hidden">
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
      </div>
    </section>
  );
}