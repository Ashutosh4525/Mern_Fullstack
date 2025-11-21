
const HOC=(ChildComponent)=>{
    const NewComponent=({name})=>{

        return(
            <>
            <div>
                <ChildComponent name={name} text="for new component"/>
                <h2>Heading for NewComponent</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo, fuga tempore magni officiis voluptas exercitationem odio illum quam id in neque aliquid unde sit voluptatibus quod dicta doloremque quaerat culpa.</p>
            </div>
            </>
        )
    }
    return NewComponent;
}

export default HOC;