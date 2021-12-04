import axios from 'axios';
import { userSessionsCreate, userSessionsDestroy } from '../urls/index';

// ログインするためのAPIコール関数
export const postUserSession = async (params) => {
  try {
    const response = await axios.post(userSessionsCreate,
      {
        email: params.user.email,
        password: params.user.password
      }
    );
    return response.data;
  } catch(e) {
    throw e;
  }
};

// ログアウトするためのAPIコール関数
export const deleteUserSession = async (params) => {
  try {
    const response = await axios.delete(userSessionsDestroy);
    return response.data;
  } catch(e) {
    throw e;
  }
};
