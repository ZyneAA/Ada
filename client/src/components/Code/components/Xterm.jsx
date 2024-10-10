import React, { useEffect, useRef } from 'react';
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { isMobile } from 'react-device-detect';
import "../../../css/xterm.css";

const Xterm = (props) => {

    const terminal_ref = useRef(null)
    const xterm = useRef(null)

    // One Error Resume Next 
    // remove the comment to supress that shitty error
    
    // const original_error = console.error;
    // console.error = (message, ...optionalParams) => {
    //     if (typeof message === 'string' && message.includes("Parsing error")) {
    //         return;
    //     }
    //     original_error(message, ...optionalParams);
    // }

    useEffect(() => {

        xterm.current = new Terminal({
            smoothScrollDuration: 3,
            cursorStyle: null,
            cursorBlink: false,
            rows: 8,
            disableStdin: true,
            theme: {
                background: props.background_color,
                foreground: props.font,
                cursor: '#d4d4d4',
                selection: '#4d4d4d'
            }
        })
        xterm.current._core._inputHandler._coreService.isCursorHidden = true
        xterm.current.open(terminal_ref.current)
        xterm.current.loadAddon(new FitAddon())

        xterm.current.write("@User\n\r");

        return () => {
            xterm.current.dispose()
        }
    }, [])

    useEffect(() => {
        if(props.output){
            for(let i in props.output){
                xterm.current.write(props.output[i] + "\n\r")
            }          
        }      
    }, [props.output])

    const termminal_input_func = (e) => {
        if(e.key == "Enter"){
            if(e.target.value){
                xterm.current.write("> " + e.target.value)
                xterm.current.write("\n\r")
            }
            else{
                xterm.current.write("> ")
                xterm.current.write("\n\r")
            }   
            props.T_parent_callback(e.target.value)    
            e.target.value = ""           
        }   
    }

  return (
    <div className="w-full h-full flex flex-col rounded-md overflow-visible">
        <div className="w-full overflow-auto" style={{height: "100%"}}>
            <div ref={terminal_ref} className="rounded-t-md w-full h-full flex overflow-clip"/>
        </div>
        <div className="flex flex-row overflow-hidden" style={{backgroundColor: props.background_complement}}>
            <div className="justify-center items-center flex">
                <label htmlFor="t_input" className="px-3 p-2" style={{color: props.font}}> {props.current_folder + '>'} </label>
            </div>
            <input id="t_input" className="outline-none w-full text-sm" onKeyDown={termminal_input_func} style={{backgroundColor: props.background_complement, color: props.font, "::placeholder": { color: props.font} }}/>
        </div>
    </div>
  )
}

export default Xterm