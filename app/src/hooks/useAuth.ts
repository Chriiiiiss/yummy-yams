import { create } from "zustand";
import { UserState } from "../interfaces/auth.interface";
import { devtools, persist } from "zustand/middleware";

export const useGetUserData = () => {
  return;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        username: "",
        partyLeft: 0,
        prizeWon: [],
        isConnected: false,
        setIsConnected: (value: boolean) => set({ isConnected: value }),
        setToken: (value: string) => set({ token: value }),
        setUsername: (value: string) => set({ username: value }),
        setPartyLeft: (value: number) => set({ partyLeft: value }),
        setPrizeWon: (value: string[]) => set({ prizeWon: value }),
      }),
      { name: "user" }
    )
  )
);
