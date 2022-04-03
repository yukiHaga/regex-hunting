import React, { Fragment, useRef } from 'react';
import styled from 'styled-components';

import { useNavigate, useLocation } from 'react-router-dom';

// Presentational Components
import { Header } from '../components/Headers/Header';
import { Footer } from '../components/Footers/Footer';
import { PasswordUpdatesButton } from '../components/Buttons/PasswordUpdatesButton';

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

// パスワードリセットを更新するapiコール関数
import { patchPasswordResetsUpdate } from '../apis/passwordUpdates';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../constants';

import { BottomWrapper, CustomWrapper } from '../components/shared_style';

// メインのラッパー
const MainWrapper = styled.div`
  background-color: ${COLORS.SUB};
  padding-bottom: 9.1%;
  padding-top: 10%;
`;

const PasswordUpdatesBoxWrapper = styled.div`
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

const PasswordUpdatesFormWrapper = styled.div`
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

const CustomFilledPasswordInput = styled(FilledInput)<{label: string, errors_box: {message: string, ref: object, type: string} | undefined }>`
  margin-bottom: ${({
    errors_box
  }) => typeof errors_box === 'undefined' && '5%' };
`;

const CustomFilledPasswordConfirmationInput = styled(FilledInput)<{label: string, errors_box: {message: string, ref: object, type: string} | undefined }>`
  margin-bottom: ${({
    errors_box
  }) => typeof errors_box === 'undefined' && '5%' };
`;

const PasswordUpdatesButtonWrapper = styled.div`
  margin-top: 3%;
`;

export const PasswordUpdates = (): JSX.Element => {

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
  // useRefを使用する理由は、モーダルのコンポーネント内で値を保持する為。
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
        value: /^[A-Za-z0-9][A-Za-z0-9_.-]*(\+[A-Za-z0-9_.-]+?)??@[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/,
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
        confirmPassword: (value: string) => value === password.current || "パスワードが一致しません。"
      }
    }
  };

  const search = useLocation().search;
  const query2 = new URLSearchParams(search);

  // Formの検証後に呼び出される関数
  const onSubmit = ({ PasswordBox, PasswordConfirmationBox }: {PasswordBox: string, PasswordConfirmationBox: string}) => {
    patchPasswordResetsUpdate({
      user: {
        password: PasswordBox,
        password_confirmation: PasswordConfirmationBox
      },
      token: query2.get('token') as string
    }).then(() => (
      navigate('/', {
        state: { display: true, success: "パスワードを更新しました。"}
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
          <PasswordUpdatesBoxWrapper>
            <TitleWrapper>
              パスワード再設定
            </TitleWrapper>
            <CustomParagraphWrapper>
              新しいパスワードを入力してください。
            </CustomParagraphWrapper>
            <PasswordUpdatesFormWrapper>
              <CustomForm onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="PasswordBox"
                  control={control}
                  defaultValue=""
                  rules={registerOptions.password}
                  render={({ field }) => (
                    <CustomFormControl variant="filled">
                      <InputLabel htmlFor="password-component-filled">パスワード</InputLabel>
                      <CustomFilledPasswordInput
                        {...field}
                        type="password"
                        id="password-component-filled"
                        label="password"
                        errors_box={errors.PasswordBox}
                      />
                    </CustomFormControl>
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
                    <CustomFormControl variant="filled">
                      <InputLabel htmlFor="password-confirmation-component-filled">
                        パスワード(確認用)
                      </InputLabel>
                      <CustomFilledPasswordConfirmationInput
                        {...field}
                        type="password"
                        id="password-confirmation-component-filled"
                        label="password-confirmation"
                        errors_box={errors.PasswordConfirmationBox}
                      />
                    </CustomFormControl>
                  )}
                />
                {errors.PasswordConfirmationBox && <InputErrorSentence>
                                                    {errors.PasswordConfirmationBox.message}
                                                  </InputErrorSentence>}
                <PasswordUpdatesButtonWrapper>
                  <PasswordUpdatesButton
                    disabled={!isValid}
                  />
                </PasswordUpdatesButtonWrapper>
              </CustomForm>
            </PasswordUpdatesFormWrapper>
          </PasswordUpdatesBoxWrapper>
        </MainWrapper>
        <BottomWrapper>
          <Footer />
        </BottomWrapper>
      </CustomWrapper>
    </>
  );
};
