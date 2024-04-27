import axios from "axios"
import { getRandomInt } from "../utils/general"
import { checkExistsInLocalStorage, loadFromLocalStorage, loadFromLocalStorageWithoutDefaults, saveInLocalStorage } from '../store/local_storage'
const invidious_api = {
    protocol: "https://",

    invidious: axios.create({
        // baseURL: this.protocol + this.getInvidiousInstance()
    }),

    instance_list: [],
    instance_list_fallback: ["yt.artemislena.eu", "vid.puffian.us", "invidious.projectsegfau.lt", "y.com.sb", "invidious.tiekoetter.com", "invidious.slipfox.xyz", "invidious.privacydev.net", "vid.priv.au", "iv.melmac.space", "iv.ggtyler.dev", "invidious.lunar.icu", "invidious.0011.lt", "inv.zzls.xyz", "yt.floss.media", "inv.tux.pizza", "not-ytp.blocus.ch", "invidious.protokolla.fi", "onion.tube", "inv.in.projectsegfau.lt", "inv.citw.lgbt", "inv.makerlab.tech", "yt.oelrichsgarcia.de", "yewtu.be"]
    ,
    getInvidiousInstances: function(){
        return this.instance_list
    },

    getInvidiousInstance: function(){
        return this.current_instance
    },

    setInvidiousInstance: function(provided_instance){
        this.current_instance = provided_instance
        if (provided_instance) {
            saveInLocalStorage("invidious_instance", provided_instance)
        }
    },

    getLatestInstanceList: async function(setInstanceFlag) {
        const url = "https://api.invidious.io/instances.json?pretty=1&sort_by=type,users"
        try {
            const response = await fetch(url)
            if (response.ok) {
                let instance_list = await response.json()
                instance_list = instance_list.map((item) => {
                    // console.log(item)
                    return item[0]

                })
                this.instance_list = instance_list
            } else {
                this.instance_list = this.instance_list_fallback
            }
        } catch (err) {
            this.instance_list = this.instance_list_fallback

        }

        if (setInstanceFlag) {
            this.setInvidiousInstance(this.instance_list[getRandomInt(0, 5)])
        }

        console.log("Invidious Instance List : ", this.instance_list)
    },

   

    getBaseUrl: function() {
        return this.protocol + this.getInvidiousInstance()
    },



    initInstance: function() {

        if (checkExistsInLocalStorage("invidious_instance")) {
            this.setInvidiousInstance(loadFromLocalStorageWithoutDefaults("invidious_instance"))
            this.getLatestInstanceList()
        } else {
            this.getLatestInstanceList(true)
        }
    },


    getSearchResults: async function(search_term) {
        const response = await this.invidious.get(this.getBaseUrl() + "/api/v1/search?q=" + search_term, {})

        const data = response.data
        console.log("Search results as obtained by the API : ")
        console.log(data)
        return data

    },

    getPlaylistInfo: async function(playlist_id) {
        const response = await this.invidious.get(this.getBaseUrl() + "/api/v1/playlists/" + playlist_id)
        const data = response.data
        return data

    },

    getVideoInfo: async function(video_id) {

        let videoUrl = ""
        let videoThumbnailUrl = ""

        let videoStreams = []
        let audioStreams = []

        // let request_string = "api/v1/videos/"+video_id
        let request_string = "https://" + this.getInvidiousInstance() + "/api/v1/videos/" + video_id
        console.log("Request string")
        console.log(request_string)
        const response = await this.invidious.get(request_string, {})
        console.log("Video Player Info API call")

        const data = response.data
        console.log(data)
        const formatStreams = data.formatStreams
        const adaptiveFormats = data.adaptiveFormats
        const description = data.description
        const viewCount = data.viewCount
        const likeCount = data.likeCount
        const genre = data.genre
        const author = data.author
        const authorId = data.authorId
        const authorThumbnail = data.authorThumbnails[data.authorThumbnails.length - 1].url

        formatStreams.map((el, index) => {
            const url = el.url
            // console.log(el)

            if (el.type.substring(0, 9) === "video/mp4") {
                videoStreams.push(el)
            }

        })


        console.log("Video Streams")
        console.log(videoStreams)
        console.log("Audio Streams")
        console.log(audioStreams)


        videoThumbnailUrl = data.videoThumbnails[0].url

        return {
            videoThumbnailUrl: videoThumbnailUrl,
            videoStreams: videoStreams,
            audioStreams: audioStreams,
            description: description,
        }


    }

}

export { invidious_api }




