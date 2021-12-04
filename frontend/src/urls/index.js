const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1';

// ゲーム関係
export const gameManagementsStart = `${DEFAULT_API_LOCALHOST}/start`;
export const gameManagementsFinish = `${DEFAULT_API_LOCALHOST}/finish`;

// 会員登録
export const usersCreate = `${DEFAULT_API_LOCALHOST}/users`;

// ログイン関係
export const userSessionsCreate = `${DEFAULT_API_LOCALHOST}/login`;
export const userSessionsDestroy = `${DEFAULT_API_LOCALHOST}/logout`;

// ランキング
export const rankings = `${DEFAULT_API_LOCALHOST}/ranking`;

// ユーザー関係
export const myPages = (user_id) => 
  `${DEFAULT_API_LOCALHOST}/users/${user_id}/my-page`;
export const percents = (user_id) => 
  `${DEFAULT_API_LOCALHOST}/users/${user_id}/percent`;
export const accountSettings = (user_id) => 
  `${DEFAULT_API_LOCALHOST}/users/${user_id}/account-settings`;
export const titleSettings = (user_id) => 
  `${DEFAULT_API_LOCALHOST}/users/${user_id}/title-settings`;

// パスワードリセット関係
export const passwordResetsCreate = `${DEFAULT_API_LOCALHOST}/password_resets`;
export const passwordResetsEdit = (id) => 
  `${DEFAULT_API_LOCALHOST}/password_resets/${id}/edit`;
export const passwordResetsUpdate = (id) => 
  `${DEFAULT_API_LOCALHOST}/password_resets/${id}`;
