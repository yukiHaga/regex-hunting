import React, { Fragment } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

// Presentational Components
import { Header } from '../components/Headers/Header';
import { Footer } from '../components/Footers/Footer';
import { PasswordResetRequestButton } from '../components/Buttons/PasswordResetRequestButton';

// Colors
import { COLORS } from '../style_constants';

// React Hook Form
import { useForm, Controller } from "react-hook-form";

// フォーム関係のコンポーネント
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';

// Sentence
import { InputErrorSentence } from '../components/Sentences/InputErrorSentence';

// パスワードリセットコントローラへアクセスするapiコール関数
import { postPasswordResetRequest } from '../apis/passwordResetRequest';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

import { BottomWrapper, CustomWrapper } from '../components/shared_style';

// メインのラッパー
const MainWrapper = styled.div`
  background-color: ${COLORS.SUB};
  padding-bottom: 9.1%;
  padding-top: 10%;
`;

const PasswordResetsBoxWrapper = styled.div`
  width: 40%;
  background-color: ${COLORS.WHITE};
  margin: 0 auto;
  border-radius: 3px;
  padding-top: 4%;
  padding-bottom: 4%;
`;

const TitleWrapper = styled.h2`
  font-style: normal;
  color: ${COLORS.BLACK};
  margin-top: 0px;
  margin-bottom: 0px;
  width: 70%;
  margin: 0 auto;
`;

const CustomParagraphWrapper = styled.p`
  font-style: normal;
  font-size: 1.1em;
  color: ${COLORS.BLACK};
  width: 70%;
  margin: 0 auto;
  overflow-wrap: break-word;
  margin-top: 3%;
  margin-bottom: 5%;
`;

const PasswordResetsFormWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 3%;
`;

const CustomForm = styled.form`
  width: 100%;
`;

const CustomFormControl = styled(FormControl)`
  width: 100%;
`;

const CustomFilledEmailInput = styled(FilledInput)<{label: string, errors_box: {message: string, ref: object, type: string} | undefined }>`
  margin-bottom: ${({
    errors_box
  }) => typeof errors_box === 'undefined' && '5%' };
`;

const PasswordResetsButtonWrapper = styled.div`
  margin-top: 3%;
`;

export const PasswordResets = (): JSX.Element => {

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
        value: /^[A-Za-z0-9][A-Za-z0-9_.-]*(\+[A-Za-z0-9_.-]+?)??@[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/,
        message: "英数字, @, ドメインを含めて入力してください。"
      }
    }
  };

  // Formの検証後に呼び出される関数
  // dataにはフォームに入力したデータが入る
  const onSubmit = ({ EmailBox }: {EmailBox: string}) => {
    postPasswordResetRequest({
      email: EmailBox
    }).then(() => (
      navigate('/users/password/sent', {
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
      <CustomWrapper>
        <Header />
        <MainWrapper>
          <PasswordResetsBoxWrapper>
            <TitleWrapper>
              パスワードを忘れた場合
            </TitleWrapper>
            <CustomParagraphWrapper>
              ご登録いただいたメールアドレスを入力してください。メールアドレス宛に、パスワード変更ページのURLが記載されたメールを送信します。
            </CustomParagraphWrapper>
            <PasswordResetsFormWrapper>
              <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="EmailBox"
                  control={control}
                  defaultValue=""
                  rules={registerOptions.email}
                  render={({ field }) => (
                    <CustomFormControl variant="filled">
                      <InputLabel htmlFor="email-component-filled">メールアドレス</InputLabel>
                      <CustomFilledEmailInput
                        {...field}
                        type="email"
                        id="email-component-filled"
                        label="email"
                        errors_box={errors.EmailBox}
                      />
                    </CustomFormControl>
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
              </CustomForm>
            </PasswordResetsFormWrapper>
          </PasswordResetsBoxWrapper>
        </MainWrapper>
        <BottomWrapper>
          <Footer />
        </BottomWrapper>
      </CustomWrapper>
    </>
  );
};
