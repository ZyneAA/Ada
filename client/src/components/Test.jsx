import { useEffect, useState } from "react";
import { ResizableBox, Resizable } from "react-resizable";
import axios from "axios"
import "../css/Test.css"

const Test = () => {

    const [ok, set_ok] = useState(null)

    const session = async() => {

        // try{
        //     const response = await axios.get(
        //         "http://localhost:8000/bridge/v1/labyrinth/get_repos",
        //         {withCredentials: true}
        //     )
        //     set_ok(response.data)
        //     console.log(response.data)
        // }
        // catch(err) {
        //     console.log(err)
        // }

        try{
            const response = await axios.get(
                "http://localhost:8000/bridge/v1/labyrinth/get_session",
                {withCredentials: true}
            )
            set_ok(response.data)
            console.log(response.data)
        }
        catch(err) {
            console.log(err)
        }

        // try{
        //     const response = await axios.post(
        //         "http://localhost:8000/bridge/v1/labyrinth/create_file",
        //         {
        //             "folder": "test2/test3",
        //             "filename": "test.js",
        //             "content": "console.log('hello')"
        //         },
        //         {withCredentials: true}
        //     )
        //     set_ok(response.data)
        //     console.log(response.data)
        // }
        // catch(err) {
        //     console.log(err)
        // }

        // try{
        //     const response = await axios.get(
        //         "http://localhost:8000/bridge/v1/labyrinth/get_repo_contents",
        //         {withCredentials: true}
        //     )
        //     set_ok(response.data)
        //     console.log(response.data)
        // }
        // catch(err) {
        //     console.log(err)
        // }

        // try{
        //     const response = await axios.get(
        //         "http://localhost:8000/bridge/v1/labyrinth/get_repo",
        //         {withCredentials: true}
        //     )
        //     set_ok(response.data)
        //     console.log(response.data)
        // }
        // catch(err) {
        //     console.log(err)
        // }

        try{
            const response = await axios.get(
                "http://localhost:8000/bridge/v1/labyrinth/get_repo_file",
                {withCredentials: true}
            )
            console.log(response.data)
        }
        catch(err) {
            console.log(err)
        }

    }

    return(
        <div className=" justify-center flex items-center h-auto">
            <ResizableBox className="box bg-white" width={200} height={200}>
                <button onClick={session}>Tap</button>
            </ResizableBox>
        </div>
    )
}

export default Test