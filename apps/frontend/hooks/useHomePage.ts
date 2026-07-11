// Hook
import { useCategories } from "@/hooks/useCategories";

export function useHomePage() {
  const categoryData = useCategories();

  return {
    categories: categoryData.categories,
    isLoading: categoryData.isLoading,
    error: categoryData.error,
    refetchCategories: categoryData.refetch,
  };
}
