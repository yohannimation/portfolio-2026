import type { ProjectInterface } from "@/types/project.interface";

export interface CategoryInterface {
    id: number;
    name: string;
    description: string;
    slug: string;
    projects?: ProjectInterface[];
}

