
// Types
import type { CategoryInterface } from "@/types/category.interface"
import type { ProjectInterface } from "@/types/project.interface"

interface CategoryPageProps {
  params: Promise<{
    identifier: string;
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { identifier } = await params;
  const [id, ...slugParts] = identifier.split("-");
  const slug = slugParts.join("-");

  return (
    <div>
      <p>ID : {id}</p>
      <p>Slug : {slug}</p>
    </div>
  );
}