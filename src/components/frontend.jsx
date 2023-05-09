import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { TopBar } from "./top_bar";
import { VideoPlayer } from "./video_player";
import { WatchSuggestionsSideBar } from "./watch_suggestions.jsx"
import { SearchExplore } from "./search_explore";
import { HomePage } from "./homepage.jsx"
import { HistorySideview } from "./history_sideview.jsx"
import { PlaylistsSideview } from "./playlists_sideview.jsx"
import { LeftSideBar } from "./left_sidebar";
import { styles } from "./styles";
import "./style.css"
import "./sidebar_style.css"



const WatchPage = () => {

  return (

    <div style={{ border: "2px solid black" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ border: "2px groove black" }}>
          <VideoPlayer />
        </div>
        <div style={{ border: "2px groove black" }}>
          <PlaylistsSideview />
          {/* <WatchSuggestionsSideBar /> */}
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
    <>
      <LeftSideBar />
      <div style={{ marginTop: styles.topBar.height, marginLeft:"100px" ,paddingTop: "1em" }}>
        <TopBar />
        {page.type === "WATCH_PAGE" && <WatchPage />}
        {page.type === "SEARCH_EXPLORE_PAGE" && <SearchExplore />}
        {page.type === "HOME_PAGE" && <HomePage />}
        {/* <LeftSideBar /> */}

      </div>
    </>

  )

}


export { FrontEnd }
