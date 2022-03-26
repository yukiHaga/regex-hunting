import React, { useContext } from 'react';
import styled from 'styled-components';

// ログイン関係のAPIコール関数
// deleteUserSession
import { postUserSession } from '../../apis/login';

// useNavigate
import { useNavigate } from "react-router-dom";

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// React Hook Form
import { useForm, Controller } from "react-hook-form";

// Colors
import { COLORS } from '../../style_constants.js';

// Button
import { LoginButton } from '../Buttons/LoginButton'
import { OAuthLoginButton } from '../Buttons/OAuthLoginButton';
import { CloseButton } from '../Buttons/CloseButton';

// フォーム関係のコンポーネント
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';

// Sentence
import { PasswordResetSentence } from '../Sentences/PasswordResetSentence.jsx';
import { SignUpSentence } from '../Sentences/SignUpSentence.jsx';
import { OrDirectionSentence } from '../Sentences/OrDirectionSentence.jsx';
import { InputErrorSentence } from '../Sentences/InputErrorSentence.jsx';
import { SubmitErrorSentence } from '../Sentences/SubmitErrorSentence.jsx';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../../constants';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider";

// OAuthのURL
import { gitHubOAuth, googleOAuth } from '../../urls/index';

const CustomDialogInnerWrapper = styled.div`
  padding-top: 3%;
  padding-right: 3%;
  padding-left: 3%;
  background-color: ${COLORS.WHITE};
  text-align: center;
`;

// title
const TitleWrapper = styled.div`
  font-family: Raleway;
  font-style: italic;
  font-weight: bold;
  font-size: 1.8em;
  color: ${COLORS.SUB};
  -webkit-text-stroke: 5px #030002;
  text-stroke: 5px #030002;
  position: relative;
  padding-bottom: 2%;
  padding-top: 1%;
`;

// fuchiue
const Fuchiue = styled.span`
  -webkit-text-stroke: 0;
  position: absolute;
`;

const CustomForm = styled.form`
  width: 100%;
`;

const CustomFormControl = styled(FormControl)`
  width: 100%;
`;

// ここのwidthはpx指定しないとレイアウトが崩れるので、pxにした
const CustomFilledInput = styled(FilledInput)`
  margin-bottom: ${({
    errors_box
  }) => typeof errors_box === 'undefined' && '4%' };
`;

export const LoginDialog = ({
  isOpen,
  onClose,
  onClick
}) => {

  // useContext
  const {
    requestUserState,
    dispatch,
    requestUserActionTyps
  } = useContext(UserContext);

  // navigate
  let navigate = useNavigate();

  // useForm
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    shouldUnregister: false
  });

  // Formの検証後に呼び出される関数
  // dataにはフォームに入力したデータが入る
  // dataを実引数としてpostUserSeesionを呼び出した後、
  // postUserSessionで取得したdataを実引数として、dispatchを実行
  // reducer側でちゃんとstateは更新されている。
  // しかし、この関数内でstateをコンソール出力できない。
  const onSubmit = ({EmailBox, PasswordBox}) => {
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
    }).then(() => {
      return navigate('/my-page', { state: { display: true, success: "ログインしました。"}})
    }
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
  };

  // Formのバリデーション
  const registerOptions = {
    email: {
      required: "メールアドレスを入力してください。",
      pattern: {
        value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/,
        message: "英数字, @, ドメインを含めて入力してください。"
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
        message: "大文字, 小文字, 数字を含めて入力してください。"
      }
    }
  };

  return(
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth='xs'
    >
      <CustomDialogInnerWrapper>
        <CloseButton onClose={onClose} fontSize="small" />
        <TitleWrapper><Fuchiue>Login</Fuchiue>Login</TitleWrapper>
        <DialogContent>
          <CustomForm onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="EmailBox"
              control={control}
              defaultValue=""
              rules={registerOptions.email}
              render={({ field }) => (
                <CustomFormControl variant="filled">
                  <InputLabel htmlFor="email-component-filled">メールアドレス</InputLabel>
                  <CustomFilledInput
                    {...field}
                    type="email"
                    id="email-component-filled"
                    label="email"
                    errors_box={errors.EmailBox}
                  />
                  {
                    errors.EmailBox && <InputErrorSentence>
                                         {errors.EmailBox.message}
                                       </InputErrorSentence>
                  }
                </CustomFormControl>
              )}
            />
            <Controller
              name="PasswordBox"
              control={control}
              defaultValue=""
              rules={registerOptions.password}
              render={({ field }) => (
                <CustomFormControl variant="filled">
                  <InputLabel htmlFor="password-component-filled">パスワード</InputLabel>
                  <CustomFilledInput
                    {...field}
                    type="password"
                    id="password-component-filled"
                    label="password"
                    errors_box={errors.PasswordBox}
                  />
                  {
                    errors.PasswordBox && <InputErrorSentence>
                                            {errors.PasswordBox.message}
                                          </InputErrorSentence>
                  }
                </CustomFormControl>
              )}
            />
            <LoginButton
              disabled={!isValid}
            />
            {
              requestUserState.errors.title === 'Record Not Found' &&
                <SubmitErrorSentence
                  errors_title={requestUserState.errors.title}
                >
                  {requestUserState.errors.detail}
                </SubmitErrorSentence>
            }
          </CustomForm>
          <PasswordResetSentence />
          <OrDirectionSentence />
          <OAuthLoginButton
            url={googleOAuth}
            color={COLORS.PINK}
            type="Google"
          />
          <OAuthLoginButton
            url={gitHubOAuth}
            color={COLORS.BLACK}
            type="GitHub"
          />
          <SignUpSentence onClick={onClick} />
        </DialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
