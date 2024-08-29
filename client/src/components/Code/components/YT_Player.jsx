import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import ReactPlayer from "react-player"
import { Play, Pause, CircleX, Disc3 } from "lucide-react"
import axios from "axios"
import "../../../css/misc.css"

const YT_Player = (props) => {

    const [info, set_info] = useState([])
    const [url, set_url] = useState("")
    const [name, set_name] = useState("")
    const [playing, set_playing] = useState(false)
    const [volume, set_volume] = useState(0.7)
    const [played, set_played] = useState(0)
    const player = useRef(null)
    const [music_mode, set_music_mode] = useState(props.mode)
    const [list, set_list] = useState([])

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

    // const play_selected = (url) => {

    //     set_url(url)


    // }

    const search = async (e) => {

        try {
            const response = await axios.get(
                `http://localhost:8000/bridge/v1/labyrinth/get_video_info?name=${name}`,
                { withCredentials: true }
            )

            if (music_mode) {
                set_playing(true)
                set_info([response.data[0].snippet.title, response.data[0].snippet.channelTitle])
                set_url(`https://www.youtube.com/watch?v=${response.data[0].id.videoId}`)
                return
            }

            let temp = []

            Object.keys(response.data).forEach(key => {
                const id = response.data[key].id.videoId
                const channel = response.data[key].snippet.channelTitle
                const title = response.data[key].snippet.title
                const thumbnail = response.data[key].snippet.thumbnails.default.url

                temp.push([id, channel, title, thumbnail])
            })
            set_list(temp)
            set_url(true)
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <div>
            <div className="p-2 cursor-pointer w-4" onClick={() => props.make_close(false)}>
                <CircleX color={props.font_color} />
            </div>
            <div className="w-full h-full px-3">
                <div className="rounded-md h-full w-full overflow-auto bg-inherit" style={{ color: props.font_color }}>
                    <div className="p-2">
                        <div className="py-3">
                            <div className="flex flex-row gap-2">
                                <input
                                    className="px-2 outline-none py-1 border input-placeholder"
                                    onChange={get_name}
                                    type="text"
                                    placeholder={props.placeholder}
                                    style={{ backgroundColor: props.background_complement, "--placeholder-color": props.font_color }}
                                />
                                <button className="border rounded-md px-2" onClick={search} style={{ backgroundColor: props.background_complement }}>{music_mode === true ? "Play" : "Search"}</button>
                                {music_mode === true ?
                                    playing === true ?
                                        <motion.div
                                            animate={{
                                                rotate: 360
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                ease: "linear",
                                                duration: 2
                                            }}
                                        >
                                            <Disc3 strokeWidth={2} size={35} />
                                        </motion.div>
                                        :
                                        <Disc3 strokeWidth={2} size={35} />
                                    :
                                    <></>
                                }
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
                                        /> :
                                        <div className="flex flex-row overflow-auto w-full h-full">
                                            <ReactPlayer
                                                ref={player}
                                                url={url}
                                                playing={playing}
                                                volume={volume}
                                                onProgress={handle_progress}
                                                controls
                                                width="900px"
                                                height="300px"
                                            />
                                            <div className="bg-inherit flex overflow-y-auto" style={{ height: "300px" }}>
                                                <div className="flex flex-col">
                                                    {list.length === 0 ?
                                                        <></> :
                                                        <ul>
                                                            {list.map((item, index) => (
                                                                <li key={index} className="py-1">
                                                                    <div className="flex flex-row p-2 rounded-lg cursor-pointer" onClick={() => set_url(`https://www.youtube.com/watch?v=${item[0]}`)} style={{ backgroundColor: props.background_complement, borderColor: props.background_second_complement }}>
                                                                        <img src={item[3]} width={100} height={30} />
                                                                        <div className="flex flex-col pl-3">
                                                                            <p className="font-bold poin" style={{ color: props.background_second_complement }}>{item[2]}</p>
                                                                            <p style={{ color: props.font_color }}>{item[1]}</p>
                                                                            {/* <p>{item[0]}</p> */}
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                        )}
                        {
                            music_mode === true ?
                                <div className="space-x-2 flex justify-start flex-grow-0">
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

                        {/* <p className="pt-4">{info[0]}</p> */}
                        {/* <p className="">{info[1]}</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YT_Player