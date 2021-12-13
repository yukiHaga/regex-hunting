import { REQUEST_STATE } from '../constants';

// useReducerで使うinitialStateを定義
// デフォルトでstateにfetchStateというプロパティが入っている
export const initialState = {
  postState: REQUEST_STATE.INITIAL,
  errors: {}
};

// useReducerで使うActonTypsを定義
// REQUEST_STATEは、INITIAL, LOADING, OKの3つである
// loginActionTypsがFETCHINGなら、REQUEST_STATEはLOADING
// loginActionTypsがFETCH_SUCCESSなら、REQUEST_STATEはOK
export const loginActionTyps = {
  POSTING: 'POSTING',
  POST_SUCCESS: 'POST_SUCCESS',
  POST_FAILURE: 'POST_FAILURE'
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
        ...state,
        postState: REQUEST_STATE.OK,
      };
    case loginActionTyps.POST_FAILURE:
      return {
        ...state,
        postState: REQUEST_STATE.OK,
        errors: action.payload.errors
      };
    default:
      throw new Error();
  }
}
