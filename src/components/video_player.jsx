
import React from "react";
import { useState, useEffect, useRef } from "react";
import { invidious_api } from "./../apis/index.js"
import { videoPlayerInfoActions } from "../store/video-player-info.js";
import { historyActions } from "../store/history.js"
import { useSelector, useDispatch } from "react-redux";

const VideoPlayer = () => {

  const videoPlayerInfo = useSelector((state) => state.videoPlayerInfo)
  const playerWidth = useSelector((state) => state.videoPlayerInfo.preferences.playerWidth)
  const dispatch = useDispatch()


  const printVideoPlayerInfo = () => {
    console.log(videoPlayerInfo)

  }

  const fetchData = async () => {

    const videoInfo = await invidious_api.getVideoInfo(videoPlayerInfo.videoId)
    const invidious_video_url = videoInfo.videoUrl
    const invidious_video_thumbnail_url = videoInfo.videoThumbnailUrl

    // console.log("Inside VideoPlayer")
    // console.log("Value of videoUrl as obtained by the video player is " + invidious_video_url)
    // console.log("Value of videoThumbnailUrl as obtained by the video player is " + invidious_video_thumbnail_url)

    if (invidious_video_url.length > 5) {
      // setVideoUrl(invidious_video_url)
      dispatch(videoPlayerInfoActions.updateVideo({
        videoUrl: invidious_video_url,
        videoThumbnailUrl: invidious_video_thumbnail_url
      }
      ))
    }

    // if (invidious_video_thumbnail_url.length > 5) {
    // setVideoThumbnailUrl(invidious_video_thumbnail_url)
    // }


  }

  const increasePlayerSize = () => {
    dispatch(videoPlayerInfoActions.increasePlayerWidth())
  }

  const decreasePlayerSize = () => {
    dispatch(videoPlayerInfoActions.decreasePlayerWidth())
  }

  const toggleAutoplay = () => {
    dispatch(videoPlayerInfoActions.toggleAutoplay())
  }
  const togglePlayerControls = () => {
    dispatch(videoPlayerInfoActions.togglePlayerControls())
  }

  const toggleMuted = () => {
    dispatch(videoPlayerInfoActions.toggleMute())
  }

  const toggleLoop = () => {
    dispatch(videoPlayerInfoActions.toggleLoop())
  }

  const copyVideoLinkToClipboard = () => {
    const link = videoPlayerInfo.videoUrl;
    navigator.clipboard.writeText(link)
  }

  const reloadButtonClicked = () => {
    console.log("Reload URL button clicked")

    fetchData()

  }

  const videoRef = useRef(null)
  const videoContainerRef = useRef(null)
  const volumeSliderRef = useRef(null)

  const togglePause = () => {

    if (videoRef.current.paused) {
      videoRef.current.play()
      videoContainerRef.current.classList.remove('paused')

    } else {
      videoRef.current.pause()
      videoContainerRef.current.classList.add('paused')
    }

  }

  const volumeChanged = () => {
    videoRef.current.volume = volumeSliderRef.current.value
  }

  const toggleFullScreenMode = () => {
    if (document.fullscreenElement == null) {
      videoContainerRef.current.requestFullscreen()
    }
    else {
      document.exitFullscreen()
    }
  }

  const toggleMiniPlayerMode = () => {


  }

  useEffect(() => {

    fetchData()

    dispatch(historyActions.add({
      type: "video",
      id: videoPlayerInfo.videoId
    }
    ))

  }, [videoPlayerInfo.videoId])


  return (
    <div style={{ display: "flex", flexDirection: "column" }} >

      <div className="video-container " ref={videoContainerRef}>
        <div className="video-controls-container">
          <div className="video-controls">
            <button className="play-pause-btn" onClick={togglePause}>
              <svg className="play-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
              <svg className="pause-icon" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
              </svg>
            </button>

            <div className="volume-container">
              <button className="mute-btn">
                <svg className="volume-high-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                </svg>
                <svg className="volume-low-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
                </svg>
                <svg className="volume-muted-icon" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                </svg>
              </button>
              <input className="volume-slider" ref={volumeSliderRef} type="range" min="0" max="1" step="any" onChange={volumeChanged} />
            </div>



            <div className="duration-container">
              <div className="current-time">0:00</div>
              /
              <div className="total-time"></div>
            </div>

            <div className="right-buttons">
              <button className="captions-btn">
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M18,11H16.5V10.5H14.5V13.5H16.5V13H18V14A1,1 0 0,1 17,15H14A1,1 0 0,1 13,14V10A1,1 0 0,1 14,9H17A1,1 0 0,1 18,10M11,11H9.5V10.5H7.5V13.5H9.5V13H11V14A1,1 0 0,1 10,15H7A1,1 0 0,1 6,14V10A1,1 0 0,1 7,9H10A1,1 0 0,1 11,10M19,4H5C3.89,4 3,4.89 3,6V18A2,2 0 0,0 5,20H19A2,2 0 0,0 21,18V6C21,4.89 20.1,4 19,4Z" />
                </svg>
              </button>
              <button className="speed-btn wide-btn">
                1x
              </button>
              <button className="mini-player-btn">
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z" />
                </svg>
              </button>

              <button className="mini-player-btn">
                <svg viewBox="0 0 24 24">
                  <path fill="currentColor" d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z" />
                </svg>
              </button>
              <button className="theater-btn">
                <svg className="tall" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z" />
                </svg>
                <svg className="wide" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z" />
                </svg>
              </button>
              <button className="full-screen-btn" onClick={toggleFullScreenMode}>
                <svg className="open" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                </svg>
                <svg className="close" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                </svg>
              </button>
            </div>


          </div>
        </div>
        <video

          ref={videoRef}
          src={videoPlayerInfo.videoUrl}
          poster={videoPlayerInfo.videoThumbnailUrl}
          // width={videoPlayerInfo.preferences.playerWidth} 
          controls={videoPlayerInfo.preferences.playerControls}
          autoPlay={videoPlayerInfo.preferences.autoplay}
          muted={videoPlayerInfo.preferences.muted}
          loop={videoPlayerInfo.preferences.loop}

          onClick={togglePause}
        // style={{
        //   width: {playerWidth},
        //   maxWidth: "90vw",
        //   maxHeight: "80vh",
        // }}
        >
          <p>
            Your browser doesn't support HTML video. Here is a
            <a href={videoPlayerInfo.videoUrl}>link to the video</a> instead.
          </p>
        </video>
      </div>
      <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gridTemplateColumns: "1fr 1fr 1fr" }}>
        <button type="button" onClick={reloadButtonClicked}>Reload URL</button>
        <button type="button" onClick={printVideoPlayerInfo}>printVideoPlayerInfo</button>
        <button type="button" onClick={increasePlayerSize}>Increase Player Size</button>
        <button type="button" onClick={decreasePlayerSize}>Decrease Player Size</button>
        <button type="button" onClick={toggleAutoplay}>Toggle Autoplay</button>
        <button type="button" onClick={togglePlayerControls}>Toggle Controls</button>
        <button type="button" onClick={toggleMuted}>Toggle Muted</button>
        <button type="button" onClick={toggleLoop}>Toggle Loop</button>
        <button type="button" onClick={copyVideoLinkToClipboard}>Copy Video Link to Clipboard</button>
      </div>


    </div>
  )

}

export { VideoPlayer }
