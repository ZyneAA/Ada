import React, { useRef, useState } from "react"
import Cool_Button_2 from "../../animations/Cool_Button_2"
import { CircleAlert, CircleX } from "lucide-react"

const PDF = ({ font_color, background_color, background_complement, background_second_complement, make_close }) => {
    const [pdfUrl, setPdfUrl] = useState(null)
    const fileInputRef = useRef(null)

    const handleButtonClick = () => {
        fileInputRef.current.click() // Trigger the hidden file input click
    }

    const onFileChange = (event) => {
        const file = event.target.files[0]
        if (file && file.type === "application/pdf") {
            setPdfUrl(URL.createObjectURL(file))
        } else {
            alert("Please select a PDF file.")
        }
    }

    return (
        <div className="w-full h-full">
            <div className="p-2 cursor-pointer items-end justify-end w-4" onClick={() => make_close(false)}>
                <CircleX color={font_color} />
            </div>
            <div className="flex justify-center items-center flex-col">
                <div style={{ backgroundColor: background_color, padding: "20px" }}>
                    <Cool_Button_2 type="summit" handle={handleButtonClick} name={"Upload a PDF"}
                        background_complement={background_complement}
                        font_color={font_color}
                        background_second_complement={background_second_complement}
                    />
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={onFileChange}
                        accept="application/pdf"
                        style={{ display: "none" }} // Hide the file input
                    />
                    {pdfUrl && (
                        <iframe
                            src={pdfUrl}
                            width="1000"
                            height="400"
                            title="PDF Viewer"
                            style={{
                                border: "2px solid",
                                borderColor: background_second_complement,
                                marginTop: "20px",
                                borderRadius: "8px",
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default PDF
