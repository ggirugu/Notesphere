import { getSignedInUserDetails } from "@/utils/authUtils";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

// axios.interceptors.response.use((err) => {
//     err.status.
// })

const user = getSignedInUserDetails();

export const http = axios.create({
  baseURL: "http://localhost:8086/api",
  headers: {
    "vendor-id": user?.isVendor ? user?._id : undefined,
    "user-id": !user?.isVendor ? user?._id : undefined,
  },
});
