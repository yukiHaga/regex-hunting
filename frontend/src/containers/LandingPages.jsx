import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Image
import MainTitleImage from '../images/main_title.png';
import BackGroundImage from '../images/background.png';
import MainMonsterImage from '../images/intermediate.png';
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
import { Footer } from '../components/Footer.jsx';
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

// メインのラッパー
const MainWrapper = styled.div`
  text-align: center;
`;

// メインタイトル画像
const MainTitleImageCover = styled.img`
  width: 1000px;
  height: 180px;
  object-fit: contain;
  margin-top: 145px;
`;

// 背景画像
const BackGroundImageCover = styled.img`
  width: 1790px;
  height: 750px;
  position: absolute;
  top: 55px;
  left: -350px;
  z-index: -4;
`;

// フィルター
const Filter = styled.span`
  width: 1790px;
  height: 750px;
  position: absolute;
  top: 55px;
  left: -350px;
  z-index: -2;
  background-color: rgba(102,102,102,0.5)
`;

// メインモンスター画像
const MainMonsterImageCover = styled.img`
  width: 1000px;
  height: 700px;
  object-fit: contain;
  z-index: -3;
  position: absolute;
  top: 55px;
  left: 200px;
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
  width: 650px;
  height: 400px;
  object-fit: contain;
  margin-top: 40px;
  margin-bottom: 20px;
`;

// サードのラッパー
const ThirdWrapper = styled.div`
  text-align: center;
  background-color: ${COLORS.SUB};
  padding-top: 110px;
`;

// マイページ画像
const ThirdMyPageImageCover = styled.img`
  width: 650px;
  height: 400px;
  object-fit: contain;
  margin-bottom: 20px;
`;

// フォースのラッパー
const FourthWrapper = styled.div`
  text-align: center;
  background-color: ${COLORS.SUB};
  padding-top: 110px;
`;

// ランキング画像
const FourthRaknkingImageCover = styled.img`
  width: 650px;
  height: 400px;
  object-fit: contain;
  margin-top: 40px;
`;

// フィフスのラッパー
const FifthWrapper = styled.div`
  text-align: center;
  background-color: ${COLORS.SUB};
  padding-top: 140px;
  padding-bottom: 150px;
`;

// ゲームコンテンツのラッパー
const GameContentsWrapper = styled.div`
  padding-top: 80px;
  display: flex;
  justify-content: space-evenly;
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
    requestUserState: { sessionState }, 
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  // location
  const location = useLocation();

  // navigation
  const navigate = useNavigate();

  // 初めてLPページに訪れた場合、ログインしていないので、
  // 2回目のdispatchのdata.sessionはfalseとなる
  useEffect(() => {
    if(sessionState === false){
      dispatch({ type: requestUserActionTyps.REQUEST });
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
    requestUserActionTyps.REQUEST, 
    requestUserActionTyps.REQUEST_SUCCESS,
    requestUserActionTyps.REQUEST_FAILURE
  ]);

  return (
    <>
      <Header onClickLink={(modalType) => setState({
        isOpenDialog: true,
        modalType: modalType
      })}/>
      <FakeHeader />
      <FakeBlock>
        <SessionFlashMessage
          location={location}
          navigate={navigate}
          url='/'
        />
      </FakeBlock>
      <MainWrapper>
        <MainTitleImageCover src={MainTitleImage} alt="main-title"/>
        <Filter />
        <MainMonsterImageCover src={MainMonsterImage} alt="main-monster" />
        <BackGroundImageCover src={BackGroundImage} alt="back-ground"/> 
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
        <SecondBattleSceneImageCover src={BattleSceneImage} alt="battle-scene"/>
        <GameDescriptionSentence>
          Regex Huntingは、凶悪なモンスターを倒しながら<br/>
          正規表現が学べるゲーム型学習サービスです。
        </GameDescriptionSentence>
      </SecondWrapper>
      <ThirdWrapper>
        <ThirdMyPageImageCover src={MyPageImage} alt="my-page" />
        <GameDescriptionSentence>
          アカウント作成すると、学習頻度や正答率の推移を<br/> 
          確認できます。
        </GameDescriptionSentence>
      </ThirdWrapper>
      <FourthWrapper>
        <RankingDescriptionSentence>
          全世界のハンターと競争して、最強の正規表現ハンターを目指そう！
        </RankingDescriptionSentence>
        <FourthRaknkingImageCover src={RaknkingImage} alt="ranking" />
      </FourthWrapper>
      <FifthWrapper id="gameContent">
        <GameStartDescriptionSentence>
          3種類の難易度のゲームをクリアして、正規表現を極めよう！
        </GameStartDescriptionSentence>
        <GameContentsWrapper> 
          <GameContent difficulty='初級' image={ElementaryGameContentImage} />
          <GameContent difficulty='中級' image={IntermediateGameContentImage} />
          <GameContent difficulty='上級' image={IntermediateGameContentImage} />
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
