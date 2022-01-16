import React, { useMemo } from 'react';
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
export const ChangeGraphBox = ({
  game_frequencies_per_day,
  ele_fastest_time,
  int_fastest_time,
  adv_fastest_time,
  elementary_correct_percents,
  intermediate_correct_percents,
  advanced_correct_percents
}) => {

  // ele_fastest_timeが0の場合、
  // format_ele_fastest_timeは00:00になる
  // その場合は、なしをjsxで返す
  const format_ele_fastest_time = useMemo(() => getClearTime(
    0, 
    ele_fastest_time
  ).slice(3), [
    ele_fastest_time
  ]);

  // 最大正答率は1ヶ月間の最大正答率である
  // elementary_correct_percentsが空の配列の場合、
  // 0を返すように設定した
  const most_ele_correct_percent = useMemo(() => getMostCorrectPercent(
    elementary_correct_percents
  ) ,[
    elementary_correct_percents
  ]);
  
  return (
    <>
      <InnerChangeGraphBoxWrapper>
        <TitleLineWrapper>
          <ButtonWrapper>
            <ArrowLeftIcon
              fontSize='inherit' 
              sx={{ color: `${COLORS.BLACK}` }}
            />
          </ButtonWrapper>
          <ChangeGraphBoxSentenceWrapper>
            初級編
          </ChangeGraphBoxSentenceWrapper>
          <ButtonWrapper>
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
              <CustomTd>80%</CustomTd>
            </tr>
            <tr>
              <ItemTd>最大正答率</ItemTd>
              <CustomTd>
                {`${most_ele_correct_percent}%`}
              </CustomTd>
            </tr>
            <tr>
              <ItemTd>最速タイム</ItemTd>
              <CustomTd>
                {
                  format_ele_fastest_time !== "00:00" ? 
                    format_ele_fastest_time
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
};
