import { useEffect, useState, useRef } from "react"
import { ResizableBox, Resizable } from "react-resizable"
import ReactPlayer from "react-player"
import axios from "axios"
import "../css/Test.css"

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
        <div className=" justify-center flex items-center h-auto">
            <ResizableBox className="box bg-white " width={400} height={200}>
                <div>
                    <div className="py-4">
                        <input
                            className="border rounded-md p-2 outline-none"
                            onChange={get_name}
                            type="text"
                            placeholder="Enter song name"
                        />
                        <button className="px-2" onClick={search}>Search</button>
                    </div>                   
                    {url && (
                        <div style={{ display: 'none' }}>
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
                    <div className=" space-x-2">
                        <button onClick={handle_pause}>
                            {playing ? 'Pause' : 'Play'}
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
            </ResizableBox>
        </div>
    )
}

export default Test