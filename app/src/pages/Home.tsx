import styled from "@emotion/styled";
import { Title } from "../components/Title";
import { HomeNavigationBar } from "../components/Home/HomeNavigationBar";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  gap: 200px;
`;

function Home() {
  return (
    <AppWrapper>
      <Title children={"YUMMY YAMS"} fontSize="90" isHomeTitle={true} />
      <HomeNavigationBar />
    </AppWrapper>
  );
}

export default Home;
