import { REQUEST_STATE } from '../constants';

// 戦闘bgm
import BattleSound from '../sounds/battle_25.mp3';

// useReducerで使うinitialStateを定義
// REQUEST_STATE.INITIALはrequestStateの初期値である
// REQUEST_STATE.INITISLはconstants.jsに定義されている
// APIの取得状況に応じて、requestStateの値が変化する
// リクエスト中ならLOADING, リクエスト完了ならOK
export const initialState = {
  requestState: REQUEST_STATE.INITIAL,
  sessionState: false,
  userState: {
    user: {}
  },
  errors: {},
  battleAudioState: {
    audio: new Audio(BattleSound),
    play: false
  }
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
          user: {
            ...state.userState.user,
            ...action.payload.user
          }
        },
        battleAudioState: {
          ...state.battleAudioState,
          ...action.payload.play
        }
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
