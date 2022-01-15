// 今月のゲームクリア日にだけ、propsのcountを追加する関数
// ヒートマップで使う
export const addCountToMonthArray = (
  game_frequencies_per_day,
  month_obj
) => {
  const month_obj_array = Object.entries(month_obj).map(([date, count]) => { 
    return {
      date: date, 
      count: game_frequencies_per_day[date] ? 
        game_frequencies_per_day[date] : count
    };  
  });
  return month_obj_array;
};
