import Editor from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from "react";

const Monaco = (props) => {

    const editor_ref = useRef()

    const send = (params) => {           
        if(params === true){
            props.E_parent_save(true)
        } 
        props.E_parent_callback(editor_ref.current) 
    }

    const editor_mount = (editor, monaco) => {
        try{
            editor_ref.current = editor

            // Undoing the editor's text
            editor.trigger("keyboard", "undo")

            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
                send(true)
            })

            // On editor mount add the theme 'Horizon'
            if (monaco) {
                monaco.editor.defineTheme("horizon", {
                    base: "vs-dark",
                    inherit: true,

                    // Tokens and Colors
                    rules: [
                        {
                            token: "identifier",
                            foreground: "#E95678E6",
                            fontStyle: "italic",
                        },
                        {
                            token: "keyword",
                            foreground: "#B877DBE6",
                            fontStyle: "italic",
                        },
                        {
                            token: "string",
                            foreground: "#dfb095",
                            fontStyle: "italic",
                        }                      
                    ],

                    // Exposed colors like background color, cursor and etc
                    colors: {
                        "editor.foreground": "#FFFFFF",
                        "editor.background": "#1c1e25",
                        "editorCursor.foreground": "#C35970",
                        "editor.lineHighlightBackground": "#30333d",
                        "editorLineNumber.foreground": "#3a3d44",
                        "editor.selectionBackground": "#88000030",
                        "editor.inactiveSelectionBackground": "#88000015",
                    },
                })
                monaco.editor.setTheme("horizon")
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
                theme='vs-dark'
                height="100%" 
                width="100%"
                language="javascript" 
                loading="Loading"
                onMount={editor_mount}
                options={{
                    selectOnLineNumbers: true,
                    minimap: { enabled: false }
                }}
            />
        </div>       
    )
}

export default Monaco
