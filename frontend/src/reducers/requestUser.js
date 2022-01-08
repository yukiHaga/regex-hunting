import { REQUEST_STATE } from '../constants';

// useReducerで使うinitialStateを定義
export const initialState = {
  requestState: REQUEST_STATE.INITIAL,
  sessionState: false,
  userState: {
    user: {}
  },
  errors: {},
  sendGameDataState: false
};

// useReducerで使うActonTypsを定義
export const requestUserActionTyps = {
  REQUEST_SUCCESS: 'REQUEST_SUCCESS',
  REQUEST_FAILURE: 'REQUEST_FAILURE'
}

export const requestUserReducer = (state, action) => {
  switch (action.type) {
    case requestUserActionTyps.REQUEST_SUCCESS:
      return {
        ...state,
        requestState: REQUEST_STATE.OK,
        sessionState: action.payload.session,
        userState: {
          user: action.payload.user
        },
        sendGameDataState: action.payload.send_game_data ? true : false
      };
    case requestUserActionTyps.REQUEST_FAILURE:
      return {
        ...state,
        requestState: REQUEST_STATE.OK,
        sessionState: false,
        userState: {
          user: {}
        },
        errors: action.payload.errors
      };
    default:
      throw new Error();
  }
}
