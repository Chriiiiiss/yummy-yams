import styled from "@emotion/styled";
import { Title } from "../components/Title";
import { colorTheme } from "./constant";
import { useRanking } from "../hooks/useRanking";
import { RankingList } from "../components/Ranking/RankingList";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  gap: 100px;
`;

export const Ranking = () => {
  const { data, isLoading, isError } = useRanking();
  return (
    <AppWrapper>
      <Title children={"Ranking"} isHomeTitle={true} fontSize="90" />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data && <RankingList users={data} />}
    </AppWrapper>
  );
};
