import { useContext,useState } from "react";
import Context from "./Context/Context";

export default function InputVal(){
    const [note, setNote] = useState("");
    const {newNote}=useContext(Context);

    const handleSubmit = (e) => {
    e.preventDefault();
    if (note.trim() === "") return;
    newNote(note);
    setNote("");
  };
    return(
        <form onSubmit={handleSubmit}>
        <div style={{margin:"50px", textAlign:"center"}}>
            <input type="text" name="tolist" value={note} onChange={(e) => setNote(e.target.value)} id="inp" style={{backgroundColor:"white", color:"black",padding:"10px",marginRight:"10px"}} />
            <button style={{backgroundColor:"pink",color:"white",padding:"10px"}}>Add to note</button>
        </div>
        </form>
    )
}
