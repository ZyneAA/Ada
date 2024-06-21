import { useEffect, useState } from "react";
import { ResizableBox, Resizable } from "react-resizable";
import axios from "axios"
import "../css/Test.css"

const Test = () => {

    const [ok, set_ok] = useState("")

    useEffect(async() => {

        try{
            const response = await axios.get(
                ""
            )
        }
        catch(err) {

        }

    }, [])

    return(
        <div>
            <ResizableBox className="box" width={200} height={200} >
                
            </ResizableBox>
        </div>
    )
}

export default Test