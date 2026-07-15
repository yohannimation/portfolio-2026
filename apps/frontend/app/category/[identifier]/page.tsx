// Section components
import LinkProject from "@/components/projects/LinkProject";

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
  
  console.log(projects)

  return (
    <div
      className="px-4 py-6 md:p-20"
    >
      <h1 className="uppercase">{category.name}</h1>
      <p>{category.description}</p>

      <section className="mt-8">
        <ul className="flex flex-col gap-6">
          {projects?.map((project) => (
            <li key={project.id}>
              <LinkProject project={project} />
            </li>
          ))}
        </ul>

      </section>
    </div>
  );
}