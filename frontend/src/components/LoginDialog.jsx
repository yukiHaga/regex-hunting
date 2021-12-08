import React from 'react';
import styled from 'styled-components';

// ダイアログ
import { DialogContent, Dialog } from '@material-ui/core';

// React Hook Form
import { useForm, Controller } from "react-hook-form";

// Colors
import { COLORS } from '../style_constants.js';

// Images
import LoginImage from '../images/login.png';

// BaseLink
import { BaseLink } from './shared_style.js';

// フォーム関係のコンポーネント
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';

const CustomDialogInnerWrapper = styled.div`
  padding: 20px;
  background-color: ${COLORS.WHITE};
  text-align: center;
`;

const CustomDialogTitleImage = styled.img`
  height: 50px;
  width: 80px
  object-fit: contain;
  padding: 8px 23px;
  margin-bottom: 20px;
`;

const CustomDialogContent = styled(DialogContent)`
  height: 500px;
  width: 400px;
`;

const CustomFilledInput = styled(FilledInput)`
  width: 400px;
  margin-bottom: 30px;
`;

const DescriptionWrapper = styled.div``;
const CustomBaseLink = styled(BaseLink)``;

export const LoginDialog = ({
  isOpen,
  onClose
}) => {

  // useForm
  const { control, handleSubmit } = useForm(); 

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
              render={({ field: { onChange, onBlur, value }}) => (
                <FormControl variant="filled">              
                  <InputLabel htmlFor="component-filled">メールアドレス</InputLabel>
                  <CustomFilledInput
                    type="email"
                    id="component-filled"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    label="email"
                  />
                </FormControl>              
              )}
            />
            <Controller 
              name="PasswordBox"
              control={control}
              render={({ field: { onChange, onBlur, value }}) => (
                <FormControl variant="filled">              
                  <InputLabel htmlFor="component-filled">パスワード</InputLabel>
                  <CustomFilledInput
                    type="password"
                    id="component-filled"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    label="password"
                  />
                </FormControl>              
              )}
            />
            <DescriptionWrapper>
              パスワードをお忘れの方は
              <CustomBaseLink to={'/users/password/new'}>
                こちら
              </CustomBaseLink>
            </DescriptionWrapper>
          </form>
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
