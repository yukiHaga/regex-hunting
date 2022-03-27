import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';

import { BaseLink } from '../shared_style';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider";

// Colors
import { COLORS } from '../../style_constants.js';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../../constants';

// タイトルを設定した情報を取得するapiコール関数
import { patchTitleSetting } from '../../apis/titleSetting';

import { SetMyPageState } from '../../types/containers/myPages';

const TitleSettingButtonWrapper = styled(BaseLink)<{disabled: boolean}>`
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

/*
type TitleSettingButtonArg = {
  name: string;
  setMyPageState: ;
  disabled: boolean;
};
*/

type TitleSettingButtonArg = {
  name: string;
  setMyPageState: SetMyPageState;
  disabled: boolean;
};

export const TitleSettingButton = ({
  name,
  setMyPageState,
  disabled
}: TitleSettingButtonArg): JSX.Element => {

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

  // my-pageじゃなくて、/にすると、フラッシュメッセージが表示された
  const handleTitleSetting = () => {
    patchTitleSetting(user.id as number, name).then((data) => {
      dispatch({
        type: requestUserActionTyps.REQUEST_SUCCESS,
        payload: {
          session: data.session,
          user: data.user,
        }
      });
      setMyPageState((prev) =>({
        ...prev,
        isOpenDialog: false,
        name: "",
        releaseDate: "",
        releaseCondition: "",
        display: true,
        message: "称号を変更しました。"
      }));
    }).catch((e) => {
      if(e.response.status === HTTP_STATUS_CODE.BAD_REQUEST){
        setMyPageState((prev) =>({
          ...prev,
          isOpenDialog: false,
          name: "",
          releaseDate: "",
          releaseCondition: "",
          display: e.response.data.errors.display,
          message: e.response.data.errors.message
        }));
      } else {
        throw e;
      }
    });
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
