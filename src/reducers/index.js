import { combineReducers } from 'redux';
import settingsReducer from './settingsReducer';
import startGameReducer from './startGameReducer';


export default combineReducers({
  settings: settingsReducer,
  start: startGameReducer,
});
