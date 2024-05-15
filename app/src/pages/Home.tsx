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

const handleLogout = (reset: () => void) => {
  reset;
  window.location.reload();
};

function Home() {
  return (
    <AppWrapper>
      {/* {isConnected && (
        <Overlay>
          <Title children={`Welcome ${username}`} fontSize="40" />
          <button
            onClick={() => {
              reset();
              window.location.reload();
            }}
          >
            Logout
          </button>
        </Overlay>
      )} */}
      <Title children={"YUMMY YAMS"} fontSize="90" isHomeTitle={true} />
      <HomeNavigationBar />
    </AppWrapper>
  );
}

export default Home;
