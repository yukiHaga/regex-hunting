import axios from 'axios';
import { gameManagementsStart } from '../urls/index';

import { gameManagementsFinish } from '../urls/index';

// ゲームをスタートするためのAPI関数
// postの第3引数にwithCredentials: trueを指定することで、
// API(Rails)と通信する際にデータにcookieを含めることができる
export const getGameStart = async (difficulty) => {
  try {
    const response = await axios.get(
      `${gameManagementsStart}?difficulty=${difficulty}`,
      { withCredentials: true }
    );
    axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
    return response.data;
  } catch(e) {
    throw e;
  }
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
}) => {
  try {
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
  } catch(e) {
    throw e;
  }
};
