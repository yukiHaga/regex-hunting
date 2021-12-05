import React, { Fragment, useEffect } from 'react';

// ログイン関係のAPIコール関数
import { postUserSession, } from '../apis/login'; 
// deleteUserSession 

export const LandingPages = () => { 

  // ユーザーをログインさせる。
  useEffect(() => {
    postUserSession({
      user: {
        email: 'glen@stroman.com',
        password: '3150test' 
      }
    })
    .then((data) => {
      console.log(data);
      console.log("ログインが成功した");
    })
  }, []);

  return (
    <>
      <Header />
    </>
  );
};
