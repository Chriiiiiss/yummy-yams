import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { startGame } from "../api/game";
import { useUserStore } from "./useAuth";
import {
  IFetchGameResponse,
  IGameError,
  IGameState,
  IStartGamePayload,
  IStartGameResponse,
} from "../interfaces/game.interface";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialGameState = {
  shotLeft: 3,
  isWon: false,
  prizeWon: "",
  gameId: "",
};

export const useGameStore = create<IGameState>()(
  devtools(
    persist(
      (set) => ({
        ...initialGameState,
        setShotLeft: (value: number) => set({ shotLeft: value }),
        setIsWon: (value: boolean) => set({ isWon: value }),
        setPrizeWon: (value: string) => set({ prizeWon: value }),
        setGameId: (value: string) => set({ gameId: value }),
        reset: () => set({ ...initialGameState }),
      }),
      { name: "game" }
    )
  )
);

const setGameState = (data: Partial<IGameState>) => {
  const { shotLeft, isWon, prizeWon, gameId } = data;
  useGameStore.setState({ shotLeft, isWon, prizeWon, gameId });
};

export const useLaunchGame = () => {
  const navigate = useNavigate();
  const { reset } = useUserStore();
  const queryClient = useQueryClient();
  return useMutation<IStartGameResponse, IGameError, IStartGamePayload>({
    mutationFn: startGame,
    onSuccess: (data) => {
      console.log("Game started", data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setGameState(data);
      navigate({ to: "/game" });
    },
    onError: (error: IGameError) => {
      console.log("Game error", error);
      switch (error.code) {
        case 41:
          toast.error("You have no game left to play. Please come back later.");
          break;
        case 42:
          toast.error("Token expired");
          reset();
          navigate({ to: "/" });
          break;
        default:
          toast.error("An error occured. Please try again later.");
          break;
      }
    },
  });
};

export const useFetchGame = (gameId: string) => {
  const { token } = useUserStore();

  return useQuery<IFetchGameResponse, IGameError>({
    queryKey: ["game"],
    queryFn: async () => {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/game/" + gameId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.status !== 200) {
        throw new IGameError(data.message, data.code);
      }

      return data;
    },
    enabled: !!token && !!gameId,
    retry: 2,
  });
};

interface ILaunchDicePayload {
  diceArray: boolean[];
}

interface ILaunchDiceResponse {
  message: string;
  diceArray: number[];
}

export const postLaunchDice = async (
  token: string,
  gameId: string,
  payload: ILaunchDicePayload
) => {
  const response = await fetch(
    import.meta.env.VITE_API_URL + "/game/" + gameId + "/launchDice",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (response.status !== 200) {
    throw new IGameError(data.message, data.code);
  }

  return data;
};

export const useLaunchDice = () => {
  const { gameId } = useGameStore();
  const { token } = useUserStore();
  const queryClient = useQueryClient();
  return useMutation<ILaunchDiceResponse, IGameError, ILaunchDicePayload>({
    mutationFn: (diceArray) =>
      postLaunchDice(token as string, gameId, diceArray),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["game"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const postQuitGame = async (token: string) => {
  const response = await fetch(import.meta.env.VITE_API_URL + "/game/quit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200) {
    throw new Error("Error quitting game");
  }

  const data = await response.json();

  return data;
};

export const useQuitGame = () => {
  return useMutation<string, Error, string>({
    mutationFn: postQuitGame,
  });
};
