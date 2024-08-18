import axios from "axios"
import { useEffect, useState } from "react"
import File_System from "./FIle_System"
import { LuFilePlus2 } from "react-icons/lu"
import { SlReload } from "react-icons/sl"
import { motion } from "framer-motion"
import { AiFillGithub } from "react-icons/ai"
import "../../../css/misc.css"

const Files = (props) => {

    const [files, set_files] = useState({})
    const [filename, set_filename] = useState("")
    const [folder, set_folder] = useState("")
    const [sha, set_sha] = useState(null)
    const [pat, set_pat] = useState("")
    const [toggle, set_toggle] = useState(false)
    const [file_created, set_file_created] = useState(0)
    const [c, set_c] = useState(null)

    const [err, set_err] = useState(false)

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

    useEffect(() => {

        const timeout = setTimeout(async () => {

            try {
                const response = await axios.post(
                    `http://localhost:8000/bridge/v1/labyrinth/put_file?file_path=${pat}`,
                    {
                        content: props.send_content,
                        sha: sha
                    },
                    { withCredentials: true }
                )
            }
            catch (err) {
                console.log(err)
            }

        }, 5000)

        return () => clearTimeout(timeout)

    }, [props.send_content])

    useEffect(() => {

        const get_repo = async () => {

            try {
                const response = await axios.get(
                    "http://localhost:8000/bridge/v1/labyrinth/get_repo_files",
                    { withCredentials: true }
                )
                set_files(make_file(response.data))
            }
            catch (err) {
                console.log(err)
                set_err(true)
            }

        }

        get_repo()

    }, [c])

    const get_file = async (path) => {

        set_pat(path[0])

        console.log(path[2])

        try {
            const response = await axios.get(
                `http://localhost:8000/bridge/v1/labyrinth/get_file_content?file_path=${path[0]}`,
                { withCredentials: true }
            )
            props.get_file_content([response.data[1], path[0], path[1]])
            set_sha(response.data[0].sha)

            if (path[2] === 1) {
                const lang = response.data[0].name.split('.')

                let language = null
                let version = null
                switch (lang[1]) {

                    case "js" || "mjs":
                        language = "js"
                        version = "20.11.1"
                        break

                    default:
                        break

                }
                console.log(response.data[1])
                const payload = {
                    language: language,
                    version: version,
                    files: [
                        {
                            name: "test",
                            content: response.data[1]
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
                    props.send_output(arr)
                }
                catch (err) {
                    console.log(err)
                }
                console.log(response.data, lang[1])
            }
            else if (path[2] === 2) {
                props.send_output([path[0]])
            }
        }
        catch (err) {
            console.log(err)
        }

    }

    const handle_toggle = () => {

        set_toggle(!toggle)
        set_file_created(0)

    }

    const get_folder = (value) => {

        set_folder(value)

    }

    const handle_filename = (e) => {

        set_filename(e.target.value)

    }

    const create_file = async () => {

        if (folder.includes('.')) {
            set_file_created(2)
        }

        try {
            const response = await axios.post(
                `http://localhost:8000/bridge/v1/labyrinth/create_file`,
                {
                    folder: folder,
                    filename: filename,
                    content: "New file created"
                },
                { withCredentials: true }
            )

            if (response.data.commit.sha) {
                set_file_created(1)
                changes({ cause: `${filename} created` })
                return
            }
        }
        catch (err) {
            set_file_created(2)
        }

    }


    const git_auth = async () => {

        // try {
        //     const response = await axios.get(
        //         "http://localhost:8000/bridge/v1/labyrinth/auth/github", 
        //         {},
        //         {withCredentials: true}
        //     )
        // } 
        // catch (err) {
        //     console.error(err);
        // }
        window.location.href = "http://localhost:8000/bridge/v1/labyrinth/auth/github"

    }

    const changes = (changes) => {

        console.log(changes)
        set_c(changes)

    }

    const set_root_folder = () => {

        set_folder("")


    }

    const rename_file = () => {



    }

    return (
        <div className="h-full">
            {
                err === true ?
                    <div className="flex justify-center items-center">
                        <motion.div
                            className="pt-4"
                            onClick={git_auth}
                        >
                            <p className="px-4 pb-10" style={{ color: props.font }}>Login with github to store your code</p>
                            <div className="flex justify-center items-center hover:cursor-pointer">
                                <AiFillGithub color={props.background_second_complement} size="35" />
                            </div>
                        </motion.div>
                    </div> :
                    <div>
                        <div className="flex flex-row items-end justify-end px-4 pb-2">
                            <div>
                                {toggle && (
                                    <div className="w-auto fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-0 backdrop-blur-sm z-50">
                                        <div className=" p-6 shadow-lg rounded-xl border h-auto w-auto" style={{ backgroundColor: props.background_color, borderColor: props.background_second_complement }}>
                                            <div className="flex flex-col">
                                                <h2 className="text-xl font-bold mb-1 p-2" style={{ color: props.font }}>Create New File</h2>
                                                <div className="p-2 flex flex-col mt-4 mb-1">
                                                    <p className="" style={{ color: props.font }}>To create new folder, type folder name/file name.</p>
                                                </div>
                                                <div className="border-b rounded-none p-2 flex flex-col mb-4" style={{ borderColor: props.background_second_complement }}>
                                                    <p className="" style={{ color: props.font }}>Cann't create empty folder.</p>
                                                </div>
                                                <p className=" pb-4" style={{ color: props.font }}>Current folder: {folder}</p>
                                                <input placeholder="Enter file name" className="p-2 outline-none rounded-lg border-1 border-b" style={{ backgroundColor: props.background_complement, borderColor: props.background_color, color: props.font, "--placeholder-color": props.font }} onChange={handle_filename}></input>
                                                <button onClick={set_root_folder} className="mt-4 p-1 px-2 justify-start flex underline" style={{ color: props.font }}>
                                                    Set To Root Path
                                                </button>
                                                <div className="flex flex-row gap-4 pt-4">
                                                    <button onClick={create_file} className=" p-1 px-2 border rounded-xl" style={{ color: props.font }}>
                                                        Create
                                                    </button>
                                                    <button onClick={handle_toggle} className=" p-1 px-2 border rounded-xl" style={{ color: props.font }}>
                                                        Cancle
                                                    </button>
                                                </div>
                                                <div className="py-4">
                                                    {
                                                        file_created === 1 ?
                                                            <h2 className="" style={{ color: props.font }}>File created</h2> :
                                                            file_created === 2 ?
                                                                <h2 className="" style={{ color: props.font }}>Failed to create file</h2>
                                                                :
                                                                <></>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row pb-2 px-2" style={{ height: "10%" }}>
                                <div style={{ width: "20%" }} className="flex items-center">
                                    <p className="text-transparent bg-clip-text" style={{ backgroundColor: props.background_second_complement }}>EXPLORER</p>
                                </div>
                                <div className="flex flex-row justify-end items-center gap-2" style={{ width: "80%" }}>
                                    <div>
                                        <SlReload color={props.background_second_complement} size="20" />
                                    </div>
                                    <div>
                                        <LuFilePlus2 color={props.background_second_complement} size="20" onClick={handle_toggle} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ height: "90%" }}>
                                <File_System data={files}
                                    selected_path={get_file}
                                    selected_folder={get_folder}
                                    changes_occour={changes}
                                    rename_file={rename_file}
                                    icon_color={props.background_second_complement}
                                    font_color={props.font}
                                    background_complement={props.background_complement}
                                />
                            </div>
                        </div>
                    </div>
            }
        </div>
    )

}

export default Files