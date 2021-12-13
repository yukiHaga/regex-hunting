import React, { Fragment, useContext } from 'react';

// Presentational Components
import { Header } from '../components/Header.jsx';

// Contextオブジェクト
import { UserContext } from "../context/UserProvider.js";

export const MyPages = () => {

  // useContext
  // requestUserStateには、requestState, userState, errorsが格納されている
  // userStateにはsessionとuserが格納されている
  const { requestUserState } = useContext(UserContext);

  return (
    <>
      <Header />
    </>
  );
};
