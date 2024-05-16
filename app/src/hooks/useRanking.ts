import { useQuery } from "@tanstack/react-query";
import { RankingData } from "../components/Ranking/RankingList";

export const useRanking = () => {
  return useQuery<void, Error, RankingData[]>({
    queryKey: ["ranking"],
    queryFn: fetchRanking,
  });
};

export const fetchRanking = async () => {
  const response = await fetch(import.meta.env.VITE_API_URL + "/user/ranking");

  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};
