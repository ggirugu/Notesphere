import { http } from "@/lib/http";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Category } from "@/types/category";


const fetchCategories = async (userId: string): Promise<Category[]> => {
  const res = await http.get(`/categories/${userId}`);
  return res.data;
};

export const useFetchCategoriesService = (userId: string) => {
  return useQuery({
    queryKey: ['categories', userId],
    queryFn: () => fetchCategories(userId),
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

const createCategoryService = async (categoryData: Partial<Category>): Promise<Category> => {
  const res = await http.post("/categories", categoryData);
  return res.data;
};

export const useCreateCategoryService = () => {
  return useMutation({
    mutationFn: createCategoryService,
  });
};
