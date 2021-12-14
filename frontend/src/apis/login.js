import axios from 'axios';
import { userSessionsCreate, userSessionsDestroy } from '../urls/index';

// ログインするためのAPIコール関数
// postの第3引数にwithCredentials: trueを指定することで、
// API(Rails)と通信する際にデータにcookieを含めることができる
export const postUserSession = async ({user: {email, password}}) => {
  try {
    const response = await axios.post(userSessionsCreate,
      {
        email: email,
        password: password
      },
      { withCredentials: true }
    );
    axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
    return response.data;
  } catch(e) {
    throw e;
  }
};

// ログアウトするためのAPIコール関数
export const deleteUserSession = async () => {
  try {
    const response = await axios.delete(userSessionsDestroy,
      { withCredentials: true }
    );
    return response.data;
  } catch(e) {
    throw e;
  }
};
