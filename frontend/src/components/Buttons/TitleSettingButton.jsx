import React, { Fragment, useContext } from 'react'; 
import styled from 'styled-components';

import { BaseLink } from '../shared_style';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

// Colors
import { COLORS } from '../../style_constants.js';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../../constants';

// タイトルを設定した情報を取得するapiコール関数
import { patchTitleSetting } from '../../apis/titleSetting.js';

const TitleSettingButtonWrapper = styled(BaseLink)`
  border-style: none;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: 0.3s;
  :hover {
    box-shadow: 0 0 2px rgba(0,0,0,0.2);
  }
  padding: 2.8%;
  background-color: ${COLORS.MAIN};
  opacity: ${({disabled}) => disabled ? 0.7 : 1};
  pointer-events: ${({disabled}) => disabled ? 'none' : 'auto'};
`;

const TitleSettingButtonTextWrapper = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 1.1em;
  color: ${COLORS.WHITE};
  text-align: center;
`;

export const TitleSettingButton = ({
  name,
  setMyPageState,
  disabled
}) => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { 
    requestUserState: { 
      userState: { user }
    },
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  const handleTitleSetting = () => {
    patchTitleSetting(user, name).then((data) => {
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
    });
    setMyPageState((prev) =>({
      ...prev,
      isOpenDialog: false,
      name: "",
      release_date: "",
      release_condition: ""
    }));
  };

  return (
    <>
      <TitleSettingButtonWrapper 
        to={'/my-page'} 
        onClick={handleTitleSetting}
        disabled={disabled}
      >
        <TitleSettingButtonTextWrapper>
          称号を変更する
        </TitleSettingButtonTextWrapper>
      </TitleSettingButtonWrapper>
    </>
  );
};
