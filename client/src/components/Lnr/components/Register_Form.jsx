import { motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cool_Button_2 from "../../animations/Cool_Button_2"
import axios from "axios"
import { BreedingRhombusSpinner } from "react-epic-spinners"
import Input_Box from "../../animations/Input_Box"

const Register_Form = ({ background_color, background_complement, background_second_complement, font_color }) => {

    const [fn, set_fn] = useState("")
    const [ln, set_ln] = useState("")
    const [username, set_username] = useState("")
    const [email, set_email] = useState("")
    const [password, set_password] = useState(null)
    const [va_password, set_va_password] = useState(null)

    const [show, set_show] = useState(false)
    const [un_exist, set_un_exist] = useState(false)
    const [checking, set_checking] = useState(false)

    const navigate = useNavigate()


    useEffect(() => {

        const check_username = async () => {

            set_checking(true)

            setTimeout(async () => {
                try {

                    const response = await axios.get(
                        `http://localhost:8000/bridge/v1/labyrinth/check_user_exist_by_username?username=${username}`,
                    )

                    if (response.data.username) {
                        set_un_exist(true)
                    }
                    else {
                        set_un_exist(false)
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }, 1500)

            set_checking(false)

        }

        const validation = () => {

            if (password === "" || va_password === "") {
                set_show(false)
            }

            if (password === va_password) {
                set_show(true)
            }
            else {
                set_show(false)
            }

        }

        check_username()
        validation()

    }, [password, va_password, username])

    const send_credentials = async () => {

        try {
            const user = {
                "fn": fn,
                "ln": ln,
                "username": username,
                "email": email,
                "password": password
            }

            const response = await axios.post(
                "http://localhost:8000/bridge/v1/labyrinth/register",
                user,
                { withCredentials: true }
            )

            if (response.data.username) {
                navigate("/login")
            }

        }
        catch (err) {
            console.error({ "error": err });
        }

    }

    const fn_setter = (val) => {

        set_fn(val)

    }

    const ln_setter = (val) => {

        set_ln(val)

    }

    const username_setter = (val) => {

        set_username(val)

    }

    const email_setter = (val) => {

        set_email(val)

    }

    const pass_setter = (val) => {

        const p = val

        const special_char = /[!@#$%^&*(),.?":{}|<>]/
        const number = /[0-9]/
        const uppercase = /[A-Z]/
        const length = p.length >= 8


        // htet90%%
        // htetm98(*)R
        if (special_char.test(p) && number.test(p) && uppercase.test(p) && length) {
            set_password(val)
            set_show(true)
        }

        set_show(false)

    }

    const cn_pass_setter = (val) => {

        const p = val

        const special_char = /[!@#$%^&*(),.?":{}|<>]/
        const number = /[0-9]/
        const uppercase = /[A-Z]/
        const length = p.length >= 8


        // htet90%%
        // htetm98(*)R
        if (special_char.test(p) && number.test(p) && uppercase.test(p) && length) {
            set_va_password(val)
            set_show(true)
        }

        set_show(false)

    }

    return (
        <motion.div
            className="border-l py-5 h-auto px-10"
            style={{ backgroundColor: background_color }}
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                duration: 1.5
            }}
        >
            <div className="px-3">
                <div className="flex flex-col py-10" style={{ color: font_color }}>
                    <div>
                        <h1 className="lg:text-5xl tracking-wide font-space italic text-3xl" style={{ color: font_color }}>
                            Welcome
                        </h1>
                        <p className="text-lg pt-5 pb-5" style={{ color: font_color }}>Register a new account to start your coding journey today</p>
                    </div>
                    {/* <form> */}
                    <div className="flex lg:flex-row flex-col pt-5 md:flex-row">
                        <div className="flex flex-col basis-1/2 lg:pr-5 md:pr-5">
                            <label htmlFor="first_name" className="pb-1" style={{ color: font_color }}>First Name</label>
                            <Input_Box type="text" getter={fn_setter} id="first_name"
                                background_complement={background_complement}
                                font_color={font_color}
                                background_second_complement={background_second_complement}
                            />
                        </div>
                        <div className="flex flex-col basis-1/2 lg:pt-0 md:pt-0 pt-5">
                            <label htmlFor="last_name" className="pb-1" style={{ color: font_color }}>Last Name</label>
                            <Input_Box type="text" getter={ln_setter} variant={0} id="last_name"
                                background_complement={background_complement}
                                font_color={font_color}
                                background_second_complement={background_second_complement}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col basis-1/2 pt-5">
                        <label htmlFor="user_name" className="pb-1" style={{ color: font_color }}>Username</label>
                        <Input_Box type="text" getter={username_setter} variant={0} id="user_name"
                            background_complement={background_complement}
                            font_color={font_color}
                            background_second_complement={background_second_complement}
                        />
                    </div>
                    <div className="flex flex-col basis-1/2 pt-5">
                        <label htmlFor="email" className="pb-1" style={{ color: font_color }}>Email</label>
                        <Input_Box type="text" getter={email_setter} variant={0} id="email"
                            background_complement={background_complement}
                            font_color={font_color}
                            background_second_complement={background_second_complement}
                        />
                    </div>
                    <div className="flex flex-col basis-1/2 pt-5">
                        <label htmlFor="password" className="form-control pb-1" style={{ color: font_color }}>Password</label>
                        <Input_Box getter={pass_setter} id="password" type="password"
                            background_complement={background_complement}
                            font_color={font_color}
                            background_second_complement={background_second_complement}
                        />
                    </div>
                    <div className="flex flex-col basis-1/2 pt-5" >
                        <label htmlFor="confirm_password" className="form-control pb-1" style={{ color: font_color }}>Confirm Password</label>
                        <Input_Box getter={cn_pass_setter} id="confirm_password" type="password"
                            background_complement={background_complement}
                            font_color={font_color}
                            background_second_complement={background_second_complement}
                        />
                    </div>
                    <div className="py-10 flex justify-center items-center">
                        <div
                            style={{
                                width: "100%",
                                height: '1px',
                                backgroundImage: `linear-gradient(90deg, ${background_second_complement} 0%, ${font_color} 35%, ${background_second_complement} 65%, ${background_second_complement} 100%)`,
                            }}
                        />
                    </div>

                    {
                        show === true && un_exist === false ?
                            <div>
                                <Cool_Button_2 handle={send_credentials} type="summit" name="Register"
                                    background_complement={background_complement}
                                    font_color={font_color}
                                    background_second_complement={background_second_complement}
                                />
                            </div>
                            :
                            un_exist === true ?
                                <div>
                                    <h1>Username already exist</h1>
                                </div>
                                :
                                <div>
                                    <h1 style={{ color: font_color }}>Complete the registration and make sure that both password and comfirmed password are the same. Also the password must contain at least one special character, number(s), at least one uppercase letter, and a minimum of 8 characters</h1>
                                </div>

                    }
                </div>
            </div>
        </motion.div>
    )
}

export default Register_Form