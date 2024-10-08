import { http, queryClient } from "@/lib/http";
import { CatalogItemDataType } from "@/pages/(Dashboard)/Catalog/typesAndData";
import { useMutation, useQuery } from "@tanstack/react-query";

/**
 * Get Catalog Service
 */
export type GetCatalogServiceRecordType = Required<CatalogItemDataType>;
const getCatalogService = async (productId?: string) => {
  const res = await http.get<GetCatalogServiceRecordType[]>(
    `/products/${productId ?? ""}`
  );
  return res.data;
};

export const useGetCatalogService = (productId?: string) => {
  return useQuery({
    queryKey: ["getCatalogService", productId],
    queryFn: () => getCatalogService(productId),
  });
};

/**
 * Update Catalog Service
 */
const updateCatalogService = async (data: CatalogItemDataType) => {
  const res = await http.put<string>(`/products/${data._id}`, data);
  return res.data;
};

export const useUpdateCatalogService = () => {
  return useMutation({
    mutationFn: updateCatalogService,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

/**
 * Delete Catalog Service
 */
const deleteCatalogService = async (data: CatalogItemDataType) => {
  const res = await http.delete<string>(`/products/${data._id}`);
  return res.data;
};

export const useDeleteCatalogService = () => {
  return useMutation({
    mutationFn: deleteCatalogService,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};

/**
 * Create Catalog Service
 */
const createCatalogService = async (data: CatalogItemDataType) => {
  const res = await http.post<string>(`/products`, data);
  return res.data;
};
export const createCustomCatalogService = async (data: CatalogItemDataType) => {
  const res = await http.post<CatalogItemDataType>(`/products`, data);
  return res.data;
};
export const createCustomCatalogServiceWithVendor = async (data: CatalogItemDataType, vendorId: string) => {
  // Set headers for the HTTP request
  const config = {
    headers: {
      'vendor-id': vendorId  // Add the vendorId to the request headers
    }
  };

  // Make the HTTP POST request with data and headers
  const res = await http.post<CatalogItemDataType>('/products', data, config);
  return res.data;
};


export const useCreateCatalogService = () => {
  return useMutation({
    mutationFn: createCatalogService,
    onSuccess: () => queryClient.invalidateQueries(),
  });
};
