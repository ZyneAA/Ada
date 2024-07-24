import { motion } from "framer-motion"
import Cookies from "js-cookie"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Account = () => {

    const navigate = useNavigate()
    
    const [id, set_id] = useState("")
    const [session_exist, set_session_exist] = useState(false)

    useEffect(() => {
        const extract_id = () => {
            const session = Cookies.get("connect.sid")
            if(!session){
                set_session_exist(false)
                return
            }
            set_session_exist(true)
            const regex = /:([^.]*)/;
            const match = session.match(regex);         
            return match ? match[1] : '';
        }

        set_id(extract_id())

    }, [])

    const logout = () => {
        try{
            const response = axios.delete(
                `http://127.0.0.1:8000/session_data/${id}`,
                {
                    withCredentials: true
                }
            )
            Cookies.remove("connect.sid")
            navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div>
            <div className="pb-6">
                <h1 className="text-white text-2xl pb-3">Account</h1>
                <p className="text-gray-500">Settings for your account.</p>
                <div className="pt-5 pb-6">
                    <div className="bg-gray-800 w-full" style={{height: 0.5}}/>
                </div>
                {
                    session_exist === true ?
                    <div className="pb-10 flex flex-row">
                        <h1 className="text-white pb-3 pr-2">Your session id:</h1>
                        <p className="text-gray-500">{id}</p>
                    </div> 
                    :
                    <div className="pb-10 flex flex-row">
                        <h1 className="text-white pb-3 pr-2">No current active session.</h1>
                    </div> 
                }
                   
                <div>
                    <motion.button onClick={logout} className=" text-white border border-red-800 rounded-lg px-3 h-10 w-15 bg-red-800"
                        whileHover={{scale: 1.1, borderColor: "rgb(153, 27, 27)",boxShadow: "0px 0px 10px 0px red"}}
                        transition={{type: "spring"}}
                    >
                        Logout
                    </motion.button>
                </div>                      
            </div>
        </div>
    )
}

export default Account