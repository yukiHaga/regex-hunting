import React, { Fragment, useState, useEffect, useLayoutEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

// Image
import MainTitleImage from '../images/main_title.png';
import GroupBackGroundImage from '../images/group_background.jpg';
import BattleSceneImage from '../images/battle_scene.jpg';
import MyPageImage from '../images/my_page_image.jpg';
import RaknkingImage from '../images/ranking_image.jpg';
import ElementaryGameContentImage from '../images/elementary_game_content.jpg';
import IntermediateGameContentImage from '../images/intermediate_game_content.jpg';
import AdvancedGameContentImage from '../images/advanced_game_content.jpg';

// Presentational Components
import { Header } from '../components/Headers/Header';
import { SubText } from '../components/SubText';
import { StartButton } from '../components/Buttons/StartButton'
import { Footer } from '../components/Footers/Footer';
import { LoginDialog } from '../components/Dialogs/LoginDialog';
import { SignUpDialog } from '../components/Dialogs/SignUpDialog';
import { SessionFlashMessage } from '../components/FlashMessages/SessionFlashMessage';
import { GameDescriptionSentence } from '../components/Sentences/GameDescriptionSentence';
import { RankingDescriptionSentence } from '../components/Sentences/RankingDescriptionSentence';
import { GameStartDescriptionSentence } from '../components/Sentences/GameStartDescriptionSentence';
import { GameContent } from '../components/GameContents/GameContent';
import { BoundDescriptionSentence } from '../components/Sentences/BoundDescriptionSentence';
import { SubTitleSentence } from '../components/Sentences/SubTitleSentence';
import { MobileFlashMessage } from '../components/FlashMessages/MobileFlashMessage';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

// Colors
import { COLORS } from '../style_constants';

// Responsive
import { WIDTH } from '../style_constants';

// react-scroll
import { Link as Scroll } from 'react-scroll';

// メインのラッパー
const MainWrapper = styled.div`
  text-align: center;
  position: relative;
  padding-top: 1.5%;
  @media (max-width: ${WIDTH.MOBILE}) {
    padding-top: 10%;
  }
`;

// メインタイトル画像
// max-widthはこの要素の最大幅を表す
// width1000pxより画面幅が小さい場合、画像が画面からはみ出てしまう(横スクロールしないといけない)。
// そのため、max-width(最大幅)を指定しておくと、画面幅がwidthより小さい場合でも、
// widthを自動的に画面幅に合わせてくれる
const MainTitleImageCover = styled.img`
  margin: 0 auto;
  width: 75%;
  height: auto;
  object-fit: contain;
  margin-top: 3.5%;
  max-width: 100%;
  height: auto;
  @media (max-width: ${WIDTH.MOBILE}) {
    margin-top: 30%;
    width: 90%;
  }
`;

// 背景画像
const BackGroundImageCover = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 0px;
  z-index: -4;
  max-width: 100%;
  @media (max-width: ${WIDTH.MOBILE}) {
    object-fit: cover;
  }
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

// セカンドのラッパー
const SecondWrapper = styled.div`
  text-align: center;
  background-color: ${COLORS.SUB};
  padding-top: 6%;
`;

// 戦闘画像
const SecondBattleSceneImageCover = styled.img`
  width: 60%;
  height: auto;
  object-fit: contain;
  margin-top: 4%;
  margin-bottom: 2%;
  max-width: 100%;
  @media (min-width: ${WIDTH.PC}) {
    width: 50%;
    margin-bottom: 0%;
  }
`;

// サードのラッパー
const ThirdWrapper = styled.div`
  text-align: center;
  background-color: ${COLORS.SUB};
  padding-top: 6%;
`;

// マイページ画像
const ThirdMyPageImageCover = styled.img`
  width: 60%;
  height: auto;
  object-fit: contain;
  margin-top: 4%;
  margin-bottom: 4%;
  max-width: 100%;
  @media (min-width: ${WIDTH.PC}) {
    width: 50%;
  }
`;

// フォースのラッパー
const FourthWrapper = styled.div`
  text-align: center;
  background-color: ${COLORS.SUB};
  padding-top: 6%;
`;

// ランキング画像
const FourthRaknkingImageCover = styled.img`
  width: 60%;
  height: auto;
  object-fit: contain;
  margin-top: 4%;
  margin-bottom: 4%;
  max-width: 100%;
  @media (min-width: ${WIDTH.PC}) {
    width: 50%;
  }
`;

// フィフスのラッパー
const FifthWrapper = styled.div`
  text-align: center;
  background-color: ${COLORS.SUB};
  padding-top: 4%;
  padding-bottom: 6%;
`;

// ゲームコンテンツのラッパー
const GameContentsWrapper = styled.div`
  padding-top: 4%;
  display: flex;
  justify-content: space-evenly;
  frex-direction: row;
  flex-wrap: wrap;
`;

export const LandingPages = (): JSX.Element => {

  // モーダルに関するstateの初期値
  const loginInitialState = {
    isOpenDialog: false,
    modalType: ""
  }

  // モーダルを管理するstate
  const [state, setState] = useState(loginInitialState);

  // モバイルに関するstateの初期値
  const mobileInitialState = {
    display: false,
    message: ""
  }

  // モバイルを管理するstate
  const [mobileState, setMobileState] = useState(mobileInitialState);

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

  // 初めてLPページに訪れた場合、ログインしていない為、
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
        setMobileState={setMobileState}
      />
      <MainWrapper>
        {
          location.state &&
            <SessionFlashMessage
              location={location}
            />
        }
        <MobileFlashMessage
          display={mobileState.display}
          message={mobileState.message}
          setMobileState={setMobileState}
        />
        <BackGroundImageCover width="868" height="495" src={GroupBackGroundImage} alt="main-image" />
        <MainTitleImageCover width="1187" height="354" src={MainTitleImage} alt="main-title"/>
        <Filter />
        <SubTitleSentence color={COLORS.SUB}>
          正規表現を学ぶ狩りに出よう
        </SubTitleSentence>
        <Scroll to="gameContent" smooth={true}>
          <StartButton />
        </Scroll>
        <Scroll to="what'sRegex" smooth={true}>
          <BoundDescriptionSentence />
        </Scroll>
      </MainWrapper>
      <SecondWrapper id="what'sRegex">
        <SubText>
          What's Regex Hunting？
        </SubText>
        <GameDescriptionSentence>
          Regex Huntingは、凶悪なモンスターを倒しながら<br/>
          正規表現が学べる学習ゲームです。
        </GameDescriptionSentence>
        <SecondBattleSceneImageCover width="821" height="450" src={BattleSceneImage} alt="battle-scene"/>
      </SecondWrapper>
      <ThirdWrapper>
        <GameDescriptionSentence>
          アカウント作成すると、学習頻度や最速タイムを<br />確認できます。
        </GameDescriptionSentence>
        <ThirdMyPageImageCover width="914" height="501" src={MyPageImage} alt="my-page" />
      </ThirdWrapper>
      <FourthWrapper>
        <RankingDescriptionSentence>
          全世界のハンターと競争して、<br />最強の正規表現ハンターを目指そう！
        </RankingDescriptionSentence>
        <FourthRaknkingImageCover width="914" height="500" src={RaknkingImage} alt="ranking" />
      </FourthWrapper>
      <FifthWrapper id="gameContent">
        <GameStartDescriptionSentence>
          3種類のクエストをクリアして、正規表現を極めよう！
        </GameStartDescriptionSentence>
        <GameContentsWrapper>
          <GameContent
            difficulty='elementary'
            image={ElementaryGameContentImage}
            setMobileState={setMobileState}
          />
          <GameContent
            difficulty='intermediate'
            image={IntermediateGameContentImage}
            setMobileState={setMobileState}
          />
          <GameContent
            difficulty='advanced'
            image={AdvancedGameContentImage}
            setMobileState={setMobileState}
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
