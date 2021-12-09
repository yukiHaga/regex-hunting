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

// BaseLink
import { BaseLink } from './shared_style.js';

// Button
import { LoginButton } from '../components/Buttons/LoginButton.jsx'
import { OAuthLoginButton } from '../components/Buttons/OAuthLoginButton.jsx';

// フォーム関係のコンポーネント
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';

// Icon
import { GoogleIcon } from '../components/Icons/index.js';
import { TwitterIcon } from '../components/Icons/index.js';
import { GitHubIcon } from '../components/Icons/index.js';

const CustomDialogInnerWrapper = styled.div`
  padding-top: 20px;
  padding-right: 20px;
  padding-left: 20px;
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

const LoginDescriptionWrapper = styled.div`
  color: ${COLORS.BLACK};
  margin-bottom: 20px;
`;

const SignupDescriptionWrapper = styled.div`
  color: ${COLORS.BLACK};
  margin-top: 15px;
`;

const CustomBaseLink = styled(BaseLink)`
  color: ${COLORS.BLUE};
`;

const DirectionWrapper = styled.div`
  color: ${COLORS.BLACK};
  display: flex;
  align-items: center;
  justify-content: center;
  &:before {
    border-top: 1px solid;
    content: "";
    width: 110px;
    margin-right: 25px;
  }
  &:after {
    border-top: 1px solid;
    content: "";
    width: 110px;
    margin-left: 25px;
  }
  margin-bottom: 15px;
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

export const LoginDialog = ({
  isOpen,
  onClose
}) => {

  // useForm
  const { control, handleSubmit } = useForm({ shouldUnregister: false }); 

  // Formの検証後に呼び出される関数
  const onSubmit = data => { console.log(data) }
  const onErrors = data => { console.log(data) }

  return(
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <CustomDialogInnerWrapper> 
        <CustomDialogTitleImage src={LoginImage} alt="Login" />
        <CustomDialogContent>
          <form onSubmit={handleSubmit(onSubmit, onErrors)}>
            <Controller 
              name="EmailBox"
              control={control}
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
            <Controller 
              name="PasswordBox"
              control={control}
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
            <LoginButton />
          </form>
          <LoginDescriptionWrapper>
            パスワードを忘れた場合は
            <CustomBaseLink to={'/users/password/new'}>
              こちら
            </CustomBaseLink>
          </LoginDescriptionWrapper>
          <DirectionWrapper>
            または
          </DirectionWrapper>
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
          <SignupDescriptionWrapper>
            アカウントをお持ちではないですか？&nbsp;&nbsp; 
            <CustomBaseLink to={'/users/password/new'}>
              新規登録
            </CustomBaseLink>
          </SignupDescriptionWrapper>
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};