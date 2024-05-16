import { useMutation } from "@tanstack/react-query";
import { loggingIn, registerUser } from "../api/auth";
import {
  IAuthResponse,
  IConnectionPayload,
} from "../interfaces/auth.interface";

export const useLogUserIn = () => {
  return useMutation<IAuthResponse, Error, IConnectionPayload>({
    mutationFn: loggingIn,
  });
};

export const useRegister = () => {
  return useMutation<IAuthResponse, Error, IConnectionPayload>({
    mutationFn: registerUser,
  });
};
