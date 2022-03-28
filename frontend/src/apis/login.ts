import axios from 'axios';
import { userSessionsCreate, userSessionsDestroy, defaultOAuthPost } from '../urls/index';

// ログインするためのAPIコール関数の引数の型
// 戻り値の型は関数自身に書く
type PostUserSession = {
  user: {
    email: string,
    password: string
  }
};

// OAuthログインするためのAPIコール関数の引数の型
// 戻り値の型は関数自身に書く
type PostExternalAuth = {
  code: string,
  provider: string | undefined;
};

// ログインするためのAPIコール関数
// postの第3引数にwithCredentials: trueを指定することで、
// API(Rails)と通信する際にデータにcookieを含めることができる
export const postUserSession = async ({user: {email, password}}: PostUserSession): Promise<any> => {
  const response = await axios.post(userSessionsCreate,
    {
      email: email,
      password: password
    },
    { withCredentials: true }
  );
  axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
  return response.data;
};

// ログアウトするためのAPIコール関数
export const deleteUserSession = async (): Promise<any> => {
  const response = await axios.delete(userSessionsDestroy,
    { withCredentials: true }
  );
  return response.data;
};

// ローディング画面から、OAuthログインさせるためのAPIコール関数。
export const postExternalAuth = async ({
  code,
  provider
}: PostExternalAuth): Promise<any> => {
  const response = await axios.post(defaultOAuthPost,
    {
      code: code,
      provider: provider,
    },
    { withCredentials: true }
  );
  axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
  return response.data;
};
