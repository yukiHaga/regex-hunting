import axios from 'axios';
import { passwordResetsUpdate } from '../urls/index';

// パスワード再設定フォームに入力した情報をサーバーへ送るAPIコール関数の引数の型
type PatchPasswordResetsUpdateArg = {
  user: {
    password: string,
    password_confirmation: string
  },
  token: string
};

// パスワード再設定フォームに入力した情報をサーバーへ送るAPIコール関数
export const patchPasswordResetsUpdate = async ({
  user: {
    password,
    password_confirmation,
  },
  token
}: PatchPasswordResetsUpdateArg): Promise<any> => {
  const response = await axios.patch(
    passwordResetsUpdate(token),
    {
      user: {
        password: password,
        password_confirmation: password_confirmation
      },
    },
    { withCredentials: true }
  );
  axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
  return response.data;
};
