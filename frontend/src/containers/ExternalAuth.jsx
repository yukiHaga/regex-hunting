import React, { useState } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

// OAuth関係のAPIコール関数
import { postExternalAuth } from '../apis/login'; 

const BEFORE = "BEFORE";
const DOING = "DOING";

/*
  const onSubmit = ({EmailBox, PasswordBox}) => { 
    dispatch({ type: requestUserActionTyps.REQUEST });
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
    }).then(() => 
      navigate('/my-page?user=login', { state: { display: true, success: "ログインしました。"}})
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
*/

export const ExternalAuth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');
  const { provider } = useParams();
  const [requestStatus, setRequestStatus] = useState(BEFORE);

  const request = () => {
    setRequestStatus(DOING);
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
  };

  if (requestStatus === BEFORE) {
    request();
  }

  return (
    <div>
      <CircularProgress />
    </div>
  );
};
