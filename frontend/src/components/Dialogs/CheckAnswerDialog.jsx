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
  padding-right: 3%;
  padding-left: 3%;
  padding-top: 2%;
  background-color: ${COLORS.SUB};
  text-align: center;
  width: 40vw;
`;

const CustomDialogTitleWrapper = styled.div`
  font-size: 2em;
  padding-top: 13%;
  font-family: Raleway;
  font-style: italic;
  font-weight: bold;
  color: ${(props) => handleTitleColorType(props.title)};
  text-align: left;
  width: 85%;
  margin: 0 auto;
`;

const CustomDialogContent = styled(DialogContent)`
  text-align: center;
`;

// backボタンのラッパー 
// backボタンを固定してる
const BackToModalButtonWrapper = styled.div`
  position: fixed;
  background-color: ${COLORS.SUB};
  z-index: 2;
`;

// background-color: ${COLORS.OCHER};
const QuestionBlockWrapper = styled.div`
  width: 100%;
  border-radius: 3px;
  background-color: ${COLORS.ANSWER_GRAY};
  margin: 0 auto;
  padding-top: 4%;
  padding-bottom: 4%;
  margin-bottom: 4%;
`;

const QuestionWrapper = styled.div`
  width: 90%;
  border-radius: 3px;
  background-color: ${COLORS.OCHER};
  font-size: 1em;
  color: ${COLORS.BLACK};
  font-style: normal;
  text-align: center;
  margin: 0 auto;
`;

const QuestionUpperWrapper = styled.div`
  display: flex;
`;

const QuestionNumFakeWrapper = styled.div`
  height: 5.5%;
  width: 10%;
`;
const QuestionNumWrapper = styled.div`
  background-color: ${COLORS.MAIN};
  width: 8%;
  border-radius: 3px 3px 0 0;
  font-size: 1em;
  color: ${COLORS.SUB};
  text-align: center;
  font-style: normal;
  font-weight: 500;
  position: absolute;
  z-index: 1;
  padding-top: 1.4%;
  padding-bottom: 1.4%;
`;

const QuestionSentenceWrapper = styled.div`
  padding-top: 1.8%;
  padding-bottom: 1.8%;
  padding-left: 2%;
  text-align: left;
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
  border-radius: 0 0 3px 3px;
  width: 100%;
  font-size: 1em;
  color: ${COLORS.BLACK};
  text-align: center;
  font-style: normal;
  padding-top: 1.8%;
  padding-bottom: 1.8%;
`;

const OuterCodeBlockWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  margin-top: 3%; 
`;

const CodeBlockWrapper = styled.div`
  background-color: ${COLORS.LIGHT_BLACK};
  border-radius: 3px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const AnchorWrapper = styled.div`
  font-size: 1em;
  color: ${COLORS.WHITE};
  font-style: normal;
  margin-left: 3%;
  margin-right: 3%;
  padding-top: 2%;
  padding-bottom: 2%;
`;

const CodeBlockDiv = styled.div`
  width: 100%;
  font-size: 1em;
  background-color: ${COLORS.LIGHT_BLACK};
  color: ${COLORS.WHITE};
  font-style: normal;
  outline: none;
  border: none;
  text-align: center;
  ::placeholder {
    color: #eeeeee;
    opacity: 0.5;
  };
  ::-webkit-input-placeholder {
    color: #eeeeee;
    opacity: 0.5;
  };
  :-ms-input-placeholder {
    color: #eeeeee;
    opacity: 0.5;
  };
  padding-top: 2%;
  padding-bottom: 2%;
`;

const CodeBlockTitleWrapper = styled.div`
  font-size: 1.2em;
  color: ${COLORS.BLACK};
  text-align: left;
  width: 90%;
  margin: 0 auto;
`;

const CommentaryBlockWrapper = styled.div`
  margin: 0 auto;
  width: 90%;
  margin-top: 2%;
  padding-top: 0.5%;
`;

const CommentaryTitleWrapper = styled.div`
  font-size: 1.2em;
  color: ${COLORS.BLACK};
  text-align: left;
  width: 100%;
  margin: 0 auto;
`;

const CommentaryWrapper = styled.div`
  font-size: 1em;
  color: ${COLORS.BLACK};
  text-align: left;
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
      maxWidth='lg'        
    >
      <CustomDialogInnerWrapper> 
        <BackToModalButtonWrapper>
          <BackToModalButton 
            onClick={
              () => setGameState((prev) => ({
                ...prev,
                check_answer: false,
                dialog_gage_up: false
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
                なし
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
              sentence_num, 
              input_regex
            }) => (
              <QuestionBlockWrapper good_or_bad="good">
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
                <OuterCodeBlockWrapper>
                  <CodeBlockTitleWrapper>
                    あなたの回答
                  </CodeBlockTitleWrapper>
                  <CodeBlockWrapper>
                    <AnchorWrapper>
                      /
                    </AnchorWrapper>
                    <CodeBlockDiv>
                      {input_regex}
                    </CodeBlockDiv>
                    <AnchorWrapper>
                      /g
                    </AnchorWrapper>
                  </CodeBlockWrapper>
                </OuterCodeBlockWrapper>
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
                なし
              </DescriptionWrapper>
          }
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
