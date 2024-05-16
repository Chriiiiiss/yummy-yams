import styled from "@emotion/styled";
import { colorTheme } from "../../pages/constant";

interface RankingListProps {
  users: RankingData[];
}

interface Pastries {
  _id: string;
  name: string;
  image: string;
  stock: number;
  quantityWon: number;
}

export interface RankingData {
  username: string;
  pastries: Pastries[];
}

interface RankingLineProps {
  alingSelf?: "center" | "start" | "end";
  justifyContent?: "center" | "start" | "end";
}

const RankingLine = styled.div<RankingLineProps>`
  display: flex;
  width: 100%;
  align-self: ${({ alingSelf }) => alingSelf || "start"};
  justify-content: ${({ justifyContent }) => justifyContent || "start"};
`;

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 80%;
  background-color: var(${colorTheme.gray.primary});
  height: 40%;
  padding: 24px 40px 24px 40px;
  border-radius: 15px;
  font-family: "Balatro";
  color: var(${colorTheme.white.primary});
`;

export const RankingList = ({ users }: RankingListProps) => {
  console.log(users);
  return (
    <RankingContainer className="pixel-corners--wrapper">
      {users.map((user) => (
        <RankingLine key={`${user.username}`}>
          <p>{user.username}</p>
          <ul>
            {user.pastries.map((pastrie) => (
              <li key={pastrie._id}>{pastrie.name}</li>
            ))}
          </ul>
        </RankingLine>
      ))}
    </RankingContainer>
  );
};
