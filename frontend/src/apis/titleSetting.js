import axios from 'axios';
import { titleSettings } from '../urls/index.ts';

// タイトルをセッティングした情報を取得するAPIコール関数
// postの第3引数にwithCredentials: trueを指定することで、
// API(Rails)と通信する際にデータにcookieを含めることができる
export const patchTitleSetting = async ({ id }, name) => {
  try {
    const response = await axios.patch(
      titleSettings(id),
      { select_title: name },
      { withCredentials: true }
    );
    axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
    return response.data;
  } catch(e) {
    throw e;
  }
};
