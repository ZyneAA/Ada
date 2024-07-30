import { useEffect, useState, useRef } from "react"
import ReactPlayer from "react-player"
import { Play, Pause } from "lucide-react"
import axios from "axios"
import { Music, SquarePlay } from "lucide-react"
import "../../../css/misc.css"

const YT_Player = (props) => {

    const [info, set_info] = useState([])
    const [url, set_url] = useState(null)
    const [name, set_name] = useState("")
    const [playing, set_playing] = useState(true)
    const [volume, set_volume] = useState(0.8)
    const [played, set_played] = useState(0)

    // Player
    const player = useRef(null)
    const [music_mode, set_music_mode] = useState(true)

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

    const search = async (e) => {

        try {
            const response = await axios.get(
                `http://localhost:8000/bridge/v1/labyrinth/get_video_info?name=${name}`,
                { withCredentials: true }
            )
            set_info([response.data.snippet.title, response.data.snippet.channelTitle])
            set_url(`https://www.youtube.com/watch?v=${response.data.id.videoId}`)
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <div className="rounded-md h-auto w-auto justify-center items-center flex overflow-auto bg-inherit" style={{ color: props.font_color }}>
            <div className="p-2">
                <div className="py-3">
                    <div className="flex flex-row gap-2">
                        <input
                            className="px-2 outline-none py-1 border input-placeholder"
                            onChange={get_name}
                            type="text"
                            placeholder="Search a song"
                            style={{ backgroundColor: props.background_complement, "--placeholder-color": props.font_color }}
                        />
                        <button className="border rounded-md px-2" onClick={search} style={{ backgroundColor: props.background_complement }}>Search</button>
                        <div className="cursor-pointer h-full">
                            {
                                music_mode === true ?
                                <div className="flex items-center h-full w-full">
                                    <Music color={props.font_color} onClick={() => set_music_mode(!music_mode)} size={30} /> 
                                </div>:
                                <div className="flex items-center h-full w-full">
                                    <SquarePlay color={props.font_color} onClick={() => set_music_mode(!music_mode)} size={35} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                {url && (
                    <div className="w-full h-full flex flex-grow overflow-auto">
                        {
                            music_mode === true ?
                                <ReactPlayer
                                    style={{ display: "none" }}
                                    ref={player}
                                    url={url}
                                    playing={playing}
                                    volume={volume}
                                    onProgress={handle_progress}
                                    controls
                                    width="600px"
                                    height="300px"
                                /> :
                                <ReactPlayer
                                    ref={player}
                                    url={url}
                                    playing={playing}
                                    volume={volume}
                                    onProgress={handle_progress}
                                    controls
                                    width="600px"
                                    height="300px"
                                />
                        }
                    </div>
                )}
                {
                    music_mode === true ?
                        <div className="space-x-2 flex justify-start">
                            <button onClick={handle_pause}>
                                {playing ? <Pause size={20} strokeWidth={1} /> : <Play size={20} strokeWidth={1} />}
                            </button>
                            <input
                                style={{ "--placeholder-border": props.background_second_complement, "--placeholder-thumb": props.background_second_complement, width: "70%" }}
                                type="range"
                                min={0}
                                max={1}
                                step="any"
                                value={played}
                                onChange={handle_seek_change}
                            />
                            <input
                                style={{ "--placeholder-border": props.background_second_complement, "--placeholder-thumb": props.background_second_complement, width: "30%" }}
                                type="range"
                                min={0}
                                max={1}
                                step="any"
                                value={volume}
                                onChange={handle_volume_change}
                            />
                        </div> :
                        <></>
                }

                <p className="pt-4">{info[0]}</p>
                {/* <p className="">{info[1]}</p> */}
            </div>
        </div>
    )
}

export default YT_Player