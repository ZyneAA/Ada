import axios from "axios"
import { useEffect, useState } from "react"
import File_System from "./FIle_System"

const Files = (props) => {

    const [files, set_files] = useState({})
    const [filename, set_filename] = useState("")
    const [folder, set_folder] = useState("")
    const [sha, set_sha] = useState(null)
    const [pat, set_pat] = useState("")
    const [toggle, set_toggle] = useState(false)

    const make_file = (paths) => {

        const result = {}
        let count = 0
    
        paths.forEach((path) => {
    
            const parts = path.split('/')
            let current = result
        
            parts.forEach((part, index) => {
    
                if(index === parts.length - 1) {
                    current[part] = paths[count]
                    count++
                } 
                else {
                    if(!current[part]) {
                        current[part] = {}
                    }
                    current = current[part]
                }
    
            })
    
        })
    
        return result
    
    }

    useEffect(() => {

        const timeout = setTimeout(async() => {
            
            try {
                const response = await axios.post(
                    `http://localhost:8000/bridge/v1/labyrinth/put_file?file_path=${pat}`,
                    {
                        content: props.send_content,
                        sha: sha
                    },
                    {withCredentials: true}
                )
                console.log(props.send_content)
            }
            catch(err) {
                console.log(err)
            }

        }, 5000)

        return () => clearTimeout(timeout)

    }, [props.send_content])

    useEffect(() => {

        const get_repo = async() => {
            
            try{
                const response = await axios.get(
                    "http://localhost:8000/bridge/v1/labyrinth/get_repo_files",
                    {withCredentials: true}
                )
                console.log(response.data)
                set_files(make_file(response.data))
            }
            catch(err) {
                console.log(err)
            }

        }

        get_repo()

    }, [])

    const get_file = async(path) => {

        set_pat(path[0])

        try{
            const response = await axios.get(
                `http://localhost:8000/bridge/v1/labyrinth/get_file_content?file_path=${path[0]}`,
                {withCredentials: true}
            )
            props.get_file_content([response.data[1], path[0], path[1]])
            set_sha(response.data[0].sha)
        }
        catch(err) {
            console.log(err)
        }

    }

    const handle_toggle = () => {

        set_toggle(!toggle)

    }

    const get_folder = (value) => {

        set_folder(value)

    }

    const handle_filename = (e) => {
        
        set_filename(e.target.value)

    }

    const create_file = async() => {

        try{
            const response = await axios.post(
                `http://localhost:8000/bridge/v1/labyrinth/create_file`,
                {
                    folder: folder,
                    filename: filename,
                    content: "New file created"
                },
                {withCredentials: true}
            )
            // set_toggle(!toggle)
            console.log(response.data)
        }
        catch(err) {
            console.log(err)
        }

    }

    return(
        <div className="h-fit">
            <div className="flex flex-row items-end justify-end pr-4 py-2">
                <div>
                    {toggle && (
                            <div className="w-auto fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-0 backdrop-blur-sm z-50">
                                <div className="bg-black p-6 shadow-lg rounded-xl border border-slate-600 h-auto w-auto">
                                    <div className="flex flex-col">
                                        <h2 className="text-xl font-bold mb-4 text-white">Create New File</h2>  
                                        <div className="border rounded-lg p-2 border-slate-600 bg-green-700/45 flex flex-col mt-4 mb-1">
                                            <p className="text-white">To create new folder, type folder name/file name.</p> 
                                        </div> 
                                        <div className="border rounded-lg p-2 border-slate-600 bg-red-700/40 flex flex-col mb-4">
                                            <p className="text-white">Cann't create empty folder.</p> 
                                        </div> 
                                        <p className="text-white pb-4">Current folder: {folder}</p> 
                                        <input placeholder="Enter file name" className="p-2 bg-slate-900 outline-none rounded-lg text-white border border-slate-600" onChange={handle_filename}></input>  
                                        <div className="flex flex-row gap-4 pt-4">
                                            <button onClick={create_file} className="text-white p-1 px-2 border rounded-xl">                                          
                                                Create
                                            </button>
                                            <button onClick={handle_toggle} className="text-white p-1 px-2 border rounded-xl">                                          
                                                Cancle
                                            </button>
                                        </div>                      
                                    </div>
                                </div>
                            </div>
                        )
                    } 
                    <p className="text-white px-2" onClick={handle_toggle}>new file</p>
                </div>
            </div>
            <div className="flex flex-col justify-start items-start overflow-auto">
                <File_System data={files} selected_path={get_file} selected_folder={get_folder} />
            </div>  
        </div>
    )

}

export default Files