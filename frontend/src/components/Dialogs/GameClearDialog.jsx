import React, { useMemo } from 'react';
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
import { BackToMyPageButton } from '../Buttons/BackToMyPageButton.jsx';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

// Sentence
import { CheackAnswerSentence } from '../Sentences/CheackAnswerSentence.jsx';

// ExperienceGage
import { DialogExperienceBox } from '../Games/DialogExperienceBox.jsx';

// 各ゲームの獲得経験値を取得する関数
import { getExperience } from '../../functions/getExperience.js';

// モンスター名を取得する関数
import { getMonsterName } from '../../functions/getMonsterName.js';

// クリアタイムを取得する関数
import { getClearTime } from '../../functions/getClearTime.js';

const CustomDialogInnerWrapper = styled.div`
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: ${COLORS.SUB};
  text-align: center;
  height: ${({has_user}) => has_user ? '572px' : '450px' };
  width: 550px;
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
  margin-bottom: 10px;
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

const ExperienceMetaTd = styled(CustomTd)`
  padding: 10px 40px; 
  border: none;
  text-align: left;
`;

const ExperienceTd = styled(CustomTd)`
  padding: 10px 40px; 
  border: none;
  text-align: right;
`;

const ExperienceGageTd = styled(CustomTd)`
  padding: 10px 40px; 
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ColorTimeSpan = styled.span`
  color: ${({ milli_sec }) => milli_sec < 60000 && COLORS.RED }
`;

export const GameClearDialog = ({
  isOpen,
  difficulty,
  correct_questions,
  incorrect_questions,
  setGameState,
  getGameStart,
  initialState,
  game_start_time,
  game_end_time,
  has_user,
  rank,
  total_experience, 
  maximum_experience_per_rank, 
  temporary_experience,
  prev_temporary_experience,
  dialog_gage_up,
  sessionState,
  game_result,
  rank_up
}) => {

  const clear_time = useMemo(() => getClearTime(
    game_start_time, 
    game_end_time
  ), [
    game_start_time,
    game_end_time
  ]);

  const share_clear_time = useMemo(() => clear_time.slice(3), [clear_time]);

  // このミリ秒はタイムに色をつけるために使う
  const milli_sec = game_end_time - game_start_time;

  return(
    <Dialog
      open={isOpen}
    >
      <CustomDialogInnerWrapper
        has_user={has_user}
      > 
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
                <CustomTd>{ `${correct_questions.length}問` }</CustomTd>
              </tr>
              <tr>
                <MetaTd>不正解数</MetaTd> 
                <CustomTd>{ `${incorrect_questions.length || "0"}問` }</CustomTd>
              </tr>
              <tr>
                <MetaTd>クリアタイム</MetaTd> 
                <CustomTd>
                  <ColorTimeSpan milli_sec={milli_sec} >
                    { clear_time }
                  </ColorTimeSpan>
                </CustomTd>
              </tr>
              {
                has_user && 
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
                          total_experience={total_experience}
                          maximum_experience_per_rank={maximum_experience_per_rank}
                          temporary_experience={temporary_experience} 
                          prev_temporary_experience={prev_temporary_experience}
                          dialog_gage_up={dialog_gage_up}
                          difficulty={difficulty}
                          setGameState={setGameState}
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
              sessionState={sessionState}
            />
            <ResultShareButton 
              difficulty={difficulty}             
              game_result={game_result}
              rank_up={rank_up}
              clear_time={share_clear_time}
            />
            {
              has_user ?
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
