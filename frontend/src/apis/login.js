import axios from 'axios';
import { userSessionsCreate, userSessionsDestroy } from '../urls/index';

// ログインするためのAPIコール関数
export const postUserSession = async ({user: {email, password}}) => {
  try {
    const response = await axios.post(userSessionsCreate,
      {
        email: email,
        password: password
      }
    );
    return response.data;
  } catch(e) {
    console.log(e.response);
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
