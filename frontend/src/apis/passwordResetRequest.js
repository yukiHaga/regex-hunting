import axios from 'axios';
import { passwordResetsCreate } from '../urls/index';

// リセットフォームに入力されたメールアドレスをサーバーに送信する関数
// この関数が正常に終了後、別のベージに行って、
// 「メールアドレスが登録済みの場合、パスワード再設定用のメールが数分以内に送信されます。」
// というフラッシュメッセージが表示される。
export const postPasswordResetRequest = async ({ email }) => {
  try {
    const response = await axios.post(
      passwordResetsCreate
      { email: email },
      { withCredentials: true }
    );
    axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
    return response.data;
  } catch(e) {
    throw e;
  }
};
