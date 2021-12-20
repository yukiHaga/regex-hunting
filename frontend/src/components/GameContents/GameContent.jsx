import React from 'react';
import styled from 'styled-components';

// Colors
import { COLORS } from '../../style_constants.js';

const GameContentWrapper = styled.div`
  background-color: ${COLORS.WHITE};
  width: 350px;
`;

const GameContentTitleWrapper = styled.div`
  height: 36px;
  width: 350px;
  font-family: YuGothic;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
  color: ${COLORS.BLACK};
  text-align: center;
`;

const GameContentDescriptionWrapper = styled.div`
  width: 350px;
  height: 350px;
`;

// ブロック要素じゃないので、もしかしたら直列に並ばないかも
// 使用するときに、propsのsrc属性を渡す。
const GameContentImageWrapper = styled.img`
  width: 350px;
  height: 190px;
  box-sizing: border-box;
  border: 2px solid ${COLORS.BLACK};
`;

// GameContentMainWrapper

// GameContentSentenceWrapper

// GameContentStartWrapper

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
    dispatch({ type: requestUserActionTyps.REQUEST });
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
          <HeaderTitleImage src={TitleImage} alt="main logo" />  
        </HeaderTitleLink>
        <HeaderNav>
          <HeaderNavLink to={`/rankings`}>
            ランキング
          </HeaderNavLink>
          {
            sessionState === false && 
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
                <HeaderNavFakeLink onClick={handleLogout}>
                  ログアウト
                </HeaderNavFakeLink>
              </>
          }
        </HeaderNav>
      </HeaderWrapper>
    </>
  );
};
