import classes from './block.module.css'
 const Blockele=({title ,translate="10",translateLine="10",width="1/3"})=>{
    return(
        <>
        <div className="flex w-5/6 h-20 pt-4">
        <div className={`w-full p-5 md:w-${width}  ${classes.blockPad}`} style={{backgroundColor:"#f40",  transform: window.innerWidth >= 568 
            ? `skewX(-20deg) translateX(-${translate}px)`   
            : `none`                 
        }}>
        <h2 className="p-2 text-sm lg:text-xl xl:text-2xl text-center md:text-end uppercase text-white" style={{marginBottom:12,padding:"15px"}} data-aos="fade-right">{title}</h2>
        </div>
        <div className={`${classes.block1} `} style={{transform: window.innerWidth >= 568 
            ? `skewX(-20deg) translateX(-${translate}px)`   
            : `none`                 
        }}></div>
        <div className={`${classes.block2} `} style={{transform: window.innerWidth >= 568 
            ? `skewX(-20deg) translateX(-${translate}px)`   
            : `none`                 
        }}></div>
        </div>
        </>
    )
}
export default Blockele;