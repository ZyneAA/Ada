import React, { useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { createTheme } from '@uiw/codemirror-themes';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia'
import { tags as t } from '@lezer/highlight';
import { autocompletion } from '@codemirror/autocomplete';

const Code_Mirror = (props) => {

    const horizon = createTheme({
        theme: 'dark',
        settings: {
            background: "#1c1e25",
            backgroundImage: '',
            foreground: "#000000",
            caret: "#C35970",
            selection: '#036dd626',
            selectionMatch: '#036dd626',
            lineHighlight: '#8a91991a',
            gutterBackground: '#3a3d44',
            gutterForeground: '#88000015',
        },
        styles: [
            { tag: t.comment, color: '#787b8099', },
            { tag: t.variableName, color: "#E95678E6" },
            { tag: [t.string, t.special(t.brace)], color: "#dfb095"},
            { tag: t.number, color: '#5c6166' },
            { tag: t.bool, color: '#5c6166' },
            { tag: t.null, color: '#5c6166' },
            { tag: t.keyword, color: "#B877DBE6" },
            { tag: t.operator, color: '#5c6166' },
            { tag: t.className, color: '#5c6166' },
            { tag: t.definition(t.typeName), color: "#E95678E6" },
            { tag: t.typeName, color: '#5c6166' },
            { tag: t.angleBracket, color: '#5c6166' },
            { tag: t.tagName, color: '#5c6166' },
            { tag: t.attributeName, color: "#E95678E6" },
        ],
    })

    const send = useCallback((val, viewUpdate) => {
        props.E_parent_callback(val)
    }, [])

    return(   
        <div className="h-full w-full">
            <CodeMirror height="100%" width="100%" theme={okaidia} extensions={[python()]} onChange={send}/> 
        </div>
    )

}

export default Code_Mirror