import { GAME_HEIGHT, GAME_WIDTH } from "../const/game-world";

export const calculateDimensions = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  const scale = Math.min(windowWidth / GAME_WIDTH, windowHeight / GAME_HEIGHT);
  const width = GAME_WIDTH * scale;
  const height = GAME_HEIGHT * scale;

  return { width, height, scale };
};

export const tickScreen = (setFunction: React.Dispatch<React.SetStateAction<boolean>>, time: number) => {
  let interval = setInterval(() => {
    setFunction(prev => !prev);
  }, time);

  return () => clearInterval(interval);
};