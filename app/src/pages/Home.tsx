import styled from "@emotion/styled";

const AppWrapper = styled.div`
  background-color: red;
`;

function Home() {
  return (
    <AppWrapper>
      <h1>Home</h1>
      <p>This is the home page.</p>
    </AppWrapper>
  );
}

export default Home;
