import { motion } from "framer-motion"
import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

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

    const send_credentials = async() => {

        try {
            const response = await axios.post(
                "http://localhost:8000/birdge/v1/labyrinth/", 
                {"username": username, "password": password},
                {withCredentials: true}
            )
            navigate('/code')
        } 
        catch (err) {
            console.error(err);
        }
    }

    return(<div>

        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input backdrop-blur-sm bg-slate-300/5 border border-slate-800">
            <h1 className="text-gray-50 text-3xl font-space">Login with your registered account</h1>
                <motion.input 
                    whileHover={{
                        scale: 1.05
                    }}
                    transition={{
                        duration: 0.2
                    }}
                    onChange={get_username}
                    type="text"
                    placeholder="  Username"
                    className="h-10 pl-2 rounded-lg border border-slate-700 focus:ring-2 w-full relative z-10 mt-4 bg-neutral-950 text-slate-50"
                />
                <motion.input
                    whileHover={{
                        scale: 1.05
                    }}
                    transition={{
                        duration: 0.2
                    }}
                    onChange={get_password}
                    type="password"
                    placeholder="  Password"
                    className="h-10 pl-2 form-control rounded-lg border border-slate-700 focus:ring-2 w-full relative z-10 mt-4  bg-neutral-950 text-slate-50"
                />
                <div className="pt-10">
                    <motion.button className="inline-flex width: 25%; h-12 animate-shimmer items-center
                            justify-center rounded-md border border-slate-800
                            bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] 
                            bg-[length:200%_100%] px-10 font-medium text-slate-400 
                            transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 
                            focus:ring-offset-2 focus:ring-offset-slate-50"
                        onClick={() => send_credentials()}

                        whileHover={{scale: 1.1, borderColor: "#3573e6"}}
                        transition={{type: "spring"}}
                    >
                        Login
                    </motion.button>
                </div>
                <div>
                    <a href="/lnr">
                        <p className="text-neutral-500 max-w-lg mx-auto text-sm text-center relative z-10 pt-16 font-space underline">
                            Or register an account here!
                        </p>
                    </a>
                </div>
        </div>

    </div>)
}

export default Login_Form