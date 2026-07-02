import type { TagInterface } from "./tag.interface";

export interface ProjectInterface {
    id: number;
    name: string;
    description: string;
    source: string;
    sourceType: string;
    miniatureFile: File;
    miniatureName: string;
    active: boolean;
    tags: TagInterface[];
}