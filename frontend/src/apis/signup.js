import axios from 'axios';
import { usersCreate } from '../urls/index';

// ログインするためのAPIコール関数
export const postUser = async (params) => {
  try {
    const response = await axios.post(userCreate,
      {
        name: params.user.name
        email: params.user.email,
        password: params.user.password,
        password_confirmation: params.user.password_confirmation
      }
    );
    return response.data;
  } catch(e) {
    throw e;
  }
};
