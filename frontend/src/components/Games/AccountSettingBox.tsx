import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider";

// MUI
import Avatar from '@mui/material/Avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

// Colors
import { COLORS } from '../../style_constants';

// デフォルトのアバター画像
import DefaultAvatarImage from '../../images/default_avatar.png';

// React Hook Form
import { useForm, Controller } from "react-hook-form";

// フォーム関係のコンポーネント
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FilledInput from '@mui/material/FilledInput';

// Sentence
import { InputErrorSentence } from '../Sentences/InputErrorSentence';
import { SubmitErrorSentence } from '../Sentences/SubmitErrorSentence';

// Button
import { AccountSettingButton } from '../Buttons/AccountSettingButton';

// アカウント情報を更新して、更新した情報を取得する関数
import { patchAccountSetting } from '../../apis/accountSetting';

// HTTP_STATUS_CODE
import { HTTP_STATUS_CODE } from '../../constants';

// InitialStateの型
import { InitialState } from '../../reducers/requestUser';

const AccountSettingBoxWrapper = styled.div`
  width: 40%;
  background-color: ${COLORS.WHITE};
  margin: 0 auto;
  border-radius: 3px;
  padding-top: 3%;
  padding-bottom: 3.12%;
`;

const AccountSettingBoxImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 6%;
  position: relative;
`;

const AccountSettingBoxFormWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const CustomForm = styled.form`
  width: 100%;
`;

const CustomFormControl = styled(FormControl)`
  width: 100%;
`;

const CustomFilledNameInput = styled(FilledInput)<{label: string, errors_box: {message: string, ref: object, type: string} | undefined }>`
  margin-bottom: ${({
    errors_box
  }) => typeof errors_box === 'undefined' && '4%' };
`;

const CustomFilledEmailInput = styled(FilledInput)<{label: string, errors_box: {message: string, ref: object, type: string} | undefined }>`
  margin-bottom: ${({
    errors_box
  }) => typeof errors_box === 'undefined' && '4%' };
`;

const AccoutSettingButtonWrapper = styled.div`
  margin-top: 3%;
`;

// アイコンボタン用のコンポーネント
const Input = styled.input`
  display: none;
`;

const CustomLabel = styled.label`
  position: absolute;
  top: 67%;
  right: 33%;
`;

// AccountSettingBoxの引数の型
type AccountSettingBoxArg = {
  requestUserState: InitialState;
  user: InitialState['userState']['user'];
};

type UploadState = {
  upload: boolean;
  imageUrl: string;
  image: {
    name?: string | null;
    data?: string | ArrayBuffer | null;
  };
};

export const AccountSettingBox = ({
  requestUserState,
  user
}: AccountSettingBoxArg): JSX.Element => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const {
    dispatch,
    requestUserActionTyps
  } = useContext(UserContext);

  const initialState: UploadState = {
    upload: false,
    imageUrl: user.image || DefaultAvatarImage,
    image: {}
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
  // readAsDataURLメソッドを使用する
  // readAsDataURLメソッドが実行完了後に、onload登録したイベントリスナーが実行される
  // readAsDataURLメソッドは、バイナリファイルを
  // base64 Data URLという形式にエンコードして取得できる
  // Data URLとは、URLに直接、画像/音声等のデータを埋め込むための表現
  // FileReader の result プロパティは、ファイルの内容を返す。
  // データの形式は、読み取り操作を開始するために
  // 使用されたメソッドによって異なります。
  // その為、画像ファイル(バイナリファイル)の場合、base64 Data URLが返ってくる
  // このプロパティは、読み込み操作が完了した後にのみ有効
  // 文字列データしかやりとりできない為、音声データや画像データをbase64で
  // 文字列にしているだけ
  const handleUpload = ({
    target: { files }
  }: {target: {files: FileList | null}}) => {
    const reader = new FileReader();
    if(files) {
      reader.onload = () => {
        setUploadState((prev) => ({
          ...prev,
          upload: true,
          imageUrl: URL.createObjectURL(files[0]),
          image: {
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
        value: 39,
        message: "39文字以下の名前を入力してください。"
      },
    },
    email: {
      required: "メールアドレスを入力してください。",
      pattern: {
        value: /^[A-Za-z0-9][A-Za-z0-9_.-]*@[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
        message: "英数字, @, ドメインを含めて入力してください。"
      }
    }
  };

  // navigation
  const navigate = useNavigate();

  // Formの検証後に呼び出される関数
  // dataにはフォームに入力したデータが入る
  // patchAccountSettingに対して、catchをチェーンしている
  // patchAccoutSetting内で例外が発生した場合、そのエラーを持つRejectedなPromiseを返される為、
  // catchで受け取ることができる
  const onSubmit = ({NameBox, EmailBox, OpenRankBox}: {NameBox: string, EmailBox: string, OpenRankBox: boolean}) => {
    patchAccountSetting({
      user: {
        id: user.id as number,
        name: NameBox,
        email: EmailBox,
        open_rank: OpenRankBox,
      },
      image: uploadState.image
    }).then((data) => {
      dispatch({
        type: requestUserActionTyps.REQUEST_SUCCESS,
        payload: {
          session: data.session,
          user: data.user,
        }
      });
    }).then(() =>
      navigate('/my-page', {
        state: { display: true, success: "アカウントを更新しました。"}
      })
    ).catch((e) => {
      if(e.response.status === HTTP_STATUS_CODE.BAD_REQUEST){
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
            src={uploadState.imageUrl}
            sx={{ width: 200, height: 200 }}
          />
          <CustomLabel htmlFor="icon-button-file">
            <Input
              id="icon-button-file"
              type="file"
              accept=".png, .jpg, .jpeg"
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
          <CustomForm onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="NameBox"
              control={control}
              defaultValue={user.name}
              rules={registerOptions.name}
              render={({ field }) => (
                <CustomFormControl variant="filled">
                  <InputLabel htmlFor="name-component-filled">名前</InputLabel>
                  <CustomFilledNameInput
                    {...field}
                    type="text"
                    id="name-component-filled"
                    label="name"
                    errors_box={errors.NameBox}
                  />
                </CustomFormControl>
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
              requestUserState?.errors?.title === 'Bad Request' &&
                <SubmitErrorSentence>
                  {requestUserState.errors.detail}
                </SubmitErrorSentence>
            }
          </CustomForm>
        </AccountSettingBoxFormWrapper>
      </AccountSettingBoxWrapper>
    </>
  );
};
