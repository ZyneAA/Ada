import axios from "axios"
import { useState } from "react"
import React from "react"
import Markdown from "react-markdown"

const Test = () => {

    const [text, set_text] = useState()
    const [ok, set_ok] = useState()

    const summit = async () => {

        try {
            const reponse = await axios.post(
                "http://localhost:8000/bridge/v1/labyrinth/generate_text",
                {
                    prompt: text
                },
                { withCredentials: true }
            )
            const formatted_text = reponse.data.split('\n').map((item, index) => (
                <React.Fragment key={index}>
                    {item}
                    <br />
                </React.Fragment>
            ))
            set_ok(reponse.data)
            console.log(reponse.data)
        }
        catch (err) {
            console.log(err)
        }

    }

    return (
        <div className=" flex justify-center items-center py-36 flex-col gap-4 bg-slate-900 rounded-md m-5">
            <input onChange={(e) => set_text(e.target.value)} />
            <button className="bg-white" onClick={summit}>Generate</button>
               <Markdown>{}</Markdown>
        </div>
    )

}

export default Test