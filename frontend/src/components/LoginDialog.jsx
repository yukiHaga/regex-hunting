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

// Icon
import { GoogleIcon } from './Icons/index.js';
import { TwitterIcon } from './Icons/index.js';
import { GitHubIcon } from './Icons/index.js';

// sentence
import { PasswordResetSentence } from './Sentences/PasswordResetSentence.jsx';
import { SignUpSentence } from './Sentences/SignUpSentence.jsx';
import { OrDirectionSentence } from './Sentences/OrDirectionSentence.jsx';

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


const ColoredGoogleIcon = styled(GoogleIcon)`
  color: ${COLORS.WHITE};
`;

const ColoredTwitterIcon = styled(TwitterIcon)`
  color: ${COLORS.WHITE};
`;

const ColoredGitHubIcon = styled(GitHubIcon)`
  color: ${COLORS.WHITE};
`;

const DangerText = styled.p`
  text-align: left;
  margin-top: 0px;
  margin-bottom: 16px;
  color: ${COLORS.RED};
`;

export const LoginDialog = ({
  isOpen,
  onClose
}) => {

  // useForm
  const { control, handleSubmit, formState: { errors } } = useForm({ 
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
        message: "英数字, @, ドメインが含まれたメールアドレスを入力してください。"
      }
    },
    password: {
      required: "パスワードを入力してください。",
      minLength: {
        value: 8,
        message: "8文字以上のパスワードを入力してください。"
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
              rules={registerOptions.email}
              render={({ field }) => (
                <FormControl variant="filled">              
                  <InputLabel htmlFor="component-filled">メールアドレス</InputLabel>
                  <CustomFilledInput
                    {...field}
                    type="email"
                    id="component-filled"
                    label="email"
                  />
                </FormControl>              
              )}
            />
            {errors.EmailBox && <DangerText>{errors.EmailBox.message}</DangerText>}
            <Controller 
              name="PasswordBox"
              control={control}
              rules={registerOptions.password}
              render={({ field }) => (
                <FormControl variant="filled">              
                  <InputLabel htmlFor="component-filled">パスワード</InputLabel>
                  <CustomFilledInput
                    {...field}
                    type="password"
                    id="component-filled"
                    label="password"
                  />
                </FormControl>              
              )}
            />
            {errors.PasswordBox && <DangerText>{errors.PasswordBox.message}</DangerText>}
            <LoginButton />
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
          <SignUpSentence />
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
