import { create } from "zustand";
import { UserState } from "../interfaces/auth.interface";
import { devtools, persist } from "zustand/middleware";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../api/user";
import { IUserResponse } from "../interfaces/user.interface";

export const useGetUserData = (token: string | null) => {
  return useQuery<IUserResponse, Error>({
    queryKey: ["user", token],
    queryFn: () => fetchUserInfo(token as string),
    enabled: !!token,
    retry: 2,
    staleTime: 1000 * 60 * 60,
  });
};

const initialState = {
  token: null,
  username: "",
  partyLeft: 0,
  prizeWon: [],
  isConnected: false,
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setIsConnected: (value: boolean) => set({ isConnected: value }),
        setToken: (value: string) => set({ token: value }),
        setUsername: (value: string) => set({ username: value }),
        setPartyLeft: (value: number) => set({ partyLeft: value }),
        setPrizeWon: (value: string[]) => set({ prizeWon: value }),
        reset: () => set({ ...initialState }),
      }),
      { name: "user" }
    )
  )
);
