import axios from 'axios';
import { usersCreate } from '../urls/index';

// 新規会員登録するためのAPIコール関数の引数の型
type PostUserArg = {
  user: {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  }
}

// 新規会員登録するためのAPIコール関数
export const postUser = async ({user: {
  name,
  email,
  password,
  password_confirmation
}}: PostUserArg): Promise<any> => {
  const response = await axios.post(usersCreate,
    {
      user: {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    },
    { withCredentials: true }
  );
  axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
  return response.data;
};
