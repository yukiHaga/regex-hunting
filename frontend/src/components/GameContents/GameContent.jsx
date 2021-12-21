import React from 'react';
import styled from 'styled-components';

import { GameStartButton } from '../Buttons/GameStartButton.jsx';

// Colors
import { COLORS } from '../../style_constants.js';

const GameContentWrapper = styled.div`
  background-color: ${COLORS.WHITE};
  width: 350px;
  height: 386px;
`;

const GameContentTitleWrapper = styled.div`
  height: 36px;
  width: 350px;
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  color: ${COLORS.BLACK};
  text-align: center;
  background-color: ${COLORS.SUB};
`;

const GameContentDescriptionWrapper = styled.div`
  width: 350px;
  height: 350px;
`;

// ブロック要素じゃないので、もしかしたら直列に並ばないかも
// 使用するときに、propsのsrc属性を渡す。
const GameContentImageWrapper = styled.img`
  width: 350px;
  height: 190px;
  box-sizing: border-box;
  border: 2px solid ${COLORS.BLACK};
`;

const GameContentMainWrapper = styled.div`
  test-align: center;
  width: 350px;
  height: 350px;
  padding-top: 10px;
`;

const GameContentSentenceWrapper = styled.div`
  width: 300px;
  display: inline-block;
  text-align: left;
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: ${COLORS.BLACK};
`;

const GameContentStartWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
`;

// LPページの場合、onClickLinkはモーダル管理のstateを更新する関数
// ログインしている場合、onClickLinkは何もない。
export const GameContent = ({difficulty, image}) => {

  const difficultySentence = (difficulty) => {
    let sentence;
    switch (difficulty){
      case '初級':
        sentence = '基礎的なメタ文字をマスターして、スクータムの群れを倒そう！';
        break;
      case '中級':
        sentence = '文字列を表す正規表現をマスターして、カスアリウスの群れを倒そう！';
        break;
      case '上級':
        sentence = 'パスワードの正規表現をマスターして、オルファ・ラパクスを倒そう！';
        break;
      default:
        sentence = 'エラーが発生しています。';
        break;
    };
    return sentence;
  };

  const conversionDifficulty = (difficulty) => {
    let englishDifficulty;
    switch (difficulty){
      case '初級':
        englishDifficulty = 'elementary';
        break;
      case '中級':
        englishDifficulty = 'intermediate';
        break;
      case '上級':
        englishDifficulty = 'advanced'
        break;
      default:
        englishDifficulty = 'error'
        break;
    };
    return englishDifficulty;
  };

  return (
    <>
      <GameContentWrapper>
        <GameContentTitleWrapper>
          {`${difficulty}編`}
        </GameContentTitleWrapper>
        <GameContentDescriptionWrapper>
          <GameContentImageWrapper src={image} />
          <GameContentMainWrapper>
            <GameContentSentenceWrapper>
              {(difficultySentence(difficulty))}
            </GameContentSentenceWrapper>
            <GameContentStartWrapper>
              <GameStartButton difficulty={(conversionDifficulty(difficulty))}/>
            </GameContentStartWrapper>
          </GameContentMainWrapper>
        </GameContentDescriptionWrapper>
      </GameContentWrapper>
    </>
  );
};