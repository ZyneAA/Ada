import Login_Form from "./components/Login_Form"
import Cookies from "js-cookie"
import { BackgroundBeams } from "../animations/Background_Beams"
import  { useEffect, useState } from "react"
import { Cover } from "../animations/Cover"

const Login = () => {

    const [theme, set_theme] = useState({})
    const [loading, set_loading] = useState(true)

    useEffect(() => {

        const config = () => {

            const theme_name = Cookies.get("theme")

            if(!theme_name) {
                Cookies.remove("theme")
                Cookies.set("theme", "horizon", {expires: 90})
                return
            }
    
            fetch(`/themes/${theme_name}.json`)
            .then(response => response.json())
            .then(data => {
                document.body.style.backgroundColor = data.editor.background
                set_theme(data)
                set_loading(false)
            })
            .catch(error => console.error("Error fetching the JSON file:", error))

        }

        config()

    }, [])

    if (loading) {
        return (
            <p>Loading</p>
        )
    }

    return(
        <div className="h-screen">
            {/* <Nav_Bar/> */}
            <div className="rounded-md relative flex flex-col antialiased h-full">                
                <div className="flex lg:flex-row flex-col lg:py-32 py-10">
                    <div className="xl:h-max xl:w-1/2 justify-center xl:columns-1 columns-1 pb-20 pt-10 xl:pb-0 lg:pb-0 xl:pt-20">
                        <h1 className="pt-10 relative z-10 text-6xl bg-clip-text text-transparent text-center font-spacefont-bold object-left" style={{backgroundImage: `linear-gradient(to right, ${theme.editor.background_complement}, ${theme.editor.font}`}}>
                        Welcome Back
                        </h1>
                        <p className="max-w-lg mx-auto my-2 text-sm text-center relative z-10 pt-2 font-space" style={{color: theme.editor.font}}>
                        Step into your personalized coding environment, designed to empower your creativity and streamline your workflow. Whether you're working on your next big project or refining your skills, our platform is here to provide all the tools you need.
                        </p>
                    </div>
                    <div className="flex h-max xl:w-1/2 justify-center z-30">
                        <Login_Form
                            background_color={theme.editor.background}
                            background_complement={theme.editor.background_complement}
                            background_second_complement={theme.editor.background_second_complement}
                            font_color={theme.editor.font}
                        />
                    </div>                  
                </div> 
                <BackgroundBeams
                    className="bg-inherit"
                    color1={theme.editor.background}
                    color2={theme.editor.background_complement}
                    color3={theme.editor.font}
                />
            </div>
        </div>
    )
}

export default Login