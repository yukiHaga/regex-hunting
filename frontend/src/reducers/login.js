import { REQUEST_STATE } from '../constants';

// useReducerで使うinitialStateを定義
// デフォルトでstateにfetchStateというプロパティが入っている
export const initialState = {
  postState: REQUEST_STATE.INITIAL,
  user: {}
};

// useReducerで使うActonTypsを定義
// REQUEST_STATEは、INITIAL, LOADING, OKの3つである
// loginActionTypsがFETCHINGなら、REQUEST_STATEはLOADING
// loginActionTypsがFETCH_SUCCESSなら、REQUEST_STATEはOK
export const loginActionTyps = {
  POSTING: 'POSTING',
  POST_SUCCESS: 'POST_SUCCESS'
}

export const loginReducer = (state, action) => {
  switch (action.type) {
    case loginActionTyps.POSTING:
      return {
        ...state,
        postState: REQUEST_STATE.LOADING
      };
    case loginActionTyps.POST_SUCCESS:
      return {
        postState: REQUEST_STATE.OK,
        user: action.payload.user
      };
    default:
      throw new Error();
  }
}
