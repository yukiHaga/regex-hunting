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

// handleTitleColorType
// タイトルカラーを取り扱う関数
import { handleTitleColorType } from '../../functions/handleTitleColorType.js'

const CustomDialogInnerWrapper = styled.div`
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: ${COLORS.SUB};
  text-align: center;
  width: 550px;
`;

const CustomDialogTitleWrapper = styled.div`
  height: 50px;
  font-size: 30px;
  line-height: 50px;
  padding-top: 30px;
  font-family: Raleway;
  font-style: italic;
  font-weight: bold;
  font-size: 32px;
  color: ${(props) => handleTitleColorType(props.title)};
  text-align: left;
  padding-left: 40px;
  padding-right: 40px;
`;

const CustomDialogContent = styled(DialogContent)`
  text-align: center;
`;

// background-color: ${COLORS.OCHER};
const QuestionBlockWrapper = styled.div`
  width: 470px;
  height: 180px;
  border-radius: 3px;
  background-color: ${COLORS.ANSWER_GRAY};
  margin: 0 auto;
  padding-top: 10px;
  margin-bottom: 20px;
`;


const QuestionWrapper = styled.div`
  height: 80px;
  width: 450px;
  border-radius: 3px;
  background-color: ${COLORS.OCHER};
  font-size: 16px;
  line-height: 40px;
  color: ${COLORS.BLACK};
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  text-align: center;
  margin: 0 auto;
`;

const QuestionNumWrapper = styled.div`
  background-color: ${COLORS.MAIN};
  height: 40px;
  width: 45px;
  border-radius: 3px;
  font-size: 16px;
  line-height: 40px;
  color: ${COLORS.SUB};
  text-align: center;
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  position: absolute;
  z-index: 1;
`;

const TargetSentenceWrapper = styled.div`
  background-color: ${COLORS.SUB};
  border-radius: 3px;
  width: 450px;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  color: ${COLORS.BLACK};
  text-align: center;
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
`;

const CommentaryBlockWrapper = styled.div`
  margin: 0 auto;
  width: 450px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CommentaryTitleWrapper = styled.div`
  font-size: 19px;
  color: ${COLORS.BLACK};
  text-align: left;
  font-family: YuGothic;
  font-weight: 500;
`;

const CommentaryWrapper = styled.div`
  font-size: 16px;
  color: ${COLORS.BLACK};
  text-align: left;
  font-family: YuGothic;
  font-weight: 500;
`;

export const CheckAnswerDialog = ({
  isOpen,
  difficulty,
  correct_questions,
  incorrect_questions,
  setGameState,
}) => {

  return(
    <Dialog
      open={isOpen}
    >
      <CustomDialogInnerWrapper> 
        <CustomDialogTitleWrapper title="Bad">
          Bad
        </CustomDialogTitleWrapper> 
        <CustomDialogContent>
          {
            incorrect_questions.length ? incorrect_questions.map(({ 
              question, 
              sentence_num 
            }) => (
              <QuestionBlockWrapper>
                <QuestionWrapper>
                  <QuestionNumWrapper>
                    {`Q${sentence_num}`}
                  </QuestionNumWrapper>
                  {question.sentence}
                  <TargetSentenceWrapper>
                    {question.target_sentence}
                  </TargetSentenceWrapper>
                </QuestionWrapper>
                <CommentaryBlockWrapper>
                  <CommentaryTitleWrapper>
                    解説
                  </CommentaryTitleWrapper>
                  <CommentaryWrapper>
                    {question.commentary}
                  </CommentaryWrapper>
                </CommentaryBlockWrapper>
              </QuestionBlockWrapper>
            ))
            :
              <DescriptionWrapper>
                不正解の問題はありませんでした。
              </DescriptionWrapper>
          }
        </CustomDialogContent>
        <CustomDialogTitleWrapper title="Good">
          Good
        </CustomDialogTitleWrapper> 
        <CustomDialogContent>
          {
            correct_questions.length ? correct_questions.map(({
              question,
              sentence_num 
            }) => (
              <QuestionBlockWrapper>
                <QuestionWrapper>
                  <QuestionNumWrapper>
                    {`Q${sentence_num}`}
                  </QuestionNumWrapper>
                  {question.sentence}
                  <TargetSentenceWrapper>
                    {question.target_sentence}
                  </TargetSentenceWrapper>
                </QuestionWrapper>
                <CommentaryBlockWrapper>
                  <CommentaryTitleWrapper>
                    解説
                  </CommentaryTitleWrapper>
                  <CommentaryWrapper>
                    {question.commentary}
                  </CommentaryWrapper>
                </CommentaryBlockWrapper>
              </QuestionBlockWrapper>
            ))
            :
              <DescriptionWrapper>
                正解の問題はありませんでした。
              </DescriptionWrapper>
          }
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
