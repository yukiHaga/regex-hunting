import { REQUEST_STATE } from '../constants';

// useReducerで使うinitialStateを定義
export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  user: {}
};

// useReducerで使うActonTypsを定義
// REQUEST_STATEは、INITIAL, LOADING, OKの3つである
// loginActionTypsがFETCHINGなら、REQUEST_STATEはLOADING
// loginActionTypsがFETCH_SUCCESSなら、REQUEST_STATEはOK
export const loginActionTyps = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const loginReducer = (state, action) => {
  switch (action.type) {
    case loginActionTyps.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case restaurantsActionTyps.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        user: action.payload.user,
      };
    default:
      throw new Error();
  }
}
