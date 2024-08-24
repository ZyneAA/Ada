import { motion } from "framer-motion";
import Register_Form from "./components/Register_Form";
// import Meteor from "../animations/Meteors"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { FingerprintSpinner } from "react-epic-spinners"
import Cookies from "js-cookie"

const Register = () => {

    const navigate = useNavigate()

    const [theme, set_theme] = useState({})
    const [loading, set_loading] = useState(true)
    const [loader, set_loader] = useState("")

    const go_to_1 = () => {
        
        navigate("/login")

    }

    useEffect(() => {

        const theme_name = Cookies.get("theme")

        fetch(`/themes/${theme_name}.json`)
            .then(response => response.json())
            .then(data => {
                set_loader(data.editor.background)
                set_theme(data)
                console.log(data)
                document.body.style.backgroundColor = data.editor.background_second_complement
                setTimeout(() => {
                    set_loading(false)
                }, 2000)
            })
            .catch(error => console.error("Error fetching the JSON file:", error))

    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <FingerprintSpinner color={loader} size="100" />
            </div>
        )
    }

    return (
        <div className="h-auto">
            <div className="h-full w-full dark:bg-inherit bg-inherit dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative">                <motion.div className="z-10 lg:px-40 pb-40 px-10 md:px-20 py-20"
                    initial={{
                        opacity: 0,
                        scale: 0.5
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{
                        duration: 2,
                        type: "spring"
                    }}
                >
                    <div className="flex lg:flex-row flex-col rounded-xl" style={{backgroundColor: theme.editor.background, color: theme.editor.font }}>
                        <div className="lg:basis-9/12 py-10 flex flex-col w-full">
                            <p className="py-5 px-10">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt id, odit illo reiciendis a vel nisi, ipsum excepturi, commodi nam quidem quo. Ipsam quod soluta earum, a eligendi quaerat ad?</p>
                            {/* <div className="py-10 lg:py-5">
                                <Meteor
                                    handle={go_to_1}
                                    header="Already register? Login now and start playing"
                                    para=""
                                    button_text="Login" />
                            </div>
                            <div className="py-10 lg:py-16">
                                <Meteor
                                    header="Learn more about the game"
                                    para="Start learning by reading the doc and playing. This simple tutourial will teach you the basics to get started."
                                    button_text="Documentation"
                                />
                            </div> */}
                        </div>
                        <div style={{width: "40%"}}>
                            <Register_Form
                                background_color={theme.editor.background}
                                background_complement={theme.editor.background_complement}
                                background_second_complement={theme.editor.background_second_complement}
                                font_color={theme.editor.font}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>

    );
}

export default Register