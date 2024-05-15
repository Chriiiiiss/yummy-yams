import { useMutation } from "@tanstack/react-query";
import { startGame } from "../api/game";
import { useUserStore } from "./useAuth";
import {
  IStartGamePayload,
  IStartGameResponse,
} from "../interfaces/game.interface";
import { useNavigate } from "@tanstack/react-router";

export const useLaunchGame = () => {
  const navigate = useNavigate();
  const { reset } = useUserStore();
  return useMutation<IStartGameResponse, Error, IStartGamePayload>({
    mutationFn: startGame,
    onSuccess: () => {
      console.log("Game started");
    },
    onError: () => {
      reset();
      navigate({ to: "/login" });
    },
  });
};
