import { motion } from "framer-motion";
import Register_Form from "./components/Register_Form";
// import Meteor from "../animations/Meteors"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { FingerprintSpinner } from "react-epic-spinners"
import Cookies from "js-cookie"
import { FlipWords } from "../animations/Flip";
import { BackgroundBeamsWithCollision } from "../animations/BBC"

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

    const words = ["better", "faster", "beautiful", "modern"]

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <FingerprintSpinner color={loader} size="100" />
            </div>
        )
    }

    return (
        <BackgroundBeamsWithCollision color1={theme.editor.background_complement} color2={theme.editor.font} className="h-auto">
            <div className="h-full w-full relative">
                <motion.div className="z-10 lg:px-40 pb-40 px-10 md:px-20 py-20"
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
                    <div className="flex lg:flex-row flex-col rounded-xl h-full backdrop-blur-sm border bg-slate-300/10" style={{ color: theme.editor.font, borderColor: theme.editor.background_complement }}>
                        <div className="lg:basis-9/12 py-10 flex flex-col w-full justify-center items-center">
                            <div className="h-[40rem] flex justify-center items-center px-4">
                                <div className="text-4xl mx-auto font-norma" style={{ color: theme.editor.background_complement }}>
                                    Build
                                    <FlipWords color={theme.editor.background_complement} words={words} /> <br />
                                    programs with ADA
                                </div>
                            </div>
                            <p className="py-5 px-10" style={{color: theme.editor.background_complement}}>Welcome to a community of developers who are pushing the boundaries of innovation. By registering, you’ll unlock access to a powerful, intuitive coding environment tailored to bring your ideas to life.</p>
                        </div>
                        <div style={{ width: "40%" }}>
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
        </BackgroundBeamsWithCollision>
    );
}

export default Register