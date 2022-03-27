import React, { useEffect } from 'react';
import styled from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper
import { DescriptionWrapper } from '../shared_style.js';

// 戻るボタン
import { BackToModalButton } from '../Buttons/BackToModalButton';

// Twitterボタン
import { ResultShareButton } from '../Buttons/ResultShareButton';

// ランクアップ音
import RankUpSound from '../../sounds/rank_up_25.mp3';

// setGameStateの型
import { SetGameState } from '../../types/containers/games';

const CustomDialogInnerWrapper = styled.div`
  padding: 3%;
  padding-top: 1%;
  padding-bottom: 1%;
  background-color: ${COLORS.SUB};
  text-align: center;
  width: 40vw;
`;

const CustomDialogTitleWrapper = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 3em;
  color: ${COLORS.WHITE};
  padding-top: 7%;
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
`;

// backボタンのラッパー
// backボタンを固定してる
const BackToModalButtonWrapper = styled.div`
  position: fixed;
  background-color: ${COLORS.SUB};
  z-index: 2;
`;

const CustomTable = styled.table`
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  background-color: ${COLORS.SUB};
  font-weight: normal;
  font-size: 1.1em;
  margin: 0 auto;
  margin-top: 4%;
  margin-bottom: 4%;
  border: none;
  width: 60%;
`;


const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 30%;
  align-items: end;
  margin: 0 auto;
`;

const CustomTd = styled.td`
  padding: 3%;
  border: none;
  text-align: right;
  border-bottom:solid 1px silver;
  padding-right: 4%;
`;

const MetaTd = styled(CustomTd)`
  border: none;
  text-align: left;
  font-weight: bold;
  border-bottom:solid 1px silver;
  padding-right: 0;
  padding-left: 4%;
`;

// RankUpDialogの引数の型
type RankUpDialogArg = {
  isOpen: true;
  rank: number;
  activeTitle: string;
  setGameState: SetGameState;
  rankUp: true;
  difficulty: string | undefined;
  gameResult: "" | "progress" | "win" | "lose";
};

// gameStateのrankUpがtrueの時に開くモーダル
// サーバーに送ったゲームデータの戻り値のrankUpがtrueの場合、開く
// このコンポーネントに渡るpropsは、サーバーに送ったゲームデータの戻り値のデータ
// このrankはランクアップ後のランク値が格納されている
export const RankUpDialog = ({
  isOpen,
  rank,
  activeTitle,
  setGameState,
  rankUp,
  difficulty,
  gameResult
}: RankUpDialogArg): JSX.Element => {

  // ゲームクリア時の音
  useEffect(() => {
    if(rankUp) {
      const audio = new Audio(RankUpSound);
      audio.play();
    }
  }, [
    rankUp
  ]);

  return(
    <Dialog
      open={isOpen}
      maxWidth='lg'
    >
      <CustomDialogInnerWrapper>
        <BackToModalButtonWrapper>
          <BackToModalButton
            onClick={
              () => setGameState((prev) => ({
                ...prev,
                rankUp: false,
                dialogGageUp: false
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
                <MetaTd>ランク</MetaTd>
                <CustomTd>{rank}</CustomTd>
              </tr>
              <tr>
                <MetaTd>称号</MetaTd>
                <CustomTd>{activeTitle}</CustomTd>
              </tr>
            </tbody>
          </CustomTable>
          <ButtonsWrapper>
            <ResultShareButton
              rankUp={rankUp}
              difficulty={difficulty}
              gameResult={gameResult}
              rank={rank}
            />
          </ButtonsWrapper>
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
