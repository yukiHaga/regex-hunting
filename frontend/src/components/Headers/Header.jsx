import React, { useContext } from 'react';
import styled from 'styled-components';

// アイコン付きメニュー
import { IconMenu } from '../Games/IconMenu.jsx' 

// Images
import TitleImage from '../../images/title.png';

// Colors
import { COLORS } from '../../style_constants.js';

// BaseLink
import { BaseLink, FakeLink } from '../shared_style.js';
 
// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

// ログイン関係のAPIコール関数
import { deleteUserSession } from '../../apis/login'; 

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../../constants';

// useNavigate
import { useNavigate } from "react-router-dom";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${COLORS.MAIN};
  width: 100%;
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
  position: fixed;
  z-index: 1;
  background-image: -webkit-linear-gradient(rgba(255,255,255,.3) 0%,transparent 30%,transparent 30%,rgba(0,0,0,.1) 100%);
  background-image:         linear-gradient(rgba(255,255,255,.3) 0%,transparent 30%,transparent 30%,rgba(0,0,0,.1) 100%);
  box-shadow: 0 2px 2px 0 rgba(255,255,255,.1) inset,0 2px 10px 0 rgba(255,255,255,.2) inset,0 -2px 2px 0 rgba(0,0,0,.1) inset;
  border: 1px solid rgba(0,0,0,.2);
`;

// title
const TitleWrapper = styled.div`
  width: 245px;
  height: 45px;
  font-family: Raleway;
  font-style: italic;
  font-weight: bold;
  font-size: 27px;
  line-height: 45px;
  color: ${COLORS.SUB};
  -webkit-text-stroke: 5px #030002;
  text-stroke: 5px #030002;
  padding: 5px;
  margin-left: 30px;
  position: relative;
`

// fuchiue
const Fuchiue = styled.span`
  -webkit-text-stroke: 0;
  position: absolute;
`

const HeaderTitleImage = styled.img`
  width: 245px;
  height: 42px;
  padding: 5px;
  margin-left: 10px;
  object-fit: contain;
`;

const HeaderNav = styled.nav`
  margin-right: 40px;
`;

const HeaderTitleLink = styled(BaseLink)``;

const HeaderNavLink = styled(BaseLink)`
  height: 52px;
  line-height: 52px;
  display: inline-block;
  color: ${COLORS.SUB};
  margin-left: 20px; 
  :hover {
    opacity: 0.7;
    border-bottom: solid ${COLORS.SUB};
  }
`;

const HeaderNavFakeLink = styled(FakeLink)`
  height: 52px;
  line-height: 52px;
  display: inline-block;
  color: ${COLORS.SUB};
  margin-left: 20px; 
  :hover {
    opacity: 0.7;
    border-bottom: solid ${COLORS.SUB};
  }
`;

// LPページの場合、onClickLinkはモーダル管理のstateを更新する関数
// ログインしている場合、onClickLinkは何もない。
export const Header = ({onClickLink}) => {

  // navigate
  let navigate = useNavigate();

  // useContext
  const {
    requestUserState: { sessionState, userState }, 
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  // ログアウトを管理する関数
  const handleLogout = () => {
    deleteUserSession().then((data) => {
      dispatch({
        type: requestUserActionTyps.REQUEST_SUCCESS,
        payload: {
          session: data.session,
          user: data.user,
        }
      });
    }).then(() => 
      navigate('/?user=logout', { state: { display: true, success: "ログアウトしました。"}})
    ).catch((e) => {
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
    });
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderTitleLink to={`/`}>
          <TitleWrapper>
            <Fuchiue>
              Regex Hunting
            </Fuchiue>
            Regex Hunting
          </TitleWrapper>
        </HeaderTitleLink>
        <HeaderNav>
          <HeaderNavLink to={`/rankings`}>
            ランキング
          </HeaderNavLink>
          {
            sessionState === false && onClickLink && 
              <>
                <HeaderNavFakeLink onClick={() => onClickLink("login")}>
                  ログイン
                </HeaderNavFakeLink>
                <HeaderNavFakeLink onClick={() => onClickLink("signUp")}>
                  無料会員登録
                </HeaderNavFakeLink>
              </>
          }
          { 
            sessionState && userState && 
              <>
                <HeaderNavFakeLink>
                  <IconMenu 
                    handleLogout={handleLogout}
                  />
                </HeaderNavFakeLink>
              </>
          }
        </HeaderNav>
      </HeaderWrapper>
    </>
  );
};
