import React, { useState, createContext } from "react";

// UserContextというコンテキストオブジェクトを作成
export const UserContext = createContext;

export const UserProvider = ({children}) => {

  // モーダルに関するstateの初期値
  const userInitialState = {
    session: false,
    user: {}
  }

  const [ state, setState ] = useState(userInitialState);

  const value = {
    value,
    setState
  };

  return (
    <UserContext.Provider value={value}>
  )
};
