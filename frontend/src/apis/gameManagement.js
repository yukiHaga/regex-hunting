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
export const postGameStart = async (difficulty) => {
  try {
    const response = await axios.post(
      `${gameManagementsStart}?difficulty=${difficulty}`,
      { withCredentials: true }
    );
    axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
    return response.data;
  } catch(e) {
    throw e;
  }
};
