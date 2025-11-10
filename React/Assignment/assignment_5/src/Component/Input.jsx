import Context from "./Context/Context"
import InputVal from "./InputVal"
import Output from "./Output"
import { useState } from "react"

export default function Input(){
    const [notes, setNotes] = useState([])

    const newNote=(val)=>setNotes([...notes,val])
    const delNote=(noteText)=>setNotes(prevInd=>prevInd.filter(item=>item!==noteText))

    return(
        <>
        <Context.Provider value={{notes:notes,newNote,delNote}}>
            <InputVal/>
            <Output/>
        </Context.Provider>
        </>
    )
}
