import React, { memo, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';

// DescriptionWrapper
import { DescriptionWrapper } from '../../components/shared_style.js';

// Colors
import { COLORS } from '../../style_constants.js';

// NextButton
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// PrevButton
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

// クリアタイムを取得する関数
// マイページで使う場合、第1引数は0を指定する
import { getClearTime } from '../../functions/getClearTime.js';

// 今月の最大の正答率を計算する関数
import { getMostCorrectPercent } from '../../functions/getMostCorrectPercent.js';

// 今月の平均正答率を計算する関数
import { getAverageCorrectPercent } from '../../functions/getAverageCorrectPercent.js';
const InnerChangeGraphBoxWrapper = styled.div`
  width: 300px;
  margin: 0 auto;
`;

const ChangeGraphBoxSentenceWrapper = styled(DescriptionWrapper)`
  font-weight: bold;
  font-size: 24px;
  line-height: 40px;
  text-align: center;
`;

const TableWrapper = styled.div`
  align-self: center;
  margin-top: 20px;
`;

const CustomTable = styled.table`
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  font-family: YuGothic;
  font-weight: normal;
  font-size: 18px;
  margin: 0 auto;
  border: none;
`;

const CustomTd = styled.td`
  padding: 10px 40px; 
  border: none;
  text-align: right;
  border-bottom:solid 1px silver;
`;

const ItemTd = styled(CustomTd)`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 30px;
  padding-left: 40px;
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
  font-weight: bold;
`;

const TitleLineWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ButtonWrapper = styled.div`
  font-size: 40px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  :focus {
    outline: 0;
  }
`;

// 一回もゲームクリアをしていない場合、
// fastest_timeは0でサーバー側から送られる
export const ChangeGraphBox = memo(({
  ele_fastest_time,
  int_fastest_time,
  adv_fastest_time,
  elementary_correct_percents,
  intermediate_correct_percents,
  advanced_correct_percents,
  setMyPageState
}) => {

  // 今月の初級編の最速クリアタイムを出力する処理
  // ele_fastest_timeが0の場合、
  // format_ele_fastest_timeは00:00になる
  // その場合は、なしをjsxで返す
  const format_ele_fastest_time = useMemo(() => getClearTime(
    0, 
    ele_fastest_time
  ).slice(3), [
    ele_fastest_time
  ]);

  // 今月の初級編の最大正答率を出力する処理
  // 最大正答率は1ヶ月間の最大正答率である
  // elementary_correct_percentsが空の配列の場合、
  // 0を返すように設定した
  const most_ele_correct_percent = useMemo(() => getMostCorrectPercent(
    elementary_correct_percents
  ) ,[
    elementary_correct_percents
  ]);

  // 今月の初級編の平均正答率を導出する処理
  // elementary_correct_percentsが空の配列の場合、
  // 0を返すように設定した
  const average_ele_correct_percent = useMemo(() => getAverageCorrectPercent(
    elementary_correct_percents
  ) ,[
    elementary_correct_percents
  ]);
  
  // 今月の上級編の最速クリアタイムを出力する処理 
  const format_adv_fastest_time = useMemo(() => getClearTime(
    0, 
    adv_fastest_time
  ).slice(3), [
    adv_fastest_time
  ]);

  // 今月の上級編の最大正答率を出力する処理
  const most_adv_correct_percent = useMemo(() => getMostCorrectPercent(
    advanced_correct_percents
  ) ,[
    advanced_correct_percents
  ]);

  // 今月の上級編の平均正答率を導出する処理
  const average_adv_correct_percent = useMemo(() => getAverageCorrectPercent(
    advanced_correct_percents
  ) ,[
    advanced_correct_percents
  ]);

  // 今月の中級編の最速クリアタイムを出力する処理 
  const format_int_fastest_time = useMemo(() => getClearTime(
    0, 
    adv_fastest_time
  ).slice(3), [
    adv_fastest_time
  ]);

  // 今月の中級編の最大正答率を出力する処理
  const most_int_correct_percent = useMemo(() => getMostCorrectPercent(
    intermediate_correct_percents
  ) ,[
    intermediate_correct_percents
  ]);

  // 今月の中級編の平均正答率を導出する処理
  const average_int_correct_percent = useMemo(() => getAverageCorrectPercent(
    intermediate_correct_percents
  ) ,[
    intermediate_correct_percents
  ]);

  // 最初はinitialStateに初級編の値を入れておく
  const initialState = {
    difficulty_title: "",
    format_fastest_time: "",
    most_correct_percent: 0,
    average_correct_percent: 0, 
    next_difficulty_title: "",
    prev_difficulty_title: "",
  };

  const [statusState, setStatusState] = useState(initialState);

  // 初回マウント時に実行されるuseEffect
  // 初級編の値が入る
  // format_ele_fastest_time, most_ele_correct_percent, 
  // average_ele_correct_percentが変化した時も実行される
  useEffect(() => {
    setStatusState((prev) => ({
      ...prev,
      difficulty_title: "初級編",
      format_fastest_time: format_ele_fastest_time,
      most_correct_percent: most_ele_correct_percent,
      average_correct_percent: average_ele_correct_percent,
    }));
  },[
    format_ele_fastest_time,
    most_ele_correct_percent,
    average_ele_correct_percent
  ]);

  // 初級のデータを表示する関数
  const handleElementary = () => {
    setMyPageState((prev) => ({
      ...prev,
      real_graph_data: prev.elementary_graph_data, 
      difficulty_title: "初級編"
    }));
    setStatusState((prev) => ({
      ...prev,
      difficulty_title: "初級編",
      format_fastest_time: format_ele_fastest_time,
      most_correct_percent: most_ele_correct_percent,
      average_correct_percent: average_ele_correct_percent,
    }));
  };

  // 中級のデータを表示する関数
  const handleIntermediate = () => {
    setMyPageState((prev) => ({
      ...prev,
      real_graph_data: prev.intermediate_graph_data, 
      difficulty_title: "中級編"
    }));
    setStatusState((prev) => ({
      ...prev,
      difficulty_title: "中級編",
      format_fastest_time: format_int_fastest_time,
      most_correct_percent: most_int_correct_percent,
      average_correct_percent: average_int_correct_percent,
    }));
  };

  // 上級のデータを表示する関数
  const handleAdvanced = () => {
    setMyPageState((prev) => ({
      ...prev,
      real_graph_data: prev.advanced_graph_data, 
      difficulty_title: "上級編"
    }));
    setStatusState((prev) => ({
      ...prev,
      difficulty_title: "上級編",
      format_fastest_time: format_adv_fastest_time,
      most_correct_percent: most_adv_correct_percent,
      average_correct_percent: average_adv_correct_percent,
    }));
  };

  // 左矢印のリンクを制御する関数
  // difficulty_titleは初め初級が入る
  // そのため、defaultは上級の関数が実行される
  const handleLeftArrow = (difficulty_title) => {
    switch (difficulty_title){
      case '中級編':
        handleElementary();
        break;
      case '上級編':
        handleIntermediate(); 
        break;
      default:
        handleAdvanced();
    }
  };

  // 右矢印のリンクを制御する関数
  // difficulty_titleは初め初級が入る
  // そのため、defaultは中級の関数が実行される
  const handleRightArrow = (difficulty_title) => {
    switch (difficulty_title){
      case '中級編':
        handleAdvanced();
        break;
      case '上級編':
        handleElementary();
        break;
      default:
        handleIntermediate(); 
    }
  };

  return (
    <>
      <InnerChangeGraphBoxWrapper>
        <TitleLineWrapper>
          <ButtonWrapper 
            onClick={() => handleLeftArrow(statusState.difficulty_title)}
          >
            <ArrowLeftIcon
              fontSize='inherit' 
              sx={{ color: `${COLORS.BLACK}` }}
            />
          </ButtonWrapper>
          <ChangeGraphBoxSentenceWrapper>
            {statusState.difficulty_title}
          </ChangeGraphBoxSentenceWrapper>
          <ButtonWrapper
            onClick={() => handleRightArrow(statusState.difficulty_title)}
          >
            <ArrowRightIcon
              fontSize='inherit' 
              sx={{ color: `${COLORS.BLACK}` }}
            />
          </ButtonWrapper>
        </TitleLineWrapper>
        <TableWrapper>
          <CustomTable>
            <tr>
              <ItemTd>平均正答率</ItemTd>
              <CustomTd>{`${statusState.average_correct_percent}%`}</CustomTd>
            </tr>
            <tr>
              <ItemTd>最大正答率</ItemTd>
              <CustomTd>
                {`${statusState.most_correct_percent}%`}
              </CustomTd>
            </tr>
            <tr>
              <ItemTd>最速タイム</ItemTd>
              <CustomTd>
                {
                  statusState.format_fastest_time !== "00:00" ? 
                    statusState.format_fastest_time
                  :
                    "なし"
                }
              </CustomTd>
            </tr>
          </CustomTable>
        </TableWrapper>
      </InnerChangeGraphBoxWrapper>
    </>
  );
});
