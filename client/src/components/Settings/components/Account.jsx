import { motion } from "framer-motion"
import Cookies from "js-cookie"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"

const Account = ({ background_color, background_complement, background_second_complement, font_color }) => {

    const navigate = useNavigate()

    const [session, set_session] = useState(null)
    const [session_exist, set_session_exist] = useState(false)

    useEffect(() => {

        const get_session = async () => {

            try {
                const response = await axios.get(
                    "http://localhost:8000/bridge/v1/labyrinth/auth/get",
                    { withCredentials: true }
                )
                if (response.data === null) {
                    navigate("/login")
                }
                console.log(response.data)
                set_session(response.data)
            }
            catch (err) {

            }

        }

        get_session()

    }, [])

    const logout = () => {
        try {
            const response = axios.delete(
                `http://localhost:8000/bridge/v1/labyrinth/logout`,
                {
                    withCredentials: true
                }
            )

            Cookies.remove("connect.sid")
            navigate("/login")
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className="pb-6">
                <h1 className="text-2xl pb-3" style={{ color: font_color }}>Account</h1>
                <p style={{ color: font_color }}>Your Account Informations</p>
                <div className="pt-5 pb-6">
                    <div className="bg-gray-800 w-full" style={{ height: 0.5, backgroundColor: background_second_complement }} />
                    {
                        !session ?
                            <p style={{ color: font_color }} className="py-4">loading</p> :
                            <div>
                                <div className="pb-1 pt-3  flex flex-row">
                                    <h1 className="pb-1 pr-2" style={{ color: font_color }}>Username:</h1>
                                    <p style={{ color: font_color }}>{session.passport.user.username}</p>
                                </div>
                                {
                                    session.passport.user.git_name === undefined ?
                                        <div>
                                            <p style={{ color: font_color }}>Haven't login to Git Hub</p>
                                        </div> :
                                        <div>
                                            <div className="pb-1 flex flex-row">
                                                <h1 className="pb-1 pr-2" style={{ color: font_color }}>Git Hub Username:</h1>
                                                <p style={{ color: font_color }}>{session.passport.user.git_name}</p>
                                            </div>
                                            <div className="pb-1 flex flex-row">
                                                <h1 className="pb-1 pr-2" style={{ color: font_color }}>Access Token: </h1>
                                                <p style={{ color: font_color }}>{session.passport.user.access_token}</p>
                                            </div>
                                        </div>
                                }
                            </div>

                    }
                </div>
                <div>
                    <motion.button className="rounded-md px-3 h-10 w-20"
                        onClick={logout}
                        style={{ color: font_color, backgroundColor: background_complement }}
                        whileHover={{
                            scale: 1.1,
                            borderColor: background_complement,
                            boxShadow: `0px 0px 20px 0px ${background_complement}`
                        }}
                        transition={{
                            type: "spring"
                        }}
                    >Logout</motion.button>
                </div>
            </div>
        </div>
    )
}

export default Account