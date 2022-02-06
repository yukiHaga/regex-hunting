import React, { memo } from 'react';
import styled from 'styled-components';

// MUI
import Avatar from '@mui/material/Avatar';

// NextButton
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// PrevButton
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

// クリアタイムを00:00:00のフォーマットで取得する関数
import { getClearTime } from '../../functions/getClearTime.js';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper 
import { DescriptionWrapper } from '../shared_style.js';

// デフォルトのアバター画像
import DefaultAvatarImage from '../../images/default_avatar.png';

import IconButton from '@mui/material/IconButton';

const TitleLineWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ChangeGraphBoxSentenceWrapper = styled(DescriptionWrapper)`
  font-weight: bold;
  font-size: 2.3em;
  text-align: center;
  padding-top: 1.1%;
`;

const RankingWrapper = styled.div`
 width: 80%;
 margin: 0 auto;
 margin-top: 2%;
`;

const CustomThead = styled.thead`
  box-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

const CustomTable = styled.table`
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  background-color: ${COLORS.WHITE};
  font-weight: normal;
  font-size: 1.1em;
  margin: 0 auto;
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
  width: 80%;
  border: 1px solid rgba(0,0,0,.2);
  margin-bottom: 2%;
`;

const RankingTd = styled.td`
  padding: 1.3% 0; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 5%;
  font-weight: bold;
`;

const TimeTd = styled.td`
  padding: 1.3% 0; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 10%;
  font-weight: bold;
`;

const HunterTd = styled.td`
  padding: 1.3% 0; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 65%;
  font-weight: bold;
`;

const RankingDataTd = styled.td`
  padding: 1.5% 0; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 10%;
  font-size: 1.5em;
`;

const TimeDataTd = styled.td`
  padding: 1.5% 0; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 30%;
  font-size: 1.4em;
`;

const HunterDataTd = styled.td`
  padding: 1.5% 0; 
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 40%;
`;

// ステータスのラッパー
const StatusWrapper = styled.div`
  display: flex
`;

const AvatarWrapper = styled.div`
  align-self: center;
`;

// ハンター項目内のテーブル
const HunterTableWrapper = styled.div`
  align-self: center;
  margin: 0 auto;
`;

const HunterTable = styled.table`
  width: 22vw;
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  font-weight: normal;
  font-size: 1.1em;
  margin: 0 auto;
  border: none;
`;

const HunterTableTd = styled.td`
  padding: 2% 4%; 
  border: none;
  text-align: right;
  border-bottom:solid 1px silver;
`;

const HunterTableNameTd = styled(HunterTableTd)`
  font-style: normal;
  font-weight: bold;
  font-size: 1.3em;
  text-align: left;
  color: ${COLORS.BLACK};
`;

const HunterTableRankMetaTd = styled(HunterTableTd)`
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
  font-weight: bold;
  width: 35%;
`;

const HunterTableTitleMetaTd = styled.td`
  padding: 2% 4%; 
  border: none;
  text-align: left;
  font-weight: bold;
`;

const HunterTableTitleDataTd = styled.td`
  padding: 2% 4%; 
  border: none;
  text-align: right;
`;

const NotDescriptionWrapper = styled(DescriptionWrapper)`
`;

const NotRankingWrapper = styled(RankingWrapper)`
 width: 100%;
 height: 59.1vh;
 text-align: center;
`;

export const RankingBox = memo(({
  current_top_ten_array,
  difficulty_title,
  setRankingState
}) => {

  // 初級のデータを表示する関数
  const handleElementary = () => {
    setRankingState((prev) => ({
      ...prev,
      current_top_ten_array: prev.top_ten_elementary,
      difficulty_title: "初級編"
    }));
  };

  // 中級のデータを表示する関数
  const handleIntermediate = () => {
    setRankingState((prev) => ({
      ...prev,
      current_top_ten_array: prev.top_ten_intermediate,
      difficulty_title: "中級編"
    }));
  };

  // 上級のデータを表示する関数
  const handleAdvanced = () => {
    setRankingState((prev) => ({
      ...prev,
      current_top_ten_array: prev.top_ten_advanced,
      difficulty_title: "上級編"
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
      <TitleLineWrapper>
        <IconButton
          sx={{
            fontSize: '4.0em'
          }}
        >
          <ArrowLeftIcon
            fontSize='inherit' 
            sx={{ color: `${COLORS.BLACK}` }}
            onClick={() => handleLeftArrow(difficulty_title)}
          />
        </IconButton>
        <ChangeGraphBoxSentenceWrapper>
          {difficulty_title}
        </ChangeGraphBoxSentenceWrapper>
        <IconButton
          sx={{
            fontSize: '4.0em'
          }}
        >
          <ArrowRightIcon
            fontSize='inherit' 
            sx={{ color: `${COLORS.BLACK}` }}
            onClick={() => handleRightArrow(difficulty_title)}
          />
        </IconButton>
      </TitleLineWrapper>
      {
        current_top_ten_array.length ?
          <RankingWrapper>
            <CustomTable>
              <CustomThead>
                <tr>
                  <RankingTd>順位</RankingTd>
                  <TimeTd>クリアタイム</TimeTd>
                  <HunterTd>ハンター</HunterTd>
                </tr>
              </CustomThead>
              <tbody>
                {
                  current_top_ten_array.map(({
                    game_management: { 
                      result_time 
                    }, 
                    user: {
                      name,
                      rank,
                      active_title,
                      image
                    }
                  }, index) => (
                    <tr>
                      <RankingDataTd>{index + 1}</RankingDataTd>
                      <TimeDataTd>
                        {
                          getClearTime(0, result_time).slice(3)
                        }
                      </TimeDataTd>
                      <HunterDataTd>
                        <StatusWrapper>
                          <AvatarWrapper>
                            <Avatar
                              alt="Hunter"
                              src={image || DefaultAvatarImage}
                              sx={{ width: 110, height: 110 }}
                            />
                          </AvatarWrapper>
                          <HunterTableWrapper>
                            <HunterTable>
                              <tbody>
                                <tr>
                                  <HunterTableNameTd colSpan={2}>
                                    {name}
                                  </HunterTableNameTd>
                                </tr>
                                <tr>
                                  <HunterTableRankMetaTd>
                                    ランク
                                  </HunterTableRankMetaTd>
                                  <HunterTableTd>
                                    {rank}
                                  </HunterTableTd>
                                </tr>
                                <tr>
                                  <HunterTableTitleMetaTd>
                                    称号
                                  </HunterTableTitleMetaTd>
                                  <HunterTableTitleDataTd>
                                    {active_title}
                                  </HunterTableTitleDataTd>
                                </tr>
                              </tbody>
                            </HunterTable>
                          </HunterTableWrapper>
                        </StatusWrapper>
                      </HunterDataTd>
                    </tr>
                  ))
                }
              </tbody>
            </CustomTable>
          </RankingWrapper>
        :
          <NotRankingWrapper>
            <NotDescriptionWrapper>
              ランキングが存在しません
            </NotDescriptionWrapper>
          </NotRankingWrapper>
      }
    </>
  );
});
