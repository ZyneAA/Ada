import Xterm from "./components/Xterm"
import axios from "axios"
import Monaco from "./components/Monaco"
import Code_Mirror from "./components/Code_Mirror"
import { isMobile } from "react-device-detect"
import Files from "./components/Files"
import { useEffect, useRef, useState } from "react"
import Utility_Bar from "../Utility_Bar/Utility_Bar"
import Chat from "./components/Chat"
import YT_Player from "./components/YT_Player"
import Stop_Watch from "./components/Stop_Watch"
import Cookies from "js-cookie"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../misc/Resizable"
import { FingerprintSpinner } from "react-epic-spinners"
import { useNavigate } from "react-router-dom"
import Draggable from "react-draggable"
import Clock from "./components/Clock"
import { motion } from "framer-motion"
import "../../css/index.css"

// TO DO
// crtl+s save
// mobile, tablet, and other devices

const Code = () => {

    const navigate = useNavigate()

    // Git file
    // git_file will be an array and has 4 elements. 
    // 1st -> the actual content
    // 2nd -> path
    // 3rd -> file name 
    // 4th -> the file type
    const git_file = useRef(null)

    // Main text editor(monaco or code mirror)
    const editor = useRef(null)

    // Monaco's div ref
    const monaco_div_ref = useRef(null)

    // Due to some issues with writing new line in termninal, output must be array
    // If array, terminal will attach \n and \r to the each element of the array when writing to the termnial
    // so that the final output doesn't not look weired
    const [output, set_output] = useState([])

    const [Einput, set_Einput] = useState("")
    const [current_folder, set_current_folder] = useState("")

    const [e_lang, set_e_lang] = useState("")
    const [color, set_color] = useState("#1c1e25") // Test worked!

    // Floating pop-ups
    const [open_chat, set_open_chat] = useState(false)
    const [open_music, set_open_music] = useState(false)
    const [open_video, set_open_video] = useState(false)
    const [open_sw, set_open_sw] = useState(false)
    const [open_clock, set_open_watch] = useState(false)

    // Theme
    const [theme, set_theme] = useState({})
    const [loading, set_loading] = useState(true)
    const [loader, set_loader] = useState("")

    useEffect(() => {

        const theme_name = Cookies.get("theme")

        fetch(`/themes/${theme_name}.json`)
            .then(response => response.json())
            .then(data => {
                set_loader(data.editor.background)
                set_theme(data)
                document.body.style.backgroundColor = data.editor.background_second_complement
                setTimeout(() => {
                    set_loading(false)
                }, 2000)
            })
            .catch(error => console.error("Error fetching the JSON file:", error))


        try {
            const response = axios.get(
                "http://localhost:8000/bridge/v1/labyrinth/auth/check",
                { withCredentials: true }
            )
            console.log(response.data[0])
            if (response.data === undefined) {
                console.log("here")
                navigate("/login")
            }
        }
        catch (err) {
            console.log(err)
        }

    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <FingerprintSpinner color={loader} size={100} />
            </div>
        )
    }

    const get_content = (value) => {

        git_file.current = value

        // File type or extension
        const lang = git_file.current[2].split('.')

        // Add file type to git_file.current
        git_file.current.push(lang.length > 1 ? lang.pop() : '')
        set_e_lang(git_file.current[3])

        console.log(git_file.current[3])
        // Change editor language
        switch (git_file.current[3]) {

            case "js":
                set_e_lang("javascript")
                break

            case "mjs":
                set_e_lang("javascript")
                break

            case "py":
                set_e_lang("python")
                break

            default:
                break

        }

        // Setting the current editor value
        editor.current.setValue(value[0])
        console.log(git_file.current)

    }

    const E_save = (value) => {
        if (value) {
            save_file()
        }
    }

    const E_get_value = (value) => {

        // For Code Mirror
        if (isMobile) {
            set_Einput(value)
            return
        }

        // For Monaco
        if (editor.current === null) {
            editor.current = value  // Get the main text editor
        }
        set_Einput(value.getValue())

    }

    const run = async (how) => {

        let language = null
        let version = null

        switch (e_lang) {

            case "javascript" || "mjs" || "js":
                language = "js"
                version = "20.11.1"
                break

            case "js":
                language = "js"
                version = "20.11.1"
                break

            case "mjs":
                language = "js"
                version = "20.11.1"
                break

            default:
                break

        }

        const payload = {
            language: language,
            version: version,
            files: [
                {
                    name: "file" + language,
                    content: Einput
                }
            ],
            stdin: "",
            args: [],
            compile_timeout: 10000,
            run_timeout: 3000,
            compile_memory_limit: -1,
            run_memory_limit: -1
        }

        try {
            const response = await axios.post(
                "http://localhost:8000/birdge/v1/execute",
                { "payload": payload },
                { withCredentials: true }
            )

            const stdout = response.data.run.output
            const arr = []
            let temp = ""
            for (let i in stdout) {
                if (stdout[i] == "\n") {
                    arr.push(temp)
                    temp = ""
                }
                else {
                    temp += stdout[i]
                }
            }
            if (how === "CLI" || how === "direct") {
                set_output(arr)
                return
            }
            arr.unshift(["> Terminal will run the file accroding to the file type"])
            set_output(arr)
        }
        catch (err) {
            set_output(["An error occured when trying to run the code"])
        }

    }

    const T_get_value = async(value) => {

        if (value === "python" || value === "py" || value === "node") {
            run("CLI")
        }
        else if (value === "ls") {
            try {
                const response = await axios.get(
                    "http://localhost:8000/bridge/v1/labyrinth/get_repo_files",
                    { withCredentials: true }
                )
                set_output(Object.keys(make_file(response.data)))
            }
            catch (err) {
                set_output(["An error occured"])
            }
        }
        else if (value === "cd") {
            set_output(["cd"])
            set_current_folder(value)
        }
        else {
            const arr = [`"${value}" ` + "Terminal doesn't recognize that command"]
            set_output(arr)
        }

    }

    const make_file = (paths) => {

        const result = {}
        let temp = {}
        let count = 0

        paths.forEach((path) => {

            const parts = path.split('/')

            if (parts.length === 1) {
                temp[parts] = parts[0]
                return
            }

            let current = result

            parts.forEach((part, index) => {

                if (index === parts.length - 1) {
                    current[part] = paths[count]
                    count++
                }
                else {
                    if (!current[part]) {
                        current[part] = {}
                    }
                    current = current[part]
                }

            })

        })
        
        return { ...result, ...temp }

    }

    const chat_opener = (val) => {

        set_open_chat(val)

    }

    const music_opener = (val) => {

        if (open_music === true) {
            set_open_music(false)
        }
        else {
            set_open_music(val)
        }

    }

    const video_opener = (val) => {

        if (open_video === true) {
            set_open_video(false)
        }
        else {
            set_open_video(val)
        }

    }

    const sw_opener = (val) => {

        if (open_sw === true) {
            set_open_sw(false)
        }
        else {
            set_open_sw(val)
        }

    }

    const language_selector = (val) => {

        console.log(val)
        set_e_lang(val)

    }

    const run_code = (val) => {

        run(val)

    }

    const watch_opener = (val) => {


        if (open_clock === true) {
            set_open_watch(false)
        }
        else {
            set_open_watch(val)
        }

    } 

    return (
        <div className="flex flex-col h-screen" style={{ backgroundColor: theme.editor.background_second_complement }}>
            <Chat className="h-full"
                is_open={open_chat}
                on_close={() => set_open_chat(!open_chat)}
                font_color={theme.editor.font}
                background_color={theme.editor.background}
                background_complement={theme.editor.background_complement}
                background_second_complement={theme.editor.background_second_complement} />
            <Utility_Bar
                watch={watch_opener}
                run_code={run_code}
                language={language_selector}
                video={video_opener}
                music={music_opener}
                chat={chat_opener}
                stop_watch={sw_opener}
                font={theme.editor.font}
                background_color={theme.editor.background}
                background_complement={theme.editor.background_complement}
                background_second_complement={theme.editor.background_second_complement}
            />
            <div className="pb-10 h-full">
                <ResizablePanelGroup
                    className="h-full"
                    direction="vertical"
                >
                    <ResizablePanel defaultSize={5}>
                        {open_music && (
                            <Draggable
                                defaultPosition={{ x: 0, y: 0 }}
                            >
                                <motion.div
                                    className="resize z-40 flex h-full w-auto overflow-auto border justify-center items-center rounded-md" style={{ backgroundColor: theme.editor.background, borderColor: theme.editor.background_second_complement, height: 150, width: 400 }}
                                    initial={{
                                        opacity: 0
                                    }}
                                    animate={{
                                        opacity: 1
                                    }}
                                    exit={{
                                        opacity: 0
                                    }}
                                    transition={{
                                        type: "spring",
                                        duration: 0.6
                                    }}
                                >
                                    <div className="flex flex-row overflow-auto items-start">
                                        <div className="w-full">
                                            <YT_Player
                                                placeholder={"Search a song"}
                                                mode={true}
                                                font_color={theme.editor.font}
                                                background_color={theme.editor.background}
                                                background_complement={theme.editor.background_complement}
                                                background_second_complement={theme.editor.background_second_complement}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </Draggable>
                        )}
                        {open_sw && (
                            <Draggable
                                defaultPosition={{ x: 0, y: 0 }}
                            >
                                <motion.div
                                    className="resize z-40 flex h-full w-auto overflow-auto border justify-center items-center rounded-md" style={{ backgroundColor: theme.editor.background, borderColor: theme.editor.background_second_complement, height: 150, width: 400 }}
                                    initial={{
                                        opacity: 0
                                    }}
                                    animate={{
                                        opacity: 1
                                    }}
                                    exit={{
                                        opacity: 0
                                    }}
                                    transition={{
                                        type: "spring",
                                        duration: 0.6
                                    }}
                                >
                                    <div className="flex flex-row overflow-auto items-start">
                                        <Stop_Watch
                                            font_color={theme.editor.font}
                                            background_color={theme.editor.background}
                                            background_complement={theme.editor.background_complement}
                                            background_second_complement={theme.editor.background_second_complement}
                                        />
                                    </div>
                                </motion.div>
                            </Draggable>
                        )}
                        {open_video && (
                            <Draggable
                                defaultPosition={{ x: 0, y: 0 }}
                            >
                                <motion.div
                                    className="resize flex h-full w-auto overflow-auto border justify-center items-center rounded-md" style={{ backgroundColor: theme.editor.background, borderColor: theme.editor.background_second_complement, height: 400, width: 900 }}
                                    initial={{
                                        opacity: 0
                                    }}
                                    animate={{
                                        opacity: 1
                                    }}
                                    exit={{
                                        opacity: 0
                                    }}
                                    transition={{
                                        type: "spring",
                                        duration: 0.6
                                    }}
                                >
                                    <div className="flex flex-row overflow-auto items-start">
                                        <div className="w-full">
                                            <YT_Player
                                                placeholder={"Search a video"}
                                                mode={false}
                                                font_color={theme.editor.font}
                                                background_color={theme.editor.background}
                                                background_complement={theme.editor.background_complement}
                                                background_second_complement={theme.editor.background_second_complement}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </Draggable>
                        )}
                        {open_clock && (
                            <Draggable
                                defaultPosition={{ x: 0, y: 0 }}
                            >
                                <motion.div
                                    className="resize flex h-full w-auto overflow-auto border justify-center items-center rounded-md" style={{ backgroundColor: theme.editor.background, borderColor: theme.editor.background_second_complement, height: 50, width: 200 }}
                                    initial={{
                                        opacity: 0
                                    }}
                                    animate={{
                                        opacity: 1
                                    }}
                                    exit={{
                                        opacity: 0
                                    }}
                                    transition={{
                                        type: "spring",
                                        duration: 0.6
                                    }}
                                >
                                    <div className="flex flex-row overflow-auto items-start">
                                        <div className="w-full">
                                            <Clock 
                                                font_color={theme.editor.font}
                                                background_color={theme.editor.background}
                                                background_complement={theme.editor.background_complement}
                                                background_second_complement={theme.editor.background_second_complement}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </Draggable>
                        )}
                    </ResizablePanel>
                    <ResizableHandle withHandle color={theme.editor.dintinct_color} />
                    <ResizablePanel defaultSize={65}>
                        <div className="h-full" style={{ backgroundColor: theme.editor.background }}>
                            <ResizablePanelGroup
                                direction="horizontal"
                                className="flex flex-row h-full"
                            >
                                <ResizablePanel defaultSize={15}>
                                    <div className="rounded-none py-2 w-full overflow-auto" style={{ backgroundColor: theme.editor.background, height: "80%" }}>
                                        <Files
                                            send_output={set_output}
                                            get_file_content={get_content}
                                            send_content={Einput}
                                            font={theme.editor.font}
                                            background_color={theme.editor.background}
                                            background_complement={theme.editor.background_complement}
                                            background_second_complement={theme.editor.background_second_complement}
                                        />
                                    </div>
                                </ResizablePanel>
                                <ResizableHandle withHandle color={theme.editor.dintinct_color} />
                                <ResizablePanel defaultSize={85}>
                                    <div className="rounded-none p-4 w-full h-full" style={{ backgroundColor: theme.editor.background }}>
                                        {
                                            isMobile ?
                                                <Code_Mirror
                                                    background_color={theme.editor.background}
                                                    E_parent_callback={E_get_value}
                                                />
                                                :
                                                <Monaco
                                                    lang={e_lang}
                                                    name={theme.name}
                                                    foreground={theme.editor.foreground}
                                                    background_color={theme.editor.background}
                                                    cursor_foregorund={theme.editor.cursor_foregorund}
                                                    line_highlight_background={theme.editor.line_highlight_background}
                                                    line_number_foreground={theme.editor.line_number_foreground}
                                                    selection_background={theme.editor.selection_background}
                                                    inactive_selection_background={theme.editor.inactive_selection_background}
                                                    rules={theme.editor.rules}
                                                    E_parent_callback={E_get_value}
                                                    E_parent_save={E_save}
                                                />
                                        }
                                    </div>
                                </ResizablePanel>
                            </ResizablePanelGroup>
                        </div>
                    </ResizablePanel>

                    {/* <br></br> */}
                    <ResizableHandle withHandle color={theme.editor.dintinct_color} />
                    <ResizablePanel defaultSize={30}>
                        <div className="w-full h-full" style={{ backgroundColor: theme.editor.background }}>
                            <Xterm
                                current_folder={current_folder}
                                T_parent_callback={T_get_value} output={output}
                                font={theme.editor.font}
                                background_color={theme.editor.background}
                                background_complement={theme.editor.background_complement}
                            />
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    )

}

export default Code