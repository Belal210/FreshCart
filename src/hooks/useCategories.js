import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../services/categories-service";

export function useCategories() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  return { categories: data?.data.data, isLoading, isError, error };
}
