import React, { createContext, useReducer, ReactNode} from "react";

// Reducer関連をインポート
import {
  initialState,
  requestUserActionTyps,
  requestUserReducer,
  Action
} from '../reducers/requestUser';

// コンテキストのvalueの型
type UserContextType = {
  requestUserState: any;
  dispatch: React.Dispatch<Action>;
  requestUserActionTyps: {
      REQUEST: string;
      REQUEST_SUCCESS: string;
      REQUEST_FAILURE: string;
  };
};

// コンテキストのvalueの初期値として入れる値
const initialContextValue = {
  requestUserState: initialState,
  dispatch: () => {},
  requestUserActionTyps: requestUserActionTyps
};

// UserContextというコンテキストオブジェクトを作成
// 初期値と型を与えないとエラーが出るので、与えた
export const UserContext = createContext<UserContextType>(initialContextValue);

// JSX.Elementは、React.createElementの値の型を表す
// ReactNodeは、コンポーネントの値の型を表す
export const UserProvider = ({children}: {children: ReactNode}): JSX.Element => {

  // useReducerの第2引数がstateの初期値となる
  // dispatchの第1引数に自動的に入る
  const [requestUserState, dispatch] = useReducer(requestUserReducer, initialState);

  // useContext(UserContext)でこのvalueが分割代入で取得できる。
  // この値がグローバルに共有できる
  const value = {
    requestUserState,
    dispatch,
    requestUserActionTyps,
  };

  // 拡張子.tsxを使わないと、JSXが書けない
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
