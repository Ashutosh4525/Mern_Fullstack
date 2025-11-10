import { useContext } from "react";
import Context from './Context/Context'

export default function Output(){
    const {notes,delNote}=useContext(Context);

    return (
        <>
        <div style={{width:"100%",textAlign:"center",display:"flex",flexDirection:"column",justifyContent:"center",backgroundColor:"black"}}>
            {notes.map((note, i) => (
                <li style={{width:"300px", textAlign:"center", color:"black",backgroundColor:"white",margin:"5px auto",display:"flex",justifyContent:"space-between"}}
                 key={i} index={i}>{note}
                 <button onClick={()=>delNote(note)}>X</button>
                 </li>
            ))}
        </div>
        </>
    )
}