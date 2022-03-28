import React, { memo } from 'react';
import styled from 'styled-components';

import { GameStartButton } from '../Buttons/GameStartButton';

// Colors
import { COLORS } from '../../style_constants';

// Responsive
import { WIDTH } from '../../style_constants';

// setMobileStateの型
import { SetMobileState } from '../../types/containers/landingPages';

const GameContentWrapper = styled.div`
  padding-top: 2%;
`;

const GameContentTitleWrapper = styled.div`
  height: 9%;
  width: 90%;
  font-style: normal;
  font-weight: 500;
  font-size: 1.5em;
  color: ${COLORS.BLACK};
  text-align: center;
  background-color: ${COLORS.SUB};
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 1.1em;
    width: 90%;
    margin: 0 auto;
    padding-top: 2%;
    padding-bottom: 7%
  }
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    width: 70%;
    margin: 0 auto;
    font-size: 1.2em;
  }
  margin: 0 auto;
`;

const GameContentDescriptionWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  border-radius: 3px;
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
  background-color: ${COLORS.WHITE};
  @media (max-width: ${WIDTH.MOBILE}) {
    width: 90%;
    margin: 0 auto;
  }
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    width: 70%;
    margin: 0 auto;
  }
`;

// ブロック要素じゃないので、もしかしたら直列に並ばないかも
// 使用するときに、propsのsrc属性を渡す。
const GameContentImageWrapper = styled.img`
  box-sizing: border-box;
  border: 2px solid ${COLORS.BLACK};
  max-width: 100%;
  border-radius: 3px 3px 0px 0px;
`;

const GameContentMainWrapper = styled.div`
  margin: 0 auto;
  test-align: center;
  width: 100%;
  padding-top: 4%;
  padding-bottom: 6%;
  background-color: ${COLORS.WHITE};
  @media (max-width: ${WIDTH.MOBILE}) {
    width: 90%;
  }
  border-radius: 3px;
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    width: 90%;
  }
`;

// ここのwidthはpx指定しないとレイアウトが崩れる
const GameContentSentenceWrapper = styled.div`
  width: 290px;
  display: inline-block;
  text-align: left;
  font-style: normal;
  font-weight: 500;
  font-size: 1.0em;
  color: ${COLORS.BLACK};
  @media (max-width: ${WIDTH.MOBILE}) {
    font-size: 0.9em;
  }
  @media (max-width: ${WIDTH.DEV_TOOL}) {
    font-size: 0.8em;
    width: 220px;
  }
`;

const GameContentStartWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 6%;
`;

type GameContentArg = {
  difficulty: 'elementary' | 'intermediate' | 'advanced';
  image: string;
  setMobileState?: SetMobileState;
};

// LPページの場合、onClickLinkはモーダル管理のstateを更新する関数
// ログインしている場合、onClickLinkは何もない。
export const GameContent = memo(({
  difficulty,
  image,
  setMobileState
}: GameContentArg): JSX.Element => {

  const difficultySentence = (difficulty: GameContentArg['difficulty']): string => {
    let sentence;
    switch (difficulty){
      case 'elementary':
        sentence = '文字クラスをマスターして、スクータムの群れを倒そう！';
        break;
      case 'intermediate':
        sentence = '最大量指定子, キャプチャグループをマスターして、カスアリウスを倒そう！';
        break;
      case 'advanced':
        sentence = '選択, 先読み, アンカーをマスターして、オルファ・ラパクスを倒そう！';
        break;
      default:
        sentence = 'エラーが発生しています。';
        break;
    };
    return sentence;
  };

  const difficultyTitle = (difficulty: GameContentArg['difficulty']): string => {
    const difficulty_array = {
      elementary: "初級編",
      intermediate: "中級編",
      advanced: "上級編"
    };
    return difficulty_array[difficulty];
  };

  return (
    <>
      <GameContentWrapper>
        <GameContentTitleWrapper>
          {difficultyTitle(difficulty)}
        </GameContentTitleWrapper>
        <GameContentDescriptionWrapper>
          <GameContentImageWrapper width="357" height="186" src={image}/>
          <GameContentMainWrapper>
            <GameContentSentenceWrapper>
              {(difficultySentence(difficulty))}
            </GameContentSentenceWrapper>
            <GameContentStartWrapper>
              <GameStartButton
                difficulty={difficulty}
                setMobileState={setMobileState}
              />
            </GameContentStartWrapper>
          </GameContentMainWrapper>
        </GameContentDescriptionWrapper>
      </GameContentWrapper>
    </>
  );
});
