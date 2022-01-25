import React, { Fragment } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

// Presentational Components
import { Header } from '../components/Headers/Header.jsx';
import { FakeHeader } from '../components/Headers/FakeHeader.jsx';
import { Footer } from '../components/Footers/Footer.jsx';
import { PasswordResetRequestButton } from '../components/Buttons/PasswordResetRequestButton.jsx';

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

// パスワードリセットコントローラへアクセスするapiコール関数
import { postPasswordResetRequest } from '../apis/passwordResetRequest.js';

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

const PasswordResetsBoxWrapper = styled.div`
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

const PasswordResetsFormWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 50px; 
`;

const CustomFilledEmailInput = styled(FilledInput)`
  width: 400px;
  margin-bottom: ${({
    errors_email_box
  }) => typeof errors_email_box === 'undefined' && '16px' };
`;

const PasswordResetsButtonWrapper = styled.div`
  margin-top: 16px;
`;

export const PasswordResets = () => {

  // navigation
  const navigate = useNavigate();

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
  const onSubmit = ({ EmailBox }) => { 
    postPasswordResetRequest({
      email: EmailBox
    }).then(() => (
      navigate('/users/password/sent?user=sent', { 
        state: { display: true, success: "パスワード再設定メールを送信しました。"}
      })
    )).catch((e) => {
      if(e.response.status === HTTP_STATUS_CODE.NOT_FOUND){
      } else {
        throw e;
      }
    })
  };

  return (
    <>
      <Header /> 
      <FakeHeader />
      <FakeBlock />
      <MainWrapper>
        <PasswordResetsBoxWrapper>
          <TitleWrapper>
            パスワードを忘れた場合
          </TitleWrapper>
          <CustomParagraphWrapper>
            ご登録いただいたメールアドレスを入力してください。メールアドレス宛に、パスワード変更ページのURLが記載されたメールを送信します。
          </CustomParagraphWrapper>
          <PasswordResetsFormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
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
              <PasswordResetsButtonWrapper>
                <PasswordResetRequestButton 
                  disabled={!isValid} 
                />
              </PasswordResetsButtonWrapper>
            </form>
          </PasswordResetsFormWrapper>
        </PasswordResetsBoxWrapper>
      </MainWrapper>
      <Footer />
    </>
  );
};
