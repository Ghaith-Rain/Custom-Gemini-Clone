import React, { useContext } from 'react'
import { Context } from '../../context/Context'

const MessageBox = () => {


    const { onSent, setInput, input } = useContext(Context)
    return (
        <>
            <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Enter a prompt here"
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        onSent(); // Call the onSent function when Enter is pressed
                    }
                }}
            />

        </>)
}

export default MessageBox
