import { SET_PLAYERNAME, SET_INITIALPOINTS, SET_AVATAR } from '../actions/types';

const initialState = {
  playerName: '',
  initialPoints: 200,
  CPUPV: 200,
  PlayerPV: 200,
  selectedAvatar: 'alien',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PLAYERNAME:
      return {
        ...state,
        playerName: action.playerName,
      };
    case SET_INITIALPOINTS:
      return{
        ...state,
        initialPoints: action.initialPoints,
        CPUPV: action.CPUPV,
        PlayerPV: action.PlayerPV,
      };
      case SET_AVATAR:
      return {
        ...state,
        selectedAvatar: action.selectedAvatar,
      };
    default:
      return state;
  }
}