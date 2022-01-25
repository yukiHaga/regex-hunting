import axios from 'axios';
import { passwordResetsUpdate } from '../urls/index';

// パスワード再設定フォームに入力した情報をサーバーへ送るAPIコール関数
export const patchPasswordResetsUpdate = async ({ 
  user: {
    id, 
    password, 
    password_confirmation, 
  },
  token
}) => {
  try {
    const response = await axios.patch(
      passwordResetsUpdate(id),
      { 
        user: {
          password: password,
          password_confirmation: password_confirmation
        },
        token: token
      },
      { withCredentials: true }
    );
    axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
    return response.data;
  } catch(e) {
    throw e;
  }
};
