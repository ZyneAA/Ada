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

    return (
        <div className="h-auto rounded-lg p-4 flex justify-center items-center w-auto flex-col" style={{ backgroundColor: prop.background }}>
            <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-5 justify-center items-center">
                        <p style={{ color: prop.font_color }}>Compilation Timeout: </p>
                        <input
                            onChange={(e) => get_ct(e.target.value)}
                            className="px-2 outline-none border input-placeholder rounded-xl"
                            type="text"
                            placeholder={1000}
                            style={{ backgroundColor: prop.background_complement, "--placeholder-color": prop.background, color: prop.font_color }}
                        />
                    </div>
                    <div className="flex flex-row gap-5 justify-center items-center">
                        <p style={{ color: prop.font_color, width: "80%" }}>Execution Timeout: </p>
                        <input
                        onChange={(e) => get_et(e.target.value)}
                            className="px-2 outline-none border input-placeholder rounded-xl"
                            type="text"
                            placeholder={1000}
                            style={{ backgroundColor: prop.background_complement, "--placeholder-color": prop.background, color: prop.font_color }}
                        />
                    </div>
                    <div className="flex flex-row gap-5 justify-center items-center">
                        <p style={{ color: prop.font_color, width: "80%" }}>Args: </p>
                        <input
                            onChange={(e) => get_args(e.target.value)}
                            className="px-2 outline-none border input-placeholder rounded-xl"
                            type="text"
                            placeholder={"arg1  arg2  arg3"}
                            style={{ backgroundColor: prop.background_complement, "--placeholder-color": prop.background, color: prop.font_color }}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-5 justify-center items-center">
                        <p style={{ color: prop.font_color }}>Compilation Memory Limit: </p>
                        <input
                            onChange={(e) => get_cml(e.target.value)}
                            className="px-2 outline-none border input-placeholder rounded-xl"
                            type="text"
                            placeholder={1000}
                            style={{ backgroundColor: prop.background_complement, "--placeholder-color": prop.background, color: prop.font_color }}
                        />
                    </div>
                    <div className="flex flex-row gap-5 justify-center items-center">
                        <p style={{ color: prop.font_color, width: "80%" }}>Execution Memory Limit: </p>
                        <input
                            onChange={(e) => get_eml(e.target.value)}
                            className="px-2 outline-none border input-placeholder rounded-xl"
                            type="text"
                            placeholder={1000}
                            style={{ backgroundColor: prop.background_complement, "--placeholder-color": prop.background, color: prop.font_color }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Controller