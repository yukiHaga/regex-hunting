import React, { createContext, useReducer } from "react";

// Reducer関連をインポート
import {
  initialState,
  requestUserActionTyps,
  requestUserReducer
} from '../reducers/requestUser.js';

// UserContextというコンテキストオブジェクトを作成
export const UserContext = createContext();

export const UserProvider = ({children}) => {
 
  // useReducerの第2引数がstateの初期値となる
  // dispatchの第1引数に自動的に入る
  const [requestUserState, dispatch] = useReducer(requestUserReducer, initialState);

  // useContext(UserContext)でこのvalueが分割代入で取得できる。
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
