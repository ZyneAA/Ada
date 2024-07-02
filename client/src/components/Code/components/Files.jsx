import axios from "axios"
import { useEffect, useState } from "react"
import File_System from "./FIle_System"

const Files = () => {

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

    const get_file = async(e) => {

        try{
            const response = await axios.get(
                `http://localhost:8000/bridge/v1/labyrinth/get_file?file_path=${e.target.innerText.substring(2)}`,
                {withCredentials: true}
            )
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
                    <p className="text-white px-2">new file</p>
                </div>
                <div>
                    <p className="text-white">new folder</p>
                </div>
            </div>
            <div className="flex flex-col justify-start items-start overflow-auto">
                {/* {files.map((file, index) => (
                    <button key={index} className="text-white px-3" onClick={(e) => get_file(e)}>
                        {file.type === "dir" ? "> " : "\u00A0\u00A0"}{file.name}
                    </button>           
                ))} */}
                <File_System data={files} />
            </div>  
        </div>
    )

}

export default Files