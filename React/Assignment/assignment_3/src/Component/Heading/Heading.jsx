

const Heading =({title="Title",description="Description"})=>{

    return(
    <>
    <div className="text-center pt-5 pb-3">
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
    </>
    )
}

export default Heading;