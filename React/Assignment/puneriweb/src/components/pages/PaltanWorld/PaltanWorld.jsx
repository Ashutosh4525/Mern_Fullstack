
import classes from './paltan.module.css'
import { Link } from 'react-router-dom'
export default function PaltanWorld(){
    return(
    <>
    <section className="w-full">
        <div className='w-full'>
          <div className={classes.paltanbanner}></div>
        </div>
        <div className='flex flex-wrap w-full'>
            <div className='w-full md:w-1/2'>
            <Link to='/puneri-tv'>
            <div className={classes.imggal1}>
                <div className={classes.innergallery}>
                    <h2 className={classes.innergalleryh}>Puneri Tv</h2>
                </div>
             </div>
             </Link>
            </div>
            <div className='w-full md:w-1/2'>
             <Link to='/gallery'>
             <div className={classes.imggal}>
                <div className={classes.innergallery}>
                    <h2 className={classes.innergalleryh}>Gallery</h2>
                </div>
             </div>
             </Link>
            </div> 
        </div>
    </section>
    </>)
}