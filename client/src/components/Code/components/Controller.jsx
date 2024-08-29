import "../../../css/misc.css"
import "../../../css/index.css"

import { CircleAlert, CircleX } from "lucide-react"


const Controller = (prop) => {

    const get_ct = (val) => {

        prop.ct(val)

    }

    const get_et = (val) => {

        prop.et(val)

    }

    const get_args = (val) => {

        prop.args(val)

    }

    const get_cml = (val) => {

        prop.cml(val)

    }

    const get_eml = (val) => {

        prop.eml(val)

    }

    const set_deafault = () => {

        prop.ct(10000)
        prop.et(3000)
        prop.cml(-1)
        prop.eml(-1)

    }

    return (
        <div>
            <div className="items-end justify-end p-2 cursor-pointer w-3" onClick={() => prop.make_close(false)}>
                <CircleX color={prop.font_color} />
            </div>
            <div className="h-auto rounded-lg p-4 flex justify-center items-center w-auto flex-col py-4" style={{ backgroundColor: prop.background }}>
                <div className="flex flex-row gap-10">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-5 justify-center items-center">
                            <p style={{ color: prop.font_color, width: "80%" }}>Args: </p>
                            <input
                                onChange={(e) => get_args(e.target.value)}
                                className="px-2 outline-none border input-placeholder rounded-xl input-placeholder"
                                type="text"
                                placeholder={"arg1  arg2  arg3"}
                                style={{ backgroundColor: prop.background_complement, "--placeholder-color": prop.font_color, color: prop.font_color }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Controller