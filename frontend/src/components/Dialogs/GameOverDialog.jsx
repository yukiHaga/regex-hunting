import React from 'react';
import styled from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper 
import { DescriptionWrapper } from '../shared_style.js'; 

// Buttons
import { BackToTopButton } from '../Buttons/BackToTopButton.jsx';
import { RestartGameButton } from '../Buttons/RestartGameButton.jsx';
import { ResultShareButton } from '../Buttons/ResultShareButton.jsx';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

// Sentence
import { CheackAnswerSentence } from '../Sentences/CheackAnswerSentence.jsx';

const CustomDialogInnerWrapper = styled.div`
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: ${COLORS.SUB};
  text-align: center;
  height: 400px;
  width: 550px;
`;

const CustomDialogTitleWrapper = styled.div`
  height: 74px;
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 50px;
  line-height: 74px;
  color: ${COLORS.OVER_BLACK};
  padding-top: 30px;
  -webkit-text-stroke: 6px ${COLORS.RED};
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
`;

const CustomTable = styled.table`
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  background-color: ${COLORS.SUB};
  font-family: YuGothic;
  font-weight: normal;
  font-size: 18px;
  margin: 0 auto;
  margin-top: 8px;
  border: none;
`;

const CustomTd = styled.td`
  padding: 10px 40px; 
  border: none;
  text-align: right;
  border-bottom:solid 1px silver;
`;

const MetaTd = styled(CustomTd)`
  padding: 10px 40px; 
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const GameOverDialog = ({
  isOpen,
  difficulty,
  correct_questions,
  incorrect_questions,
  setGameState,
  getGameStart,
  initialState
}) => {

  return(
    <Dialog
      open={isOpen}
    >
      <CustomDialogInnerWrapper> 
        <CustomDialogTitleWrapper>
          <CustomSpan>GAME OVER</CustomSpan>
          GAME OVER
        </CustomDialogTitleWrapper> 
        <CustomDialogContent>
          {
            difficulty === "elementary" &&
              <CustomDialogContentSentence>
                スクータムの群れの討伐に失敗しました...
              </CustomDialogContentSentence>
          }
          {
            difficulty === "intermediate" &&
              <CustomDialogContentSentence>
                カスアリウスの群れの討伐に失敗しました...
              </CustomDialogContentSentence>
          }
          {
            difficulty === "advanced" &&
              <CustomDialogContentSentence>
                オルファ・ラパクスの討伐に失敗しました...
              </CustomDialogContentSentence>
          }
          <CustomTable>
            <tbody>
              <tr>
                <MetaTd>正解数</MetaTd> 
                <CustomTd>{ `${correct_questions.length}問` }</CustomTd>
              </tr>
              <tr>
                <MetaTd>不正解数</MetaTd> 
                <CustomTd>{ `${incorrect_questions.length || "0"}問` }</CustomTd>
              </tr>
            </tbody>
          </CustomTable>
          <CheackAnswerSentence
            setGameState={setGameState}
          />
          <ButtonsWrapper>
            <RestartGameButton 
              difficulty={difficulty}             
              setGameState={setGameState}
              getGameStart={getGameStart}
              initialState={initialState}
            />
            <ResultShareButton />
            <BackToTopButton />
          </ButtonsWrapper>
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
