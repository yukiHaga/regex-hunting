// useState.userが存在するかを判定する関数
export const hasUser = (user) => {
  return Boolean(Object.keys(user).length);
};
