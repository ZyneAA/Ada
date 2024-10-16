import React, { useEffect, useState } from "react"
import { FaCircle } from "react-icons/fa6"
import { motion } from "framer-motion"
import Cookies from "js-cookie"
import Meteors from "../../animations/Meteors"

const Show_Theme = (props) => {

    const [selected, set_selected] = useState(false)

    const get_theme = () => {

        props.theme_name(props.name)

    }

    useEffect(() => {

        const name = Cookies.get("theme")
        console.log(name)

        if (name === props.name) {
            set_selected(true)
        }
        else {
            set_selected(false)
        }

    }, [props.is_selected])

    return (

        <button
            onClick={get_theme}
            className=""
        >
            {
                selected === true ?
                    <motion.div className="flex flex-col p-5 gap-2 rounded-md border-2 w-full"
                        style={{ backgroundColor: props.background, borderColor: props.background_complement }}
                        animate={{
                            scale: 1.1,
                            borderColor: props.background_complement,
                            boxShadow: `0px 0px 20px 10px ${props.background_complement}`
                        }}
                    >
                        <div className="flex flex-row">
                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r transform scale-[0.80] rounded-full blur-3xl" />
                            <div className="flex flex-col gap-2 border p-4 rounded-xl mr-3" style={{ borderColor: props.background_complement }}>
                                <div className="flex flex-row pb-3 rounded-md" style={{ backgroundColor: props.background_complement }}>
                                    <div className="pt-3 justify-center">
                                        <FaCircle color={props.font} className="pr-1 h-6 w-12" />
                                    </div>
                                    <div className="pt-3 pr-3 justify-center">
                                        <p style={{ color: props.font }}>Example Text</p>
                                    </div>
                                </div>
                                <div className="flex flex-row pb-3 rounded-md" style={{ backgroundColor: props.background_complement }}>
                                    <div className="pt-3 justify-center">
                                        <FaCircle color={props.font} className="pr-1 h-6 w-12" />
                                    </div>
                                    <div className="pt-3 pr-3 justify-center">
                                        <div className="w-32 rounded-md pb-6" style={{ height: 19, backgroundColor: props.font }} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="w-22 pt-5" style={{ height: 15, backgroundColor: props.background_second_complement }} />
                                    <div className="w-32 pt-5" style={{ height: 15, backgroundColor: props.background_second_complement }} />
                                </div>
                            </div>
                            <div className="pl-4" style={{ color: props.font }}>
                                <h1 className="text-3xl text-left italic outline-offset-1">{props.r_name}</h1>
                                <div className="flex flex-row py-4">
                                    <div className=" justify-center">
                                        <FaCircle color={props.font} className="pr-1 h-8 w-16" />
                                    </div>
                                    <div className=" justify-center">
                                        <FaCircle color={props.background_complement} className="pr-1 h-8 w-16" />
                                    </div>
                                    <div className=" justify-center">
                                        <FaCircle color={props.background_second_complement} className="pr-1 h-8 w-16" />
                                    </div>
                                    <div className=" justify-center">
                                        <FaCircle color={props.cursor} className="pr-1 h-8 w-16" />
                                    </div>
                                    <div className=" justify-center">
                                        <FaCircle color={props.selection} className="pr-1 h-8 w-16" />
                                    </div>
                                    <div className=" justify-center">
                                        <FaCircle color={props.diff} className="pr-1 h-8 w-16" />
                                    </div>
                                </div>
                                <div className="flex flex-row py-5">
                                    <p className=" text-left flex justify-center items-center">Editor Rules: </p>
                                    <div className="flex justify-center items-center">
                                        <FaCircle color={props.rule0} className="pr-1 h-8 w-16" />
                                        <FaCircle color={props.rule1} className="pr-1 h-8 w-16" />
                                        <FaCircle color={props.rule2} className="pr-1 h-8 w-16" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="italic text-sm pt-6" style={{ color: props.font }}>{`"${props.description}"`}</p>
                    </motion.div> :
                    <motion.div className="flex flex-col p-5 gap-2 rounded-md border-2"
                        style={{ backgroundColor: props.background, borderColor: props.background_complement }}
                        whileHover={{
                            scale: 1.1,
                            borderColor: props.background_complement,
                            boxShadow: `0px 0px 20px 10px ${props.background_complement}`
                        }}
                    >
                        <div className="flex flex-row">
                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r transform scale-[0.80] rounded-full blur-3xl" />
                            <div className="flex flex-col gap-2 border p-4 rounded-xl mr-3" style={{ borderColor: props.background_complement }}>
                                <div className="flex flex-row pb-3 rounded-md" style={{ backgroundColor: props.background_complement }}>
                                    <div className="pt-3 justify-center">
                                        <FaCircle color={props.font} className="pr-1 h-6 w-12" />
                                    </div>
                                    <div className="pt-3 pr-3 justify-center">
                                        <p style={{ color: props.font }}>Example Text</p>
                                    </div>
                                </div>
                                <div className="flex flex-row pb-3 rounded-md" style={{ backgroundColor: props.background_complement }}>
                                    <div className="pt-3 justify-center">
                                        <FaCircle color={props.font} className="pr-1 h-6 w-12" />
                                    </div>
                                    <div className="pt-3 pr-3 justify-center">
                                        <div className="w-32 rounded-md pb-6" style={{ height: 19, backgroundColor: props.font }} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="w-22 pt-5" style={{ height: 15, backgroundColor: props.background_second_complement }} />
                                    <div className="w-32 pt-5" style={{ height: 15, backgroundColor: props.background_second_complement }} />
                                </div>
                            </div>
                            <div className="pl-4" style={{ color: props.font }}>
                                <h1 className="text-3xl text-left italic outline-offset-1">{props.r_name}</h1>
                                <div className="flex flex-row py-4">
                                    <div className=" justify-center">
                                        <FaCircle color={props.font} className="pr-1 h-8 w-16" />
                                    </div>
                                    <div className=" justify-center">
                                        <FaCircle color={props.background_complement} className="pr-1 h-8 w-16" />
                                    </div>
                                    <div className=" justify-center">
                                        <FaCircle color={props.background_second_complement} className="pr-1 h-8 w-16" />
                                    </div>
                                    <div className=" justify-center">
                                        <FaCircle color={props.cursor} className="pr-1 h-8 w-16" />
                                    </div>
                                    <div className=" justify-center">
                                        <FaCircle color={props.selection} className="pr-1 h-8 w-16" />
                                    </div>
                                    <div className=" justify-center">
                                        <FaCircle color={props.diff} className="pr-1 h-8 w-16" />
                                    </div>
                                </div>
                                <div className="flex flex-row py-5">
                                    <p className=" text-left flex justify-center items-center">Editor Rules: </p>
                                    <div className="flex justify-center items-center">
                                        <FaCircle color={props.rule0} className="pr-1 h-8 w-16" />
                                        <FaCircle color={props.rule1} className="pr-1 h-8 w-16" />
                                        <FaCircle color={props.rule2} className="pr-1 h-8 w-16" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="italic text-sm pt-6" style={{ color: props.font }}>{`"${props.description}"`}</p>
                    </motion.div>
            }

        </button>
    )

}

export default Show_Theme
