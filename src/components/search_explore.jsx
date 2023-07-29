import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { pageActions } from "../store/page.js"
import { videoPlayerInfoActions } from "../store/video-player-info.js";

const SearchItem = (props) => {

  const dispatch = useDispatch()
  // const [imgWidth, setImageWidth] = useState(300)
  const [thumbnailUrl, setThumbnailUrl] = useState("")


  const handleImageClick = () => {

    if (props.data.type === "video") {
      dispatch(videoPlayerInfoActions.updateVideoId({
        videoId: props.data.videoId
      }
      ))

      dispatch(pageActions.changePage("WATCH_PAGE"))

    } else if (props.data.type === "channel") {
      console.log("Its a channel")
    }
  }
  
  const handleContexMenu = (e)=> {
    // for right clicking on image
    e.preventDefault()

  }

  useEffect(() => {

    if (props.data.type === "video") {
      // console.log("Video")
      if (props.data.videoThumbnails.length > 0) {
        setThumbnailUrl(props.data.videoThumbnails[0].url)
        // console.log(props.data.videoThumbnails[0].url)
      }
    } else if (props.data.type === "channel") {
      if (props.data.authorThumbnails.length > 0){
        setThumbnailUrl(props.data.authorThumbnails[0].url)
      }
    } else if (props.data.type === "playlist") {
      if (props.data.playlistThumbnail){
        setThumbnailUrl(props.data.playlistThumbnail)
      }
    }


  }, [])


  return (
    <>
      <div style={{ 
        background:"#363040", color:"white" ,
        border: "2px solid black", borderRadius: "25px",
        padding: "5px", margin:"10px",
        display:"flex", 
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"

        }}>

        <img onClick={handleImageClick} onContextMenu={handleContexMenu} width="100%" src={thumbnailUrl} alt="" />
        <p>
          {props.data.title} <br />
          {/* {props.data.videoId} <br /> */}
          {props.data.author} <br />
          {props.data.type}
        </p>

      </div>
    </>
  )

}

const SearchExplore = (props) => {

  // const searchResults = useSelector((state) => state.watchSuggestions.videoList)
  const searchResults = useSelector((state) => state.searchResults.searchResults)
  // will change this to searchResultsExplore 

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
        {
          searchResults.map((item) => {

            console.log(item)
            return (
              <SearchItem key={nanoid()} data={item} />
            )
          })
        }
      </div>
    </>
  )

}


export { SearchExplore }
