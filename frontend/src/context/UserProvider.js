import React, { useState, createContext } from "react";

// UserContextというコンテキストオブジェクトを作成
export const UserContext = createContext();

// Reducer関連をインポート
import {
  initialState,
  requestUserActionTyps,
  requestUserReducer,
} from '../reducers/requestUser.js';

export const UserProvider = ({children}) => {
 
  const [requestUserState, dispatch] = useReducer(requestUserReducer, initialState);

  // useContext(UserContext)でこのvalueがstateとして取得できる。
  const value = {
    requestUserState,
    dispatch,
    requestUserActionTyps,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
