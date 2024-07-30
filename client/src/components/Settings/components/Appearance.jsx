import { FaCircle } from "react-icons/fa6"
import { motion } from "framer-motion"
import Show_Theme from "./Show_Theme"
import horizon from "../themes/horizon.json"
import sunset from "../themes/sunset.json"
import { useState } from "react"
import Cookies from "js-cookie"

const Appearance = ({background_color, background_complement, background_second_complement, font_color, name}) => {

    const[preview, set_preview] = useState("")
    const [close, set_close] = useState(false)

    const set_theme = (value) => {

        Cookies.remove("theme")
        Cookies.set("theme", value, {expires: 90})

    }
    
    return(
        <div>
            <div className="pb-6">
                <div>
                    <h1 className="text-2xl pb-3" style={{color: font_color}}>Appearance{preview}</h1>
                    <p style={{color: font_color}}>Customize the appearance of the app. Automatically switch between day and night themes.</p>
                    <div className="pt-5 pb-6">
                        <div className="w-full" style={{height: 0.5, backgroundColor: background_second_complement}}/>
                        <h1 className="pb-3 pt-4" style={{color: font_color}}>Theme</h1> 
                        <p style={{color: font_color}}>Choose a theme.</p>
                    </div>    
                </div>
                <div className="pb-10">
                    <div className="flex flex-row py-5 ">
                        <div className="flex flex-row h-auto w-auto p-2 rounded-md gap-10">
                            <Show_Theme 
                                is_selected={name}
                                name={horizon.name}
                                theme_name={set_theme}
                                background={horizon.editor.background} 
                                background_complement={horizon.editor.background_complement}
                                font={horizon.editor.font}  
                                background_second_complement={horizon.editor.background_second_complement} />
                            <Show_Theme 
                                is_selected={name}
                                name={sunset.name}
                                theme_name={set_theme}
                                background={sunset.editor.background} 
                                background_complement={sunset.editor.background_complement}
                                font={sunset.editor.font}  
                                background_second_complement={sunset.editor.background_second_complement} />
                            <motion.div className="flex flex-col bg-red-900 p-5 gap-2 rounded-md"
                                whileHover={{
                                    scale: 1.1,
                                    borderColor: "rgb(255, 0, 0)",
                                    boxShadow: "0px 0px 30px 10px red"
                                }}
                            >
                                <div className="flex flex-row pb-3 bg-red-700 rounded-md">
                                    <div className="pt-3 justify-center">
                                        <FaCircle color="rgb(256, 165, 165 )" className="pr-1 h-6 w-12"/>
                                    </div>
                                    <div className="pt-3 pr-3 justify-center">
                                        <div className="bg-red-300 w-32 rounded-md pb-6" style={{height: 19}}/>
                                    </div>
                                </div>
                                <div className="flex flex-row pb-3 bg-red-700 rounded-md">
                                    <div className="pt-3 justify-center">
                                        <FaCircle color="rgb(256, 165, 165)" className="pr-1 h-6 w-12"/>
                                    </div>
                                    <div className="pt-3 pr-3 justify-center">
                                        <div className="bg-red-300 w-32 rounded-md pb-6" style={{height: 19}}/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="bg-red-700 w-22 pt-5" style={{height: 15}}/>
                                    <div className="bg-red-700 w-32 pt-5" style={{height: 15}}/>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>    
                <div className="">
                    <motion.button className="text-white bg-green-800 rounded-md px-3 h-10 w-50"
                        whileHover={{
                            scale: 1.1,
                            borderColor: "rgb(41, 166, 58)",
                            boxShadow: "0px 0px 20px 0px green"
                        }}
                        transition={{
                            type: "spring"
                        }}
                    >Update Preference</motion.button>
                    </div>                  
            </div>
        </div>
    )
}

export default Appearance