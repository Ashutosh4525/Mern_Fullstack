class Chai{
    flavour:string;
    price: number;

    constructor(flavour: string, price: number){
        this.flavour=flavour;
        this.price=price;
    }
}

const masalaChai= new Chai("ginger",20);
// masalaChai.flavour="masala"


// access modifieir

class newChai {
    public flavour:string ="Masala"

    private secretIngredients="Cardamom"

    reveal(){
        return this.secretIngredients
    }
}

class Shop{
    protected shopName="Chai corner"
}

class Branch extends Shop{
    getName(){
        return this.shopName
    }
}


class Wallet{
    #balance=100  //# this is private too

    getBalance(){
        return this.#balance
    }
}

const w=new Wallet();

class Cup{
    readonly capacity:number=250

    constructor(capacity:number){
        this.capacity=capacity;
    }
}

class MordernChai{
    private _sugar=2

    get sugar(){
        return this._sugar
    }

    set sugar(val:number){
        if (val>5) throw new Error("Too sweet");
        this._sugar=val;
    }
}

const c=new MordernChai();
c.sugar=3;

// static no object direct call
class EkChai{
    static shopName="chaicode";

    constructor(public flavour:string){}
}
console.log(EkChai.shopName);


abstract class Drink{
    abstract make():void
}
class Mychai extends Drink{
    make(): void {
        console.log("Chai bana");
    }
}

// composition
class Heater{
    heat(){}
}

class chaiMaker{
    constructor(private heater:Heater){}

    make(){
        this.heater.heat
    }
}

