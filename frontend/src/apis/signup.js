import axios from 'axios';
import { usersCreate } from '../urls/index';

// ログインするためのAPIコール関数
export const postUser = async ({user: {
  name,
  email,
  password,
  password_confirmation
}}) => {
  try {
    const response = await axios.post(usersCreate,
      {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      },
      { withCredentials: true }
    );
    axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
    return response.data;
  } catch(e) {
    throw e;
  }
};
