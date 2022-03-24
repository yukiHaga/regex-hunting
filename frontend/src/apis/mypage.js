import axios from 'axios';
import { myPages } from '../urls/index.ts';

// マイページ情報を取得するAPIコール関数
// postの第3引数にwithCredentials: trueを指定することで、
// API(Rails)と通信する際にデータにcookieを含めることができる
export const getMyPageInfo = async ({ id }) => {
  try {
    const response = await axios.get(
      myPages(id),
      { withCredentials: true }
    );
    axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
    return response.data;
  } catch(e) {
    throw e;
  }
};
