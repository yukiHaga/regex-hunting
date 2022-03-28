import React, { useEffect } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";

// OAuth関係のAPIコール関数
import { postExternalAuth } from '../apis/login';

import { CircularMask } from '../components/loads/CircularMask';

export const ExternalAuth = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code') as string;
  const callBackState = searchParams.get('state');
  const { provider } = useParams();

  // ExternalAuthコンポーネントの初回レンダリング時に、
  // ユーザーをログインさせるかのアクションへリクエストを出す
  useEffect(() => {
    if (callBackState === 'xyz') {
      postExternalAuth({
        code,
        provider
      }).then((isSuccess) => {
        if (isSuccess) {
          navigate('/my-page', {
            state: { display: true, success: "ログインしました。"}
          });
        } else {
          navigate('/?user=oauth-login-faliure', {
            state: { display: true, success: "アカウントが見つかりません。"}
          });
        }
      });
    } else {
      navigate('/?user=oauth-login-faliure', {
        state: { display: true, success: "アカウントが見つかりません。"}
      });
    }
  }, [
    callBackState,
    code,
    provider,
    navigate
  ]);

  return (
    <CircularMask />
  );
};
