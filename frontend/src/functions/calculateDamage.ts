type CalculateDamage = (attack: number, defence: number) => number;

// ダメージを計算する関数関数
// CodeBlock.jsx, TimeGage.jsxでcalculateDamageを使用する
export const calculateDamage: CalculateDamage = (attack, defence) => {
  const damage = attack - defence;
  return damage;
};