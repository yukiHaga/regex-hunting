// スマホからコンテンツを利用した場合、トップページへ戻す関数
export const returnTop = (navigate) => {
  console.log("関数の中");
  console.log(navigate);
  return navigate('/', { state: { display: true, success: "PCからご利用ください。"}});
};
