import React from 'react';
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

// react-id-swiper
import Swiper from 'react-id-swiper';

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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWrapper = styled.div`
  z-index:2;
  width: 70%;
  height: 60%;
  padding: 10px;
  background-color: ${COLORS.SUB};
  border-radius: 4px;
  text-align: center;
  padding: 36px;
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
`;

const ButtonWrapper = styled.div`
  font-size: 80px;
`;

const SwiperSlide = styled.div`
`;

export const ElementaryGameDescriptionDialog = ({
  isOpen,
  setGameState
}) => {

  /*
    const params = {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
  */

  return(
    <>
      {
        isOpen && 
          <MaskWrapper>
            <ModalWrapper>
              <Swiper>
                <SwiperSlide>
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
                    <ButtonWrapper>
                      <ArrowRightIcon 
                        fontSize='inherit' 
                        sx={{ color: `${COLORS.BLACK}` }}
                      />
                    </ButtonWrapper>
                  </ButtonLineWrapper>
                </SwiperSlide>
              </Swiper>
            </ModalWrapper>
          </MaskWrapper>
      }
    </>
  );
};
