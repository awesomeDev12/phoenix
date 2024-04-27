import React from "react";
import { SearchBar } from "./search_bar";
import { generalActions } from "../store/general";
import { useDispatch } from "react-redux";
// import { styles } from "./styles";
const TopBar = (props) => {
  const dispatch = useDispatch()
  const enableSideBar = ()=>{
    console.log("Enable SideBarEnable")
    dispatch(generalActions.toggleSideBarEnabled())
  }

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div className="side-bar-left-toggle-button">
          <i onClick={() => { enableSideBar() }} className="bx bx-menu" id="left-side-bar-toggle-btn" />
        </div>
        {/* <div className="phoenix-name">
          Phoenix
        </div> */}
      </div>

      <SearchBar />
      <div className="top-bar-right">
        <a href="https://github.com/soufrabi/phoenix" target="_blank">
          <i className="fa fa-github" id="github-icon"> </i>
        </a>
      </div>
    </div>
  )
}

export { TopBar }
