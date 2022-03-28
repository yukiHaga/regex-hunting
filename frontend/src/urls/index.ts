const DEFAULT_API_URL = `${process.env.REACT_APP_SERVER_URL}/api/v1`;
const GITHUB_APP_ID = '420fbaef8a45fb65c5a9';
const GITHUB_REDIRECT_URL = 'https://www.regex-hunting.com/callback/github/';
const GOOGLE_APP_ID = '63383229438-hjv5021k3b43jjkf182772mg9mh6uvp9.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URL = 'https://www.regex-hunting.com/callback/google/';
const GOOGLE_SCOPE = 'email profile';

// ゲーム関係
export const gameManagementsStart = `${DEFAULT_API_URL}/start`;
export const gameManagementsFinish = `${DEFAULT_API_URL}/finish`;

// 会員登録
export const usersCreate = `${DEFAULT_API_URL}/users`;

// ログイン関係
export const userSessionsCreate = `${DEFAULT_API_URL}/login`;
export const userSessionsDestroy = `${DEFAULT_API_URL}/logout`;
export const userSessionsExist = `${DEFAULT_API_URL}/current_user_logged_in`;

// OAuth
// Github
export const gitHubOAuth = `https://github.com/login/oauth/authorize?client_id=${GITHUB_APP_ID}&redirect_url=${GITHUB_REDIRECT_URL}&scope=user:email&state=xyz`;
export const defaultOAuthPost = `${DEFAULT_API_URL}/oauth/callback`;

// Google
export const googleOAuth = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${GOOGLE_APP_ID}&redirect_uri=${GOOGLE_REDIRECT_URL}&scope=${GOOGLE_SCOPE}&state=xyz&access_type=offline&approval_prompt=force`;

// ランキング
export const rankings = `${DEFAULT_API_URL}/ranking`;

// 動的にURLを生成する関数の型
type DynamicURL = (userIdOrId: number | string) => string;

// ユーザー関係
export const myPages: DynamicURL = (userId) =>
  `${DEFAULT_API_URL}/users/${userId}/my-page`;
export const accountSettings: DynamicURL = (userId) =>
  `${DEFAULT_API_URL}/users/${userId}/account-settings`;
export const titleSettings: DynamicURL = (userId) =>
  `${DEFAULT_API_URL}/users/${userId}/title-settings`;

// パスワードリセット関係
export const passwordResetsCreate = `${DEFAULT_API_URL}/password_resets`;
export const passwordResetsUpdate: DynamicURL = (id) =>
  `${DEFAULT_API_URL}/password_resets/${id}`;
