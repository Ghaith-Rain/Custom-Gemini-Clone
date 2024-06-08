import { createContext, useState } from "react";
import run from "../config/gemini.js";
export const Context = createContext();

const ContextProvider = (props) => {

    const [input , setInput] = useState("");
    const [recentPrompt , setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData , setResultData] = useState("");

    const delayPara = (index, nextWord) => {

        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75*index);
    }

    const onSent = async(prompt) => {

        setResultData("");
        setLoading(true);
        setShowResult(true);
        if (prompt !== undefined){
            setRecentPrompt(prompt);
            setResultData(localStorage.getItem(prompt))
        }
        else{

            setRecentPrompt(input)
            setPrevPrompts(prev => [...prev,input])
            const response = await run(input)
            function boldText(text) {
                const regex = /\*\*(.*?)\*\*/g;
              
                return text.replace(regex, "<b>$1</b>");
              }
            let boldedResponse = boldText(response)
    
            
            let newLinedResponse = boldedResponse.replace(/\*\s/g, "</br>• ");
            const newText = newLinedResponse.replace(/(?<!\\)\n/g, "<br>");
            localStorage.setItem(input,newText);
            let gradResponse = newText.split(" ");
            for(let i = 0; i < gradResponse.length; i++){
                let nextWord = gradResponse[i] + " ";
                delayPara(i,nextWord);
            }
        }
        setLoading(false)
        setInput("")
    }

    const ContextValue = {

        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput
    }

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider