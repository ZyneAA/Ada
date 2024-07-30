import { motion } from "framer-motion"
import React from "react"

const Cool_Button_2 = (props) => {
    return(
        <motion.button
            style={{borderColor: props.background_second_complement, color: props.font_color}}
            onClick={props.handle}
            type={props.type}
            className="inline-flex w-36
            h-12 items-center 
            justify-center rounded-md border-2"

            whileHover={{scale: 1.1, borderColor: props.background_complement, boxShadow: `0px 0px 15px 4px ${props.background_complement}`}}
            transition={{type: "spring"}}
            >
            {props.name}
        </motion.button>
    )
    
}

export default Cool_Button_2