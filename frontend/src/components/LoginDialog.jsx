import React from 'react';
import styled from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// React Hook Form
import { useForm, Controller } from "react-hook-form";

// Colors
import { COLORS } from '../style_constants.js';

// Images
import LoginImage from '../images/login.png';

// Button
import { LoginButton } from './Buttons/LoginButton.jsx'
import { OAuthLoginButton } from './Buttons/OAuthLoginButton.jsx';
import { CloseButton } from './Buttons/CloseButton.jsx';

// フォーム関係のコンポーネント
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';

// CustomIcon
import { ColoredGoogleIcon } from './Icons/CustomIcon.js';
import { ColoredTwitterIcon } from './Icons/CustomIcon.js';
import { ColoredGitHubIcon } from './Icons/CustomIcon.js';

// Sentence
import { PasswordResetSentence } from './Sentences/PasswordResetSentence.jsx';
import { SignUpSentence } from './Sentences/SignUpSentence.jsx';
import { OrDirectionSentence } from './Sentences/OrDirectionSentence.jsx';
import { InputErrorSentence } from './Sentences/InputErrorSentence.jsx';

const CustomDialogInnerWrapper = styled.div`
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
  background-color: ${COLORS.WHITE};
  text-align: center;
`;

const CustomDialogTitleImage = styled.img`
  height: 50px;
  width: 80px
  object-fit: contain;
  padding: 8px 23px;
`;

const CustomDialogContent = styled(DialogContent)`
  height: 500px;
  width: 400px;
`;

const CustomFilledInput = styled(FilledInput)`
  width: 400px;
  margin-bottom: 16px;
`;

export const LoginDialog = ({
  isOpen,
  onClose,
  onClick
}) => {

  // useForm
  const { control, handleSubmit, formState: { errors, isValid } } = useForm({ 
                                                                      mode: 'all',
                                                                      shouldUnregister: false 
                                                                    }); 

  // Formの検証後に呼び出される関数
  const onSubmit = data => { console.log(data) };
  const onErrors = data => { console.log(data) };

  // Formのバリデーション
  const registerOptions = {
    email: { 
      required: "メールアドレスを入力してください。", 
      pattern: {
        value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/,
        message: "英数字, @, ドメインが含まれるメールアドレスを入力してください。"
      }
    },
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
    }
  };

  return(
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <CustomDialogInnerWrapper> 
        <CloseButton onClose={onClose} fontSize="small" /> 
        <CustomDialogTitleImage src={LoginImage} alt="Login" />
        <CustomDialogContent>
          <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <Controller 
              name="EmailBox"
              control={control}
              defaultValue=""
              rules={registerOptions.email}
              render={({ field }) => (
                <FormControl variant="filled">              
                  <InputLabel htmlFor="email-component-filled">メールアドレス</InputLabel>
                  <CustomFilledInput
                    {...field}
                    type="email"
                    id="email-component-filled"
                    label="email"
                  />
                </FormControl>              
              )}
            />
            {errors.EmailBox && <InputErrorSentence>
                                  {errors.EmailBox.message}
                                </InputErrorSentence>}
            <Controller 
              name="PasswordBox"
              control={control}
              defaultValue=""
              rules={registerOptions.password}
              render={({ field }) => (
                <FormControl variant="filled">              
                  <InputLabel htmlFor="password-component-filled">パスワード</InputLabel>
                  <CustomFilledInput
                    {...field}
                    type="password"
                    id="password-component-filled"
                    label="password"
                  />
                </FormControl>              
              )}
            />
            {errors.PasswordBox && <InputErrorSentence>
                                     {errors.PasswordBox.message}
                                   </InputErrorSentence>}
            <LoginButton disabled={!isValid} />
          </form>
          <PasswordResetSentence />
          <OrDirectionSentence />
          <OAuthLoginButton 
            url="/#" 
            color={COLORS.PINK} 
            icon={<ColoredGoogleIcon fontSize="large" />} 
            type="Google"
          />
          <OAuthLoginButton 
            url="/#" 
            color={COLORS.LIGHT_BLUE} 
            icon={<ColoredTwitterIcon fontSize="large" />} 
            type="Twitter"
          />
          <OAuthLoginButton 
            url="/#" 
            color={COLORS.BLACK} 
            icon={<ColoredGitHubIcon fontSize="large" />} 
            type="GitHub"
          />
          <SignUpSentence onClick={onClick} />
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
