import axios from 'axios';
import { rankings } from '../urls/index';

// クリアタイムのランキングを取得するAPIコール関数
// postの第3引数にwithCredentials: trueを指定することで、
// API(Rails)と通信する際にデータにcookieを含めることができる
export const getRanking = async (): Promise<any> => {
  try {
    const response = await axios.get(
      rankings,
      { withCredentials: true }
    );
    axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
    return response.data;
  } catch(e) {
    throw e;
  }
};
