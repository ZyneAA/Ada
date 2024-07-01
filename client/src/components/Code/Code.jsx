import Xterm from "./components/Xterm"
import axios from "axios"
import Monaco from "./components/Monaco"
import Code_Mirror from "./components/Code_Mirror"
import { isMobile } from "react-device-detect"
import Files from "./components/Files"
import { useEffect, useRef, useState } from "react"

import "../../css/Test.css"

// TO DO
// crtl+s save
// mobile, tablet, and other devices

const Code = () => {

    //
    const [km_width, set_km_width] = useState(800)
    const [km_height, set_km_height] = useState(600)

    // Use to mange file system
    const file_no = useRef(1)
    const files = useRef({})
    const files_display = useRef([])

    // Main text editor(monaco or code mirror)
    const editor = useRef(null)

    // Monaco's div ref
    const monaco_div_ref = useRef(null)

    // Due to some issues with writing new line in termninal, output must be array
    // If array, terminal will attach \n and \r to the each element of the array when writing to the termnial
    // so that the final output doesn't not look weired
    const [output, set_output] = useState([])

    const [Einput, set_Einput] = useState("")

    // useEffect(() => {
    //     const get_session = async() => {
    //         try{
    //             const response = await axios.get(
    //                 "http://192.168.99.163:8000/",
    //                 {withCredentials: true}
    //             )
    //             // console.log(response.data)
    //         }
    //         catch(err){
    //             console.log(err)
    //         }  
    //     }
    //     get_session()            
    // }, [])
    
    const save_file = () => {
        if(!files_display.current.includes(file_no.current)){
            files_display.current.push(file_no.current)
        }
        console.log(file_no.current)
        console.log(files.current)
    }

    const new_file = () => {
        if(editor.current === null || editor.current.getValue() === ""){
            return
        }
        editor.current.setValue("")
        files_display.current.push(file_no.current)
        file_no.current += 1
        set_Einput("")
    }

    // When new_file() is fired this hook will update the new file number's content
    useEffect(() => {      
        files.current[file_no.current] = Einput
    }, [Einput])

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
        if(editor.current === null){
            editor.current = value  // Get the main text editor
        }
        set_Einput(value.getValue())
    }

    const run = async(how) => {  

        const payload = {
            "language": "js",
            "version": "20.11.1",
            "files": [
                {
                    "name": "code.js",
                    "content": Einput
                }
            ],
            "stdin": "",
            "args": [],
            "compile_timeout": 10000,
            "run_timeout": 3000,
            "compile_memory_limit": -1,
            "run_memory_limit": -1
        }

        try{
            const response = await axios.post(
                "http://localhost:8000/birdge/v1/execute",
                {"payload": payload},
                {withCredentials: true}
            )

            const stdout = response.data.run.output
            const arr = []
            let temp = ""
            for(let i in stdout){
                if(stdout[i] == "\n"){
                    arr.push(temp)
                    temp = ""
                }
                else{
                    temp += stdout[i]
                }
            }
            if(how === "CLI"){
                set_output(arr)
                return
            }   
            arr.unshift(["> Terminal will run the file accroding to the file type"])
            set_output(arr)         
        }
        catch(err){
            console.log(err)
        }
    }

    const T_get_value = async(value) => {
        if(value === "python" || value === "py" || value === "node"){
            run("CLI")
        }
        else{
            const arr = [`"${value}" ` + "Terminal doesn't recognize that command"]
            set_output(arr)
        }
    }

    // Change the value of editor according to the selected file
    const change = (e) => {
        const no = Number(e.target.textContent)
        editor.current.setValue(files.current[no])
    }
    
    return(
        <div className="flex flex-col h-dvh py-10">
            <div className="flex flex-row justify-centers pb-2 px-10 gap-2 h-full">
                <div className="flex-initial w-3/12 overflow-auto h-full rounded-md" style={{backgroundColor: "#1c1e25"}}>
                    <Files />
                </div>
                <div className="flex flex-col items-center justify-center w-full h-full"> 
                    {
                        isMobile?
                        <div>
                            <Code_Mirror E_parent_callback={E_get_value}/>
                        </div>
                        :
                        <div className="rounded-md p-2 w-full h-full resize-x overflow-auto" style={{backgroundColor: "#1c1e25"}}>
                            <Monaco 
                                E_parent_callback={E_get_value} 
                                E_parent_save={E_save} 
                            />
                        </div>                                       
                    }     
                </div> 
            </div>  
            <br></br>
            <div className="flex jitems-center justify-center px-10">
                <div className="w-full">
                    <Xterm T_parent_callback={T_get_value} output={output}/>
                </div>            
            </div>               
        </div>       
    )

}

export default Code