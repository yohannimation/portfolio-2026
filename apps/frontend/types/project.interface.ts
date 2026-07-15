import type { TagInterface } from "./tag.interface";

export interface ProjectInterface {
    id: number;
    category: number;
    name: string;
    description: string;
    source: string;
    sourceType: ProjectSourceTypeInterface;
    miniatureSize: number;
    miniatureName: string;
    active: boolean;
    date: string;
    tags: TagInterface[];
}

export type ProjectSourceTypeInterface = "link" | "video" | "image";