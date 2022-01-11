import React, { useEffect } from 'react';
import styled from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper 
import { DescriptionWrapper } from '../shared_style.js'; 

// 戻るボタン
import { BackToModalButton } from '../Buttons/BackToModalButton.jsx';

// Twitterボタン
import { ResultShareButton } from '../Buttons/ResultShareButton.jsx';

// ランクアップ音
import RankUpSound from '../../sounds/game_clear.mp3';

const CustomDialogInnerWrapper = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 10px;
  background-color: ${COLORS.SUB};
  text-align: center;
  width: 550px;
  height: 420px;
`;

const CustomDialogTitleWrapper = styled.div`
  height: 74px;
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 74px;
  color: ${COLORS.WHITE};
  padding-top: 30px;
  -webkit-text-stroke: 6px ${COLORS.MAIN};
  position: relative;
`;

const CustomSpan = styled.span`
  -webkit-text-stroke: 0;
  position: absolute;
`;

const CustomDialogContent = styled(DialogContent)`
  text-align: center;
`;

const CustomDialogContentSentence = styled(DescriptionWrapper)`
  display: inline-block;
  text-align: left;
  font-size: 18px;
`;

// backボタンのラッパー 
// backボタンを固定してる
const BackToModalButtonWrapper = styled.div`
  position: fixed;
  background-color: ${COLORS.SUB};
  width: 550px;
  z-index: 2;
`;

const CustomTable = styled.table`
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  background-color: ${COLORS.SUB};
  font-family: YuGothic;
  font-weight: normal;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 25px;
  border: none;
  width: 70%;
`;

const CustomTd = styled.td`
  padding: 10px 40px; 
  text-align: center;
  border: solid 1px silver;
  font-size: 21px;
  background-color: ${COLORS.OCHER};
`;

const MetaTd = styled.td`
  padding: 10px 40px; 
  text-align: center;
  border: solid 1px silver;
  font-weight: bold;
  font-size: 21px;
  color: ${COLORS.SUB};
  background-color: ${COLORS.MAIN};
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

// gameStateのrank_upがtrueの時に開くモーダル
// サーバーに送ったゲームデータの戻り値のrank_upがtrueの場合、開く
// このコンポーネントに渡るpropsは、サーバーに送ったゲームデータの戻り値のデータ
// このrankはランクアップ後のランク値が格納されている
export const RankUpDialog = ({
  isOpen,
  rank,
  active_title,
  setGameState,
  rank_up
}) => {

  // ゲームクリア時の音
  useEffect(() => {
    if(rank_up) {
      const audio = new Audio(RankUpSound);
      audio.play();
    }
  }, [
    rank_up
  ]);

  return(
    <Dialog
      open={isOpen}
    >
      <CustomDialogInnerWrapper> 
        <BackToModalButtonWrapper>
          <BackToModalButton 
            onClick={
              () => setGameState((prev) => ({
                ...prev,
                rank_up: false,
                dialog_gage_up: false
              }))
            }
          />
        </BackToModalButtonWrapper>
        <CustomDialogTitleWrapper title="Bad">
          <CustomSpan>
            RANK UP
          </CustomSpan>
          RANK UP
        </CustomDialogTitleWrapper> 
        <CustomDialogContent>
          <CustomDialogContentSentence>
            ランクアップおめでとうございます！<br />
            {`ランク${rank - 1}からランク${rank}になりました。`}
          </CustomDialogContentSentence>
          <CustomTable>
            <tbody>
              <tr>
                <MetaTd colSpan={2}>現在の称号</MetaTd> 
              </tr>
              <tr>
                <CustomTd>{active_title}</CustomTd>
              </tr>
            </tbody>
          </CustomTable>
          <ButtonsWrapper>
            <ResultShareButton />
          </ButtonsWrapper>
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
