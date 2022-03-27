import React from 'react';
import styled from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants.js';

// DescriptionWrapper
import { DescriptionWrapper } from '../shared_style.js';

// Buttons
import { BackToTopButton } from '../Buttons/BackToTopButton';
import { RestartGameButton } from '../Buttons/RestartGameButton';
import { ResultShareButton } from '../Buttons/ResultShareButton';
import { BackToMyPageButton } from '../Buttons/BackToMyPageButton';

// Sentence
import { CheackAnswerSentence } from '../Sentences/CheackAnswerSentence.jsx';

// ExperienceGage
import { DialogExperienceBox } from '../Games/DialogExperienceBox.jsx';

// モンスター名を取得する関数
import { getMonsterName } from '../../functions/getMonsterName';

// GameOverDialogの引数の型
import { GameOverDialogArg } from '../../types/components/dialogs';

const CustomDialogInnerWrapper = styled.div`
  width: 40vw;
  padding: 3%;
  padding-top: 7%;
  padding-bottom: 0;
  background-color: ${COLORS.SUB};
  text-align: center;
  height: 100%;
`;

const CustomDialogTitleWrapper = styled.div`
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 3em;
  color: ${COLORS.OVER_BLACK};
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
  margin-bottom: 2.5%;
`;

const CustomTable = styled.table`
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  background-color: ${COLORS.SUB};
  font-weight: normal;
  font-size: 1.1em;
  margin: 0 auto;
  margin-top: 1%;
  border: none;
  width: 68%;
`;

const CustomTd = styled.td`
  padding: 3%;
  border: none;
  text-align: right;
  border-bottom:solid 1px silver;
  padding-right: 5%;
`;

const MetaTd = styled(CustomTd)`
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
  padding-right: 3%;
  padding-left: 5%;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: end;
  margin-top: 2%;
`;

const ExperienceGageTd = styled(CustomTd)`
  padding-left: 5%;
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
`;

const ExperienceMetaTd = styled(CustomTd)`
  border: none;
  text-align: left;
  padding-right: 3%;
  padding-left: 5%;
`;

const ExperienceTd = styled(CustomTd)`
  border: none;
  text-align: right;
`;

export const GameOverDialog = ({
  isOpen,
  difficulty,
  correctQuestions,
  incorrectQuestions,
  setGameState,
  getGameStart,
  initialState,
  hasUser,
  rank,
  totalExperience,
  maximumExperiencePerRank,
  temporaryExperience,
  prevTemporaryExperience,
  dialogGageUp,
  gameResult,
  rankUp
}: GameOverDialogArg): JSX.Element => {

  return(
    <Dialog
      open={isOpen}
      maxWidth='lg'
    >
      <CustomDialogInnerWrapper>
        <CustomDialogTitleWrapper>
          <CustomSpan>GAME OVER</CustomSpan>
          GAME OVER
        </CustomDialogTitleWrapper>
        <CustomDialogContent>
          <CustomDialogContentSentence>
            {`${getMonsterName(difficulty)}の討伐に失敗しました...`}
          </CustomDialogContentSentence>
          <CustomTable>
            <tbody>
              <tr>
                <MetaTd>正解数</MetaTd>
                <CustomTd>{ `${correctQuestions.length}問` }</CustomTd>
              </tr>
              <tr>
                <MetaTd>不正解数</MetaTd>
                <CustomTd>{ `${incorrectQuestions.length || "0"}問` }</CustomTd>
              </tr>
              {
                hasUser &&
                  <>
                    <tr>
                      <ExperienceMetaTd>獲得経験値</ExperienceMetaTd>
                      <ExperienceTd>
                        { temporaryExperience }
                      </ExperienceTd>
                    </tr>
                    <tr>
                      <ExperienceGageTd colSpan={2}>
                        <DialogExperienceBox
                          rank={rank}
                          totalExperience={totalExperience}
                          maximumExperiencePerRank={maximumExperiencePerRank}
                          temporaryExperience={temporaryExperience}
                          prevTemporaryExperience={prevTemporaryExperience}
                          dialogGageUp={dialogGageUp}
                        />
                      </ExperienceGageTd>
                    </tr>
                  </>
              }
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
            <ResultShareButton
              difficulty={difficulty}
              gameResult={gameResult}
              rankUp={rankUp}
            />
            {
              hasUser ?
                <BackToMyPageButton />
              :
                <BackToTopButton />
            }
          </ButtonsWrapper>
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
