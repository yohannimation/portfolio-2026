// Section components
import HeroSection from "@/components/sections/Category/HeroSection";
import ProjectSection from "@/components/sections/Category/ProjectSection";

// Services
import { categoryService } from "@/services/category.service";

interface CategoryPageProps {
  params: Promise<{
    identifier: string;
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { identifier } = await params;
  const [id, ...slugParts] = identifier.split("-");
  const slug = slugParts.join("-");

  const category = await categoryService.getCategoryById(id);
  const projects = category.projects;
  
  return (
    <div
      className="px-4 py-6 md:px-20"
    >
      <HeroSection category={category} />
      { projects && <ProjectSection projects={projects} /> }
    </div>
  );
}