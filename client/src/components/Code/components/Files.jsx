import axios from "axios"
import { useEffect, useState } from "react"
import File_System from "./FIle_System"

const Files = (props) => {

    const [files, set_files] = useState({})

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

        try{
            const response = await axios.get(
                `http://localhost:8000/bridge/v1/labyrinth/get_file_content?file_path=${path[0]}`,
                {withCredentials: true}
            )
            props.get_file_content([response.data, path[1]])
        }
        catch(err) {
            console.log(err)
        }

    }

    return(
        <div className="h-fit">
            <div className="flex flex-row items-end justify-end pr-4 py-2">
                <div>
                    <p className="text-white px-2">new file</p>
                </div>
                <div>
                    <p className="text-white" onClick={get_file}>new folder</p>
                </div>
            </div>
            <div className="flex flex-col justify-start items-start overflow-auto">
                <File_System data={files} selected_path={get_file} />
            </div>  
        </div>
    )

}

export default Files