import axios from 'axios';
import { gameManagementsStart } from '../urls/index';

import { gameManagementsFinish } from '../urls/index';

// ゲームをスタートするためのAPI関数の型
export type GetGameStart = (difficulty: string | undefined) => Promise<any>;

// ゲームを終了させるためのAPI関数の引数の型
// 関数の型は、関数自体に書いた
// judgementの部分で暫定的にany[]を使用した
type PostGameFinish = {
  game_management: {
    difficulty: string | undefined,
    game_result: 'win' | 'lose',
    result_time: number,
  },
  judgement: {
    correct: any[],
    incorrect: any[]
  },
  current_user: {
    rank: number,
    total_experience: number,
    maximum_experience_per_rank: number,
    temporary_experience: number,
    active_title: string
  }
};

// ゲームをスタートするためのAPI関数
// postの第3引数にwithCredentials: trueを指定することで、
// API(Rails)と通信する際にデータにcookieを含めることができる
export const getGameStart: GetGameStart = async (difficulty) => {
  const response = await axios.get(
    `${gameManagementsStart}?difficulty=${difficulty}`,
    { withCredentials: true }
  );
  axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
  return response.data;
};

// ゲームを終了させるためのAPI関数
export const postGameFinish = async ({
  game_management: {
    difficulty,
    game_result,
    result_time
  },
  judgement: {
    correct,
    incorrect
  },
  current_user: {
    rank,
    total_experience,
    maximum_experience_per_rank,
    temporary_experience,
    active_title
  }
}: PostGameFinish): Promise<any> => {
  const response = await axios.post(
    `${gameManagementsFinish}`,
    {
      game_management: {
        difficulty: difficulty,
        game_result: game_result,
        result_time: result_time
      },
      judgement: {
        correct: correct,
        incorrect: incorrect,
      },
      current_user: {
        rank: rank,
        total_experience: total_experience,
        maximum_experience_per_rank: maximum_experience_per_rank,
        temporary_experience: temporary_experience,
        active_title: active_title
      }
    },
    { withCredentials: true }
  );
  axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
  return response.data;
};
