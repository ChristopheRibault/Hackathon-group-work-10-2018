import { START_GAME } from "./types";
import store from "../store";
import axios from "axios";

const state = store.getState();

export const drawCard = () => {
  const drawnCardIndex = Math.floor(Math.random() * state.start.deck.length);
  return state.start.deck.splice(drawnCardIndex, 1)[0];
};

export const startGame = e => dispatch => {
  e.preventDefault();
  dispatch({
    type: START_GAME,
    deck: [],
    deckIsLoading: true
  });

  let deck = [];
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=bonbon&search_simple=1&action=process&page_size=200&json=1`;
  axios.get(url).then(res =>{
    deck = res.data.products.filter(
      prod =>
        prod.nutriments["saturated-fat_100g"] &&
        prod.nutriments.sugars_100g &&
        prod.product_name_fr
    );
    dispatch({
      type: START_GAME,
      deckIsLoading: false,
      deck,
      isPlaying: true,
      cardPlayed: {},
      CPUCard: {},
      CPUpercentage: 100,
      playerPercentage: 100,
      CPUPV: state.settings.initialPoints,
      playerPV: state.settings.initialPoints,
      colorCPU: "#2d8e2a",
      colorPlayer: "#2d8e2a",
      fightResultPlayer: 0,
      fightResultCPU: 0
    });
  })
};
