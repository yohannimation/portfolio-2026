import { apiClient } from "@/lib/api-client";
import type { CategoryInterface } from "@/types/category.interface";

export const categoryService = {
  async getCategories(): Promise<CategoryInterface[]> {
    return apiClient<CategoryInterface[]>("/category");
  },

  async getCategoryById(id: string | number): Promise<CategoryInterface> {
    return apiClient<CategoryInterface>(`/category/${id}`);
  },
};
