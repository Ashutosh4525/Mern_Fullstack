import classes from './block.module.css'
 const Blockele=({title})=>{
    return(
        <>
        <div className="flex h-20">
        <div className=" w-full md:w-1/3 transform-none md:-skew-x-20 md:-translate-x-10 cat-block" style={{backgroundColor:"#f40"}}>
        <h2 className="p-2 text-xl md:text-3xl text-start md:text-end uppercase text-white" style={{marginBottom:12,padding:"15px"}} data-aos="fade-right">{title}</h2>
        </div>
        <div className={`${classes.block1} transform-none md:-skew-x-20 md:-translate-x-9`}></div>
        <div className={`${classes.block2} transform-none md:-skew-x-20 md:-translate-x-9`}></div>
        </div>
        </>
    )
}
export default Blockele;