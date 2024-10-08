import { http } from "@/lib/http";
import { SignInSchemaType, SignUpSchemaType } from "@/pages/Auth/typesAndData";
import { useMutation } from "@tanstack/react-query";

/**
 * Login Service
 */
export type LoginServiceDataType = {
  isVendor?: boolean;
} & SignInSchemaType;
const loginService = async (data: LoginServiceDataType) => {
  const res = await http.post<string>("/auth/login", data);
  return res.data;
};

export const useLoginService = () => {
  return useMutation({
    mutationFn: loginService,
  });
};

/**
 * Sign Up Service
 */
const signUpService = async (data: SignUpSchemaType) => {
  const res = await http.post<string>("/auth/sign-up", data);
  return res.data;
};

export const useSignUpService = () => {
  return useMutation({
    mutationFn: signUpService,
  });
};
