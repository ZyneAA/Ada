import { animate, motion } from "framer-motion"
import React, { useState, useEffect } from "react"

const Input_Box = (props) => {

    const get_name = (e) => {

        props.getter(e.target.value)

    }

    return (
        <div>
            <motion.input
                onChange={(e) => get_name(e)}
                style={{color: props.font_color, borderColor: props.background_second_complement}}
                className="h-10 pl-2 rounded-lg w-full relative outline-none border-2 bg-inherit"
                id={props.id}
                whileHover={{
                    scale: 1.05,
                    borderColor: props.background_complement,
                    boxShadow: `0px 0px 20px 0px ${props.background_complement}`
                }}
                transition={{
                    duration: 1,
                    type: "spring"
            }} />
        </div>
    )
}

export default Input_Box