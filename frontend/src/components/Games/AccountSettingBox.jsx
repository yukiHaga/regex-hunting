import React from 'react';
import styled from 'styled-components';

// MUI
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// Colors
import { COLORS } from '../../style_constants.js';

// Images
import TemporaryUserImage from '../../images/temporary_user_image.png';

// React Hook Form
import { useForm, Controller } from "react-hook-form";

// フォーム関係のコンポーネント
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';

// Sentence
import { InputErrorSentence } from '../Sentences/InputErrorSentence.jsx';
import { SubmitErrorSentence } from '../Sentences/SubmitErrorSentence.jsx';

// Button
import { LoginButton } from '../Buttons/LoginButton.jsx'

const AccountSettingBoxWrapper = styled.div`
  width: 40%;
  height: 580px;
  background-color: ${COLORS.WHITE};
  margin: 0 auto;
`;

const AccountSettingBoxImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const AccountSettingBoxFormWrapper = styled.div`
  width: 402px;
  margin: 0 auto;
`;

const CustomFilledNameInput = styled(FilledInput)`
  width: 400px;
  margin-bottom: ${({
    errors_name_box
  }) => typeof errors_name_box === 'undefined' && '16px' };
`;

const CustomFilledEmailInput = styled(FilledInput)`
  width: 400px;
  margin-bottom: ${({
    errors_email_box
  }) => typeof errors_email_box === 'undefined' && '16px' };
`;

const AccoutSettingButtonWrapper = styled.div`
  margin-top: 16px;
`;

export const AccountSettingBox = ({
  requestUserState,
  user
}) => {

  // useForm
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isValid } 
  } = useForm({
    mode: 'all',
    shouldUnregister: false 
  }); 

  // Formのバリデーション
  const registerOptions = {
    name: {
      required: "名前を入力してください。",
      minLength: {
        value: 2,
        message: "2文字以上の名前を入力してください。"
      },
      maxLength: {
        value: 10,
        message: "10文字以下の名前を入力してください。"
      },
    },
    email: { 
      required: "メールアドレスを入力してください。", 
      pattern: {
        value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/,
        message: "英数字, @, ドメインを含めて入力してください。"
      }
    }
  };

  // Formの検証後に呼び出される関数
  // dataにはフォームに入力したデータが入る
  // dataを実引数としてpostUserSeesionを呼び出した後、
  // postUserSessionで取得したdataを実引数として、dispatchを実行
  // reducer側でちゃんとstateは更新されている。
  // しかし、この関数内でstateをコンソール出力できない。
  const onSubmit = ({NameBox, EmailBox, OpenRankBox}) => { 
    return console.log(OpenRankBox);
  };

  /*
    postUserSession({
      user: {
        email: EmailBox,
        password: PasswordBox
      }
    }).then((data) => {
      dispatch({
        type: requestUserActionTyps.REQUEST_SUCCESS,
        payload: {
          session: data.session,
          user: data.user,
        }
      });
    }).then(() => 
      navigate('/my-page?user=login', { state: { display: true, success: "ログインしました。"}})
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
    })
  */

  return (
    <>
      <AccountSettingBoxWrapper>
        <AccountSettingBoxImageWrapper>
          <Avatar
            alt="Hunter"
            src={TemporaryUserImage}
            sx={{ width: 200, height: 200 }}
          />
        </AccountSettingBoxImageWrapper>
        <AccountSettingBoxFormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller 
              name="NameBox"
              control={control}
              defaultValue={user.name}
              rules={registerOptions.name}
              render={({ field }) => (
                <FormControl variant="filled">              
                  <InputLabel htmlFor="name-component-filled">名前</InputLabel>
                  <CustomFilledNameInput
                    {...field}
                    type="text"
                    id="name-component-filled"
                    label="name"
                    errors_name_box={errors.NameBox}
                  />
                </FormControl>              
              )}
            />
            {errors.NameBox && <InputErrorSentence>
                                  {errors.NameBox.message}
                                </InputErrorSentence>}
            <Controller 
              name="EmailBox"
              control={control}
              defaultValue={user.email}
              rules={registerOptions.email}
              render={({ field }) => (
                <FormControl variant="filled">              
                  <InputLabel htmlFor="email-component-filled">メールアドレス</InputLabel>
                  <CustomFilledEmailInput
                    {...field}
                    type="email"
                    id="email-component-filled"
                    label="email"
                    errors_email_box={errors.EmailBox}
                  />
                </FormControl>              
              )}
            />
            {errors.EmailBox && <InputErrorSentence>
                                  {errors.EmailBox.message}
                                </InputErrorSentence>}
            <Controller 
              name="OpenRankBox"
              control={control}
              defaultValue=""
              render={({ field }) => (
                    <FormControlLabel
                      {...field}
                      key={1}
                      label='ランキングを公開する'
                      control={
                        <Checkbox 
                          {...field} 
                          defaultChecked={user.open_rank} 
                        />
                      }
                    />
              )}
            />
            <AccoutSettingButtonWrapper>
              <LoginButton 
                disabled={!isValid} 
              />
            </AccoutSettingButtonWrapper>
            {
              requestUserState.errors.title === 'Record Not Found' && 
                <SubmitErrorSentence>
                  {requestUserState.errors.detail}
                </SubmitErrorSentence>
            }
          </form>
        </AccountSettingBoxFormWrapper>
      </AccountSettingBoxWrapper>
    </>
  );
};
