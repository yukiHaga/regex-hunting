import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider.js";

// MUI
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

// Colors
import { COLORS } from '../../style_constants.js';

// Images
import TemporaryUserImage from '../../images/temporary_user_image.png';

// React Hook Form
import { useForm, Controller } from "react-hook-form";

// フォーム関係のコンポーネント
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';

// Sentence
import { InputErrorSentence } from '../Sentences/InputErrorSentence.jsx';
import { SubmitErrorSentence } from '../Sentences/SubmitErrorSentence.jsx';

// Button
import { AccountSettingButton } from '../Buttons/AccountSettingButton.jsx';

// アカウント情報を更新して、更新した情報を取得する関数
import { patchAccountSetting } from '../../apis/accountSetting.js';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../../constants';

const AccountSettingBoxWrapper = styled.div`
  width: 40%;
  height: 580px;
  background-color: ${COLORS.WHITE};
  margin: 0 auto;
`;

const AccountSettingBoxImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  padding-bottom: 30px;
  position: relative;
`;

const AccountSettingBoxFormWrapper = styled.div`
  width: 402px;
  margin: 0 auto;
`;

const CustomFilledNameInput = styled(FilledInput)`
  width: 400px;
  margin-bottom: ${({
    errors_name_box
  }) => typeof errors_name_box === 'undefined' && '16px' };
`;

const CustomFilledEmailInput = styled(FilledInput)`
  width: 400px;
  margin-bottom: ${({
    errors_email_box
  }) => typeof errors_email_box === 'undefined' && '16px' };
`;

const AccoutSettingButtonWrapper = styled.div`
  margin-top: 16px;
`;

// アイコンボタン用のコンポーネント
const Input = styled.input`
  display: none;
`;

const CustomLabel = styled.label`
  position: absolute;
  top: 181px;
  right: 190px; 
`;

export const AccountSettingBox = ({
  requestUserState,
  user
}) => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { 
    dispatch, 
    requestUserActionTyps
  } = useContext(UserContext);

  const initialState = {
    upload: false,
    image_url: "",
    image_data: {}
  }

  // プレビュー機能を実装するためのstate
  const [uploadState, setUploadState] = useState(initialState);

  // ユーザーがアップロードした画像を取り扱う関数
  // URL.createObjectURL()は、ファイルを参照するための一時的なURLを生成する
  // filesプロパティの戻り値(if文の箇所に書いてあるfiles)はFileListオブジェクト
  // FileListオブジェクトの中にファイル(Fileオブジェクト)が格納されている
  // FileReaderオブジェクトを利用することで、取得したFileオブジェクトの内容を
  // 読み込むことができる
  // reader.onloadで、ファイルの読み込みが成功した後に、アロー関数が実行される
  // onloadはイベントリスナーを定義しているだけで、まだ実行されたわけではない
  // 実際に画像ファイル(バイナリファイル)を読み込むためには、
  // readAsDataURLメソッドを使う
  // readAsDataURLメソッドが実行完了後に、onload登録したイベントリスナーが実行される
  // readAsDataURLメソッドは、バイナリファイルを
  // base64 Data URLという形式にエンコードして取得できる
  // Data URLとは、URLに直接、画像/音声等のデータを埋め込むための表現
  // FileReader の result プロパティは、ファイルの内容を返す。
  // データの形式は、読み取り操作を開始するために
  // 使用されたメソッドによって異なります。
  // なので、画像ファイル(バイナリファイル)の場合、base64 Data URLが返ってくる
  // このプロパティは、読み込み操作が完了した後にのみ有効
  const handleUpload = ({
    target: { files }
  }) => {
    const reader = new FileReader();
    if(files) {
      reader.onload = () => {
        setUploadState((prev) => ({
          ...prev,
          upload: true,
          image_url: URL.createObjectURL(files[0]),
          image_data: {
            name: files[0] ? files[0].name : 'unknown_file',
            data: reader.result
          }
        }))
      }
      reader.readAsDataURL(files[0])
    }
  };

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
    }
  };

  // navigation
  const navigate = useNavigate();

  // Formの検証後に呼び出される関数
  // dataにはフォームに入力したデータが入る
  const onSubmit = ({NameBox, EmailBox, OpenRankBox}) => { 
    patchAccountSetting({
      user: {
        id: user.id,
        name: NameBox,
        email: EmailBox,
        open_rank: OpenRankBox
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
      navigate('/my-page?user=account_setting', { 
        state: { display: true, success: "アカウントを更新しました。"}
      })
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

  return (
    <>
      <AccountSettingBoxWrapper>
        <AccountSettingBoxImageWrapper>
          <Avatar
            alt="Hunter"
            src={
              uploadState.upload ? 
                uploadState.image_url 
              : 
                TemporaryUserImage
            }
            sx={{ width: 200, height: 200 }}
          />
          <CustomLabel htmlFor="icon-button-file">
            <Input 
              accept="image/*" 
              id="icon-button-file" 
              type="file" 
              onChange={(e) => handleUpload(e)}
            />
            <IconButton 
              color="primary" 
              aria-label="upload picture" 
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </CustomLabel>
        </AccountSettingBoxImageWrapper>
        <AccountSettingBoxFormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller 
              name="NameBox"
              control={control}
              defaultValue={user.name}
              rules={registerOptions.name}
              render={({ field }) => (
                <FormControl variant="filled">              
                  <InputLabel htmlFor="name-component-filled">名前</InputLabel>
                  <CustomFilledNameInput
                    {...field}
                    type="text"
                    id="name-component-filled"
                    label="name"
                    errors_name_box={errors.NameBox}
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
              defaultValue={user.email}
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
            <Controller 
              name="OpenRankBox"
              control={control}
              defaultValue={user.open_rank}
              render={({ field }) => (
                    <FormControlLabel
                      {...field}
                      key={1}
                      label='ランキングを公開する'
                      control={
                        <Checkbox 
                          {...field} 
                          defaultChecked={user.open_rank} 
                        />
                      }
                    />
              )}
            />
            <AccoutSettingButtonWrapper>
              <AccountSettingButton 
                disabled={!isValid} 
              />
            </AccoutSettingButtonWrapper>
            {
              requestUserState.errors.title === 'Record Not Found' && 
                <SubmitErrorSentence>
                  {requestUserState.errors.detail}
                </SubmitErrorSentence>
            }
          </form>
        </AccountSettingBoxFormWrapper>
      </AccountSettingBoxWrapper>
    </>
  );
};
