import React, { Fragment, useEffect, useContext } from 'react';
import styled from 'styled-components';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// Colors
import { COLORS } from '../style_constants.js';

// DescriptionWrapper
import { DescriptionWrapper } from '../components/shared_style.js';

// NextButton
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

// PrevButton
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const FakeBlock = styled.div`
  background-color: ${COLORS.SUB};
  height: 56px;
`;

// メインのラッパー
const MainWrapper = styled.div`
  background-color: ${COLORS.SUB};
`;

const TitleLineWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ButtonWrapper = styled.div`
  font-size: 60px;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  :focus {
    outline: 0;
  }
`;

const ChangeGraphBoxSentenceWrapper = styled(DescriptionWrapper)`
  font-weight: bold;
  font-size: 36px;
  line-height: 54px;
  text-align: center;
`;

export const Rankings = () => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { 
    requestUserState: { 
      sessionState,
      battleAudioState
    },
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  // ゲーム中のユーザーがトップページに戻ったときに
  // 音を消すuseEffect
  useEffect(() => {
    if(battleAudioState.play) {
      battleAudioState.audio.pause();
      battleAudioState.audio.currentTime = 0;
    }
  },[
    battleAudioState.play,
    battleAudioState.audio
  ])

  return (
    <>
      <Header /> 
      <FakeHeader />
      <FakeBlock />
      <MainWrapper>
        <TitleLineWrapper>
          <ButtonWrapper 
          >
            <ArrowLeftIcon
              fontSize='inherit' 
              sx={{ color: `${COLORS.BLACK}` }}
            />
          </ButtonWrapper>
          <ChangeGraphBoxSentenceWrapper>
            初級編
          </ChangeGraphBoxSentenceWrapper>
          <ButtonWrapper
          >
            <ArrowRightIcon
              fontSize='inherit' 
              sx={{ color: `${COLORS.BLACK}` }}
            />
          </ButtonWrapper>
        </TitleLineWrapper>
      </MainWrapper>
    </>
  );
};
