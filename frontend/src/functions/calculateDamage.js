// ダメージを計算する関数関数
// CodeBlock.jsx, TimeGage.jsxでcalculateDamageを使う
export const calculateDamage = (attack, defence) => {
  const damage = attack - defence;
  return damage;
};
