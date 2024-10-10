import { motion } from "framer-motion"
import Profile from "./components/Profile"
import Appearance from "./components/Appearance"
import Account from "./components/Account"
import { useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { SquareX } from "lucide-react"
import { FingerprintSpinner } from "react-epic-spinners"

const Settings = () => {

    const navigate = useNavigate()

    const [no, set_no] = useState(0)
    const [theme, set_theme] = useState({})
    const [loading, set_loading] = useState(true)
    const [loader, set_loader] = useState("")

    useState(() => {

        const theme_name = Cookies.get("theme")

        fetch(`/themes/${theme_name}.json`)
        .then(response => response.json())
        .then(data => {
            set_loader(data.editor.background)
            set_theme(data)
            document.body.style.backgroundColor = data.editor.background_second_complement
            setTimeout(() => {
                set_loading(false)
            }, 1500)
        })
        .catch(error => console.error("Error fetching the JSON file:", error))

        const check = async () => {

            try {
                const response = await axios.get(
                    "http://localhost:8000/bridge/v1/labyrinth/auth/check",
                    { withCredentials: true }
                )
                console.log(response.data)
                if (response.data === false) {
                    navigate("/login")
                }
            }
            catch (err) {
                console.log(err)
            }

        }

        check()
    
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <FingerprintSpinner color={loader} size="100" />
            </div>
        )
    }

    return(
        <div className="h-auto my-7" style={{ backgroundColor: theme.editor.background_second_complement }}>
            <motion.div className="my-10 mx-16 px-10 py-5 border-4 rounded-lg"
            style={{ backgroundColor: theme.editor.background, borderColor: theme.editor.background_complement }}
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
                    <div className="flex flex-row">
                        <h1 className="lg:text-5xl text-3xl font-space pt-6" style={{width: "99%", color: theme.editor.font}}>Settings</h1>
                        <a href="http://localhost:8001/code" className="flex items-start pt-3">
                            <SquareX color={theme.editor.background_second_complement} scale={10} />
                        </a>
                    </div>
                    <p className="py-8" style={{color: theme.editor.font}}>Manage your account settings and set e-mail preferences.</p>
                    <div className="w-full" style={{height: 0.5, backgroundColor: theme.editor.background_second_complement}}/>
                </div>
                <div className="flex lg:flex-row flex-col py-8">
                    <div className="flex lg:flex-col flex-row flex-wrap basis-2/12 lg:px-5">
                        <div className="pb-2">
                            {
                                no === 0 ?
                                <motion.button className={`rounded-md w-32 py-2`}
                                    style={{color: theme.editor.font}}
                                animate={{
                                    backgroundColor: theme.editor.background_complement,
                                    scale: 1.1
                                }}
                                onClick={() => set_no(0)}
                            >Profile</motion.button>
                            :
                            <motion.button className={`rounded-md w-32 py-2`}
                                style={{color: theme.editor.font}}
                                onClick={() => set_no(0)}
                            >Profile</motion.button>
                            }
                        </div>
                        <div className="pb-2">
                            {
                                no === 1 ?
                                <motion.button className={`rounded-md w-32 py-2`}
                                    style={{color: theme.editor.font}}
                                animate={{
                                    backgroundColor: theme.editor.background_complement,
                                    scale: 1.1
                                }}
                                onClick={() => set_no(1)}
                            >Appearance</motion.button>
                            :
                            <motion.button className={`rounded-md w-32 py-2`}
                                style={{color: theme.editor.font}}
                                onClick={() => set_no(1)}
                            >Appearance</motion.button>
                            }
                        </div>
                        <div className="pb-2">
                            {
                                no === 2?
                                <motion.button className={`rounded-md w-32 py-2`}
                                style={{color: theme.editor.font}}
                                animate={{
                                    backgroundColor: theme.editor.background_complement,
                                    scale: 1.1
                                }}
                                onClick={() => set_no(2)}
                            >Account</motion.button>
                            :
                            <motion.button className={`rounded-md w-32 py-2`}
                                style={{color: theme.editor.font}}
                                onClick={() => set_no(2)}
                            >Account</motion.button>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col basis-2/4">
                        {
                            no === 0 ?
                            <Profile 
                                background_color={theme.editor.background}
                                background_complement={theme.editor.background_complement}
                                background_second_complement={theme.editor.background_second_complement}
                                font_color={theme.editor.font}
                            />
                            :
                            no === 1 ?
                            <Appearance
                                name={theme.name}
                                background_color={theme.editor.background}
                                background_complement={theme.editor.background_complement}
                                background_second_complement={theme.editor.background_second_complement}
                                font_color={theme.editor.font}
                            />
                            :
                            <Account
                                background_color={theme.editor.background}
                                background_complement={theme.editor.background_complement}
                                background_second_complement={theme.editor.background_second_complement}
                                font_color={theme.editor.font}
                            />
                        }
                        
                    </div>          
                </div>
            </motion.div>       
        </div>
    )
}

export default Settings