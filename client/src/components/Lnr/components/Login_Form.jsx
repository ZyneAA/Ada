import { motion } from "framer-motion"
import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AiFillGithub } from "react-icons/ai"
import "../../../css/misc.css"

const Login_Form = (props) => {

    const navigate = useNavigate()

    const [username, set_username] = useState("")
    const [password, set_password] = useState("")
    const [pass_ok, set_pass_ok] = useState(false)

    const [invalid, set_invalid] = useState(false)

    const get_username = (e) => {
        set_invalid(false)
        console.log(e.target.value)
        set_username(e.target.value)
    }

    const get_password = (e) => {

        set_invalid(false)
        const p = e.target.value
        console.log(e.target.value)

        const special_char = /[!@#$%^&*(),.?":{}|<>]/
        const number = /[0-9]/
        const uppercase = /[A-Z]/
        const length = p.length >= 8


        // htet90%%
        // htetm98(*)R
        if (special_char.test(p) && number.test(p) && uppercase.test(p) && length) {
            console.log(e.target.value)
            set_password(e.target.value)
            set_pass_ok(true)
        }
        else {
            set_pass_ok(false)
        }

    }


    const local_auth = async () => {

        try {
            const response = await axios.post(
                "http://localhost:8000/bridge/v1/labyrinth/auth/local",
                { "username": username, "password": password },
                { withCredentials: true }
            )

            navigate("/code")
        }
        catch (err) {
            set_invalid(true)
            console.error(err);
        }

    }

    // const git_auth = async () => {

    //     // try {
    //     //     const response = await axios.get(
    //     //         "http://localhost:8000/bridge/v1/labyrinth/auth/github", 
    //     //         {},
    //     //         {withCredentials: true}
    //     //     )
    //     // } 
    //     // catch (err) {
    //     //     console.error(err);
    //     // }
    //     window.location.href = "http://localhost:8000/bridge/v1/labyrinth/auth/github"

    // }

    return (<div>

        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input backdrop-blur-sm bg-slate-300/5 border-2" style={{ borderColor: props.background_complement }}>
            <h1 className="text-3xl font-space pb-8" style={{ color: props.font_color }}>Login with your registered account</h1>
            <motion.input
                style={{ borderColor: props.background_complement, color: props.font_color, "--placeholder-color": props.font_color }}
                whileHover={{ scale: 1.1, borderColor: props.background_complement, boxShadow: `0px 0px 15px 4px ${props.background_complement}` }}
                transition={{ type: "spring" }}
                onChange={get_username}
                type="text"
                placeholder="  Username"
                className="h-10 pl-2 rounded-lg border focus:ring-2 w-full relative z-10 mt-4 bg-inherit outline-none input-placeholder"
            />
            <motion.input
                style={{ borderColor: props.background_complement, color: props.font_color, "--placeholder-color": props.font_color }}
                whileHover={{ scale: 1.1, borderColor: props.background_complement, boxShadow: `0px 0px 15px 4px ${props.background_complement}` }}
                transition={{ type: "spring" }}
                onChange={get_password}
                type="password"
                placeholder="  Password"
                className="h-10 pl-2 rounded-lg border focus:ring-2 w-full relative z-10 mt-4 bg-inherit outline-none input-placeholder"
            />
            <div className="pt-10">
                {
                    invalid === true ?
                        <motion.p
                        initial={{ x: 0 }}
                        animate={{x: [-10, 10, -10, 10, -10, 10, 0] }}
                        transition={{ duration: 0.5 }}
                            style={{ color: props.background_color, backgroundColor: props.background_second_complement }} className="flex justify-center items-center rounded-lg">
                            Invalid Credentials
                        </motion.p>
                        :
                        pass_ok === true ?
                            <motion.button className={`inline-flex width: 25%; h-12 animate-shimmer items-center
                    justify-center rounded-md border
                    bg-[linear-gradient(110deg,${props.background_color},45%,${props.background_second_complement},55%,${props.background_color})] 
                    bg-[length:200%_100%] px-10 font-medium
                    transition-colors focus:outline-none`}
                                onClick={() => local_auth()}
                                style={{ color: props.font_color, borderColor: props.background_complement }}
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1
                                }}
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
                            </motion.button> :
                            <motion.div
                                initial={{
                                    opacity: 0
                                }}
                                animate={{
                                    opacity: 1
                                }}
                                transition={{
                                    duration: 1.4,
                                    type: "spring"
                                }}
                            >
                                <p className="flex justify-center items-center" style={{ color: props.font_color }}>Password must contain at least one special character, number(s), at least one uppercase letter, and a minimum of 8 characters</p>
                            </motion.div>
                }
            </div>
            <div>
                <a href="/register">
                    <p className="max-w-lg mx-auto text-sm text-center relative z-10 pt-16 font-space underline" style={{ color: props.font_color }}>
                        Or register a new account here!
                    </p>
                </a>
            </div>
        </div>

    </div>)
}

export default Login_Form
