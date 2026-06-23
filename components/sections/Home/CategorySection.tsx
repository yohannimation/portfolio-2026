"use client";

// UI components
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
      name: "Développement web",
      description: "",
      slug: "1-web"
    },
    {
      id: 2,
      name: "Audiovisuel",
      description: "",
      slug: "2-audiovisual"
    },
  ]

  const categoryItems = categories.map((category, index) => ({
    link: `category/${category.id}-${category.slug}`,
    text: category.name,
    image: `https://picsum.photos/600/400?random=${index + 1}`,
  }));

  return (
    <section
      id="category"
      className="
        relative
        px-4 py-6
        sm:p-20
        text-white
        bg-primary
        z-2
      ">
      <AnimatedContent
        container="category"
        delay={.2}
        className="
          flex
          flex-col
          justify-center
          gap-10
          h-full
        "
      >
        <div>
          <h2>CATEGORIES</h2>
          <p>
            Du développement web à la création audiovisuelle, chaque projet est l'occasion d'explorer de nouvelles idées et de perfectionner mes compétences.<br />
            Parcourez mes réalisations et découvrez les univers qui m'inspirent.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-full h-full overflow-hidden">
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