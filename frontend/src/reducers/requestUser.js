import { REQUEST_STATE } from '../constants';

// useReddducerで使うinitialStateを定義
export const initialState = {
  requestUserState: REQUEST_STATE.INITIAL,
  userState: {
    session: false,
    user: {}
  },
  errors: {}
};

// useReducerで使うActonTypsを定義
// REQUEST_STATEは、INITIAL, LOADING, OKの3つである
// requestUserActionTypsがREQUESTなら、REQUEST_STATEはLOADING
// requestUserActionTypsがREQUEST_SUCCESSなら、REQUEST_STATEはOK
export const requestUserActionTyps = {
  REQUEST: 'REQUEST',
  REQUEST_SUCCESS: 'REQUEST_SUCCESS',
  REQUEST_FAILURE: 'REQUEST_FAILURE'
}

export const requestUserReducer = (state, action) => {
  switch (action.type) {
    case requestUserActionTyps.REQUEST:
      return {
        ...state,
        requestUserState: REQUEST_STATE.LOADING
        userState: {
          session: false,
          user: {}
        },
        errors: {}
      };
    case requestUserActionTyps.REQUEST_SUCCESS:
      return {
        ...state,
        requestUserState: REQUEST_STATE.OK,
        userState: {
          session: true,
          user: action.payload.user
        },
        errors: {}
      };
    case requestUserActionTyps.REQUEST_FAILURE:
      return {
        ...state,
        requestUserState: REQUEST_STATE.OK,
        userState: {
          session: false,
          user: {}
        },
        errors: action.payload.errors
      };
    default:
      throw new Error();
  }
}
