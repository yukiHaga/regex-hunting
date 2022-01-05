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

// 戻るボタン
import { BackToModalButton } from '../Buttons/BackToModalButton.jsx';

const CustomDialogInnerWrapper = styled.div`
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
  padding-top: 50px;
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

// backボタンのラッパー 
// もしbackボタンを固定するなら使う
const BackToModalButtonWrapper = styled.div`
  position: fixed;
  background-color: ${COLORS.SUB};
  width: 550px;
  z-index: 2;
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

const QuestionUpperWrapper = styled.div`
 display: flex;
`;

const QuestionNumFakeWrapper = styled.div`
  height: 40px;
  width: 45px;
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

const QuestionSentenceWrapper = styled.div`
  text-align: left;
  height: 40px;
  padding-left: 10px;
  overflow-x: scroll;
`;

const QuestionSentenceFlexWrapper = styled.div`
  display: flex;
`;

const CustomSentence = styled.div`
  white-space: nowrap;
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
        <BackToModalButtonWrapper>
          <BackToModalButton 
            onClick={
              () => setGameState((prev) => ({
                ...prev,
                check_answer: false
              }))
            }
          />
        </BackToModalButtonWrapper>
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
                  <QuestionUpperWrapper>
                    <QuestionNumWrapper>
                      {`Q${sentence_num}`}
                    </QuestionNumWrapper>
                    <QuestionNumFakeWrapper />
                    <QuestionSentenceWrapper>
                      <QuestionSentenceFlexWrapper>
                        <CustomSentence>
                          {question.sentence}
                        </CustomSentence>
                      </QuestionSentenceFlexWrapper>
                    </QuestionSentenceWrapper>
                  </QuestionUpperWrapper>
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
                  <QuestionUpperWrapper>
                    <QuestionNumWrapper>
                      {`Q${sentence_num}`}
                    </QuestionNumWrapper>
                    <QuestionNumFakeWrapper />
                    <QuestionSentenceWrapper>
                      <QuestionSentenceFlexWrapper>
                        <CustomSentence>
                          {question.sentence}
                        </CustomSentence>
                      </QuestionSentenceFlexWrapper>
                    </QuestionSentenceWrapper>
                  </QuestionUpperWrapper>
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