import { START_GAME } from "../actions/types";

const initialState = {
  deckIsLoading: false,
  deck: [],
  isPlaying: false,
  hand: [],
  cardPlayed: {},
  CPUCard: {},
  CPUpercentage: 100,
  playerPercentage: 100,
  CPUPV: 0,
  playerPV: 0,
  colorCPU: "#2d8e2a",
  colorPlayer: "#2d8e2a",
  fightResultPlayer: 0,
  fightResultCPU: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        isPlaying: action.isPlaying,
        hand: action.hand,
        deckIsLoading: action.deckIsLoading,
        deck: action.deck,
        cardPlayed: action.cardPlayed,
        CPUCard: action.CPUCard,
        CPUpercentage: action.CPUpercentage,
        playerPercentage: action.playerPercentage,
        CPUPV: action.CPUPV,
        playerPV: action.playerPV,
        colorCPU: action.colorCPU,
        colorPlayer: action.colorPlayer,
        fightResultPlayer: action.fightResultPlayer,
        fightResultCPU: action.fightResultCPU,
      };
    default:
      return state;
  }
}
