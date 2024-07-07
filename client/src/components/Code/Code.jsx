import Xterm from "./components/Xterm"
import axios from "axios"
import Monaco from "./components/Monaco"
import Code_Mirror from "./components/Code_Mirror"
import { isMobile } from "react-device-detect"
import Files from "./components/Files"
import Split from "react-split"
import { useEffect, useRef, useState } from "react"
import Utility_Bar from "../Utility_Bar/Utility_Bar"
import Chat from "./components/Chat"
import Music from "./components/Music"

import "../../css/index.css"

// TO DO
// crtl+s save
// mobile, tablet, and other devices

const Code = () => {

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

    const [e_lang, set_e_lang] = useState("")
    const [open_chat, set_open_chat] = useState(false)
    
    const get_content = (value) => {

        git_file.current = value

        // File type or extension
        const lang = git_file.current[2].split('.')

        // Add file type to git_file.current
        git_file.current.push(lang.length > 1 ? lang.pop() : '')
        set_e_lang(git_file.current[3])

        // Setting the current editor value
        editor.current.setValue(value[0])
        console.log(git_file.current)

    }

    const E_save = (value) => {
        if(value){
            save_file()
        }
    }

    const E_get_value = (value) => {

        // For Code Mirror
        if(isMobile){
            set_Einput(value)
            return
        }

        // For Monaco
        if(editor.current === null) {
            editor.current = value  // Get the main text editor
        }
        set_Einput(value.getValue())
        
    }

    const run = async(how) => {  

        let version = null
        switch(git_file.current[3]) {

            case "js": 
                version = "20.11.1"
                break

            default:
                break

        }

        const payload = {
            language: git_file.current[3],
            version: version,
            files: [
                {
                    name: git_file.current[2],
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
                {"payload": payload},
                {withCredentials: true}
            )

            const stdout = response.data.run.output
            const arr = []
            let temp = ""
            for(let i in stdout) {
                if(stdout[i] == "\n") {
                    arr.push(temp)
                    temp = ""
                }
                else{
                    temp += stdout[i]
                }
            }
            if(how === "CLI") {
                set_output(arr)
                return
            }   
            arr.unshift(["> Terminal will run the file accroding to the file type"])
            set_output(arr)         
        }
        catch(err) {
            console.log(err)
        }

    }

    const T_get_value = async(value) => {
        if(value === "python" || value === "py" || value === "node") {
            run("CLI")
        }
        else {
            const arr = [`"${value}" ` + "Terminal doesn't recognize that command"]
            set_output(arr)
        }
    }
    
    const chat_opener = (value) => {

        set_open_chat(value)

    }
    
    return(
        <div className="flex flex-col h-screen">
            <Chat is_open={open_chat} on_close={() => set_open_chat(!open_chat)} />
            <Utility_Bar chat={chat_opener} />  
            <div className="pb-10 h-full">
                <Split
                    className="flex flex-col h-full"
                    minSize={0}
                    sizes={[15, 70, 25]}
                    direction="vertical"
                    cursor="col-resize"
                >
                    <div className="flex items-center h-full pt-2" style={{height: "15%"}}>
                        <Music />
                    </div> 
                    <div className="" style={{height: "60%"}}>
                        <Split 
                            className="flex flex-row h-full"
                            minSize={0}
                            sizes={[15, 85]}
                            direction="horizontal"
                            cursor="col-resize"
                        >
                            <div className="rounded-none py-2 w-full h-full overflow-auto" style={{backgroundColor: "#1c1e25"}}>
                                <Files get_file_content={get_content} send_content={Einput}/>
                            </div>
                            <div className="rounded-none p-4 w-full h-full" style={{backgroundColor: "#1c1e25"}}> 
                                {
                                    isMobile?
                                    <Code_Mirror 
                                        E_parent_callback={E_get_value}
                                    />
                                    :
                                    <Monaco 
                                        lang={e_lang}
                                        E_parent_callback={E_get_value} 
                                        E_parent_save={E_save} 
                                    />                                     
                                }     
                            </div>
                        </Split> 
                    </div>  
                    {/* <br></br> */}
                    <div className="h-full w-full" style={{backgroundColor: "#1c1e25"}}>
                        <Xterm T_parent_callback={T_get_value} output={output}/>
                    </div>  
                </Split>
            </div>        
        </div>       
    )

}

export default Code