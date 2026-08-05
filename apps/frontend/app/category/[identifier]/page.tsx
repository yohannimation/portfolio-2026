// Section components
import HeroSection from "@/components/sections/Category/HeroSection";
import ProjectSection from "@/components/sections/Category/ProjectSection";

// Services
import { categoryService } from "@/services/category.service";

// Types
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{
    identifier: string;
  }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { identifier } = await params;
  const [ id ] = identifier.split("-");

  try {
    const category = await categoryService.getCategoryById(id);

    return {
      title: `${category.name}`,
      description: `${category.description}.`,
      category: `${category.name}`,
      alternates: {
        canonical: `https://yohannimation.fr/category/${category.id}-${category.slug}`
      },
      keywords: [
        "développement web", "web development", "audiovisuel", "audiovisual", "projets", "projects", "yohann renauld", 
        ...(category.projects?.map((project) => project.name) ?? []),
      ],
      openGraph: {
        title: `${category.name}`,
        description: `${category.description}.`,
        siteName: "Yohannimation portfolio",
        locale: "fr",
        url: `https://yohannimation.fr/category/${category.id}-${category.slug}`,
        countryName: "France"
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    return {
      title: `Catégorie ${identifier}`,
    };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { identifier } = await params;
  const [id, ...slugParts] = identifier.split("-");
  const slug = slugParts.join("-");

  const category = await categoryService.getCategoryById(id);
  const projects = category.projects;
  
  return (
    <div className="px-4 py-6 md:px-20">
      <HeroSection category={category} />
      { projects && <ProjectSection projects={projects} /> }
    </div>
  );
}