import { useState } from "react";
import { ResizableBox, Resizable } from "react-resizable";
import "../css/Test.css"

const Test = () => {

    const [width, set_witdh] = useState(300)
    const [height, set_height] = useState(200)

    return(
        <div>
            <ResizableBox className="box" width={200} height={200} >
            <span className="text">Tets</span>
          </ResizableBox>
        </div>
    )
}

export default Test