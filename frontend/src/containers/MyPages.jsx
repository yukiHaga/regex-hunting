import React, { Fragment, useContext, useLayoutEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';
import { SessionFlashMessage } from '../components/FlashMessages/SessionFlashMessage.jsx';
import { StatusExperienceBox } from '../components/Games/StatusExperienceBox.jsx';
import { StudyHeatMap } from '../components/Games/StudyHeatMap.jsx';
import { CorrectPercentGraph } from '../components/Games/CorrectPercentGraph.jsx';
import { ChangeGraphBox } from '../components/Games/ChangeGraphBox.jsx';
import { DescriptionWrapper } from '../components/shared_style.js';
 
// Images
import TemporaryUserImage from '../images/temporary_user_image.png';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// ログイン状態を確認するAPIコール関数
import { checkLoginStatus } from '../apis/checkLoginStatus.js'; 

// マイページの情報を取得するAPIコール関数
import { getMyPageInfo } from '../apis/mypage.js'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

// Colors
import { COLORS } from '../style_constants.js';

// グラフのx座標とy座標を生成する関数 
import { makeCorrectPercentGraphData } from '../functions/makeCorrectPercentGraphData.js'

const FakeBlock = styled.div`
  background-color: ${COLORS.SUB};
  height: 56px;
`;

// メインのラッパー
const MainWrapper = styled.div`
  background-color: ${COLORS.SUB};
`;

// Mainのfirstラッパー
const MainFirstWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

// Mainのsecondラッパー
const MainSecondWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 40px;
`;

// ステータスのラッパー
const StatusWrapper = styled.div`
  width: 700px;
  height: 260px;
  border-radius: 3px;
  background-color: ${COLORS.WHITE};
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
  display: flex
`;

// イメージのラッパー
const ImageWrapper = styled.div`
  width: 220px;
  height: 220px;
  background-color: ${COLORS.WHITE};
  border-radius: 3px;
  align-self: center;
  padding: 16px;
`;

// カスタムイメージ
// imageタグだと縦横比を維持できない
// background-imageだと縦横比を維持できる
const CustomImage = styled.div`
  background-image: url(${TemporaryUserImage});
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background-size: cover;
  background-position: center center;
  border: 3px solid silver;
  box-shadow: inset 1px 1px 3px 0 rgba(0, 0, 0, 0.8), 1px 1px 0 0 rgba(255, 255, 255, 0.12);
`;

const TableWrapper = styled.div`
  align-self: center;
`;

const CustomTable = styled.table`
  width: 430px;
  border-collapse: collapse;
  color: ${COLORS.BLACK};
  font-family: YuGothic;
  font-weight: normal;
  font-size: 18px;
  margin: 0 auto;
  border: none;
`;

const CustomTd = styled.td`
  padding: 10px 40px; 
  border: none;
  text-align: right;
  border-bottom:solid 1px silver;
`;

const NameTd = styled(CustomTd)`
  font-family: YuGothic;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  text-align: left;
  color: ${COLORS.BLACK};
`;

const MetaTd = styled(CustomTd)`
  padding: 10px 40px; 
  border: none;
  text-align: left;
  border-bottom:solid 1px silver;
  font-weight: bold;
`;

const ExpTd = styled(CustomTd)`
  text-align: left;
  border: none;
`;

const StudyHeatMapWrapper = styled.div`
  width: 400px;
  background-color: ${COLORS.SUB};
`;

const CorrectPercentGraphWrapper = styled.div`
  background-color: ${COLORS.WHITE};
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
`;

const ChangeGraphBoxWrapper = styled.div`
  width: 400px;
  border-radius: 3px;
  background-color: ${COLORS.WHITE};
  box-shadow: 0 0px 20px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
`;

export const MyPages = () => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { 
    requestUserState: { 
      sessionState,
      userState: { user }
    },
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  // myPageStateの最初の状態
  const initialState = {
    game_frequencies_per_day: [],
    elementary_correct_percents: [],
    intermediate_correct_percents: [],
    advanced_correct_percents: [],
    owned_titles: [],
    ele_fastest_time: 0,
    int_fastest_time: 0,
    adv_fastest_time: 0,
    elementary_graph_data: {},
    intermediate_graph_data: {},
    advanced_graph_data: {}
  };

  // MyPageの状態を管理するstate
  const [myPageState, setMyPageState] = useState(initialState);

  // ブラウザをリロードしてもログイン状態を維持するためのuseEffect
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
    requestUserActionTyps.REQUEST, 
    requestUserActionTyps.REQUEST_SUCCESS,
    requestUserActionTyps.REQUEST_FAILURE
  ]);

  // 今日
  const today = useMemo(() => new Date(), []);

  // 今月の月初
  const this_month_first_day = useMemo(() => new Date(
    today.setDate(1)
  ), [
    today
  ]);

  // 前月の月末
  const prev_month_end_day = useMemo(() => new Date(
    this_month_first_day.setDate(0)
  ), [
    this_month_first_day
  ]);

  // 来月の月初
  const next_month_later_today = useMemo(() => new Date(
    today.setMonth(today.getMonth() + 1)
  ), [
    today
  ]);

  // 今月の月末
  const this_month_end_day = useMemo(() => new Date(
    next_month_later_today.setDate(0)
  ), [
    next_month_later_today
  ]);

  // マイページの情報を取得するuseLayoutEffect
  // 初回マウント時とuserが変化したタイミングで実行される
  // user存在時のみ発動するように、if文で制御した
  useLayoutEffect(() => {
    if(Object.keys(user).length){
      getMyPageInfo(user).then((data) => {
        const elementary_graph_data = makeCorrectPercentGraphData(
          data.elementary_correct_percents,
          this_month_first_day,
          this_month_end_day
        );
        const intermediate_graph_data = makeCorrectPercentGraphData(
          data.intermediate_correct_percents,
          this_month_first_day,
          this_month_end_day
        );
        const advanced_graph_data = makeCorrectPercentGraphData(
          data.advanced_correct_percents,
          this_month_first_day,
          this_month_end_day
        )
        setMyPageState((prev) => ({
          ...prev,
          game_frequencies_per_day: data.game_frequencies_per_day,
          elementary_correct_percents: data.elementary_correct_percents,
          intermediate_correct_percents: data.intermediate_correct_percents,
          advanced_correct_percents: data.advanced_correct_percents,
          owned_titles: data.owned_titles,
          ele_fastest_time: data.ele_fastest_time,
          int_fastest_time: data.int_fastest_time,
          adv_fastest_time: data.adv_fastest_time,
          elementary_graph_data: elementary_graph_data,
          intermediate_graph_data: intermediate_graph_data,
          advanced_graph_data: advanced_graph_data
        })); 
      }).catch((e) => {
        if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
          setMyPageState((prev) => ({
            ...prev,
          })); 
        } else {
          throw e;
        }
      });
    }
  }, [
    user,
    this_month_first_day,
    this_month_end_day
  ]);

  // location
  const location = useLocation();

  // navigation
  const navigate = useNavigate();
  
  console.log(myPageState)

  return (
    <>
      <Header /> 
      <FakeHeader />
      <FakeBlock>
        <SessionFlashMessage
          location={location}
          navigate={navigate}
          url='/my-page'
        />
      </FakeBlock>
      <MainWrapper>
        <MainFirstWrapper>
          <StatusWrapper>
            <ImageWrapper>
              <CustomImage />
            </ImageWrapper>
            <TableWrapper>
              <CustomTable>
                <tbody>
                  <tr>
                    <NameTd colSpan={2}>{user.name}</NameTd> 
                  </tr>
                  <tr>
                    <MetaTd>ランク</MetaTd> 
                    <CustomTd>{user.rank}</CustomTd>
                  </tr>
                  <tr>
                    <MetaTd>称号</MetaTd> 
                    <CustomTd>{user.active_title}</CustomTd>
                  </tr>
                  <tr>
                    <ExpTd colSpan={2}>
                      <StatusExperienceBox 
                        temporary_experience={user.temporary_experience}
                        total_experience={user.total_experience}
                        maximum_experience_per_rank={user.maximum_experience_per_rank}
                      />
                    </ExpTd>
                  </tr>
                </tbody>
              </CustomTable>
            </TableWrapper>
          </StatusWrapper>
          <StudyHeatMapWrapper>
            <StudyHeatMap 
              game_frequencies_per_day={myPageState.game_frequencies_per_day}
              today={today}
              this_month_first_day={this_month_first_day}
              prev_month_end_day={prev_month_end_day}
              next_month_later_today={next_month_later_today}
              this_month_end_day={this_month_end_day}
            />
          </StudyHeatMapWrapper>
        </MainFirstWrapper>
        <MainSecondWrapper>
          <CorrectPercentGraphWrapper>
            <CorrectPercentGraph 
              elementary_graph_data={
                myPageState.elementary_graph_data
              }
            />
          </CorrectPercentGraphWrapper>
          <ChangeGraphBoxWrapper>
            <ChangeGraphBox 
              ele_fastest_time={myPageState.ele_fastest_time}
              int_fastest_time={myPageState.int_fastest_time}
              adv_fastest_time={myPageState.adv_fastest_time}
              elementary_correct_percents={
                myPageState.elementary_correct_percents
              }
              intermediate_correct_percents={
                myPageState.intermediate_correct_percents
              }
              advanced_correct_percents={
                myPageState.advanced_correct_percents
              }
            />
          </ChangeGraphBoxWrapper>
        </MainSecondWrapper>
        アイウエオ<br />柿くけこ
      </MainWrapper>
    </>
  );
};
