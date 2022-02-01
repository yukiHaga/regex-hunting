import React, { memo } from 'react';
import styled from 'styled-components';

import { GameStartButton } from '../Buttons/GameStartButton.jsx';

// Colors
import { COLORS } from '../../style_constants.js';

// Responsive
import { WIDTH } from '../../style_constants.js';

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
    padding-bottom: 2%
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
`;

const GameContentStartWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 6%;
`;

// LPページの場合、onClickLinkはモーダル管理のstateを更新する関数
// ログインしている場合、onClickLinkは何もない。
export const GameContent = memo(({difficulty, image}) => {

  const difficultySentence = (difficulty) => {
    let sentence;
    switch (difficulty){
      case 'elementary':
        sentence = '基礎的なメタ文字をマスターして、スクータムの群れを倒そう！';
        break;
      case 'intermediate':
        sentence = '文字列を表す正規表現をマスターして、カスアリウスの群れを倒そう！';
        break;
      case 'advanced':
        sentence = 'パスワードの正規表現をマスターして、オルファ・ラパクスを倒そう！';
        break;
      default:
        sentence = 'エラーが発生しています。';
        break;
    };
    return sentence;
  };

  const difficultyTitle = (difficulty) => {
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
          <GameContentImageWrapper src={image} />
          <GameContentMainWrapper>
            <GameContentSentenceWrapper>
              {(difficultySentence(difficulty))}
            </GameContentSentenceWrapper>
            <GameContentStartWrapper>
              <GameStartButton difficulty={difficulty}/>
            </GameContentStartWrapper>
          </GameContentMainWrapper>
        </GameContentDescriptionWrapper>
      </GameContentWrapper>
    </>
  );
});
