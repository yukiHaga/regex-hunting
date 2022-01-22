import axios from 'axios';
import { accountSettings } from '../urls/index';

// アカウントを更新した情報を取得するAPIコール関数
// postの第3引数にwithCredentials: trueを指定することで、
// API(Rails)と通信する際にデータにcookieを含めることができる
export const patchAccountSetting = async ({ 
  id, 
  name, 
  email, 
  open_rank 
}) => {
  try {
    const response = await axios.patch(
      accountSettings(id),
      {
        user: {
          name: name,
          email: email,
          open_rank: open_rank
        }
      },
      { withCredentials: true }
    );
    axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
    return response.data;
  } catch(e) {
    throw e;
  }
};
