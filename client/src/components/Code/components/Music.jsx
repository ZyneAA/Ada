import { useEffect, useState, useRef } from "react"
import ReactPlayer from "react-player"
import axios from "axios"

const Music = () => {

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
            <div className="rounded-md text-slate-300 border border-slate-800 h-full justify-center items-center flex overflow-hidden" style={{backgroundColor: "#1c1e25"}}>
                <div className="p-2">
                    <div className="py-3">
                        <div className="flex flex-row gap-2">
                            <input
                                className="border border-slate-800 rounded-md px-2 bg-black outline-none py-1"
                                onChange={get_name}
                                type="text"
                                placeholder="Enter song name"
                            />
                            <button className="border border-slate-800 bg-black rounded-md px-2" onClick={search}>Search</button>
                        </div>
                    </div>                   
                    {url && (
                        <div style={{ display: "none" }}>
                            <ReactPlayer 
                                ref={player}
                                url={url} 
                                playing={playing}
                                volume={volume}
                                onProgress={handle_progress}
                                controls 
                                width="0" 
                                height="0" 
                            />
                        </div>
                    )}
                    <div className="space-x-2">
                        <button onClick={handle_pause}>
                            {playing ? "⏸️" : "▶️"}
                        </button>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step="any"
                            value={played}
                            onChange={handle_seek_change}
                        />
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step="any"
                            value={volume}
                            onChange={handle_volume_change}
                        />
                    </div>
                    <p className="pt-4">{info[0]}</p>
                    <p className="">{info[1]}</p>
                </div>
            </div>
    )
}

export default Music