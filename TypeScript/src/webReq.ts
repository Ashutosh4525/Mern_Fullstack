import axios from "axios";
import type { AxiosResponse } from "axios";


interface Todo{
    userId: number,
    id:number,
    title:string,
    completed:boolean
}
// axios.get('https://example.com/data')
// .then(response=>{console.log(response.data);
// })

// axios

const fetch=async () => {
    try {
        const response:AxiosResponse<Todo>=await axios.get(
            "https://jsonplaceholder.typecode.com/todos/1");
            console.log("Todo",response.data);
    } catch (error:any) {
        if (axios.isAxiosError(error)) {
            console.log("Axios Error", error.message);
            if(error.response){
                console.log(error.response.status);
            }
        }
    }
}


//normal fetch
// const fetchData=async ()=>{
//     try {
//         const response = await fetch(
//             "https://jsonplaceholder.typecode.com/todos/1"
//         );
//         if(!response.ok){
//             throw new Error(`HTTP error ${response.status}`);
//         }
//         const data:Todo=await response.json()
//     } catch (error:any) {
//         console.log(error);
        
//     }
// }