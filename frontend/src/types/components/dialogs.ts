import { GameState, SetGameState} from '../containers/games';
import { GetGameStart } from '../../apis/gameManagement';

export type GameClearDialogArg = {
  isOpen: boolean;
  difficulty: string | undefined;
  correctQuestions: GameState['correctQuestions'];
  incorrectQuestions: GameState['incorrectQuestions'];
  setGameState: SetGameState;
  getGameStart: GetGameStart;
  initialState: GameState;
  gameStartTime: number;
  gameEndTime: number;
  hasUser: boolean;
  rank: number;
  totalExperience: number;
  maximumExperiencePerRank: number;
  temporaryExperience: number;
  prevTemporaryExperience: number;
  dialogGageUp: boolean;
  gameResult: 'win';
  rankUp: false;
};

export type GameOverDialogArg = {
  isOpen: boolean;
  difficulty: string | undefined;
  correctQuestions: GameState['correctQuestions'];
  incorrectQuestions: GameState['incorrectQuestions'];
  setGameState: SetGameState;
  getGameStart: GetGameStart;
  initialState: GameState;
  hasUser: boolean;
  rank: number;
  totalExperience: number;
  maximumExperiencePerRank: number;
  temporaryExperience: number;
  prevTemporaryExperience: number;
  dialogGageUp: boolean;
  gameResult: 'lose';
  rankUp: boolean;
};