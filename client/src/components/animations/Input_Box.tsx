import { animate, motion } from "framer-motion"
import React, { useState, useEffect } from "react"

const Input_Box = (props) => {

    const type = props.variant

    return(
        <div>
            {
                type === 0? 
                    <motion.input 
                    onChange={props.getter}
                    type={props.type}
                    className="h-10 pl-2 rounded-lg border border-gray-50 w-full relative bg-zinc-900 text-slate-50 outline-none" 
                    id={props.id}
                    whileHover={{
                        scale: 1.1,
                        borderColor: "rgb(38, 113, 212)",
                        boxShadow: "0px 0px 20px 0px blue"
                    }}
                    transition={{
                        type: "spring"
                    }}/>
                    :
                    type === 1?
                        <motion.input 
                        onChange={props.getter}
                        type={props.type}
                        className="h-10 pl-2 rounded-lg border border-gray-50 w-full relative bg-zinc-900 text-slate-50 outline-none" 
                        id={props.id}
                        animate={{
                            borderColor: "rgb(41, 166, 58)",
                            boxShadow: "0px 0px 20px 0px green"
                        }}
                        transition={{
                            type: "spring"
                        }}/>
                        :
                        <motion.input 
                        onChange={props.getter}
                        type={props.type}
                        className="h-10 pl-2 rounded-lg border border-gray-50 w-full relative bg-zinc-900 text-slate-50 outline-none" 
                        id={props.id}
                        animate={{
                            borderColor: "rgb(173, 16, 16)",
                            boxShadow: "0px 0px 20px 0px red"
                        }}
                        transition={{
                            type: "spring"
                        }}/>
            }
        </div>          
    )
}

export default Input_Box