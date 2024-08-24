import { animate, motion } from "framer-motion"
import React, { useState, useEffect } from "react"

const Input_Box = ({ getter, font_color, background_second_complement, id, background_complement, type }) => {

    const get_name = (e) => {

        console.log(e.target.value)
        getter(e.target.value)

    }

    return (
        <div>
            <motion.input
                type={type}
                onChange={(e) => get_name(e)}
                style={{color: font_color, borderColor: background_second_complement}}
                className="h-10 pl-2 rounded-lg w-full relative outline-none border-2 bg-inherit"
                id={id}
                whileHover={{
                    scale: 1.05,
                    borderColor: background_complement,
                    boxShadow: `0px 0px 20px 0px ${background_complement}`
                }}
                transition={{
                    duration: 1,
                    type: "spring"
            }} />
        </div>
    )
}

export default Input_Box