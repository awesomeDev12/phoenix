import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { TopBar } from "./top_bar";
import { VideoPlayer } from "./video_player";
import { WatchSuggestionsSideBar } from "./watch_suggestions.jsx"
import { SearchExplore } from "./search_explore";
import {HomePage} from "./homepage.jsx"
import {HistorySideview} from "./history_sideview.jsx"

import { styles } from "./styles";

const WatchPage = () => {

  return (

    <div style={{ position: "absolute", top: "40px", border: "2px solid black" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ border: "2px groove black" }}>
          <VideoPlayer />
        </div>
        <div style={{ border: "2px groove black" }}>
          <WatchSuggestionsSideBar />
          {/* <HistorySideview /> */}
        </div>
      </div>
    </div>
  )
}

const FrontEnd = () => {

  const page = useSelector((state) => state.page)
  console.log(page)

  return (
    <div style={{}}>
      <TopBar />
      { page.type === "WATCH_PAGE" && <WatchPage /> }
      { page.type === "SEARCH_EXPLORE_PAGE" && <SearchExplore /> }
      { page.type === "HOME_PAGE" && <HomePage />}

    </div>

  )

}


export { FrontEnd }
