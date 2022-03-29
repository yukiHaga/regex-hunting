import axios from 'axios';
import { accountSettings } from '../urls/index';

// patchAccountSettingの型
type AccountArg = {
  user: {
    id: number,
    name: string,
    email: string,
    open_rank: boolean
  },
  image: {
    name?: string | null | undefined;
    data?: string | ArrayBuffer | null | undefined;
  }
};


// アカウントを更新した情報を取得するAPIコール関数
// postの第3引数にwithCredentials: trueを指定することで、
// API(Rails)と通信する際にデータにcookieを含めることができる
// promiseインスタンスは、3つの状態と値を持つ
// async functionは、return文の戻り値を持つpromiseインスタンスを返す
// Async Function内で例外が発生した場合、そのエラーを持つRejectedなPromiseを返す
// そのエラーはcatchで処理することができる。そのため、Async functionに対して、catchをチェーンしている場合、
// Async function内にtry catchを書く必要はない
export const patchAccountSetting = async ({
  user: {
    id,
    name,
    email,
    open_rank,
  },
  image
}: AccountArg): Promise<any> => {
  const response = await axios.patch(
    accountSettings(id),
    {
      user: {
        name: name,
        email: email,
        open_rank: open_rank,
      },
      image: image
    },
    { withCredentials: true }
  );
  axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
  return response.data;
};
