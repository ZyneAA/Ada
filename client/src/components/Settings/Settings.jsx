import { motion } from "framer-motion"
import Profile from "./components/Profile"
import Appearance from "./components/Appearance"
import Account from "./components/Account"
import { useState } from "react"

const Settings = () => {

    const [no, set_no] = useState(0)

    return(
        <div>
            <motion.div className="rounded-lg border border-gray-800 my-10 mx-16 px-10 py-5"
            initial={{
                opacity: 0,
                scale: 0.5
            }}
            animate={{
                opacity: 1,
                scale: 1
            }}
            transition={{
                type: "spring",
                duration: 1
            }}
            >
                <div>
                    <h1 className="text-white lg:text-5xl text-3xl font-space">Settings</h1>
                    <p className="text-white py-8">Manage your account settings and set e-mail preferences.</p>
                    <div className="bg-gray-800 w-full" style={{height: 0.5}}/>
                </div>
                <div className="flex lg:flex-row flex-col py-8">
                    <div className="flex lg:flex-col flex-row flex-wrap basis-2/12 lg:px-5">
                        <div className="pb-2">
                            {
                                no === 0 ?
                                <motion.button className={`text-white rounded-md w-32 py-2`}
                                animate={{
                                    backgroundColor: "rgb(50, 50, 50)",
                                    scale: 1.1
                                }}
                                onClick={() => set_no(0)}
                            >Profile</motion.button>
                            :
                            <motion.button className={`text-white rounded-md w-32 py-2`}
                                onClick={() => set_no(0)}
                            >Profile</motion.button>
                            }
                        </div>
                        <div className="pb-2">
                            {
                                no === 1 ?
                                <motion.button className={`text-white rounded-md w-32 py-2`}
                                animate={{
                                    backgroundColor: "rgb(50, 50, 50)",
                                    scale: 1.1
                                }}
                                onClick={() => set_no(1)}
                            >Appearance</motion.button>
                            :
                            <motion.button className={`text-white rounded-md w-32 py-2`}
                                onClick={() => set_no(1)}
                            >Appearance</motion.button>
                            }
                        </div>
                        <div className="pb-2">
                            {
                                no === 2?
                                <motion.button className={`text-white rounded-md w-32 py-2`}
                                animate={{
                                    backgroundColor: "rgb(50, 50, 50)",
                                    scale: 1.1
                                }}
                                onClick={() => set_no(2)}
                            >Account</motion.button>
                            :
                            <motion.button className={`text-white rounded-md w-32 py-2`}
                                onClick={() => set_no(2)}
                            >Account</motion.button>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col basis-2/4">
                        {
                            no === 0 ?
                            <Profile />
                            :
                            no === 1 ?
                            <Appearance/>
                            :
                            <Account/>
                        }
                        
                    </div>          
                </div>
            </motion.div>       
        </div>
    )
}

export default Settings