import React, { useMemo } from 'react';
import styled from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// Colors
import { COLORS } from '../../style_constants';

// DescriptionWrapper
import { DescriptionWrapper } from '../shared_style';

// Buttons
import { BackToTopButton } from '../Buttons/BackToTopButton';
import { RestartGameButton } from '../Buttons/RestartGameButton';
import { ResultShareButton } from '../Buttons/ResultShareButton';
import { BackToMyPageButton } from '../Buttons/BackToMyPageButton';

// Sentence
import { CheackAnswerSentence } from '../Sentences/CheackAnswerSentence';

// ExperienceGage
import { DialogExperienceBox } from '../Games/DialogExperienceBox';

// 各ゲームの獲得経験値を取得する関数
import { getExperience } from '../../functions/getExperience';

// モンスター名を取得する関数
import { getMonsterName } from '../../functions/getMonsterName';

// クリアタイムを取得する関数
import { getClearTime } from '../../functions/getClearTime';

// GameClearDialogの引数の型
import { GameClearDialogArg } from '../../types/components/dialogs';

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
  color: ${COLORS.WHITE};
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

const ExperienceGageTd = styled(CustomTd)`
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
  padding-left: 5%;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: end;
  margin-top: 2%;
`;

const ColorTimeSpan = styled.span<{milliSec: number}>`
  color: ${({ milliSec }) => milliSec < 60000 && COLORS.RED }
`;

export const GameClearDialog = ({
  isOpen,
  difficulty,
  correctQuestions,
  incorrectQuestions,
  setGameState,
  getGameStart,
  initialState,
  gameStartTime,
  gameEndTime,
  hasUser,
  rank,
  totalExperience,
  maximumExperiencePerRank,
  temporaryExperience,
  prevTemporaryExperience,
  dialogGageUp,
  gameResult,
  rankUp
}: GameClearDialogArg): JSX.Element => {

  const shareClearTime = useMemo(() => getClearTime(
    gameStartTime,
    gameEndTime
  ), [
    gameStartTime,
    gameEndTime,
  ]);

  // このミリ秒はタイムに色をつけるために使用する
  const milliSec = gameEndTime - gameStartTime;

  return(
    <Dialog
      open={isOpen}
      maxWidth='lg'
    >
      <CustomDialogInnerWrapper>
        <CustomDialogTitleWrapper>
          <CustomSpan>GAME CLEAR</CustomSpan>
          GAME CLEAR
        </CustomDialogTitleWrapper>
        <CustomDialogContent>
          <CustomDialogContentSentence>
            {`${getMonsterName(difficulty)}の討伐に成功しました！`}
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
              <tr>
                <MetaTd>クリアタイム</MetaTd>
                <CustomTd>
                  <ColorTimeSpan milliSec={milliSec} >
                    { shareClearTime }
                  </ColorTimeSpan>
                </CustomTd>
              </tr>
              {
                hasUser &&
                  <>
                    <tr>
                      <ExperienceMetaTd>獲得経験値</ExperienceMetaTd>
                      <ExperienceTd>
                        { getExperience(difficulty) }
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
              rank={rank}
              clearTime={shareClearTime}
              hasUser={hasUser}
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
