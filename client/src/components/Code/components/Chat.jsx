import React, { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import "../../../css/misc.css"

const Chat = ({ is_open, on_close, font_color, background_complement, background_second_complement, background_color }) => {

    const [text, set_text] = useState("Dummy")
    const [generated_text, set_generated_text] = useState("Something is cool something is not")
    const [messages, set_messages] = useState({})

    const generate = (e) => {

        if(e.key === "Enter") {
            set_generated_text(text)
            console.log(generated_text)
            console.log("sfs")
        }

    }

    return (
        <>
            {is_open && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={on_close} />
            )}
            <motion.div
                className="fixed top-0 right-0 h-full w-2/3 z-50 shadow-lg"
                style={{backgroundColor: background_color}}
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
                <div className="flex flex-row h-full" style={{backgroundColor: background_color}}>
                    <div className="flex flex-col gap-2 h-full items-center py-4" style={{width: "10%", backgroundColor: background_complement, color: font_color}}>
                        <h1>cwc</h1>
                        <div className="border w-full" style={{backgroundColor: background_second_complement}}/>
                        <h1>sc</h1>
                        <h1>ok pro</h1>
                        <h1>not ok pro</h1>
                    </div>                       
                    <div className="flex flex-col h-full w-full rounded-md">
                        <button onClick={on_close} className="p-6 text-right text-transparent bg-clip-text bg-gradient-to-b" style={{backgroundColor: background_complement}}>Close</button>
                        <div className="flex justify-center items-center" style={{height: "92%"}}>
                            <h1>{generated_text}</h1>
                        </div>
                        <div className="px-5 py-4">
                            <div className="flex flex-row" style={{borderColor: background_second_complement}}>
                                <input onChange={(e) => set_text(e.target.value)} onKeyDown={(e) => generate(e)} placeholder="Enter Text Here" style={{width: "95%", color: font_color, "--placeholder-color": font_color, backgroundColor: background_complement }} className= "pl-3 py-2 px-4 bg-inherit outline-none input-placeholder border mr-5 rounded-md"/>                                    
                                <div className="flex justify-center items-center rounded-md">
                                    <Send color={font_color}/>    
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
