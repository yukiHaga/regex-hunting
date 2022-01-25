import React, { Fragment, useRef, useContext } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';
import { Footer } from '../components/Footers/Footer.jsx';
import { PasswordUpdatesButton } from '../components/Buttons/PasswordUpdatesButton.jsx';

// Colors
import { COLORS } from '../style_constants.js';

// React Hook Form
import { useForm, Controller } from "react-hook-form";

// フォーム関係のコンポーネント
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';

// Sentence
import { InputErrorSentence } from '../components/Sentences/InputErrorSentence.jsx';

// パスワードリセットを更新するapiコール関数

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

const FakeBlock = styled.div`
  background-color: ${COLORS.SUB};
  height: 56px;
`;

// メインのラッパー
const MainWrapper = styled.div`
  background-color: ${COLORS.SUB};
  padding-top: 45px;
  padding-bottom: 98px;
`;

const PasswordUpdatesBoxWrapper = styled.div`
  width: 40%;
  height: 480px;
  background-color: ${COLORS.WHITE};
  margin: 0 auto;
  border-radius: 3px;
`;

const TitleWrapper = styled.h2`
  margin-bottom: 30px;
  font-family: YuGothic;
  font-style: normal;
  color: ${COLORS.BLACK};
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 40px;
  padding-top: 65px;
  width: 70%;
  margin: 0 auto;
`;

const CustomParagraphWrapper = styled.p`
  font-family: YuGothic;
  font-style: normal;
  font-size: 1.1em;
  color: ${COLORS.BLACK};
  width: 70%;
  margin: 0 auto;
  margin-bottom: 30px;
  overflow-wrap: break-word;
`;

const PasswordUpdatesFormWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 50px; 
`;

const CustomFilledPasswordInput = styled(FilledInput)`
  width: 400px;
  margin-bottom: ${({
    errors_password_box
  }) => typeof errors_password_box === 'undefined' && '16px' };
`;

const CustomFilledPasswordConfirmationInput = styled(FilledInput)`
  width: 400px;
  margin-bottom: ${({
    errors_password_confirmation_box
  }) => typeof errors_password_confirmation_box === 'undefined' && '16px' };
`;

const PasswordUpdatesButtonWrapper = styled.div`
  margin-top: 16px;
`;

export const PasswordUpdates = () => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { 
    requestUserActionTyps
  } = useContext(UserContext);

  // navigation
  const navigate = useNavigate();

  // useForm
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isValid },
    watch
  } = useForm({
    mode: 'all',
    shouldUnregister: false 
  }); 

  // refObject(password)を定義
  // refObjectのcurrentプロパティにwatchの初期値("")を代入
  // watchは、PasswordBoxというname属性を持つinput要素を監視している。
  // useRefを使う理由は、モーダルのコンポーネント内で値を保持する為。
  // useRefの場合、変数の値を更新しても再レンダリングは起きない。
  // モーダルコンポーネントが再レンダリングするたびに、
  // password.currentにwatchしている値が代入される。
  const password = useRef();
  password.current = watch("PasswordBox", "")

  // Formのバリデーション
  const registerOptions = {
    password: {
      required: "パスワードを入力してください。",
      minLength: {
        value: 8,
        message: "8文字以上のパスワードを入力してください。"
      },
      pattern: {
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)[!-~]+$/,
        message: "大文字, 小文字, 数字が含まれるパスワードを入力してください。"
      }
    },
    passwordConfirmation: {
      required: "確認用のパスワードを入力してください。",
      minLength: {
        value: 8,
        message: "8文字以上の確認用パスワードを入力してください。"
      },
      pattern: {
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)[!-~]+$/,
        message: "大文字, 小文字, 数字が含まれるパスワードを入力してください。"
      },
      validate: {
        confirmPassword: (value) => value === password.current || "パスワードが一致しません。" 
      }  
    }
  };

  // Formの検証後に呼び出される関数
  // dataにはフォームに入力したデータが入る
  const onSubmit = ({ EmailBox }) => { 
    console.log(EmailBox);
    /*
    postPasswordResetRequest({
      email: EmailBox
    }).then(() => (
      navigate('/?user=password_reset', { 
        state: { display: true, success: "メールを送信しました。"}
      })
    )).catch((e) => {
      if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
      } else {
        throw e;
      }
    })
    */
  };

  return (
    <>
      <Header /> 
      <FakeHeader />
      <FakeBlock />
      <MainWrapper>
        <PasswordUpdatesBoxWrapper>
          <TitleWrapper>
            パスワード再設定
          </TitleWrapper>
          <CustomParagraphWrapper>
            新しいパスワードを入力してください
          </CustomParagraphWrapper>
          <PasswordUpdatesFormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller 
                name="PasswordBox"
                control={control}
                defaultValue=""
                rules={registerOptions.password}
                render={({ field }) => (
                  <FormControl variant="filled">              
                    <InputLabel htmlFor="password-component-filled">パスワード</InputLabel>
                    <CustomFilledPasswordInput
                      {...field}
                      type="password"
                      id="password-component-filled"
                      label="password"
                      errors_password_box={errors.PasswordBox}
                    />
                  </FormControl>              
                )}
              />
              {errors.PasswordBox && <InputErrorSentence>
                                       {errors.PasswordBox.message}
                                     </InputErrorSentence>}
              <Controller 
                name="PasswordConfirmationBox"
                control={control}
                defaultValue=""
                rules={registerOptions.passwordConfirmation}
                render={({ field }) => (
                  <FormControl variant="filled">              
                    <InputLabel htmlFor="password-confirmation-component-filled">
                      パスワード(確認用)
                    </InputLabel>
                    <CustomFilledPasswordConfirmationInput
                      {...field}
                      type="password"
                      id="password-confirmation-component-filled"
                      label="password-confirmation"
                      errors_password_confirmation_box={errors.PasswordConfirmationBox}
                    />
                  </FormControl>              
                )}
              />
              {errors.PasswordConfirmationBox && <InputErrorSentence>
                                                   {errors.PasswordConfirmationBox.message}
                                                 </InputErrorSentence>}
              <PasswordUpdatesButtonWrapper>
                <PasswordResetRequestButton 
                  disabled={!isValid} 
                />
              </PasswordUpdatesButtonWrapper>
            </form>
          </PasswordUpdatesFormWrapper>
        </PasswordUpdatesBoxWrapper>
      </MainWrapper>
      <Footer />
    </>
  );
};
