
const LeftSideBar = () => {

  const toggleLeftSideBar = ()=> {
    let sidebar = document.querySelector('.left-sidebar')
    sidebar.classList.toggle("active")


  }

  return (
    <>

      <div className="left-sidebar">
        <div className="top">
          <div className="toggle-button">
            <i onClick={toggleLeftSideBar} className="bx bx-menu" id="left-side-bar-toggle-btn" />
            {/* <span id="phoenix-name">PHOENIX</span> */}
          </div>
        </div>

        {/* Ref : Code Commerce video*/}
        {/* https://www.youtube.com/watch?v=uy1tgKOnPB0 */}
        {/* <div className="user"> */}
        {/*   <img id="user-logo" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ZlFKC6qa_R_mYaoGz_Nf4AHaJr%26pid%3DApi&f=1&ipt=84548a1e917e248863c60aed604134a9f4358b4dfce9e95ac63a92fe59f41681&ipo=images" alt="logo" /> */}
        {/*   <div> */}
        {/*     <p className="bold">Darklord </p> */}
        {/*     <p> Admin </p> */}
        {/*   </div> */}
        {/* </div> */}
        <ul>
          <li> 
            <a>
              <i className="bx bxs-grid-alt" />
              <span className="nav-item">Dashboard</span>
            </a>
            <span className="tooltip">Dashboard </span>
          </li>

          <li> 
            <a>
              <i className="bx bxs-playlist" />
              <span className="nav-item">Playlists</span>
            </a>
            <span className="tooltip">Playlists </span>
          </li>

          <li> 
            <a>
              <i className="bx bx-history" />
              <span className="nav-item">History</span>
            </a>
            <span className="tooltip">History</span>
          </li>

          <li> 
            <a>
              <i className="bx bxs-cog" />
              <span className="nav-item">Settings</span>
            </a>
            <span className="tooltip">Settings</span>
          </li>

          <li> 
            <a>
              <i className="bx bx-log-out" />
              <span className="nav-item">Logout</span>
            </a>
            <span className="tooltip">Logout</span>
          </li>

        </ul>

        {/* <div className="main-content"> */}
        {/*   <div className="container"> */}
        {/*     <span> Main Content </span> */}
        {/*   </div> */}

        {/* </div> */}


      </div>

    </>


  )

}


export {LeftSideBar}
