import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const Test = () => {

    const [text, set_text] = useState()
    const [ok, set_ok] = useState("")

    const summit = async () => {

        try {
            const reponse = await axios.post(
                "http://localhost:8000/bridge/v1/labyrinth/generate_text",
                {
                    prompt: text
                },
                { withCredentials: true }
            )
            // const formatted_text = reponse.data.split('\n').map((item, index) => (
            //     <React.Fragment key={index}>
            //         {item}
            //         <br />
            //     </React.Fragment>
            // ))
            set_ok(reponse.data)
            console.log(reponse.data)
        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {

        const markdown = `Here is some JavaScript code:
~~~c++
std::cout << "hello" <<std::endl;
~~~
`
        set_ok(markdown)

    }, [])

    useEffect(() => {
        console.log("okok")
    }, [])

    return (
        <div className=" flex justify-center items-center py-36 flex-col gap-4 bg-white rounded-md m-5">
            <input className="bg-black text-white" onChange={(e) => set_text(e.target.value)} />
            <button className="bg-white" onClick={summit}>Ges2323123nerate</button>
            <Markdown
                children={ok}
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={oneDark}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            />
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    }
                }}
            />
        </div>
    )

}

export default Test
