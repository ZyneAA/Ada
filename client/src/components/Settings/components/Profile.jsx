import Input_Box from "../../animations/Input_Box"
import Cool_Button_2 from "../../animations/Cool_Button_2"
import React, { useState } from "react"
import { motion } from "framer-motion"
import axios from "axios"

const Profile = () => {

    const [toggle_1, set_toggle_1] = useState(false)
    const [toggle_2, set_toggle_2] = useState(false)
    const [fn, set_fn] = useState("")
    const [ln, set_ln] = useState("")
    const [bio, set_bio] = useState("")
    const [status_1, set_status_1] = useState("Status 1")
    const [status_2, set_status_2] = useState("Status 2")

    const items1 = ["Eating", "Playing", "Going", "Making", "Waiting", "Showing", "Pushing", "Pulling", "Riding"];
    const items2 = ["Game", "Code", "Program", "Car", "Bike", "Ski", "Piano", "Guitar"];

    const update = async() => {

        try{
            const response = await axios.post(
                "http://localhost:8000/bridge/v1/labyrinth/update_user_profile",
                {
                    fn: fn,
                    ln: ln,
                    status_1: status_1,
                    status_2: status_2,
                    bio: bio
                },
                {
                    withCredentials: true
                }
            )
            console.log(response.data)
        }
        catch(err) {

        }

    }

    const toggler_1 = () => {

        if (toggle_1 === false) set_toggle_1(true)
        if (toggle_1 === true) set_toggle_1(false)

    }

    const toggler_2 = () => {

        if (toggle_2 === false) set_toggle_2(true)
        if (toggle_2 === true) set_toggle_2(false)

    }

    const s1 = (e) => {

        const status = e.target.textContent
        set_status_1(status)
        set_toggle_1(false)

    }

    const s2 = (e) => {

        const status = e.target.textContent
        set_status_2(status)
        set_toggle_2(false)

    }

    const change_fn = (value) => {

        set_fn(value)

    }

    const change_ln = (value) => {

        set_ln(value)

    }

    return(
        <div>
                <div>
                    <div className="pb-6">
                        <h1 className="text-white text-2xl pb-3">Profile</h1>
                        <p className="text-gray-500">This is how others will see you on the site.</p>
                        <div className="pt-5">
                            <div className="bg-gray-800 w-full" style={{height: 0.5}}/>
                        </div>                          
                    </div>
                    <div className="pb-10 flex flex-row gap-3">
                        <div>
                            <h1 className="text-white pb-3">First Name</h1> 
                            <Input_Box type="text" variant={0} getter={change_fn} />
                        </div>
                        <div>
                            <h1 className="text-white pb-3">Last Name</h1> 
                            <Input_Box type="text" variant={0} getter={change_ln} />
                        </div>
                    </div>
                    <div className="pb-10">
                        <h1 className="text-white pb-3">Status</h1> 
                        <div className="flex flex-row gap-3">
                            <Cool_Button_2 type="summit" handle={toggler_1} name={status_1}/>
                            {toggle_1 && (
                                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur">
                                    <div className="bg-black p-6 shadow-lg rounded-xl border border-slate-800 h-auto">
                                        <h2 className="text-xl font-bold mb-4 text-white">Select status</h2>
                                        <div className="flex flex-row flex-wrap gap-3 py-3 w-96">
                                            {items1.map((item, index) => (
                                                <button key={index} className="border border-white rounded-xl text-white px-2" onClick={(e) => s1(e)}>{item}</button>           
                                            ))}
                                        </div>                              
                                        <button onClick={toggler_1} className="bg-gray-700 text-white p-2 rounded">                                          
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )} 
                            <Cool_Button_2 handle={toggler_2} type="summit" name={status_2}/>   
                            {toggle_2 && (
                                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur">
                                    <div className="bg-black p-6 shadow-lg rounded-xl border border-slate-800 h-auto">
                                        <h2 className="text-xl font-bold mb-4 text-white">Select status</h2>
                                        <div className="flex flex-row flex-wrap gap-3 py-3 w-96">
                                            {items2.map((item, index) => (
                                                <button key={index} className="border border-white rounded-xl text-white px-2" onClick={(e) => s2(e)}>{item}</button>           
                                            ))}
                                        </div>                              
                                        <button onClick={toggler_2} className="bg-gray-700 text-white p-2 rounded">                                          
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )} 
                        </div>              
                        <p className="text-gray-500 pt-3">Change your status.</p>
                    </div>
                    <div className="pb-10">
                        <h1 className="text-white pb-3">Bio</h1> 
                        <motion.textarea
                            rows="5"
                            className="rounded-lg border border-gray-50 w-full bg-zinc-900 text-slate-50 outline-none p-3"
                            placeholder="Tell us a bit..."
                            whileHover={{
                                scale: 1.1,
                                borderColor: "rgb(38, 113, 212)",
                                boxShadow: "0px 0px 20px 0px blue"
                            }}
                            transition={{
                                type: "spring"
                            }}
                            onChange={e => set_bio(e.target.value)}
                        ></motion.textarea>
                        <p className="text-gray-500 pt-3">Write a few words about yourself or entirely something unrelated.</p>
                    </div>
                    <div>
                        <motion.button className="text-white bg-green-800 rounded-md px-3 h-10 w-20"
                            whileHover={{
                                scale: 1.1,
                                borderColor: "rgb(41, 166, 58)",
                                boxShadow: "0px 0px 20px 0px green"
                            }}
                            transition={{
                                type: "spring"
                            }}
                            onClick={update}
                        >Save</motion.button>
                    </div>
                </div>
            </div>
    )
}

export default Profile