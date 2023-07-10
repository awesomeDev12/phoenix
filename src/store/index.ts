import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import authSlice from "./auth-slice.ts"
import cartSlice from "./cart-slice.ts";
import watchSuggestionsSlice from "./watch-suggestions.ts";
import videoPlayerInfoSlice from "./video-player-info.ts";
import searchResultsSlice from "./search-results.ts";
import pageSlice from "./page.ts";
import playlistsSlice from "./playlists.ts";
import historySlice from "./history.ts"
import debugSlice from "./debug.ts";


const combinedReducers = combineReducers({
  auth: authSlice.reducer,
  cart: cartSlice.reducer,
  page: pageSlice.reducer,
  watchSuggestions: watchSuggestionsSlice.reducer,
  videoPlayerInfo: videoPlayerInfoSlice.reducer,
  searchResults: searchResultsSlice.reducer,
  playlists: playlistsSlice.reducer,
  history: historySlice.reducer,
  debug: debugSlice.reducer,

})

const rootReducer = (state, action) => {
  if(action.payload == "RESET"){
    console.log("RESET action")
  }

  if (action.payload == "PRINT_STATE"){
    console.log("PRINT_STATE action")
    console.log(state)
  }

  return combinedReducers(state,action)


}


const store = configureStore({
  reducer: rootReducer

})

export default store
