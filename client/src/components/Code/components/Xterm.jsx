import React, { useEffect, useRef } from 'react';
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { isMobile } from 'react-device-detect';
import "../../../css/xterm.css";

const Xterm = (props) => {

    const terminal_ref = useRef(null)
    const xterm = useRef(null)
    const fit = new FitAddon();

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
                height: "100px",
                background: '#1c1e25',
                foreground: 'transparent',
                cursor: '#d4d4d4',
                selection: '#4d4d4d'
            }
        })
        xterm.current._core._inputHandler._coreService.isCursorHidden = true
        xterm.current.open(terminal_ref.current)
        xterm.current.loadAddon(fit)

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
    <div className="w-full">
        {
        isMobile?
        <div style={{width: "100vw"}}>
            <div ref={terminal_ref} className="rounded-t-sm overflow-hidden"/>
            <div className="flex flex-row w-full rounded-b-sm bg-slate-700 p-1">
                <label htmlFor="t_input" className="text-white pr-3"> {'>'} </label>
                <input id="t_input" className="outline-none w-full bg-slate-700 text-white text-sm" placeholder="Type something here" onKeyDown={termminal_input_func}/>
            </div>
        </div>
        :
        <div className="w-full">
            <div ref={terminal_ref} className="rounded-t-md overflow-hidden"/>
            <div className="flex flex-row w-full rounded-b-md bg-slate-700">
                <label htmlFor="t_input" className="text-white px-3 p-1"> {'>'} </label>
                <input id="t_input" className="outline-none w-full bg-slate-700 text-white text-sm rounded-b-md" placeholder="Type something here" onKeyDown={termminal_input_func}/>
            </div>
        </div>
    }
    </div>
  )
}

export default Xterm;