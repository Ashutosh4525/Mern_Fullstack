import type { Chai } from "../types" 
import { ChaiCard } from "./ChaiCard"

interface chaiListProps{
    items:Chai[]
}
export function ChaiList({items}:chaiListProps){
    return(
        <>
        <div>
            {items.map((chai)=>(
                <ChaiCard
                key={chai.id}
                name={chai.name}
                price={chai.price}
                isSpecial={chai.price>30}/>
            ))}
        </div>
        </>
    )
}