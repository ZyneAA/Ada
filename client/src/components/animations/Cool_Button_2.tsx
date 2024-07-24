import { motion } from "framer-motion"
import React from "react"

const Cool_Button_2 = (props) => {
    return(
        <motion.button
            onClick={props.handle}
            type={props.type}
            className="inline-flex w-36
            h-12 items-center 
            justify-center rounded-md border border-white text-white"

            whileHover={{scale: 1.1, borderColor: "#3573e6",boxShadow: "0px 0px 15px 4px blue"}}
            transition={{type: "spring"}}
            >
            {props.name}
        </motion.button>
    )
    
}

export default Cool_Button_2