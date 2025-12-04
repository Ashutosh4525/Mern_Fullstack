
import { Link } from 'react-router-dom'
import img from '../../../assets/news-banner.jpg'
import './PlayersSwiper.css'
import img1 from "../../../assets/news-bg.jpg"


const News = () => {

  return (
    <div className='relative w-full'  
    style={{
          backgroundImage:`url(${img1})`,
          backgroundSize:'cover',
          backgroundPosition:'center',
          backgroundRepeat:'no-repeat',
          padding:"100px 0px",
          marginBottom:"50px"
        }}>
     <div className='flex justify-center items-center'>
      <div className='w-5/6 relative px-7 py-40 md:px-15 md:py-40 border bg-black'>
      <div 
        className='h-130 flex flex-col justify-center items-center' 
        style={{
          backgroundImage:`url(${img})`,
          backgroundSize:'cover',
          backgroundPosition:'center',
          backgroundRepeat:'no-repeat'
        }}
      >
        <h1 
          className='text-orange-500 mx-10 text-7xl font-bold md:text-8xl fade-in-down'
        >
          PUNERI PALTAN
        </h1>

        <h1 
          className='text-white text-4xl font-bold md:text-8xl fade-in-up'
        >
          IN THE NEWS
        </h1>

        <Link 
          to='/' 
          className='absolute -bottom-5 md:-bottom-5 bg-orange-500 italic text-3xl text-bold text-white py-1 px-20 md:py-3 md:px-30' 
          style={{ clipPath: "polygon( 5% 0, 100% 0, 95% 100%, 0% 100%)", padding:"10px 40px" }}
        >
            Enter 
        </Link>
      </div>
    </div>
    </div>
    </div>
  )
}

export default News