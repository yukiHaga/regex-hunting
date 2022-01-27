import React, { useRef, useContext } from 'react';
import styled from 'styled-components';

// 新規会員登録関係のAPIコール関数
import { postUser } from '../../apis/signup.js'; 

// ダイアログ
import { DialogContent, Dialog } from '@mui/material';

// React Hook Form
import { useForm, Controller } from "react-hook-form";

// useNavigate
import { useNavigate } from "react-router-dom";

// Colors
import { COLORS } from '../../style_constants.js';

// Images
import SignUpImage from '../../images/sign_up.png';

// Button
import { SignUpButton } from '../Buttons/SignUpButton.jsx'
import { OAuthLoginButton } from '../Buttons/OAuthLoginButton.jsx';
import { CloseButton } from '../Buttons/CloseButton.jsx';

// フォーム関係のコンポーネント
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';

// CustomIcon
import { ColoredGoogleIcon } from '../Icons/CustomIcon.js';
import { ColoredGitHubIcon } from '../Icons/CustomIcon.js';

// Sentence
import { HaveAccountSentence } from '../Sentences/HaveAccountSentence.jsx';
import { OrDirectionSentence } from '../Sentences/OrDirectionSentence.jsx';
import { InputErrorSentence } from '../Sentences/InputErrorSentence.jsx';
import { CreateAccountSentence } from '../Sentences/CreateAccountSentence.jsx';
import { SubmitErrorSentence } from '../Sentences/SubmitErrorSentence.jsx';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../../constants';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

// OAuthのURL
import { gitHubOAuth, googleOAuth } from '../../urls/index'; 

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
  margin-bottom: ${({
    errors_box
  }) => typeof errors_box === 'undefined' && '16px' };
`;

export const SignUpDialog = ({
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

  // Formの検証後に呼び出される関数
  // dataにはフォームに入力したデータが入る
  // dataを実引数としてpostUserSeesionを呼び出した後、
  // postUserSessionで取得したdataを実引数として、dispatchを実行
  // reducer側でちゃんとstateは更新されている。
  // しかし、この関数内でstateをコンソール出力できない。
  const onSubmit = ({
    NameBox,
    EmailBox, 
    PasswordBox,
    PasswordConfirmationBox
  }) => { 
    postUser({
      user: {
        name: NameBox,
        email: EmailBox,
        password: PasswordBox,
        password_confirmation: PasswordConfirmationBox
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
      navigate('/my-page', { state: { display: true, success: "アカウントを登録しました。"}})
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

  return(
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <CustomDialogInnerWrapper> 
        <CloseButton onClose={onClose} fontSize="small" /> 
        <CustomDialogTitleImage src={SignUpImage} alt="SignUp" />
        <CustomDialogContent>
          <CreateAccountSentence />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller 
              name="NameBox"
              control={control}
              defaultValue=""
              rules={registerOptions.name}
              render={({ field }) => (
                <FormControl variant="filled">              
                  <InputLabel htmlFor="name-component-filled">名前</InputLabel>
                  <CustomFilledInput
                    {...field}
                    type="text"
                    id="name-component-filled"
                    label="name"
                    errors_box={errors.NameBox}
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
                  <CustomFilledInput
                    {...field}
                    type="email"
                    id="email-component-filled"
                    label="email"
                    errors_box={errors.EmailBox}
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
                    errors_box={errors.PasswordBox}
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
                  <CustomFilledInput
                    {...field}
                    type="password"
                    id="password-confirmation-component-filled"
                    label="password-confirmation"
                    errors_box={errors.PasswordConfirmationBox}
                  />
                </FormControl>              
              )}
            />
            {errors.PasswordConfirmationBox && <InputErrorSentence>
                                                 {errors.PasswordConfirmationBox.message}
                                               </InputErrorSentence>}
            <SignUpButton disabled={!isValid} />

            {
              requestUserState.errors.title === 'Record Not Found' && 
                <SubmitErrorSentence
                  errors_title={requestUserState.errors.title}
                >
                  {requestUserState.errors.detail}
                </SubmitErrorSentence>
            }
          </form>
          <OrDirectionSentence />
          <OAuthLoginButton 
            url={googleOAuth}
            color={COLORS.PINK} 
            icon={<ColoredGoogleIcon fontSize="large" />} 
            type="Google"
          />
          <OAuthLoginButton 
            url={gitHubOAuth}
            color={COLORS.BLACK} 
            icon={<ColoredGitHubIcon fontSize="large" />} 
            type="GitHub"
          />
          <HaveAccountSentence onClick={onClick} />
        </CustomDialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
