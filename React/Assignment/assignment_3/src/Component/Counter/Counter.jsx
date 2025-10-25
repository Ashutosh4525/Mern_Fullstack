import { useEffect, useState } from "react"


const Counter=({end1="100",addOn="",label="Label Name",speed="10"})=>{
   
    const[end,setend]=useState(0);
    useEffect(()=>{
         if (end >= end1) return;
    const inter=setInterval(()=>{
        setend(s=>{
            const endval=s+1
        if(endval>=end1){
            clearInterval(inter);
            return end1;
        }
        return endval
    });
    },speed);
    
    return () => {
      clearInterval(inter);
    };
  }, [end1]);


    return(
        <>
        <div className="stat-item">
                <span className="stat-number d-block fs-2 fw-bold" style={{ color: "#524dd3", border: "none" }}>
                  {end}{addOn}
                </span>
                <span className="stat-label">{label}</span>
         </div>
        </>
    )
}
export default Counter;