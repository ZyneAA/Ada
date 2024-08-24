import React, { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { LoopingRhombusesSpinner } from "react-epic-spinners"
import { MessageSquareCode } from "lucide-react"
import axios from "axios"
import "../../../css/misc.css"
import Message from "./Message"

const Chat = ({ is_open, on_close, font_color, background_complement, background_second_complement, background_color }) => {

    const [messages, set_messages] = useState([])
    const [is_typing, set_is_typing] = useState(false)
    const [text, set_text] = useState("")

    const send = async () => {

        const new_message = {
            message: text,
            direction: "outgoing",
            sender: "user"
        }

        set_messages((prev_messages) => [...prev_messages, new_message])
        set_is_typing(true)

        // setTimeout(() => {
        //     const markdown = `Here is some JavaScript code:
        //     ~~~c++
        //     std::cout << "hello" <<std::endl;
        //     ~~~
        //     `
        //     const ai_response = {
        //         message: markdown,
        //         direction: "incoming",
        //         sender: "ChatGPT"
        //     }
        //     const ok = [...messages, ai_response]
        //     console.log(ok)
        //     set_messages(ok)
        //     set_is_typing(false)
        // }, 1000)
        await summit(text)

    }

    const summit = async (message) => {

        try {
            const reponse = await axios.post(
                "http://localhost:8000/bridge/v1/labyrinth/generate_text",
                {
                    prompt: message
                },
                { withCredentials: true }
            )
            const markdown = `Here is some JavaScript code:
            ~~~c++
            std::cout << "hello" <<std::endl;
            ~~~
            `
            const ai_response = {
                message: reponse.data,
                direction: "incoming",
                sender: "ChatGPT"
            }

            set_messages((prev_messages) => [...prev_messages, ai_response])
            console.log(messages)
            set_is_typing(false)
        }
        catch (err) {
            console.log(err)
        }

    }

    const handle_text = (e) => {

        const val = e.target.value
        console.log(val)
        set_text(val)

    }

    return (
        <>
            {is_open && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={on_close} />
            )}
            <motion.div
                className="fixed top-0 right-0 h-full w-2/3 z-50 shadow-lg"
                style={{ backgroundColor: background_color }}
                initial={{
                    x: "100%"

                }}
                animate={{
                    x: is_open ? "0%" : "100%"
                }}
                transition={{
                    type: "spring",
                    stiffness: 50
                }}
            >
                <div className="flex flex-row h-full" style={{ backgroundColor: background_color }}>
                    <div className="flex flex-col gap-2 h-full items-center py-4" style={{ width: "8%", backgroundColor: background_complement, color: font_color }}>
                        <MessageSquareCode color={font_color} />
                        <div className="border w-full" style={{ backgroundColor: background_second_complement }} />
                    </div>
                    <div className="flex flex-col h-full w-full rounded-md">
                        <button onClick={on_close} className="p-6 text-right text-transparent bg-clip-text bg-gradient-to-b" style={{ backgroundColor: font_color }}>Close</button>
                        <div className="w-full flex overflow-auto " style={{ height: "92%" }}>
                            <div className="w-full px-10 overflow-auto flex flex-col">
                                {messages.map((message, index) => (
                                    <Message key={index}
                                        message={message.message}
                                        direction={message.direction}
                                        font_color={font_color}
                                        border_color={background_second_complement}
                                        background_color={background_complement}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="px-5 py-4">
                            {
                                is_typing === true ?
                                    <div className=" justify-center items-center flex ">
                                        <LoopingRhombusesSpinner color={font_color} />
                                    </div> :
                                    <div className="flex flex-row" style={{ borderColor: background_second_complement }}>
                                        <input placeholder="Enter Text Here" onChange={handle_text}
                                            style={{ width: "95%", color: font_color, "--placeholder-color": font_color, backgroundColor: background_complement }}
                                            className="pl-3 py-2 px-4 bg-inherit outline-none input-placeholder border mr-5 rounded-md"
                                        />
                                        <div className="flex justify-center items-center rounded-md" onClick={send}>
                                            <Send color={font_color} />
                                        </div>

                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Chat
