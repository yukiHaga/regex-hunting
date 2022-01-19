import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

// Image
import ElementaryMonsterImage from '../../images/elementary.png'; 

// NextButton
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// PrevButton
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

// Buttons
import { FinallyGameStartButton } from '../Buttons/FinallyGameStartButton.jsx';
import { FinallyGameRestartButton } from '../Buttons/FinallyGameRestartButton.jsx';

// MUIのツールチップコンポーネントを使う
// チラツキがあるからやっぱりやめた
// import Tooltip from '@mui/material/Tooltip';

// 画面全体にマスクを設置する設定
// 画面の中央に要素を表示させる設定
const MaskWrapper = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  z-index: 1;
  background-color:rgba(0,0,0,0.3);
`;

// PCの画面全体を表している
const Carousel = styled.div`
  z-index: 2;
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 0 auto;
  position: relative;
  transition: right 0.5s ease;
  right: ${({ widthState: { width } }) => `${width}px`};
`;

// 全てのスライドを包み込むラッパー
// position: absoluteで全てのスライドを包み込むラッパーを、親要素を元にして固定しておく
// 高さはpcの画面全体である
const CarouselArea = styled.ul`
  width: 4400px;
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: 185px;
  padding-right: 140px;
  position: absolute;
  margin-top: 0px;
  margin-bottom: 0px;
`;

// 一枚あたりのスライドのラッパー
// ここに移動ボタンが属している。
const CarouselList = styled.li`
  margin-right: 40px;
  list-style: none;
  background-color: ${COLORS.SUB};
  width: 1000px;
  height: 550px;
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 4px
`;

// 一枚あたりのスライド(ボタンは除く)
// CarsolListの高さが550pxなので、ButtonLineWrapperの高さは自動的に150pxとなる
const ModalWrapper = styled.div`
  height: 450px;
`;

const TitleWrapper = styled.div`
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  color: ${COLORS.BLACK};
`;

const SentenceWrapper = styled.div`
  font-family: YuGothic;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  display: inline-block;
  text-align: left;
  margin-top: 45px;
  color: ${COLORS.BLACK};
  width: 900px;
`;

const WarningSentenceWrapper = styled.div`
  font-family: YuGothic;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  display: inline-block;
  text-align: center;
  margin-top: 45px;
  color: ${COLORS.RED};
  width: 900px;
`;

const MonsterImageBoxWrapper = styled.div`
 text-align: right;
 width: 80%;
 margin-top: 80px;
`;

const MonsterImageWrapper = styled.img`
  width: 211px;
  height: 205px;
  object-fit: contain;
`;

const ButtonLineWrapper = styled.div`
  width: 100%;
  text-align: right;
`;

const ButtonWrapper = styled.div`
  font-size: 80px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  :focus {
    outline: 0;
  }
  display: inline-block;
`;

const OuterButtonsWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export const ElementaryGameDescriptionDialog = ({
  isOpen,
  setGameState,
  game_description_open,
  click_description_open
}) => {

  const initialState = {
    width: 0,
    count: 0
  };


  const [widthState, setWidthState] = useState(initialState);

  // 右へ1095pxずらす
  const changeSlideToRight = () => {
    setWidthState((prev) => ({
      width: prev.count === 3 ? prev.width : prev.width + 1095,
      count: prev.count === 3 ? prev.count : prev.count + 1
    }));
  };

  // 左へ1095pxずらす
  const changeSlideToLeft = () => {
    setWidthState((prev) => ({
      width: prev.count === 0 ? prev.width : prev.width - 1095,
      count: prev.count === 0 ? prev.count : prev.count - 1
    }));
  };

  useEffect(() => {
    if(game_description_open) {
      const handleRightkeyPress = (e) => {
        if(e.key !== 'Enter' && e.key === 'ArrowRight') {
          changeSlideToRight();
        }
      };

      const handleLeftkeyPress = (e) => {
        if(e.key !== 'Enter' && e.key === 'ArrowLeft') {
          changeSlideToLeft();
        }
      };

      // 入力をコントロールするイベントリスナー
      document.addEventListener("keydown", handleRightkeyPress);

      // 入力をコントロールするイベントリスナー
      document.addEventListener("keydown", handleLeftkeyPress);

      // イベントを消すクリーンアップ関数を返す
      return () => {
        document.removeEventListener("keydown", handleRightkeyPress);
        document.removeEventListener("keydown", handleLeftkeyPress);
      }
    }
  }, [
    game_description_open
  ]);

  return(
    <>
      {
        isOpen && 
          <MaskWrapper>
            <Carousel widthState={widthState}>
              <CarouselArea>
                <CarouselList>
                  <ModalWrapper>
                    <TitleWrapper>
                      初級編
                    </TitleWrapper>
                    <SentenceWrapper>
                      初級編を始める前に、正規表現とは何か?、どんなことができるのか？を学習しましょう。そして、初級編のゲームを通して、正規表現を作る際に使う基礎的なメタ文字をマスターしましょう！
                    </SentenceWrapper>
                    <MonsterImageBoxWrapper>
                      <MonsterImageWrapper src={ElementaryMonsterImage} />
                    </MonsterImageBoxWrapper>
                  </ModalWrapper>
                  <ButtonLineWrapper>
                    <ButtonWrapper onClick={changeSlideToRight}>
                      <ArrowRightIcon 
                        fontSize='inherit' 
                        sx={{ color: `${COLORS.BLACK}` }}
                      />
                    </ButtonWrapper>
                  </ButtonLineWrapper>
                </CarouselList>
                <CarouselList>
                  <ModalWrapper>
                    <TitleWrapper>
                      What’s 正規表現？
                    </TitleWrapper>
                    <SentenceWrapper>
                      正規表現とは、複数の文字列からルールを見つけ出し、そのルールをパターンで表現したものです。正規表現を用いることで、文字列中に特定の文字が含まれているか判定できます。そして、含んでいる場合、どの位置にあるかを知ることができます。
                    </SentenceWrapper>
                  </ModalWrapper>
                  <ButtonLineWrapper>
                    <ButtonWrapper onClick={changeSlideToLeft}>
                      <ArrowLeftIcon
                        fontSize='inherit' 
                        sx={{ color: `${COLORS.BLACK}` }}
                      />
                    </ButtonWrapper>
                    <ButtonWrapper onClick={changeSlideToRight}>
                      <ArrowRightIcon 
                        fontSize='inherit' 
                        sx={{ color: `${COLORS.BLACK}` }}
                      />
                    </ButtonWrapper>
                  </ButtonLineWrapper>
                </CarouselList>
                <CarouselList>
                  <ModalWrapper>
                    <TitleWrapper>
                      正規表現を作る上で重要なメタ文字
                    </TitleWrapper>
                    <SentenceWrapper>
                      正規表現は、「文字列」と「メタ文字」で構成されています。そのため、メタ文字を知らなければ正規表現を作ることができません。メタ文字とは、特殊な働きをする文字列です。メタ文字の例として、「[a-z]」というメタ文字は「a~zの中の一文字」を表します。また、「\d」というメタ文字は0~9までの1つの数字を表します。
                    </SentenceWrapper>
                  </ModalWrapper>
                  <ButtonLineWrapper>
                    <ButtonWrapper onClick={changeSlideToLeft}>
                      <ArrowLeftIcon
                        fontSize='inherit' 
                        sx={{ color: `${COLORS.BLACK}` }}
                      />
                    </ButtonWrapper>
                    <ButtonWrapper onClick={changeSlideToRight}>
                      <ArrowRightIcon 
                        fontSize='inherit' 
                        sx={{ color: `${COLORS.BLACK}` }}
                      />
                    </ButtonWrapper>
                  </ButtonLineWrapper>
                </CarouselList>
                <CarouselList>
                  <ModalWrapper>
                    <TitleWrapper>
                      ルール説明
                    </TitleWrapper>
                    <SentenceWrapper>
                      初級編では、重要なメタ文字を使った正規表現を学習していきます。時間内に正しい正規表現を入力すると、モンスターに攻撃できます。モンスターのHPを0にしたらゲームクリアです！
                    </SentenceWrapper>
                    <WarningSentenceWrapper>
                      ※ UX向上の為、音が鳴ります。音量が気になる方は下げて頂くよう宜しくお願い致します。
                    </WarningSentenceWrapper>
                    <OuterButtonsWrapper>
                      <ButtonsWrapper>
                        {
                          click_description_open ?
                            <FinallyGameRestartButton setGameState={setGameState} />
                          :
                            <FinallyGameStartButton setGameState={setGameState} />
                        }
                      </ButtonsWrapper>
                    </OuterButtonsWrapper>
                  </ModalWrapper>
                  <ButtonLineWrapper>
                    <ButtonWrapper onClick={changeSlideToLeft}>
                      <ArrowLeftIcon
                        fontSize='inherit' 
                        sx={{ color: `${COLORS.BLACK}` }}
                      />
                    </ButtonWrapper>
                  </ButtonLineWrapper>
                </CarouselList>
              </CarouselArea>
            </Carousel>
          </MaskWrapper>
      }
    </>
  );
};
