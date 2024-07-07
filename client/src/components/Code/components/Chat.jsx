import React from "react"
import { motion } from "framer-motion"

const Chat = ({ is_open, on_close }) => {

  return (
        <>
            {is_open && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-50" onClick={on_close} />
            )}
            <motion.div
                className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-lg"
                initial={{ 
                    x: "100%" 

                }}
                animate={{ 
                    x: is_open ? "0%" : "100%" 
                }}
                transition={{
                    type: "spring", 
                    stiffness: 150 
                }}
            >
                <div className="p-4">
                    <button onClick={on_close} className="text-right">Close</button>
                    <h2 className="text-xl font-bold">Sliding Window Content</h2>
                    <p>Here is some content inside the sliding window.</p>
                </div>
            </motion.div>
        </>
    )
}

export default Chat
