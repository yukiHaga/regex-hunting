import React, { Fragment, memo } from 'react';
import styled from 'styled-components';

// MUI
import Avatar from '@mui/material/Avatar';

// NextButton
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// PrevButton
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

// クリアタイムを00:00:00のフォーマットで取得する関数
import { getClearTime } from '../../functions/getClearTime.ts';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper
import { DescriptionWrapper } from '../shared_style.js';

// デフォルトのアバター画像
import DefaultAvatarImage from '../../images/default_avatar.png';

// ツールチップ
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

// Responsive
import { WIDTH } from '../../style_constants.js';

// スライドアニメーション関係の関数
import { slideFunction } from '../../functions/slideFunction.ts';

const TitleLineWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ChangeGraphBoxSentenceWrapper = styled(DescriptionWrapper)`
  font-weight: bold;
  font-size: 2.3em;
  text-align: center;
  padding-top: 1.1%;
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 2.0em;
    padding-top: 4.5%;
  }
`;

const RankingWrapper = styled.div`
 width: 80%;
 margin: 0 auto;
 margin-top: 2%;
 @media (max-width: ${WIDTH.MOBILE}) {
   width: 100%;
 }
`;

const CustomThead = styled.thead`
  box-shadow: 0 1px 2px rgba(0,0,0,0.3);
  background-color: ${COLORS.MAIN};
`;

const CustomTable = styled.table`
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  background-color: ${COLORS.WHITE};
  font-weight: normal;
  font-size: 1.1em;
  margin: 0 auto;
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
  width: 75%;
  border: 1px solid rgba(0,0,0,.2);
  margin-bottom: 2%;
  @media (max-width: ${WIDTH.MOBILE}) {
    width: 90%;
  }
`;

const RankingTd = styled.td`
  padding: 1.3% 0;
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 5%;
  color: ${COLORS.WHITE};
  @media (max-width: ${WIDTH.MOBILE}) {
    width: 20%;
    font-size: 0.9em;
  }
`;

const TimeTd = styled.td`
  padding: 1.3% 0;
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 10%;
  color: ${COLORS.WHITE};
  @media (max-width: ${WIDTH.MOBILE}) {
    width: 40%;
    font-size: 0.9em;
  }
`;

const HunterTd = styled.td`
  padding: 1.3% 0;
  border: none;
  text-align: center;
  border-bottom:solid 1px silver;
  width: 65%;
  color: ${COLORS.WHITE};
  @media (max-width: ${WIDTH.MOBILE}) {
    width: 40%;
    font-size: 0.9em;
  }
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
  display: flex;
  @media (max-width: ${WIDTH.MOBILE}) {
    display: block;
    padding-top: 8%;
    padding-bottom: 8%;
  }
`;

const AvatarWrapper = styled.div`
  align-self: center;
  @media (max-width: ${WIDTH.MOBILE}) {
    padding-bottom: 2%;
    display: flex;
    justify-content: center;
  }
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
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 0.9em;
    text-align: center;
    padding-top: 3%;
  }
`;

const HunterTableRankMetaTd = styled(HunterTableTd)`
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
  font-weight: bold;
  width: 35%;
  @media (max-width: ${WIDTH.MOBILE}) {
    display: none;
  }
`;

const HunterTableRankDataTd = styled(HunterTableTd)`
  @media (max-width: ${WIDTH.MOBILE}) {
    display: none;
  }
`;

const HunterTableTitleMetaTd = styled.td`
  padding: 2% 4%;
  border: none;
  text-align: left;
  font-weight: bold;
  @media (max-width: ${WIDTH.MOBILE}) {
    display: none;
  }
`;

const HunterTableTitleDataTd = styled.td`
  padding: 2% 4%;
  border: none;
  text-align: right;
  @media (max-width: ${WIDTH.MOBILE}) {
    display: none;
  }
`;

const NotDescriptionWrapper = styled(DescriptionWrapper)`
`;

const NotRankingWrapper = styled(RankingWrapper)`
  width: 100%;
  height: 59.1vh;
  text-align: center;
  @media (max-width: ${WIDTH.MOBILE}) {
    height: 66vh;
  }
`;

// animationプロパティは1つしか存在できない
// 2個存在する場合、2個目で1個目が上書きされる
const SlideContentWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  transform: translateX(0);
  animation: ${({
    slideIn,
    slideOut,
    direction
  }) => slideFunction(slideIn, slideOut, direction)} 0.7s ease forwards;
`;

export const RankingBox = memo(({
  currentTopTenArray,
  difficultyTitle,
  rankingState,
  setRankingState
}) => {

  // 初級のデータを表示する関数
  const handleElementary = (
    direction
  ) => {
    setRankingState((prev) => ({
      ...prev,
      slideIn: false,
      slideOut: true,
      direction: direction,
    }));
    setTimeout(() => {
      setRankingState((prev) => ({
        ...prev,
        currentTopTenArray: prev.topTenElementary,
        difficultyTitle: "初級編",
        prevDifficultyTitle: "上級編",
        nextDifficultyTitle: "中級編",
        slideIn: true,
        slideOut: false,
        direction: direction,
      }));
    }, 350);
  };

  // 中級のデータを表示する関数
  const handleIntermediate = (
    direction
  ) => {
    setRankingState((prev) => ({
      ...prev,
      slideIn: false,
      slideOut: true,
      direction: direction,
    }));
    setTimeout(() => {
      setRankingState((prev) => ({
        ...prev,
        currentTopTenArray: prev.topTenIntermediate,
        difficultyTitle: "中級編",
        prevDifficultyTitle: "初級編",
        nextDifficultyTitle: "上級編",
        slideIn: true,
        slideOut: false,
        direction: direction,
      }));
    }, 350);
  };

  // 上級のデータを表示する関数
  const handleAdvanced = (
    direction
  ) => {
    setRankingState((prev) => ({
      ...prev,
      slideIn: false,
      slideOut: true,
      direction: direction,
    }));
    setTimeout(() => {
      setRankingState((prev) => ({
        ...prev,
        currentTopTenArray: prev.topTenAdvanced,
        difficultyTitle: "上級編",
        prevDifficultyTitle: "中級編",
        nextDifficultyTitle: "初級編",
        slideIn: true,
        slideOut: false,
        direction: direction,
      }));
    }, 350);
  };

  // 左矢印のリンクを制御する関数
  // difficultyTitleは初め初級が入る
  // そのため、defaultは上級の関数が実行される
  const handleLeftArrow = (difficultyTitle) => {
    switch (difficultyTitle){
      case '初級編':
        handleAdvanced('right');
        break;
      case '中級編':
        handleElementary('right');
        break;
      case '上級編':
        handleIntermediate('right');
        break;
      default:
        handleAdvanced('right');
    }
  };

  // 右矢印のリンクを制御する関数
  // difficultyTitleは初め初級が入る
  // そのため、defaultは中級の関数が実行される
  const handleRightArrow = (difficultyTitle) => {
    switch (difficultyTitle){
      case '初級編':
        handleIntermediate('left');
        break;
      case '中級編':
        handleAdvanced('left');
        break;
      case '上級編':
        handleElementary('left');
        break;
      default:
        handleIntermediate('left');
    }
  };

  return (
    <>
      <TitleLineWrapper>
        <Tooltip
          title={rankingState.prevDifficultyTitle}
          placement="top"
        >
          <IconButton
            sx={{
              fontSize: '4.0em'
            }}
          >
            <ArrowLeftIcon
              fontSize='inherit'
              sx={{ color: `${COLORS.BLACK}` }}
              onClick={() => handleLeftArrow(difficultyTitle)}
            />
          </IconButton>
        </Tooltip>
        <ChangeGraphBoxSentenceWrapper>
          {difficultyTitle}
        </ChangeGraphBoxSentenceWrapper>
        <Tooltip
          title={rankingState.nextDifficultyTitle}
          placement="top"
        >
          <IconButton
            sx={{
              fontSize: '4.0em'
            }}
          >
            <ArrowRightIcon
              fontSize='inherit'
              sx={{ color: `${COLORS.BLACK}` }}
              onClick={() => handleRightArrow(difficultyTitle)}
            />
          </IconButton>
        </Tooltip>
      </TitleLineWrapper>
      {
        currentTopTenArray.length ?
          <SlideContentWrapper
            slideIn={rankingState.slideIn}
            slideOut={rankingState.slideOut}
            direction={rankingState.direction}
          >
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
                    currentTopTenArray.map(({
                      min_result_time,
                      user: {
                        name,
                        rank,
                        active_title,
                        image
                      }
                    }, index) => (
                      <Fragment key={index}>
                        <tr>
                          <RankingDataTd>{index + 1}</RankingDataTd>
                          <TimeDataTd>
                            {
                              getClearTime(0, min_result_time)
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
                                      <HunterTableRankDataTd>
                                        {rank}
                                      </HunterTableRankDataTd>
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
                      </Fragment>
                    ))
                  }
                </tbody>
              </CustomTable>
            </RankingWrapper>
          </SlideContentWrapper>
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
