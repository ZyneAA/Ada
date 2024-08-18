import Editor from '@monaco-editor/react'
import React, { useEffect, useRef, useState } from "react"
import { SelfBuildingSquareSpinner } from "react-epic-spinners"

const Monaco = (props) => {

    const [e_lang, set_e_lang] = useState()

    const editor_ref = useRef()

    useEffect(() => {

        switch(props.lang) {

            case "js":
                set_e_lang("javascript")
                break

            case "py":
                set_e_lang("python")
                break

            default:
                break
        
        }
        console.log(props.lang)

    }, [props.lang])

    const send = (params) => {           
        if(params === true){
            props.E_parent_save(true)
        } 
        props.E_parent_callback(editor_ref.current) 
    }

    const editor_mount = (editor, monaco) => {
        
        try{
            editor_ref.current = editor
            props.E_parent_callback(editor_ref.current) 

            // Undoing the editor's text
            editor.trigger("keyboard", "undo")

            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
                send(true)
            })

            // On editor mount add the theme 'Horizon'
            if (monaco) {
                console.log(props.line_highlight_background)
                console.log(props.name)
                monaco.editor.defineTheme("A", {
                    base: "vs-dark",
                    inherit: true,

                    // Tokens and Colors
                    rules: props.rules,

                    // Exposed colors like background color, cursor and etc
                    colors: {
                        "editor.foreground": props.foreground,
                        "editor.background": props.background_color,
                        "editorCursor.foreground": props.cursor_foregorund,
                        "editor.lineHighlightBackground": props.line_highlight_background,
                        "editorLineNumber.foreground": props.line_number_foreground,
                        "editor.selectionBackground": props.selection_background,
                        "editor.inactiveSelectionBackground": props.background_color,
                    },
                })
                monaco.editor.setTheme("A")
            }
        }
        catch(err){
            console.log({"Error creating editor": err})
        }    
        
    }

    return(
        <div className="h-full w-full">
            <Editor 
                onChange={send}
                theme="A"
                height="100%" 
                width="100%"
                language={props.lang}
                loading=<SelfBuildingSquareSpinner size="100" color={props.font}/>
                onMount={editor_mount}
                options={{
                    suggestOnTriggerCharacters: false,
                    parameterHints: { enabled: false },
                    quickSuggestions: false,
                    suggest: {
                        showWords: false
                    },
                    selectOnLineNumbers: true,
                    minimap: { enabled: false }
                }}
            />
        </div>       
    )
}

export default Monaco
