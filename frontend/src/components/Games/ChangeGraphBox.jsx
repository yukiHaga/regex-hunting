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

export const ChangeGraphBox = ({
  game_frequencies_per_day
}) => {

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
              <ItemTd>最速タイム</ItemTd>
              <CustomTd>01:00</CustomTd>
            </tr>
            <tr>
              <ItemTd>最大正答率</ItemTd>
              <CustomTd>100%</CustomTd>
            </tr>
            <tr>
              <ItemTd>学習時間</ItemTd>
              <CustomTd>1800分</CustomTd>
            </tr>
          </CustomTable>
        </TableWrapper>
      </InnerChangeGraphBoxWrapper>
    </>
  );
};
