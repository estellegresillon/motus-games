import InstantNerdle from "components/InstantNerdle";
import Nerdle from "components/Nerdle";
// import RockPaperScissors from "components/RockPaperScissors";
import Tetris from "components/Tetris";
// import TicTacToe from "components/TicTacToe";
import Wordle from "components/Wordle";

export const NERDLE_LINES = [...Array(6)];
export const NERDLE_CASES = [...Array(8)];
export const WORDLE_CASES = [...Array(5)];

export const NERDLE_KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
export const OPERATORS = ["+", "-", "*", "/", "="];
export const ACTIONS = ["OK", "<="];
export const WORDLE_KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export const GAMES = [
  {
    component: <Wordle />,
    link: "/wordle",
    name: "Wordle",
  },
  {
    component: <Nerdle />,
    link: "/nerdle",
    name: "Nerdle",
  },
  {
    component: <InstantNerdle />,
    link: "/instant-nerdle",
    name: "Instant Nerdle",
  },
  {
    component: <Tetris />,
    link: "/tetris",
    name: "Tetris",
  },
  // {
  //   component: RockPaperScissors,
  //   link: "/rps",
  //   name: "Rock, Paper, Scissors",
  // },
  // {
  //   component: TicTacToe,
  //   link: "/tictactoe",
  //   name: "Tic Tac Toe",
  // },
];
