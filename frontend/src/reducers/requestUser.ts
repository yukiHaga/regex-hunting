import { REQUEST_STATE } from '../constants';

// 戦闘bgm
import BattleSound from '../sounds/battle_25.mp3';

// reducerのinitialStateの型
// userとerrorsはオプション?を使った方が良い
type InitialState = {
  requestState: string,
  sessionState: boolean,
  userState: {
    user: {
      rank: number,
      total_experience: number,
      maximum_experience_per_rank: number,
      temporary_experience: number,
      active_title: string,
      prev_temporary_experience?: number, // ゲームで使用
      id?: number, // マイページで使用
      name?: string, // マイページで使用
      open_rank?: boolean, // マイページで使用
      email?: string, // マイページで使用
      image?: string | null // マイページで使用
    }
  },
  errors: {title: string, detail: string} | undefined,
  battleAudioState: {
    audio: HTMLAudioElement,
    play: boolean
  }
}

// useReducerで使うinitialStateを定義
// REQUEST_STATE.INITIALはrequestStateの初期値である
// REQUEST_STATE.INITISLはconstants.jsに定義されている
// APIの取得状況に応じて、requestStateの値が変化する
// リクエスト中ならLOADING, リクエスト完了ならOK
export const initialState: InitialState = {
  requestState: REQUEST_STATE.INITIAL,
  sessionState: false,
  userState: {
    user: {
      rank: 0,
      total_experience: 0,
      maximum_experience_per_rank: 0,
      temporary_experience: 0,
      active_title: '',
      prev_temporary_experience: 0,
    }
  },
  errors: {
    title: "",
    detail: ""
  },
  battleAudioState: {
    audio: new Audio(BattleSound),
    play: false
  }
};

// useReducerで使うActonTypsを定義
// dispatch実行時に指定する
// それに沿って、リデューサ関数のcase文が振り分けられる
export const requestUserActionTyps = {
  REQUEST: 'REQUEST',
  REQUEST_SUCCESS: 'REQUEST_SUCCESS',
  REQUEST_FAILURE: 'REQUEST_FAILURE'
}

// Actionの型
// actionの値は、dispatchの実引数の値である
export type Action = {
  type: keyof typeof requestUserActionTyps,
  payload?: {
    session?: boolean,
    user?: {
      rank: number,
      total_experience: number,
      maximum_experience_per_rank: number,
      temporary_experience: number,
      active_title: string,
      prev_temporary_experience?: number, // ゲームで使用
      id?: number, // マイページで使用
      name?: string, // マイページで使用
      open_rank?: boolean, // マイページで使用
      email?: string, // マイページで使用
      image?: string | null // マイページで使用
    },
    play?: {play: boolean},
    errors?: {title: string, detail: string},
  }
};

// requestUserReducerの型
type RequestUserReducer = (state: InitialState, action: Action) => InitialState;

// 戻り値の型はstateと同じ
// stateを返すからである
// これはリデューサー関数であり、useReducerではない
export const requestUserReducer: RequestUserReducer = (state, action) => {
  switch (action.type) {
    case requestUserActionTyps.REQUEST:
      return {
        ...state,
        requestState: REQUEST_STATE.LOADING,
      };
    case requestUserActionTyps.REQUEST_SUCCESS:
      return {
        ...state,
        requestState: REQUEST_STATE.OK,
        sessionState: action?.payload?.session as boolean,
        userState: {
          user: {
            ...state.userState.user,
            ...action?.payload?.user
          }
        },
        battleAudioState: {
          ...state.battleAudioState,
          ...action?.payload?.play
        }
      };
    case requestUserActionTyps.REQUEST_FAILURE:
      return {
        ...state,
        requestState: REQUEST_STATE.OK,
        sessionState: false,
        userState: {
          user: {
            ...state.userState.user,
          }
        },
        errors: action?.payload?.errors
      };
    default:
      throw new Error();
  }
}
