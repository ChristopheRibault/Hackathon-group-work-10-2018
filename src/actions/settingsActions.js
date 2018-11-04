import { SET_PLAYERNAME, SET_INITIALPOINTS, SET_AVATAR } from './types';

export const handlePlayerNameChange = e => (dispatch) => {
  dispatch({
    type: SET_PLAYERNAME,
    playerName: e.target.value,
  });
};

export const handleInitialPointsChange = e => (dispatch) => {
  dispatch({
    type: SET_INITIALPOINTS,
    initialPoints: e.target.value,
    CPUPV: e.target.value,
    playerPV: e.target.value
  });
};

export const selectAvatar = e => (dispatch) => {
  dispatch({
    type: SET_AVATAR,
    selectedAvatar: e.target.id,
  })
}
