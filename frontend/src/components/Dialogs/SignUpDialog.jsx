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
  padding-top: 3%;
  padding-right: 3%;
  padding-left: 3%;
  background-color: ${COLORS.WHITE};
  text-align: center;
`;

const CustomDialogTitleImage = styled.img`
  width: 40%;
  object-fit: contain;
  padding: 2% 8%;
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
    },
    passwordConfirmation: {
      required: "確認用のパスワードを入力してください。",
      minLength: {
        value: 8,
        message: "8文字以上の確認用パスワードを入力してください。"
      },
      pattern: {
        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)[!-~]+$/,
        message: "大文字, 小文字, 数字を含めて入力してください。"
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
      maxWidth='xs'
    >
      <CustomDialogInnerWrapper> 
        <CloseButton onClose={onClose} fontSize="small" /> 
        <CustomDialogTitleImage src={SignUpImage} alt="SignUp" />
        <DialogContent>
          <CreateAccountSentence />
          <CustomForm onSubmit={handleSubmit(onSubmit)}>
            <Controller 
              name="NameBox"
              control={control}
              defaultValue=""
              rules={registerOptions.name}
              render={({ field }) => (
                <CustomFormControl variant="filled">              
                  <InputLabel htmlFor="name-component-filled">名前</InputLabel>
                  <CustomFilledInput
                    {...field}
                    type="text"
                    id="name-component-filled"
                    label="name"
                    errors_box={errors.NameBox}
                  />
                  {
                    errors.NameBox && <InputErrorSentence>
                                        {errors.NameBox.message}
                                      </InputErrorSentence>
                  }
                </CustomFormControl>              
              )}
            />
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
                  <CustomFilledInput
                    {...field}
                    type="password"
                    id="password-confirmation-component-filled"
                    label="password-confirmation"
                    errors_box={errors.PasswordConfirmationBox}
                  />
                  {
                    errors.PasswordConfirmationBox && <InputErrorSentence>
                                                        {errors.PasswordConfirmationBox.message}
                                                      </InputErrorSentence>
                  }
                </CustomFormControl>              
              )}
            />
            <SignUpButton disabled={!isValid} />
            {
              requestUserState.errors.title === 'Record Not Found' && 
                <SubmitErrorSentence
                  errors_title={requestUserState.errors.title}
                >
                  {requestUserState.errors.detail}
                </SubmitErrorSentence>
            }
          </CustomForm>
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
        </DialogContent>
      </CustomDialogInnerWrapper>
    </Dialog>
  );
};
