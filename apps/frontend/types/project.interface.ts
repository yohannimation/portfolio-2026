import type { TagInterface } from "./tag.interface";
import type { TypeInterface } from "./type.interface";

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
    type: TypeInterface;
    tags: TagInterface[];
}

export type ProjectSourceTypeInterface = "link" | "video" | "image";