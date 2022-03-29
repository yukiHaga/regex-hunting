import axios from 'axios';
import { userSessionsExist } from '../urls/index';

// ログインするためのAPIコール関数
// postの第3引数にwithCredentials: trueを指定することで、
// API(Rails)と通信する際にデータにcookieを含めることができる
// promiseインスタンスは、3つの状態と値を持つ
// async functionは、return文の戻り値を持つpromiseインスタンスを返す
// Async Function内で例外が発生した場合、そのエラーを持つRejectedなPromiseを返す
// そのエラーはcatchで処理することができる。その為、Async functionに対して、catchをチェーンしている場合、
// Async function内にtry catchを書く必要はない
export const checkLoginStatus = async (): Promise<any> => {
  const response = await axios.get(
    userSessionsExist,
    { withCredentials: true }
  );
  axios.defaults.headers.common['X-CSRF-Token'] = response.headers['x-csrf-token'];
  return response.data;
};
