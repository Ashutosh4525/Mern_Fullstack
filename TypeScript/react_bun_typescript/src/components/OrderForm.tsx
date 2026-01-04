import { useState } from "react"


interface OrderFormProps{
    onSubmit(order:{name:string; cups:number}):void
}
export function OrderForm({onSubmit}:OrderFormProps){

    const [name, setName]=useState<string>("Masala");
    const [cups,setCups]=useState(1)

    function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        onSubmit({name,cups});
    }
    return <form onSubmit={handleSubmit}>
        <label>Chai Name</label>
        <input
        value={name}
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
            setName(e.target.value)
        }/>
         <label>Chai Cups</label>
        <input
        type="number"
        value={cups}
        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
            setCups(Number(e.target.value || 0))
        }/>
        {/* <input type="submit" value="Submit" onClick={handleSubmit} /> */}
        <button type="submit">Submit</button>
    </form>
}