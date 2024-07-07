import { useEffect, useState, useRef } from "react"
import { ResizableBox, Resizable } from "react-resizable"
import ReactPlayer from "react-player"
import axios from "axios"
import "../css/Test.css"
import Xterm from "./Code/components/Xterm"

const Test = () => {

    const [info, set_info] = useState([])
    const [url, set_url] = useState(null)
    const [name, set_name] = useState("")
    const [playing, set_playing] = useState(true)
    const [volume, set_volume] = useState(0.8)
    const [played, set_played] = useState(0)
    const player = useRef(null)

    const get_name = (e) => {

        set_name(e.target.value)

    }

    const handle_pause = (state) => {

        set_playing(!playing)

    }

    const handle_volume_change = (event) => {

        set_volume(parseFloat(event.target.value))

    }

    const handle_seek_change = (event) => {

        set_played(parseFloat(event.target.value))
        player.current.seekTo(parseFloat(event.target.value))

    }

    const handle_progress = (state) => {

        set_played(state.played)

    }

    const search = async(e) => {

        try{
            const response = await axios.get(
                `http://localhost:8000/bridge/v1/labyrinth/get_video_info?name=${name}`,
                {withCredentials: true}
            )
            set_info([response.data.snippet.title, response.data.snippet.channelTitle])
            set_url(`https://www.youtube.com/watch?v=${response.data.id.videoId}`)
        }
        catch(err) {
            console.log(err)
        }

    }

    return(
        <div className=" justify-center flex items-center h-dvh box overflow-auto w-screen">
            <Xterm />
        </div>
    )
}

export default Test