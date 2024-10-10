import Show_Theme from "./Show_Theme"
import { useState } from "react"
import Cookies from "js-cookie"

import asuka from "../themes/asuka.json"
import eva from "../themes/eva.json"
import horizon from "../themes/horizon.json"
import breeze from "../themes/breeze.json"
import sunset from "../themes/sunset.json"
import serenade from "../themes/serenade.json"
import forest from "../themes/forest.json"
import midnight from "../themes/midnight.json"
import neon from "../themes/neon.json"
import urban from "../themes/urban.json"
import dream from "../themes/dream.json"
import dawn from "../themes/dawn.json"

const Appearance = ({ background_color, background_complement, background_second_complement, font_color, name }) => {

    const [preview, set_preview] = useState("")

    const set_theme = (value) => {

        Cookies.remove("theme")
        Cookies.set("theme", value, { expires: 90 })

    }

    return (
        <div>
            <div className="pb-6">
                <div>
                    <h1 className="text-2xl pb-3" style={{ color: font_color }}>Appearance{preview}</h1>
                    <p style={{ color: font_color }}>Customize the appearance of the app. Automatically change the theme upon selecting.</p>
                    <div className="pt-5 pb-6">
                        <div className="w-full" style={{ height: 0.5, backgroundColor: background_second_complement }} />
                        <h1 className="pb-3 pt-4" style={{ color: font_color }}>Theme</h1>
                        <p style={{ color: font_color }}>Choose a theme.</p>
                    </div>
                </div>
                <div className="pb-10">
                    <div className="flex flex-col py-5 w-auto">
                        <div className="flex flex-col h-auto p-2 rounded-md gap-10">
                            <a href="/settings">
                                <Show_Theme
                                    rule0={horizon.editor.rules[0].foreground}
                                    rule1={horizon.editor.rules[1].foreground}
                                    rule2={horizon.editor.rules[2].foreground}
                                    diff={horizon.editor.dintinct_color}
                                    selection={horizon.editor.selection_background}
                                    cursor={horizon.editor.cursor_foregorund}
                                    r_name={horizon.theme_name}
                                    title={horizon.title}
                                    description={horizon.description}
                                    is_selected={name}
                                    name={horizon.name}
                                    theme_name={set_theme}
                                    background={horizon.editor.background}
                                    background_complement={horizon.editor.background_complement}
                                    font={horizon.editor.font}
                                    background_second_complement={horizon.editor.background_second_complement} />
                            </a>
                            <a href="/settings">
                                <Show_Theme
                                    rule0={dawn.editor.rules[0].foreground}
                                    rule1={dawn.editor.rules[1].foreground}
                                    rule2={dawn.editor.rules[2].foreground}
                                    diff={dawn.editor.dintinct_color}
                                    selection={dawn.editor.selection_background}
                                    cursor={dawn.editor.cursor_foregorund}
                                    r_name={dawn.theme_name}
                                    title={dawn.title}
                                    description={dawn.description}
                                    is_selected={name}
                                    name={dawn.name}
                                    theme_name={set_theme}
                                    background={dawn.editor.background}
                                    background_complement={dawn.editor.background_complement}
                                    font={dawn.editor.font}
                                    background_second_complement={dawn.editor.background_second_complement} />
                            </a>
                            <a href="/settings">
                                <Show_Theme
                                    rule0={sunset.editor.rules[0].foreground}
                                    rule1={sunset.editor.rules[1].foreground}
                                    rule2={sunset.editor.rules[2].foreground}
                                    diff={sunset.editor.dintinct_color}
                                    selection={sunset.editor.selection_background}
                                    cursor={sunset.editor.cursor_foregorund}
                                    r_name={sunset.theme_name}
                                    title={sunset.title}
                                    description={sunset.description}
                                    is_selected={name}
                                    name={sunset.name}
                                    theme_name={set_theme}
                                    background={sunset.editor.background}
                                    background_complement={sunset.editor.background_complement}
                                    font={sunset.editor.font}
                                    background_second_complement={sunset.editor.background_second_complement} />
                            </a>
                            <a href="/settings">
                                <Show_Theme
                                    rule0={breeze.editor.rules[0].foreground}
                                    rule1={breeze.editor.rules[1].foreground}
                                    rule2={breeze.editor.rules[2].foreground}
                                    diff={breeze.editor.dintinct_color}
                                    selection={breeze.editor.selection_background}
                                    cursor={breeze.editor.cursor_foregorund}
                                    r_name={breeze.theme_name}
                                    title={breeze.title}
                                    description={breeze.description}
                                    is_selected={name}
                                    name={breeze.name}
                                    theme_name={set_theme}
                                    background={breeze.editor.background}
                                    background_complement={breeze.editor.background_complement}
                                    font={breeze.editor.font}
                                    background_second_complement={breeze.editor.background_second_complement} />
                            </a>
                            <a href="/settings">
                                <Show_Theme
                                    rule0={serenade.editor.rules[0].foreground}
                                    rule1={serenade.editor.rules[1].foreground}
                                    rule2={serenade.editor.rules[2].foreground}
                                    diff={serenade.editor.dintinct_color}
                                    selection={serenade.editor.selection_background}
                                    cursor={serenade.editor.cursor_foregorund}
                                    r_name={serenade.theme_name}
                                    title={serenade.title}
                                    description={serenade.description}
                                    is_selected={name}
                                    name={serenade.name}
                                    theme_name={set_theme}
                                    background={serenade.editor.background}
                                    background_complement={serenade.editor.background_complement}
                                    font={serenade.editor.font}
                                    background_second_complement={serenade.editor.background_second_complement} />
                            </a>
                            <a href="/settings">
                                <Show_Theme
                                    rule0={asuka.editor.rules[0].foreground}
                                    rule1={asuka.editor.rules[1].foreground}
                                    rule2={asuka.editor.rules[2].foreground}
                                    r_name={asuka.theme_name}
                                    cursor={asuka.editor.cursor_foregorund}
                                    description={asuka.description}
                                    is_selected={name}
                                    name={asuka.name}
                                    theme_name={set_theme}
                                    background={asuka.editor.background}
                                    background_complement={asuka.editor.background_complement}
                                    font={asuka.editor.font}
                                    background_second_complement={asuka.editor.background_second_complement} />
                            </a>
                            <a href="/settings">
                                <Show_Theme
                                    rule0={eva.editor.rules[0].foreground}
                                    rule1={eva.editor.rules[1].foreground}
                                    rule2={eva.editor.rules[2].foreground}
                                    r_name={eva.theme_name}
                                    cursor={eva.editor.cursor_foregorund}
                                    description={eva.description}
                                    is_selected={name}
                                    name={eva.name}
                                    theme_name={set_theme}
                                    background={eva.editor.background}
                                    background_complement={eva.editor.background_complement}
                                    font={eva.editor.font}
                                    background_second_complement={eva.editor.background_second_complement} />
                            </a>
                            <a href="/settings">
                                <Show_Theme
                                    rule0={forest.editor.rules[0].foreground}
                                    rule1={forest.editor.rules[1].foreground}
                                    rule2={forest.editor.rules[2].foreground}
                                    r_name={forest.theme_name}
                                    cursor={forest.editor.cursor_foregorund}
                                    description={forest.description}
                                    is_selected={name}
                                    name={forest.name}
                                    theme_name={set_theme}
                                    background={forest.editor.background}
                                    background_complement={forest.editor.background_complement}
                                    font={forest.editor.font}
                                    background_second_complement={forest.editor.background_second_complement} />
                            </a>
                            <a href="/settings">
                                <Show_Theme
                                    rule0={midnight.editor.rules[0].foreground}
                                    rule1={midnight.editor.rules[1].foreground}
                                    rule2={midnight.editor.rules[2].foreground}
                                    r_name={midnight.theme_name}
                                    cursor={midnight.editor.cursor_foregorund}
                                    description={midnight.description}
                                    is_selected={name}
                                    name={midnight.name}
                                    theme_name={set_theme}
                                    background={midnight.editor.background}
                                    background_complement={midnight.editor.background_complement}
                                    font={midnight.editor.font}
                                    background_second_complement={midnight.editor.background_second_complement} />
                            </a>
                            <a href="/settings">
                                <Show_Theme
                                    rule0={neon.editor.rules[0].foreground}
                                    rule1={neon.editor.rules[1].foreground}
                                    rule2={neon.editor.rules[2].foreground}
                                    r_name={neon.theme_name}
                                    cursor={neon.editor.cursor_foregorund}
                                    description={neon.description}
                                    is_selected={name}
                                    name={neon.name}
                                    theme_name={set_theme}
                                    background={neon.editor.background}
                                    background_complement={neon.editor.background_complement}
                                    font={neon.editor.font}
                                    background_second_complement={neon.editor.background_second_complement} />
                            </a>
                            <a href="/settings">
                                <Show_Theme
                                    rule0={dream.editor.rules[0].foreground}
                                    rule1={dream.editor.rules[1].foreground}
                                    rule2={dream.editor.rules[2].foreground}
                                    r_name={dream.theme_name}
                                    cursor={dream.editor.cursor_foregorund}
                                    description={dream.description}
                                    is_selected={name}
                                    name={dream.name}
                                    theme_name={set_theme}
                                    background={dream.editor.background}
                                    background_complement={dream.editor.background_complement}
                                    font={dream.editor.font}
                                    background_second_complement={dream.editor.background_second_complement} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appearance