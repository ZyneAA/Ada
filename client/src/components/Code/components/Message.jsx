import Markdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Bot } from "lucide-react"

const Message = ({ direction, message, font_color, border_color, background_color }) => {

    return (
        <div className="w-full py-3">
            {
                direction === "incoming" ?
                    <div className="text-left px-6 overflow-auto flex-col inline-block p-2 rounded-br-lg rounded-tr-lg rounded-bl-lg" style={{color: font_color, width: "90%"}}>
                        <Bot color={font_color} />
                        <Markdown
                            children={message}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '')
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            children={String(children).replace(/\n$/, '')}
                                            style={oneDark}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        />
                    </div> :
                    <div className="text-right">
                        <div style={{color: font_color, backgroundColor: background_color}} className="inline-block p-2 rounded-br-lg rounded-tl-lg rounded-bl-lg">
                            <p>{message}</p>
                        </div>                    
                    </div>
            }
        </div>
    )

}

export default Message