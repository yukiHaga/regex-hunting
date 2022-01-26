import React, { Fragment, useState, useEffect, useLayoutEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Image
import MainTitleImage from '../images/main_title.png';
import BackGroundImage from '../images/background.png';
import MainMonsterImage from '../images/advanced.png';
import BattleSceneImage from '../images/battle_scene.png';
import MyPageImage from '../images/my_page_image.png';
import RaknkingImage from '../images/ranking_image.png';
import ElementaryGameContentImage from '../images/elementary_game_content.png';
import IntermediateGameContentImage from '../images/intermediate_game_content.png';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';
import { SubText } from '../components/SubText.jsx';
import { StartButton } from '../components/Buttons/StartButton.jsx'
import { Footer } from '../components/Footers/Footer.jsx';
import { LoginDialog } from '../components/Dialogs/LoginDialog.jsx';
import { SignUpDialog } from '../components/Dialogs/SignUpDialog.jsx';
import { SessionFlashMessage } from '../components/FlashMessages/SessionFlashMessage.jsx';
import { GameDescriptionSentence } from '../components/Sentences/GameDescriptionSentence.jsx';
import { RankingDescriptionSentence } from '../components/Sentences/RankingDescriptionSentence.jsx';
import { GameStartDescriptionSentence } from '../components/Sentences/GameStartDescriptionSentence.jsx';
import { GameContent } from '../components/GameContents/GameContent.jsx';
import { BoundDescriptionSentence } from '../components/Sentences/BoundDescriptionSentence.jsx';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

// Colors
import { COLORS } from '../style_constants.js';

// react-scroll
import { Link as Scroll } from 'react-scroll';

import Alert from '@mui/material/Alert';

// メインのラッパー
const MainWrapper = styled.div`
  text-align: center;
  position: relative;
`;

// メインタイトル画像
// max-widthはこの要素の最大幅を表す
// width1000pxより画面幅が小さい場合、画像が画面からはみ出てしまう(横スクロールしないといけない)。
// そのため、max-width(最大幅)を指定しておくと、画面幅がwidthより小さい場合でも、
// widthを自動的に画面幅に合わせてくれる
const MainTitleImageCover = styled.img`
  width: 70%;
  height: 180px;
  object-fit: contain;
  margin-top: 145px;
  max-width: 100%;
  height: auto;
`;

// 背景画像
// こいつの設定は全部background-imageに持ってく
const BackGroundImageCover = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 0px;
  z-index: -4;
  max-width: 100%;
`;

// フィルター
const Filter = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: -2;
  background-color: rgba(102,102,102,0.5)
`;

// メインモンスター画像
const MainMonsterImageCover = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 30px;
  z-index: -3;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 0px;
  width: 70%;
  height: 90%;
  object-fit: contain;
  max-width: 100%
`;

// フラッシュメッセージでレイアウトが変化しないためのブロック要素
const FakeBlock = styled.div`
  height: 56px;
`;

// セカンドのラッパー
const SecondWrapper = styled.div`
  text-align: center;
  background-color: ${COLORS.SUB};
  padding-top: 80px;
`;

// 戦闘画像
const SecondBattleSceneImageCover = styled.img`
  width: 60%;
  height: auto;
  object-fit: contain;
  margin-top: 60px;
  margin-bottom: 20px;
  max-width: 100%
`;

// サードのラッパー
const ThirdWrapper = styled.div`
  text-align: center;
  background-color: ${COLORS.SUB};
  padding-top: 110px;
`;

// マイページ画像
const ThirdMyPageImageCover = styled.img`
  width: 60%;
  height: auto;
  object-fit: contain;
  margin-top: 60px;
  margin-bottom: 20px;
  max-width: 100%
`;

// フォースのラッパー
const FourthWrapper = styled.div`
  text-align: center;
  background-color: ${COLORS.SUB};
  padding-top: 110px;
`;

// ランキング画像
const FourthRaknkingImageCover = styled.img`
  width: 60%;
  height: auto;
  object-fit: contain;
  margin-top: 40px;
  max-width: 100%
`;

// フィフスのラッパー
const FifthWrapper = styled.div`
  text-align: center;
  background-color: ${COLORS.SUB};
  padding-top: 110px;
  padding-bottom: 100px;
`;

// ゲームコンテンツのラッパー
const GameContentsWrapper = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: space-evenly;
  frex-direction: row;
  flex-wrap: wrap;
`;

// フラッシュメッセージを浮かせる
const CustomDiv = styled.div`
  position: absolute;
  z-index: 0;
  right: 0;
`;

export const LandingPages = () => { 

  // モーダルに関するstateの初期値
  const loginInitialState = {
    isOpenDialog: false,
    modalType: ""
  }

  // モーダルを管理するstate
  const [state, setState] = useState(loginInitialState);

  // useContext
  const {
    requestUserState: { 
      sessionState, 
      battleAudioState 
    }, 
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  // location
  const location = useLocation();

  // navigation
  const navigate = useNavigate();

  // 初めてLPページに訪れた場合、ログインしていないので、
  // dispatchのdata.sessionはfalseとなる
  useLayoutEffect(() => {
    if(sessionState === false){
      checkLoginStatus().then((data) => {
        dispatch({
          type: requestUserActionTyps.REQUEST_SUCCESS,
          payload: {
            session: data.session,
            user: data.user,
          }
        });
      }).catch((e) => {
        if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
          dispatch({
            type: requestUserActionTyps.REQUEST_FAILURE,
            payload: {
              errors: e.response.data.errors
            }
          });
        } else {
          throw e;
        }
      })
    }
  }, [
    dispatch, 
    sessionState,
    requestUserActionTyps.REQUEST_SUCCESS,
    requestUserActionTyps.REQUEST_FAILURE
  ]);

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
      <Header 
        onClickLink={(modalType) => setState({
          isOpenDialog: true,
          modalType: modalType
        })}
      />
      <FakeHeader />
      <MainWrapper>
        <BackGroundImageCover src={BackGroundImage} alt="main-image" />
        <CustomDiv>
        <Alert variant="filled" severity="success">
          This is a success alert — check it out!
        </Alert>
        </CustomDiv>
        <MainTitleImageCover src={MainTitleImage} alt="main-title"/>
        <Filter />
        <MainMonsterImageCover src={MainMonsterImage} alt="main-monster" />
        <SubText color={COLORS.SUB}>
          正規表現を学ぶ狩りに出よう
        </SubText>
        <Scroll to="gameContent" smooth={true}>
          <StartButton />
        </Scroll>
        <Scroll to="what'sRegex" smooth={true}>
          <BoundDescriptionSentence />
        </Scroll>
      </MainWrapper>
      <SecondWrapper id="what'sRegex">
        <SubText>
          What's Regex Hunting ?
        </SubText>
        <GameDescriptionSentence>
          Regex Huntingは、凶悪なモンスターを倒しながら<br/>
          正規表現が学べるゲーム型学習サービスです。
        </GameDescriptionSentence>
        <SecondBattleSceneImageCover src={BattleSceneImage} alt="battle-scene"/>
      </SecondWrapper>
      <ThirdWrapper>
        <GameDescriptionSentence>
          アカウント作成すると、学習頻度や正答数の推移を<br />確認できます。
        </GameDescriptionSentence>
        <ThirdMyPageImageCover src={MyPageImage} alt="my-page" />
      </ThirdWrapper>
      <FourthWrapper>
        <RankingDescriptionSentence>
          全世界のハンターと競争して、<br />最強の正規表現ハンターを目指そう！
        </RankingDescriptionSentence>
        <FourthRaknkingImageCover src={RaknkingImage} alt="ranking" />
      </FourthWrapper>
      <FifthWrapper id="gameContent">
        <GameStartDescriptionSentence>
          3種類のクエストをクリアして、正規表現を極めよう！
        </GameStartDescriptionSentence>
        <GameContentsWrapper> 
          <GameContent 
            difficulty='elementary' 
            image={ElementaryGameContentImage} 
          />
          <GameContent 
            difficulty='intermediate' 
            image={IntermediateGameContentImage} 
          />
          <GameContent 
            difficulty='advanced' 
            image={IntermediateGameContentImage} 
          />
        </GameContentsWrapper>
      </FifthWrapper>
      <Footer />
      {
        state.isOpenDialog && state.modalType === "login" &&
          <LoginDialog 
            isOpen={state.isOpenDialog}
            onClose={() => setState({
              isOpenDialog: false,
              modalType: ""
            })}
            onClick={() => setState({
              isOpenDialog: true,
              modalType: "signUp"
            })}
          />
      }
      {
        state.isOpenDialog && state.modalType === "signUp" &&
          <SignUpDialog 
            isOpen={state.isOpenDialog}
            onClose={() => setState({
              isOpenDialog: false,
              modalType: ""
            })}
            onClick={() => setState({
              isOpenDialog: true,
              modalType: "login"
            })}
          />
      }
    </>
  );
};
