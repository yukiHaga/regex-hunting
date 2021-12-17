import React, { useEffect } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

// OAuth関係のAPIコール関数
import { postExternalAuth } from '../apis/login'; 

const CustomDiv = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const ExternalAuth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const { provider } = useParams();

  // ExternalAuthコンポーネントの初回レンダリング時に、
  // ユーザーをログインさせるかのアクションへリクエストを出す
  useEffect(() => {
    console.log("request関数の中");
    if (state === 'xyz') {
      postExternalAuth({ 
        code, 
        provider 
      }).then((isSuccess) => {
        if (isSuccess) {
          navigate('/my-page?user=oauth-login', { 
            state: { display: true, success: "ログインしました。"}
          });
        } else {
          navigate('/my-page?user=oauth-login-faliure', { 
            state: { display: true, success: "アカウントが見つかりません。"}
          });
        }
      });
    } else {
      navigate('/my-page?user=oauth-login-faliure', { 
        state: { display: true, success: "アカウントが見つかりません。"}
      });
    }
  }, [code, provider, navigate]);

  return (
    <CustomDiv>
      <CircularProgress />
    </CustomDiv>
  );
};
