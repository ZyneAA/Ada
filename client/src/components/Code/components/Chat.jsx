import React, { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import Chat_Message from "./Chat_Message"

const Chat = ({ is_open, on_close }) => {

    const [text, set_text] = useState("")
    const [generated_text, set_generated_text] = useState("Something is cool something is not")
    const [messages, set_messages] = useState({})

    const generate = (e) => {

        if(e.key === "Enter") {
            set_generated_text(text)
        }

    }

    return (
        <>
            {is_open && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={on_close} />
            )}
            <motion.div
                className="fixed top-0 right-0 h-full w-2/3 bg-gray-800 z-50 shadow-lg"
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
                <div className="flex flex-row h-full" style={{backgroundColor: "#1c1e25"}}>
                    <div className="flex flex-col gap-2 bg-gray-800 h-full items-center py-4" style={{width: "10%"}}>
                        <h1>cwc</h1>
                        <div className="border border-blue-100 w-full"/>
                        <h1>sc</h1>
                        <h1>ok pro</h1>
                        <h1>not ok pro</h1>
                    </div>                       
                    <div className="flex flex-col h-full w-full rounded-md">
                        <button onClick={on_close} className="p-6 text-right text-transparent bg-clip-text bg-gradient-to-b from-gray-400 to-gray-500">Close</button>
                        <div className="flex justify-center items-center" style={{height: "92%"}}>
                            {generate}
                        </div>
                        <div className="px-5 py-4">
                            <div className="flex flex-row border border-gray-400 rounded-lg">
                                <input onChange={(e) => set_text(e.target.value)} onKeyDown={(e) => generate(e)} placeholder="Enter Text Here" style={{width: "95%"}} className= "pl-3 py-2 px-4 bg-inherit outline-none text-gray-300"/>                                    
                                <div className="flex justify-center items-center">
                                    <Send color="gray"/>    
                                </div>
                            </div>
                        </div>                            
                    </div>                    
                </div>
            </motion.div>
        </>
    )
}

export default Chat
