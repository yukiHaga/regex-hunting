import React from 'react';
import styled from 'styled-components';

// useNavigate
import { useNavigate } from "react-router-dom";

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper 
import { DescriptionWrapper } from '../shared_style.js'; 

// Buttons
import { BackToTopButton } from '../Buttons/BackToTopButton.jsx';

// Images
// import LoginImage from '../../images/login.png';

// Button
// import { CloseButton } from '../Buttons/CloseButton.jsx';

// Sentence
// import { PasswordResetSentence } from '../Sentences/PasswordResetSentence.jsx';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

const CustomDialogInnerWrapper = styled.div`
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: ${COLORS.SUB};
  text-align: center;
  height: 400px;
  width: 550px;
`;

const CustomDialogTitleImage = styled.img`
  height: 50px;
  width: 80px
  object-fit: contain;
  padding: 8px 23px;
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

export const GameClearDialog = ({
  isOpen,
  difficulty,
  correct_questions,
  incorrect_questions
}) => {

  // navigate
  let navigate = useNavigate();

  // <CustomDialogTitleImage src={LoginImage} alt="Login" />
  return(
    <Dialog
      open={isOpen}
    >
      <CustomDialogInnerWrapper> 
        <CustomDialogTitleWrapper>
          <CustomSpan>GAME CLEAR</CustomSpan>
          GAME CLEAR
        </CustomDialogTitleWrapper> 
        <CustomDialogContent>
          {
            difficulty === "elementary" &&
              <CustomDialogContentSentence>
                スクータムの群れの討伐に成功しました！
              </CustomDialogContentSentence>
          }
          {
            difficulty === "intermediate" &&
              <CustomDialogContentSentence>
                カスアリウスの群れの討伐に成功しました！
              </CustomDialogContentSentence>
          }
          {
            difficulty === "advanced" &&
              <CustomDialogContentSentence>
                オルファ・ラパクスの討伐に成功しました！
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
              <tr>
                <MetaTd>クリアタイム</MetaTd> 
                <CustomTd>5:00</CustomTd>
              </tr>
            </tbody>
          </CustomTable>
          <BackToTopButton />
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
