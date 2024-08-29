import { motion } from "framer-motion"
import Utility_Dock from "../animations/Utility_Dock"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../misc/Context_Menu"
import { useNavigate, useLocation } from "react-router-dom"
import { TvMinimalPlay, FileTerminal, AudioLines, BotMessageSquare, Timer, Clock, FileText, SlidersHorizontal } from "lucide-react"

const Utility_Bar = ({ content, controller, pdf, chat, music, video, stop_watch, watch, language, run_code, background_color, background_complement, background_second_complement, font }) => {

    const navigate = useNavigate()
    const location = useLocation()

    const [width, set_width] = useState(window.innerWidth)
    const [id, set_id] = useState("")
    const [username, set_username] = useState("")
    const [login, set_login] = useState(false)

    const go_to = () => {

        navigate("/register")

    }

    const open_music = () => {

        music(true)

    }

    const open_chat = () => {

        chat(true)

    }

    const open_video = () => {

        video(true)

    }

    const open_stop_watch = () => {

        stop_watch(true)

    }

    const open_watch = () => {

        watch(true)

    }

    const set_lang = (val) => {

        language(val)

    }

    const run = (val) => {

        run_code(val)

    }

    const open_controller = () => {

        controller(true)

    }

    const open_pdf = () => {

        pdf(true)

    }

    useEffect(() => {

        const resize = () => set_width(window.innerWidth)
        window.addEventListener("resize", resize)

    }, [width])

    useEffect(() => {

        const get_session_data = async () => {

            try {
                const response = await axios.get(
                    `http://localhost:8000/bridge/v1/labyrinth/get_session`,
                    {
                        withCredentials: true,
                    }
                )
                set_username(response.data[0].passport.user.username)
                set_id(response.data[1])
                set_login(true)
            }
            catch (err) {
                console.log(err)
            }

        }

        get_session_data()

    }, [])

    const links = [
        {
            title: "Execute",
            icon: (
                <motion.div className="flex flex-col rounded-full w-10 h-10 justify-center items-center cursor-pointer bg-inherit"
                    whileHover={{
                        scale: 1.2
                    }}
                >
                    <ContextMenu>
                        <ContextMenuTrigger>
                            <div className="flex justify-center items-center" onClick={run}>
                                <FileTerminal color={background_color} size={30} strokeWidth={2} />
                            </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent style={{ backgroundColor: background_color, color: font, borderColor: font }}>
                            <div className="flex flex-row">
                                <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("py")}>Python</ContextMenuItem>
                                <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("java")}>Java</ContextMenuItem>
                                <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("js")}>JavaScript</ContextMenuItem>
                                <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("ts")}>TypeScript</ContextMenuItem>
                                <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("rust")}>Rust</ContextMenuItem>
                                <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("c")}>C</ContextMenuItem>
                                <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("cpp")}>C++</ContextMenuItem>
                                <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("cs")}>C#</ContextMenuItem>
                                <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("zig")}>Zig</ContextMenuItem>
                                <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("swift")}>Swift</ContextMenuItem>
                            </div>
                            <div className="flex flex-row">
                                <ContextMenuItem className="cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("cbl")}>Cobol</ContextMenuItem>
                                <ContextMenuItem className="cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("go")}>Go</ContextMenuItem>
                                <ContextMenuItem className="cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("hs")}>Haskell</ContextMenuItem>
                                <ContextMenuItem className="cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("pl")}>Perl</ContextMenuItem>
                                <ContextMenuItem className="cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("lua")}>Lua</ContextMenuItem>
                                <ContextMenuItem className="cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("php")}>PHP</ContextMenuItem>
                                <ContextMenuItem className="cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("kt")}>Kotlin</ContextMenuItem>
                                <ContextMenuItem className="cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("ex")}>Elixir</ContextMenuItem>
                                <ContextMenuItem className="cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("ruby")}>Ruby</ContextMenuItem>
                                <ContextMenuItem className="cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("ps1")}>Powershell</ContextMenuItem>
                            </div>
                        </ContextMenuContent>
                    </ContextMenu>
                </motion.div>
            ),
        },

        {
            title: "Play music",
            icon: (
                <motion.div className="flex flex-col rounded-full w-10 h-10 justify-center items-center cursor-pointer bg-inherit"
                    whileHover={{
                        scale: 1.2
                    }}
                >
                    <div onClick={open_music} >
                        <AudioLines color={background_color} size={30} strokeWidth={2} />
                    </div>
                </motion.div>
            ),
        },
        {
            title: "Search and play video on YouTube",
            icon: (
                <motion.div className="flex flex-col rounded-full w-10 h-10 justify-center items-center cursor-pointer bg-inherit"
                    whileHover={{
                        scale: 1.2
                    }}
                >
                    <div className="flex justify-center items-center" onClick={open_video}>
                        <TvMinimalPlay color={background_color} size={30} strokeWidth={2} />
                    </div>
                </motion.div>
            ),
        },
        {
            title: "Open AI chat",
            icon: (
                <motion.div className="flex flex-col rounded-full w-10 h-10 justify-center items-center cursor-pointer bg-inherit"
                    onClick={open_chat}
                    whileHover={{
                        scale: 1.2
                    }}
                >
                    <div>
                        <BotMessageSquare color={background_color} size={30} strokeWidth={2} />
                    </div>
                </motion.div>
            ),
        },
        {
            title: "Stop watch",
            icon: (
                <motion.div className="flex flex-col rounded-full w-10 h-10 justify-center items-center cursor-pointer bg-inherit"
                    onClick={open_stop_watch}
                    whileHover={{
                        scale: 1.2
                    }}
                >
                    <div>
                        <Timer color={background_color} size={30} strokeWidth={2} />
                    </div>
                </motion.div>
            ),
        },
        {
            title: "Clock",
            icon: (
                <motion.div className="flex flex-col rounded-full w-10 h-10 justify-center items-center cursor-pointer bg-inherit"
                    onClick={open_watch}
                    whileHover={{
                        scale: 1.2
                    }}
                >
                    <div>
                        <Clock color={background_color} size={30} strokeWidth={2} />
                    </div>
                </motion.div>
            ),
        },
        {
            title: "PDF viewer",
            icon: (
                <motion.div className="flex flex-col rounded-full w-10 h-10 justify-center items-center cursor-pointer bg-inherit"
                    onClick={open_pdf}
                    whileHover={{
                        scale: 1.2
                    }}
                >
                    <div>
                        <FileText color={background_color} size={30} strokeWidth={2} />
                    </div>
                </motion.div>
            ),
        },
        {
            title: "Command line arguments",
            icon: (
                <motion.div className="flex flex-col rounded-full w-10 h-10 justify-center items-center cursor-pointer bg-inherit"
                    onClick={open_controller}
                    whileHover={{
                        scale: 1.2
                    }}
                >
                    <div>
                        <SlidersHorizontal color={background_color} size={30} strokeWidth={2} />
                    </div>
                </motion.div>
            ),
        },
        {
            title: "Settings and profile",
            icon: (
                <motion.div className="basis-full flex justify-center items-center px-2 cursor-pointer bg-inherit"
                    whileHover={{
                        scale: 1.1
                    }}
                >
                    {
                        window.innerWidth <= 560 ?
                            <div className="rounded-3xl w-auto px-4 py-2 flex justify-center items-center">
                                <a href="/settings">
                                    <h3 className="font-space ml-2 bg-clip-text text-transparent" style={{ backgroundColor: background_second_complement }}>{username.substring(0, 3)}...</h3>
                                </a>
                            </div>
                            :
                            <div className="rounded-3xl w-auto px-4 py-2 flex justify-center items-center">
                                <a href="/settings">
                                    <h3 className="font-space ml-2 bg-clip-text text-transparent" style={{ backgroundColor: background_color }}>{username}</h3>
                                </a>
                            </div>
                    }
                </motion.div>
            ),
        },
    ]

    return (

        <div className=" flex justify-center items-center">
            <motion.div className="fixed bottom-0 z-30 w-auto"
                drag="x"
                dragConstraints={{ right: 0, left: 0 }}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
                initial={{
                    y: 55
                }}
                whileHover={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    stiffness: 150,
                    type: "spring",
                    duration: 0.8,
                }}
            >
                <Utility_Dock
                    background_complement={font}
                    background_color={background_color}
                    font={background_color}
                    items={links}
                />
            </motion.div>
        </div >
        // <div className=" flex justify-center items-center">
        // <motion.div className="fixed bottom-0 z-30  w-auto"
        //     drag="x"
        //     dragConstraints={{ right: 0, left: 0 }}
        //     dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
        //     initial={{
        //         y: 70
        //     }}
        //     whileHover={{
        //         y: 0,
        //         opacity: 1
        //     }}
        //     transition={{
        //         stiffness: 150,
        //         type: "spring",
        //         duration: 0.5,
        //     }}
        // >
        //         <div className="lg:auto w-auto md:w-auto rounded-t-lg flex flex-row h-20 py-0 z-30 border border-solid px-4" style={{ backgroundColor: background_color, borderColor: background_second_complement }}>
        //             <div className="py-5 flex lg:flex-row md:flex-row lg:gap-6 md:gap-6 sm:gap-2 gap-2 basis-full justify-center shrink pr-2">
        // <motion.div className="flex flex-col rounded-full w-10 h-10 place-content-center cursor-pointer"
        //     whileHover={{
        //         scale: 1.2
        //     }}
        //     style={{ backgroundColor: background_second_complement }}
        // >
        //     <ContextMenu>
        //         <ContextMenuTrigger>
        //             <div>
        //                 <h3 className="font-space ml-2 bg-clip-text text-transparent" onClick={() => run("direct")} style={{ backgroundColor: background_color }}>{"</>"}</h3>
        //             </div>
        //         </ContextMenuTrigger>
        //         <ContextMenuContent style={{ backgroundColor: background_color, color: font, borderColor: font }}>
        //             <div className="flex flex-row">
        //                 <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("python")}>Python</ContextMenuItem>
        //                 <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("java")}>Java</ContextMenuItem>
        //                 <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("javascript")}>JavaScript</ContextMenuItem>
        //                 <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("typescript")}>TypeScript</ContextMenuItem>
        //                 <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("rust")}>Rust</ContextMenuItem>
        //                 <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("c")}>C</ContextMenuItem>
        //                 <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("cpp")}>C++</ContextMenuItem>
        //                 <ContextMenuItem className="border-b rounded-none cursor-pointer" style={{ borderColor: font }} onClick={() => set_lang("c#")}>C#</ContextMenuItem>
        //             </div>
        //             <ContextMenuItem className="cursor-pointer" style={{ borderColor: font }}>Cobol</ContextMenuItem>
        //         </ContextMenuContent>
        //     </ContextMenu>
        // </motion.div>
        // <motion.div className="flex flex-col rounded-full w-10 h-10 place-content-center cursor-pointer"
        //     whileHover={{
        //         scale: 1.2
        //     }}
        //     style={{ backgroundColor: background_second_complement }}
        // >
        //     <div>
        //         <h3 className="font-space ml-2 bg-clip-text text-transparent" onClick={open_music} style={{ backgroundColor: background_color }}>🎵</h3>
        //     </div>
        // </motion.div>
        // <motion.div className="flex flex-col rounded-full w-10 h-10 place-content-center cursor-pointer"
        //     whileHover={{
        //         scale: 1.2
        //     }}
        //     style={{ backgroundColor: background_second_complement }}
        // >
        //     <div>
        //         <h3 className="font-space ml-2 bg-clip-text text-transparent" onClick={open_video} style={{ backgroundColor: background_color }}>🎞️</h3>
        //     </div>
        // </motion.div>
        // <motion.div className="flex flex-col rounded-full w-10 h-10 place-content-center cursor-pointer"
        //     whileHover={{
        //         scale: 1.2
        //     }}
        //     style={{ backgroundColor: background_second_complement }}
        // >
        //     <div>
        //         <h3 className="font-space ml-2 bg-clip-text text-transparent" onClick={open_chat} style={{ backgroundColor: background_color }}>💬</h3>
        //     </div>
        // </motion.div>
        // <motion.div className="flex flex-col rounded-full w-10 h-10 place-content-center cursor-pointer"
        //     whileHover={{
        //         scale: 1.2
        //     }}
        //     style={{ backgroundColor: background_second_complement }}
        // >
        //     <div>
        //         <h3 className="font-space ml-2 bg-clip-text text-transparent" onClick={open_stop_watch} style={{ backgroundColor: background_color }}>⏱️</h3>
        //     </div>
        // </motion.div>
        //                 <motion.div className="flex flex-col rounded-full w-10 h-10 place-content-center cursor-pointer"
        //                     whileHover={{
        //                         scale: 1.2
        //                     }}
        //                     style={{ backgroundColor: background_second_complement }}
        //                 >
        //                     <div>
        //                         <h3 className="font-space ml-2 bg-clip-text text-transparent" onClick={open_watch} style={{ backgroundColor: background_color }}>⏰</h3>
        //                     </div>
        //                 </motion.div>
        //                 <motion.div className="flex flex-col rounded-full w-10 h-10 place-content-center cursor-pointer"
        //                     whileHover={{
        //                         scale: 1.2
        //                     }}
        //                     style={{ backgroundColor: background_second_complement }}
        //                 >
        //                     <div>
        //                         <h3 className="font-space ml-2 bg-clip-text text-transparent" onClick={open_pdf} style={{ backgroundColor: background_color }}>📁</h3>
        //                     </div>
        //                 </motion.div>
        //                 <motion.div className="flex flex-col rounded-full w-10 h-10 place-content-center cursor-pointer"
        //                     whileHover={{
        //                         scale: 1.2
        //                     }}
        //                     style={{ backgroundColor: background_second_complement }}
        //                 >
        //                     <div>
        //                         <h3 className="font-space ml-2 bg-clip-text text-transparent" onClick={open_controller} style={{ backgroundColor: background_color }}>⚙️</h3>
        //                     </div>
        //                 </motion.div>
        //             </div>
        //             <div className="flex flex-row basis-0.5 pl-2">
        //                 <div className="flex justify-center items-center">
        //                     <div
        //                         style={{
        //                             width: "1px",
        //                             height: "70%",
        //                             backgroundImage: `linear-gradient(0deg, ${background_second_complement} 0%, ${background_second_complement} 50%, ${background_second_complement} 100%)`,
        //                         }}
        //                     />
        //                 </div>
        // <motion.div className="basis-full flex justify-center items-center px-2 cursor-pointer"
        //     whileHover={{
        //         scale: 1.1
        //     }}
        // >
        //     {
        //         window.innerWidth <= 560 ?
        //             <div className="rounded-3xl w-auto px-4 py-2" style={{ backgroundColor: background_complement }}>
        //                 <a href="/settings">
        //                     <h3 className="font-space ml-2 bg-clip-text text-transparent" style={{ backgroundColor: background_second_complement }}>{username.substring(0, 3)}...</h3>
        //                 </a>
        //             </div>
        //             :
        //             <div className="rounded-3xl w-auto px-4 py-2" style={{ backgroundColor: background_second_complement }}>
        //                 <a href="/settings">
        //                     <h3 className="font-space ml-2 bg-clip-text text-transparent" style={{ backgroundColor: background_color }}>{username}</h3>
        //                 </a>
        //             </div>
        //     }
        // </motion.div>
        //             </div>
        //         </div>
        //     </motion.div>
        // </div>

    )

}

export default Utility_Bar