import React from 'react';
import styled from 'styled-components';

// MUI
import Avatar from '@mui/material/Avatar';

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
  width: 50%;
  height: 600px;
  background-color: ${COLORS.WHITE};
  margin: 0 auto;
`;

const AccountSettingBoxImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
`;

const AccountSettingBoxFormWrapper = styled.div`
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

export const AccountSettingBox = ({
  requestUserState
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
        message: "英数字, @, ドメインが含まれるメールアドレスを入力してください。"
      }
    }
  };

  // Formの検証後に呼び出される関数
  // dataにはフォームに入力したデータが入る
  // dataを実引数としてpostUserSeesionを呼び出した後、
  // postUserSessionで取得したdataを実引数として、dispatchを実行
  // reducer側でちゃんとstateは更新されている。
  // しかし、この関数内でstateをコンソール出力できない。
  const onSubmit = ({NameBox, EmailBox}) => { 
    return console.log(EmailBox);
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

  console.log(typeof errors.EmailBox);

  return (
    <>
      <AccountSettingBoxWrapper>
        <AccountSettingBoxImageWrapper>
          <Avatar
            alt="Hunter"
            src={TemporaryUserImage}
            sx={{ width: 250, height: 250 }}
          />
        </AccountSettingBoxImageWrapper>
        <AccountSettingBoxFormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller 
              name="NameBox"
              control={control}
              defaultValue=""
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
              defaultValue=""
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
            <LoginButton 
              disabled={!isValid} 
            />
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
