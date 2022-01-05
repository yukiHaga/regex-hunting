import React, { useState } from 'react';
import styled from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper 
import { DescriptionWrapper } from '../shared_style.js'; 

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

// Image
import ElementaryMonsterImage from '../../images/elementary.png'; 

// NextButton
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

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
const CarouselList = styled.li`
  margin-right: 40px;
  list-style: none;
  background-color: ${COLORS.SUB};
  width: 1000px;
  height: 540px;
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 4px
`;

// 一枚あたりのスライド
const ModalWrapper = styled.div`
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
`;

const MonsterImageBoxWrapper = styled.div`
 text-align: right;
 width: 80%;
 margin-top: 45px;
`;

const MonsterImageWrapper = styled.img`
`;

const ButtonLineWrapper = styled.div`
  width: 100%;
  text-align: right;
  margin-top: 30px;
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

export const ElementaryGameDescriptionDialog = ({
  isOpen,
  setGameState
}) => {

  const initialState = {
    width: 0,
    count: 0
  };

  const [widthState, setWidthState] = useState(initialState);

  // stopメソッドを入れることでアニメーション1回毎に止める
  // 代入されたスライド数 × リスト1枚分の幅を左に動かす
  // 1095pxずらす
  const changeSlideToRight = () => {
    setWidthState((prev) => ({
      width: prev.count === 3 ? prev.width : prev.width + 1095,
      count: prev.count === 3 ? prev.count : prev.count + 1
    }));
  };

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
              初級編を始める前に、正規表現とは何か?、どんなことができるのか？を学習しましょう。<br/>そして、初級編のゲームを通して、正規表現を作る際に使う基礎的なメタ文字をマスターしましょう！
                    </SentenceWrapper>
                    <MonsterImageBoxWrapper>
                      <MonsterImageWrapper src={ElementaryMonsterImage} />
                    </MonsterImageBoxWrapper>
                    <ButtonLineWrapper>
                      <ButtonWrapper onClick={changeSlideToRight}>
                        <ArrowRightIcon 
                          fontSize='inherit' 
                          sx={{ color: `${COLORS.BLACK}` }}
                        />
                      </ButtonWrapper>
                    </ButtonLineWrapper>
                  </ModalWrapper>
                </CarouselList>
                <CarouselList>
                  <ModalWrapper>
                    <TitleWrapper>
                      初級編
                    </TitleWrapper>
                    <SentenceWrapper>
              初級編を始める前に、正規表現とは何か?、どんなことができるのか？を学習しましょう。<br/>そして、初級編のゲームを通して、正規表現を作る際に使う基礎的なメタ文字をマスターしましょう！
                    </SentenceWrapper>
                    <MonsterImageBoxWrapper>
                      <MonsterImageWrapper src={ElementaryMonsterImage} />
                    </MonsterImageBoxWrapper>
                    <ButtonLineWrapper>
                      <ButtonWrapper onClick={changeSlideToRight}>
                        <ArrowRightIcon 
                          fontSize='inherit' 
                          sx={{ color: `${COLORS.BLACK}` }}
                        />
                      </ButtonWrapper>
                    </ButtonLineWrapper>
                  </ModalWrapper>
                </CarouselList>
                <CarouselList>
                  <ModalWrapper>
                    <TitleWrapper>
                      初級編
                    </TitleWrapper>
                    <SentenceWrapper>
              初級編を始める前に、正規表現とは何か?、どんなことができるのか？を学習しましょう。<br/>そして、初級編のゲームを通して、正規表現を作る際に使う基礎的なメタ文字をマスターしましょう！
                    </SentenceWrapper>
                    <MonsterImageBoxWrapper>
                      <MonsterImageWrapper src={ElementaryMonsterImage} />
                    </MonsterImageBoxWrapper>
                    <ButtonLineWrapper>
                      <ButtonWrapper onClick={changeSlideToRight}>
                        <ArrowRightIcon 
                          fontSize='inherit' 
                          sx={{ color: `${COLORS.BLACK}` }}
                        />
                      </ButtonWrapper>
                    </ButtonLineWrapper>
                  </ModalWrapper>
                </CarouselList>
                <CarouselList>
                  <ModalWrapper>
                    <TitleWrapper>
                      初級編
                    </TitleWrapper>
                    <SentenceWrapper>
              初級編を始める前に、正規表現とは何か?、どんなことができるのか？を学習しましょう。<br/>そして、初級編のゲームを通して、正規表現を作る際に使う基礎的なメタ文字をマスターしましょう！
                    </SentenceWrapper>
                    <MonsterImageBoxWrapper>
                      <MonsterImageWrapper src={ElementaryMonsterImage} />
                    </MonsterImageBoxWrapper>
                  </ModalWrapper>
                </CarouselList>
              </CarouselArea>
            </Carousel>
          </MaskWrapper>
      }
    </>
  );
};
