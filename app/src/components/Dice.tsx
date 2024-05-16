import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

import "./dice.css";
import { useGameStore, useLaunchDice, useQuitGame } from "../hooks/useGame";
import { NavigationButton } from "./Home/NavigationButton";
import { Color } from "../pages/constant";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../hooks/useAuth";
import toast from "react-hot-toast";
import JSConfetti from "js-confetti";

const ButtonWrapper = styled.div`
  display: flex;
  width: 50vw;
  height: 13vh;
  justify-content: center;
`;

const ConfettiCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

export const Dice = () => {
  const { shotLeft, reset, isWon } = useGameStore();
  const { token } = useUserStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dicesContainerRef = useRef<HTMLDivElement>(null);
  const [diceValues, setDiceValues] = useState([1, 2, 3, 4, 5]);
  const [locked, setLocked] = useState<boolean[]>(Array(5).fill(false));
  const [message, setMessage] = useState("");
  const [isWinner, setIsWinner] = useState(false);
  const [nbOfGamesLeft, setNbOfGamesLeft] = useState(3);
  const launchDice = useLaunchDice();
  const quitGame = useQuitGame();
  const canvasElem = useRef<HTMLCanvasElement>(null);
  const jsConfetti = useRef<JSConfetti | null>(null);
  const [animationsCompleted, setAnimationsCompleted] = useState(0);

  useEffect(() => {
    if (canvasElem.current) {
      jsConfetti.current = new JSConfetti({ canvas: canvasElem.current });
    }
  }, [canvasElem]);

  const handleLaunchDice = () => {
    launchDice.mutate(
      { diceArray: locked },
      {
        onSuccess: (data) => {
          rollDices(data.diceArray);
        },
      }
    );
  };

  const handleQuitGame = () => {
    quitGame.mutate(token as string, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] }).then(() => {
          reset();
          navigate({ to: "/" });
        });
      },
    });
  };

  const checkCombinations = (values) => {
    const counts = values.reduce(
      (acc, val) => ({ ...acc, [val]: (acc[val] || 0) + 1 }),
      {}
    );
    const countsArray = Object.values(counts);

    if (countsArray.includes(5)) {
      setIsWinner(true);
      return "Victoire avec 5 dés identiques!";
    } else if (countsArray.includes(4)) {
      setIsWinner(true);
      return "Victoire avec 4 dés identiques!";
    } else if (countsArray.filter((item) => item === 2).length === 2) {
      setIsWinner(true);
      return "Victoire avec 2 paires de dés!";
    }
    return ""; // Pas de combinaison gagnante
  };

  const animations = [
    "rolling",
    "rolling2",
    "rolling3",
    "rolling4",
    "rolling5",
    "rolling6",
  ];

  const toggleLock = (index: number) => {
    const newLocked = [...locked];
    newLocked[index] = !newLocked[index];
    setLocked(newLocked);
  };

  const handleAnimationEnd = () => {
    setAnimationsCompleted((prev) => prev + 1);
  };

  useEffect(() => {
    if (animationsCompleted === diceValues.length && isWon) {
      toast.success("You won!");
      jsConfetti.current?.addConfetti({ emojis: ["🥐", "🥖", "🍰", "🧁"] });

      setAnimationsCompleted(0); // reset for the next roll
    }
  }, [animationsCompleted, isWon]);

  const rollDices = (rolledDices: number[]) => {
    if (nbOfGamesLeft === 0) return;
    if (!dicesContainerRef.current) return;

    const newDiceValues = [...diceValues];
    const dices = dicesContainerRef.current.children;

    if (lockedValues.length === 5 || isWinner || nbOfGamesLeft === 0) {
      setNbOfGamesLeft(nbOfGamesLeft - 1);
    }

    Array.from(dices).forEach((diceElement, index) => {
      if (locked[index]) return;
      const dice = diceElement as HTMLElement;
      const random = rolledDices[index];
      newDiceValues[index] = random;
      const animationName = animations[index % animations.length];
      dice.style.animation = `${animationName} 4s`;

      dice.addEventListener("animationend", handleAnimationEnd, { once: true });

      setTimeout(() => {
        // Ajuste la transformation en fonction de la valeur 'random'
        switch (random) {
          case 1:
            dice.style.transform = "rotateX(0deg) rotateY(0deg)";
            break;
          case 6:
            dice.style.transform = "rotateX(180deg) rotateY(0deg)";
            break;
          case 2:
            dice.style.transform = "rotateX(-90deg) rotateY(0deg)";
            break;
          case 5:
            dice.style.transform = "rotateX(90deg) rotateY(0deg)";
            break;
          case 3:
            dice.style.transform = "rotateX(0deg) rotateY(90deg)";
            break;
          case 4:
            dice.style.transform = "rotateX(0deg) rotateY(-90deg)";
            break;
          default:
            break;
        }
        dice.style.animation = "none";
      }, 4050);
    });
    setDiceValues(newDiceValues);
    const result = checkCombinations(newDiceValues);
    setMessage(result);
  };

  const lockedValues = diceValues
    .filter((value, index) => locked[index])
    .join(", ");

  return (
    <div className="card-container">
      <ConfettiCanvas ref={canvasElem} />
      <div className="card">
        <div className="dice-container" ref={dicesContainerRef}>
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className={`dice ${locked[index] ? "locked" : ""}`}
              onClick={() => toggleLock(index)}
            >
              <div
                className={`face front ${locked[index] ? "locked" : ""}`}
              ></div>
              <div
                className={`face back ${locked[index] ? "locked" : ""}`}
              ></div>
              <div
                className={`face right ${locked[index] ? "locked" : ""}`}
              ></div>
              <div
                className={`face left ${locked[index] ? "locked" : ""}`}
              ></div>
              <div
                className={`face top ${locked[index] ? "locked" : ""}`}
              ></div>
              <div
                className={`face bottom ${locked[index] ? "locked" : ""}`}
              ></div>
            </div>
          ))}
        </div>
        <div className="button-container">
          <ButtonWrapper>
            {shotLeft > 0 && !isWon ? (
              <NavigationButton
                color={Color.Blue}
                index={2}
                buttonTitle="Launch Dice"
                onClick={handleLaunchDice}
              />
            ) : (
              <NavigationButton
                color={Color.Red}
                index={2}
                buttonTitle="Quit Game"
                onClick={() => {
                  handleQuitGame();
                }}
              />
            )}
          </ButtonWrapper>
        </div>
      </div>
    </div>
  );
};
