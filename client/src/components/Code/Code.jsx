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
import Controller from "./components/Controller"
import PDF from "./components/PDF_Reader"
import { motion } from "framer-motion"
import "../../css/index.css"
import "../../css/misc.css"

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

    // Due to some issues with writing new line in termninal, output must be array
    // If array, terminal will attach \n and \r to the each element of the array when writing to the termnial
    // so that the final output doesn't not look weired
    const [output, set_output] = useState([])

    const [Einput, set_Einput] = useState("")
    const [current_folder, set_current_folder] = useState("")

    const [e_lang, set_e_lang] = useState("")

    // Floating pop-ups
    const [open_chat, set_open_chat] = useState(false)
    const [open_music, set_open_music] = useState(false)
    const [open_video, set_open_video] = useState(false)
    const [open_sw, set_open_sw] = useState(false)
    const [open_clock, set_open_watch] = useState(false)
    const [open_controller, set_open_controller] = useState(false)
    const [open_pdf, set_open_pdf] = useState(false)

    //Controller
    const [ct, set_ct] = useState(10000)
    const [et, set_et] = useState(3000)
    const [args, set_args] = useState(null)
    const [cml, set_cml] = useState(-1)
    const [eml, set_eml] = useState(-1)

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

        const check = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/bridge/v1/labyrinth/auth/check",
                    { withCredentials: true }
                )
                if (response.data === false) {
                    navigate("/login")
                }
            }
            catch (err) {
                console.log(err)
            }
        }

        const update_visit = async () => {
            try {
                const today = new Date()
                const month = today.getMonth() + 1
                const hours = today.getHours()
                const minutes = today.getMinutes()
                const seconds = today.getSeconds()

                const record = await axios.post(
                    "http://localhost:8000/bridge/v1/labyrinth/update_visitation",
                    {
                        "last_visit": today.getFullYear() + "-" + month + "-" + today.getDate() + " " + hours + ":" + minutes + ":" + seconds,
                        "last_login": null
                    },
                    { withCredentials: true }
                )
            }
            catch (err) {
                console.log(err)
            }
        }

        check()
        update_visit()

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
            case "mjs":
                set_e_lang("javascript");
                break;

            case "py":
                set_e_lang("python");
                break;

            case "ts":
            case "typescript":
                set_e_lang("typescript");
                break;

            case "java":
            case "jav":
                set_e_lang("java");
                break;

            case "rb":
            case "ruby":
                set_e_lang("ruby");
                break;

            case "c":
                set_e_lang("c");
                break;

            case "cpp":
            case "c++":
                set_e_lang("cpp");
                break;

            case "go":
            case "golang":
                set_e_lang("go");
                break;

            case "rs":
            case "rust":
                set_e_lang("rust");
                break;

            case "php":
                set_e_lang("php");
                break;

            // Add more cases as needed

            default:
                console.error("Language not supported or unrecognized");
                break;


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

        console.log(e_lang)

        switch (e_lang) {

            case "javascript":
            case "js":
            case "mjs":
                language = "js";
                version = "18.15.0";
                break;

            case "python":
            case "py":
                language = "python";
                version = "3.10.4"; // Example version, change as needed
                break;

            case "java":
            case "jav":
                language = "java";
                version = "17.0.1"; // Example version, change as needed
                break;

            case "c":
            case "gcc":
                language = "c";
                version = "11.2.0"; // Example version, change as needed
                break;

            case "cpp":
            case "c++":
                language = "cpp";
                version = "11.2.0"; // Example version, change as needed
                break;

            case "ruby":
            case "rb":
                language = "ruby";
                version = "3.1.2"; // Example version, change as needed
                break;

            case "go":
            case "golang":
                language = "go";
                version = "1.18.1"; // Example version, change as needed
                break;

            case "rust":
            case "rs":
                language = "rust";
                version = "1.60.0"; // Example version, change as needed
                break;

            case "php":
                language = "php";
                version = "8.1.4"; // Example version, change as needed
                break;

            case "typescript":
            case "ts":
                language = "typescript";
                version = "4.6.3"; // Example version, change as needed
                break;

            case "csharp":
            case "c#":
            case "cs":
                language = "csharp.net";
                version = "4.6.3"; // Example version, change as needed
                break;

            case "cbl":
            case "cob":
                language = "cobol";
                version = "4.6.3"; // Example version, change as needed
                break;

            case "ex":
            case "exs":
                language = "elixir";
                version = "4.6.3"; // Example version, change as needed
                break;

            case "hs":
            case "lhs":
                language = "haskell";
                version = "4.6.3"; // Example version, change as needed
                break;

            case "kt":
                language = "kotlin";
                version = "4.6.3"; // Example version, change as needed
                break;

            case "lua":
                language = "lua";
                version = "4.6.3"; // Example version, change as needed
                break;

            case "pl":
                language = "perl";
                version = "4.6.3"; // Example version, change as needed
                break;

            case "pas":
                language = "pascal";
                version = "4.6.3"; // Example version, change as needed
                break;

            case "swift":
                language = "swift";
                version = "4.6.3"; // Example version, change as needed
                break;

            case "zig":
                language = "zig";
                version = "4.6.3"; // Example version, change as needed
                break;

            case "ps1":
                language = "powershell";
                version = "4.6.3"; // Example version, change as needed
                break;

            default:
                break;

        }

        let arg = []
        let temp = ""

        if (Array.isArray(args)) {
            console.log(args)
            arg = args
        }
        else {
            for (let i in args) {
                if (args[i] === ' ') {
                    arg.push(temp)
                    temp = ""
                }
                if (Number(i) === args.length - 1) {
                    temp += args[i]
                    arg.push(temp)
                    break
                }
                temp += args[i]
            }
        }

        console.log(language)
        const payload = {
            language: language,  // Change to your desired language
            version: "*",        // Use the latest version
            files: [
                {
                    name: "main." + language, // The file name (can be anything)
                    content: Einput // Your code
                }
            ],
            "args": arg
        }
        console.log(payload)
        try {

            const url = "https://emkc.org/api/v2/piston/execute"
            const response = await axios.post(url, payload)
            console.log(response.data)
            if (response.data) {
                const today = new Date()
                const month = today.getMonth() + 1
                const hours = today.getHours()
                const minutes = today.getMinutes()
                const seconds = today.getSeconds()

                const record = await axios.post(
                    "http://localhost:8000/bridge/v1/labyrinth/record_execute",
                    {
                        "date": today.getFullYear() + "-" + month + "-" + today.getDate() + " " + hours + ":" + minutes + ":" + seconds,
                        "language": language,
                        "version": response.data.version,
                    },
                    { withCredentials: true }
                )
                console.log(record.data)
            }

            const stdout = response.data.run.output
            console.log(stdout)
            const arr = []
            let temp = ""
            let found = false

            for (let i in stdout) {
                console.log(i, stdout.length - 1)
                if (stdout[i] === "[") {
                    found = true
                    temp += stdout[i]
                }
                else if (stdout[i] === "]") {
                    found = false
                    temp += stdout[i]
                }
                else if (stdout[i] === "\n") {
                    if (found) {
                        continue
                    }
                    else {
                        arr.push(temp)
                        temp = ""
                    }
                }
                else if(Number(i) === stdout.length - 1) {
                    arr.push(temp)
                    temp = ""
                }
                else {
                    temp += stdout[i]
                }

            }
            console.log(arr)

            if (how === "CLI" || how === "direct") {

                set_output(arr)
                return

            }

            arr.unshift(["> Terminal will run the file accroding to the file type"])
            set_output(arr)
        }
        catch (err) {
            console.log(err)
            set_output(["An error occured when trying to run the code"])
        }
    }

    const T_get_value = async (value) => {

        let arg = false
        const arr = value.split(' ')
        if (arr.length > 1) {
            arg = true
        }

        if (arr[0] === "run") {
            if (arg) {
                set_args(arr.slice(1))
            }
            else {
                set_args([])
            }
            run("CLI")
        }
        else if (arr[0] === "ls") {
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
        else if (arr[0] === "cd") {
            set_output(["cd"])
            set_current_folder(value)
        }
        else {
            const out = [`"${value}" ` + "Terminal doesn't recognize that command"]
            set_output(out)
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

    const pdf_opener = (val) => {


        if (open_pdf === true) {
            set_open_pdf(false)
        }
        else {
            set_open_pdf(val)
        }

    }

    const controller_opener = (val) => {

        console.log(val)


        if (open_controller === true) {
            set_open_controller(false)
        }
        else {
            set_open_controller(val)
        }

    }

    const get_ct = (val) => {

        set_ct(val)

    }

    const get_et = (val) => {

        set_et(val)

    }

    const get_args = (val) => {

        set_args(val)

    }

    const get_cml = (val) => {

        set_cml(val)

    }

    const get_eml = (val) => {

        set_eml(val)

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
                content={Einput}
                controller={controller_opener}
                watch={watch_opener}
                run_code={run_code}
                language={language_selector}
                video={video_opener}
                music={music_opener}
                chat={chat_opener}
                stop_watch={sw_opener}
                pdf={pdf_opener}
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
                    <ResizablePanel defaultSize={5} className="flex flex-row gap-1">
                        {open_music && (
                            <Draggable
                                defaultPosition={{ x: 0, y: 0 }}
                            >
                                <motion.div
                                    className="resize z-40 flex h-full w-auto overflow-auto border rounded-md" style={{ backgroundColor: theme.editor.background, borderColor: theme.editor.background_second_complement, height: 150, width: 350 }}
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
                                                make_close={() => music_opener(false)}
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
                                    className="resize z-40 flex h-full w-auto overflow-auto border rounded-md" style={{ backgroundColor: theme.editor.background, borderColor: theme.editor.background_second_complement, height: 200, width: 400 }}
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
                                            make_close={() => sw_opener(false)}
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
                                    className="resize flex h-full w-auto overflow-auto border rounded-md" style={{ backgroundColor: theme.editor.background, borderColor: theme.editor.background_second_complement, height: 450, width: 1200 }}
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
                                                make_close={() => video_opener(false)}
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
                                    className="resize flex h-full w-auto overflow-auto border rounded-md" style={{ backgroundColor: theme.editor.background, borderColor: theme.editor.background_second_complement, height: 80, width: 200 }}
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
                                                make_close={() => watch_opener(false)}
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
                        {open_controller && (
                            <Draggable
                                defaultPosition={{ x: 0, y: 0 }}
                            >
                                <motion.div
                                    className="resize flex h-full w-auto overflow-auto border justify-center items-center rounded-md" style={{ backgroundColor: theme.editor.background, borderColor: theme.editor.background_second_complement, height: 100, width: 300 }}
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
                                            <Controller
                                                make_close={() => controller_opener(false)}
                                                ct={get_ct}
                                                et={get_et}
                                                args={get_args}
                                                cml={get_cml}
                                                eml={get_eml}
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
                        {open_pdf && (
                            <Draggable
                                defaultPosition={{ x: 0, y: 0 }}
                            >
                                <motion.div
                                    className="resize flex h-full w-auto overflow-auto border rounded-md" style={{ backgroundColor: theme.editor.background, borderColor: theme.editor.background_second_complement, height: 500, width: 1100 }}
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
                                    <div className="flex flex-row overflow-auto">
                                        <div className="w-full">
                                            <PDF
                                                make_close={() => pdf_opener(false)}
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
                    
                                    <div className="rounded-none py-2 w-full overflow-auto" style={{ backgroundColor: theme.editor.background, height: "100%" }}>
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
                        <div className="h-full flex flex-row w-full" style={{ backgroundColor: theme.editor.background }}>
                            <Xterm
                                current_folder={current_folder}
                                T_parent_callback={T_get_value}
                                output={output}
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