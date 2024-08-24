import { motion } from "framer-motion"

const Cool_Button = (props) => {
    
    return(
        <motion.button
            onClick={props.handle}
            type={props.type}
            className="inline-flex w-full
            h-12 animate-shimmer items-center 
            justify-center rounded-md border border-slate-800
            bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] 
            bg-[length:200%_100%] px-6 font-medium text-white
            transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 
            focus:ring-offset-2 focus:ring-offset-slate-50"

            whileHover={{scale: 1.1, borderColor: "#3573e6",boxShadow: "0px 0px 15px 4px blue"}}
            transition={{type: "spring"}}
            >
            {props.name}
        </motion.button>
    )
    
}

export default Cool_Button