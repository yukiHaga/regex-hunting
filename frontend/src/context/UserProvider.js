import React, { useState, createContext } from "react";

// UserContextというコンテキストオブジェクトを作成
export const UserContext = createContext();

export const UserProvider = ({children}) => {

  // userStateの初期値
  const userInitialState = {
    session: false,
    user: {}
  }
 
  const [ userState, setUserState ] = useState(userInitialState);

  // useContext(UserContext)でこのvalueがstateとして取得できる。
  const value = {
    userState,
    setUserState
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
