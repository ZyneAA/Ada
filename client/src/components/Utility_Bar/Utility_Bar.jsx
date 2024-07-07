import { motion } from "framer-motion"
import Cookies from "js-cookie"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

const Utility_Bar = ({chat}) => {

    const navigate = useNavigate()
    const location = useLocation()

    const [width, set_width] = useState(window.innerWidth)
    const [id, set_id] = useState("")
    const [username, set_username] = useState("")
    const [login, set_login] = useState(false)

    const go_to = () => {     

        navigate("/register")

    }

    const open_chat = () => {

        chat(true)

    }

    useEffect(() => {

        const resize = () => set_width(window.innerWidth)
        window.addEventListener("resize", resize)

    }, [width])

    useEffect(() => {

        const get_session_data = async() => {
        
            try{
                const response = await axios.get(
                    `http://localhost:8000/bridge/v1/labyrinth/get_session`,
                    {
                        withCredentials: true,
                    }
                )
                set_username(response.data[0].passport.user.git_username)
                set_id(response.data[1])
                set_login(true)
            }
            catch(err){
                console.log(err)
            }

        }

        get_session_data()

    }, [])

    return(
        <motion.div className="fixed bottom-0 flex z-30 justify-center w-full"
            drag="x"
            dragConstraints={{ right: 0, left: 0}}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10  }}
            initial={{
                y: 70
            }}
            whileHover={{
                y: 0,
                opacity: 1
            }}
            transition={{
                stiffness: 150,
                type: "spring",
                duration: 0.5,
            }}
        >
            {
                location.pathname === "/register" || location.pathname === "/login"?
                <div className="lg:w-2/5 w-11/12 md:w-9/12 rounded-t-lg bg-gray-100 flex flex-row h-20 py-0 z-30">
                    <div className="py-5 flex lg:flex-row md:flex-row lg:gap-16 md:gap-16 sm:gap-10 gap-4 justify-evenly basis-full">
                        <motion.div className="flex flex-col rounded-full bg-black w-10 h-10 place-content-center"
                            whileHover={{
                                scale: 1.2
                            }}
                        >
                            <div>
                                <a href="/">
                                    <h3 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-300 font-space ml-2">🏠</h3>
                                </a> 
                            </div>                                 
                        </motion.div>
                        <motion.div className="flex flex-col rounded-full bg-black w-10 h-10 place-content-center"
                            whileHover={{
                                scale: 1.2
                            }}
                        >
                            <div>
                                <a href="/planets">
                                    <h3 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-300 font-space ml-2">🎵</h3>
                                </a>
                            </div>                    
                        </motion.div>
                        <motion.div className="flex flex-col rounded-full bg-black w-10 h-10 place-content-center"
                            whileHover={{
                                scale: 1.2
                            }}
                        >
                            <div>
                                <h3 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-300 font-space ml-2" onClick={open_chat}>💬</h3>
                            </div>                   
                        </motion.div>
                    </div>                   
                </div>
                :
                login === true ?
                <div className="lg:w-2/5 w-11/12 md:w-9/12 rounded-t-lg bg-gray-100 flex flex-row h-20 py-0 z-30">
                    <div className="py-5 flex lg:flex-row md:flex-row lg:gap-16 md:gap-16 sm:gap-10 gap-4 basis-4/5 justify-evenly shrink">
                        <motion.div className="flex flex-col rounded-full bg-black w-10 h-10 place-content-center"
                            whileHover={{
                                scale: 1.2
                            }}
                        >
                            <div>
                                <a href="/">
                                    <h3 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-300 font-space ml-2">🏠</h3>
                                </a> 
                            </div>                                 
                        </motion.div>
                        <motion.div className="flex flex-col rounded-full bg-black w-10 h-10 place-content-center"
                            whileHover={{
                                scale: 1.2
                            }}
                        >
                            <div>
                                <a href="/planets">
                                    <h3 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-300 font-space ml-2">🎵</h3>
                                </a>
                            </div>                    
                        </motion.div>
                        <motion.div className="flex flex-col rounded-full bg-black w-10 h-10 place-content-center"
                            whileHover={{
                                scale: 1.2
                            }}
                        >
                            <div>
                                <h3 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-300 font-space ml-2" onClick={open_chat}>💬</h3>
                            </div>                   
                        </motion.div>
                    </div>
                    <div className="flex flex-row basis-1/5">
                        <div className="flex justify-center items-center"> 
                            <div
                                style={{
                                    width: "1px",
                                    height: "70%",
                                    backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(5,0,0,1) 50%, rgba(255,251,251,0) 100%)',
                                }}
                            />
                        </div>
                        <motion.div className="basis-full flex justify-center items-center px-2"
                            whileHover={{
                                scale: 1.1
                            }}
                            >
                            {
                                window.innerWidth <= 560 ?
                                <div className=" bg-black rounded-3xl w-auto px-4 py-2">
                                    <a href="/settings">
                                        <h3 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-white font-space">{username.substring(0,3)}...</h3>
                                    </a>
                                </div> 
                                :
                                <div className=" bg-black rounded-3xl w-auto px-4 py-2">
                                <a href="/settings">
                                    <h3 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-white font-space">{username}</h3>
                                </a>
                            </div>
                            }                       
                        </motion.div>          
                    </div> 
                </div>
                :
                <div className="lg:w-2/5 w-3/4 rounded-t-lg bg-gray-100 flex flex-row h-20 py-0 z-30">
                    <div className="py-5 flex lg:flex-row md:flex-row lg:gap-16 md:gap-16 sm:gap-10 gap-4 basis-4/5 justify-evenly">
                        <motion.div className="flex flex-col rounded-full bg-black w-10 h-10 place-content-center"
                            whileHover={{
                                scale: 1.2
                            }}
                        >
                            <div>
                                <a href="/">
                                    <h3 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-300 font-space ml-2">🏠</h3>
                                </a> 
                            </div>                                 
                        </motion.div>
                        <motion.div className="flex flex-col rounded-full bg-black w-10 h-10 place-content-center"
                            whileHover={{
                                scale: 1.2
                            }}
                        >
                            <div>
                                <a href="/planets">
                                    <h3 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-300 font-space ml-2">🎵</h3>
                                </a>
                            </div>                    
                        </motion.div>
                        <motion.div className="flex flex-col rounded-full bg-black w-10 h-10 place-content-center"
                            whileHover={{
                                scale: 1.2
                            }}
                        >
                            <div>
                                <a href="/doc">
                                    <h3 className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-300 font-space ml-2" onClick={open_chat}>💬</h3>
                                </a>
                            </div>                   
                        </motion.div>
                    </div>
                    <div className="flex flex-row">
                        <div
                            style={{
                                width: "1px",
                                height: "100%",
                                backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(5,0,0,1) 50%, rgba(255,251,251,0) 100%)',
                            }}
                        />
                        <motion.div className="flex items-center justify-center py-10"
                            whileHover={{
                                scale: 1.1
                            }}
                            transition={{
                                type: "spring"
                            }}
                            >
                            <div>
                                <button className="text-black px-3 underline" onClick={go_to}>Login or Register a new Account!</button>
                            </div>                   
                        </motion.div>          
                    </div> 
                </div>
            }             
        </motion.div>
    )

}

export default Utility_Bar