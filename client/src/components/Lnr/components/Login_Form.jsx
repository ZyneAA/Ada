import { motion } from "framer-motion"
import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AiFillGithub } from "react-icons/ai"
import "../../../css/misc.css"

const Login_Form = (props) => {

    const navigate = useNavigate()

    const[username, set_username] = useState("")
    const[password, set_password] = useState("")

    const get_username = (e) => {
        set_username(e.target.value)
    }

    const get_password = (e) => {
        set_password(e.target.value)
    }

    const local_auth = async() => {

        try {
            const response = await axios.post(
                "http://localhost:8000/bridge/v1/labyrinth/auth/local", 
                {"username": username, "password": password},
                {withCredentials: true}
            )
            navigate("/code")
        } 
        catch (err) {
            console.error(err);
        }

    }

    const git_auth = async() => {

        // try {
        //     const response = await axios.get(
        //         "http://localhost:8000/bridge/v1/labyrinth/auth/github", 
        //         {},
        //         {withCredentials: true}
        //     )
        // } 
        // catch (err) {
        //     console.error(err);
        // }
        window.location.href = "http://localhost:8000/bridge/v1/labyrinth/auth/github"

    }

    return(<div>

        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input backdrop-blur-sm bg-slate-300/5 border-2" style={{borderColor: props.background_second_complement}}>
            <h1 className="text-3xl font-space pb-8" style={{color: props.font_color}}>Login with your registered account</h1>
                <motion.input 
                    style={{borderColor: props.background_second_complement, color: props.font_color, "--placeholder-color": props.font_color}}
                    whileHover={{scale: 1.1, borderColor: props.background_complement, boxShadow: `0px 0px 15px 4px ${props.background_complement}`}}
                    transition={{type: "spring"}}
                    onChange={get_username}
                    type="text"
                    placeholder="  Username"
                    className="h-10 pl-2 rounded-lg border focus:ring-2 w-full relative z-10 mt-4 bg-inherit outline-none input-placeholder"
                />
                <motion.input 
                    style={{borderColor: props.background_second_complement, color: props.font_color, "--placeholder-color": props.font_color}}
                    whileHover={{scale: 1.1, borderColor: props.background_complement, boxShadow: `0px 0px 15px 4px ${props.background_complement}`}}
                    transition={{type: "spring"}}
                    onChange={get_password}
                    type="text"
                    placeholder="  Password"
                    className="h-10 pl-2 rounded-lg border focus:ring-2 w-full relative z-10 mt-4 bg-inherit outline-none input-placeholder"
                />
                <div className="pt-10">
                    <motion.button className={`inline-flex width: 25%; h-12 animate-shimmer items-center
                            justify-center rounded-md border
                            bg-[linear-gradient(110deg,${props.background_color},45%,${props.background_second_complement},55%,${props.background_color})] 
                            bg-[length:200%_100%] px-10 font-medium
                            transition-colors focus:outline-none`}                                                 
                        onClick={() => local_auth()}
                        style={{color: props.font_color, borderColor: props.background_second_complement}}
                        whileHover={{
                            scale: 1.1, 
                            borderColor: props.background_complement,
                            boxShadow: `0px 0px 20px 0px ${props.background_complement}`
                        }}
                        transition={{
                            type: "spring"
                        }}
                    >
                        Login
                    </motion.button>
                    <div className="flex justify-center items-center">
                        <motion.div 
                                className="pt-4"
                                initial={{
                                    y: -10,
                                    opacity: 0
                                }}
                                animate={{
                                    y: 0,
                                    opacity: 1
                                }}
                                whileHover={{
                                    scale: 1.3,
                                }}
                                transition={{
                                    type: "spring",
                                    duration: 1
                                }}
                                onClick={git_auth}
                            >
                                <AiFillGithub color={props.background_second_complement} size="35"/>
                        </motion.div>
                    </div>
                </div>
                <div>
                    <a href="/lnr">
                        <p className="max-w-lg mx-auto text-sm text-center relative z-10 pt-16 font-space underline" style={{color: props.font_color}}>
                            Or register an account here!
                        </p>
                    </a>
                </div>
        </div>

    </div>)
}

export default Login_Form