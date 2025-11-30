import img from '../../../assets/paltan-world-homepage_s12.png'
import img1 from '../../../assets/tv-s12.png'
import img2 from '../../../assets/gallery-s12.png'
import classes from './paltan.module.css'
import { Link } from 'react-router-dom'
export default function PaltanWorld(){
    return(
    <>
    <section className="paltan w-full">
        <div className='w-full'>
            <img src={img} alt="paltan_world_img" className='w-full'/>
        </div>
        <div className='flex flex-wrap w-full'>
            <div className='w-1/2'>
            <div className={classes.imggal}>
                <div className={classes.innergallery}>
                    <h2 className={classes.innergalleryh}>Gallery</h2>
                </div>
             </div>
            {/* <img src={img1} alt="" className='w-full' /> */}
            </div>
            <div className='w-1/2'>
             <Link to='/gallery'>
             <div className={classes.imggal}>
                <div className={classes.innergallery}>
                    <h2 className={classes.innergalleryh}>Gallery</h2>
                </div>
             </div>
            {/* <img src={img2} alt="" className='w-full' /> */}
             </Link>
            </div> 
        </div>
    </section>
    </>)
}