import { FaCircle } from "react-icons/fa6";
import { motion } from "framer-motion";

const Appearance = () => {

    return(
        <div>
            <div className="pb-6">
                <h1 className="text-white text-2xl pb-3">Appearance</h1>
                <p className="text-gray-500">Customize the appearance of the app. Automatically switch between day and night themes.</p>
                <div className="pt-5 pb-6">
                    <div className="bg-gray-800 w-full" style={{height: 0.5}}/>
                </div>    
                <div className="pb-10">
                    <h1 className="text-white pb-3">Theme</h1> 
                    <p className="text-gray-500">Choose a theme.</p>
                    <div className="flex flex-row py-5 ">
                        <div className="flex flex-row h-auto w-auto p-2 rounded-md gap-10">
                            <motion.div className="flex flex-col bg-white p-5 gap-2 rounded-md"
                                whileHover={{
                                    scale: 1.1,
                                    borderColor: "rgb(0, 0, 0)",
                                    boxShadow: "0px 0px 30px 10px white"
                                }}
                            >
                                <div className="flex flex-row pb-3 bg-gray-300 rounded-md">
                                    <div className="pt-3 justify-center">
                                        <FaCircle color="rgb(255, 255, 255)" className="pr-1 h-6 w-12"/>
                                    </div>
                                    <div className="pt-3 pr-3 justify-center">
                                        <div className="bg-white w-32 rounded-md pb-6" style={{height: 19}}/>
                                    </div>
                                </div>
                                <div className="flex flex-row pb-3 bg-gray-300 rounded-md">
                                    <div className="pt-3 justify-center">
                                        <FaCircle color="rgb(255, 255, 255)" className="pr-1 h-6 w-12"/>
                                    </div>
                                    <div className="pt-3 pr-3 justify-center">
                                        <div className="bg-white w-32 rounded-md pb-6" style={{height: 19}}/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="bg-gray-300 w-22 pt-5" style={{height: 15}}/>
                                    <div className="bg-gray-300 w-32 pt-5" style={{height: 15}}/>
                                </div>
                            </motion.div>
                            <motion.div className="flex flex-col bg-slate-900 p-5 gap-2 rounded-md"
                                whileHover={{
                                    scale: 1.1,
                                    borderColor: "rgb(255, 255, 255)",
                                    boxShadow: "0px 0px 30px 10px rgb(100, 116, 139)"
                                }}
                            >
                                <div className="flex flex-row pb-3 bg-slate-700 rounded-md">
                                    <div className="pt-3 justify-center">
                                        <FaCircle color="rgb(100, 116, 139)" className="pr-1 h-6 w-12"/>
                                    </div>
                                    <div className="pt-3 pr-3 justify-center">
                                        <div className="bg-slate-500 w-32 rounded-md pb-6" style={{height: 19}}/>
                                    </div>
                                </div>
                                <div className="flex flex-row pb-3 bg-slate-700 rounded-md">
                                    <div className="pt-3 justify-center">
                                        <FaCircle color="rgb(100, 116, 139)" className="pr-1 h-6 w-12"/>
                                    </div>
                                    <div className="pt-3 pr-3 justify-center">
                                        <div className="bg-slate-500 w-32 rounded-md pb-6" style={{height: 19}}/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="bg-slate-700 w-22 pt-5" style={{height: 15}}/>
                                    <div className="bg-slate-700 w-32 pt-5" style={{height: 15}}/>
                                </div>
                            </motion.div>
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