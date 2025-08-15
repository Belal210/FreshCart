import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "../services/brands-service";

export function useBrands() {
  const {
    data: brands,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
    select: (data) => data?.data.data,
  });

  return { brands, isLoading, isError, error };
}
