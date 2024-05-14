import styled from "@emotion/styled";
import { Title } from "../components/Title";
import { HomeNavigationBar } from "../components/Home/HomeNavigationBar";
import { useUserStore } from "../hooks/useAuth";

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  gap: 200px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

function Home() {
  const { isConnected } = useUserStore();
  return (
    <AppWrapper>
      {isConnected && (
        <Overlay>
          <Title children={"Welcome"} fontSize="40" />
        </Overlay>
      )}
      <Title children={"YUMMY YAMS"} fontSize="90" isHomeTitle={true} />
      <HomeNavigationBar />
    </AppWrapper>
  );
}

export default Home;
