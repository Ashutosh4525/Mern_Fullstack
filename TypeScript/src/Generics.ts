function wrapInArray<T> (item:T):T[]{
    return [item]
}

wrapInArray("masala")
wrapInArray(42)
wrapInArray({flavour:"Ginger"})


function pair<A,B>(a:A, b:B):[A,B]{
    return [a,b]
    // return[b,a] cannot do
}

pair("masala",20)
pair("Masala",{flavour:"Ginger"})

interface Box<T>{
    content:T
}

const numberbox: Box<number>={
    content:10
}

const numberBoxCup:Box<string>={
    content:"10"
}

//real worlds cases 
//api responses
//form states

interface Apipromise<T>{
    status:number,
    data:T
}

const res:Apipromise<{flavour:string}>={
    status:200,
    data:{flavour:"masala"}
}