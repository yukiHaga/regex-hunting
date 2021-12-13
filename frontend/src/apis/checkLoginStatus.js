import axios from 'axios';
import { userSessionsExist } from '../urls/index';

// ログインするためのAPIコール関数
// postの第3引数にwithCredentials: trueを指定することで、
// API(Rails)と通信する際にデータにcookieを含めることができる
export const checkLoginStatus = async () => {
  try {
    const response = await axios.get(
      userSessionsExist,
      { withCredentials: true }
    );
    return response.data;
  } catch(e) {
    throw e;
  }
};
