const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1'

// ゲーム関係
export const gameManagementsStart = `${DEFAULT_API_LOCALHOST}/start`
export const gameManagementsStart = `${DEFAULT_API_LOCALHOST}/finish`

// 会員登録
export const users = `${DEFAULT_API_LOCALHOST}/users`

// ログイン関係
export const userSessionsCreate = `${DEFAULT_API_LOCALHOST}/login`
export const userSessionsCreate = `${DEFAULT_API_LOCALHOST}/logout`

// ランキング
export const rankings = `${DEFAULT_API_LOCALHOST}/ranking`

// ユーザー関係
export const myPages = (user_id) => 
  `${DEFAULT_API_LOCALHOST}/users/${user_Id}/my-page`
export const percents = (user_id) => 
  `${DEFAULT_API_LOCALHOST}/users/${user_Id}/percent`
export const accountSettings = (user_id) => 
  `${DEFAULT_API_LOCALHOST}/users/${user_Id}/account-settings`
export const titleSettings = (user_id) => 
  `${DEFAULT_API_LOCALHOST}/users/${user_Id}/title-settings`

// パスワードリセット関係
export const passwordResetsCreate = `${DEFAULT_API_LOCALHOST}/password_resets`
export const passwordResetsEdit = (id) => 
  `${DEFAULT_API_LOCALHOST}/password_resets/${id}/edit`
export const passwordResetsUpdate = (id) => 
  `${DEFAULT_API_LOCALHOST}/password_resets/${id}`
