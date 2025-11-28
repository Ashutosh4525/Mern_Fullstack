import img1 from "../../../assets/homepage-mobile-banner-s12.webp";
import classes from './hero.module.css'
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchSinglePlayer } from "../../redux/action/player.action";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./PlayersSwiper.css"; 

const players = [
    {
      fname: "Pankaj",
      lname: "Mohite",
      role: "Raider",
      img: "https://www.puneripaltan.com/uploads/image/Puneri Paltan-68dfd0a8e498d7.97722611dezhtwxv.png",
    },
    {
      fname: "Mohit",
      lname: "Goyat",
      role: "Raider",
      img: "https://www.puneripaltan.com/uploads/image/Puneri Paltan-68dfd10858cde7.048900145pra7(vk.png",
    },
    {
      fname: "Abinesh",
      lname: "Nadarajan",
      role: "Defender",
      img: "https://www.puneripaltan.com/uploads/image/Puneri Paltan-68dfd28ae32209.24892287t3sn$c)j.png",
    },
    {
      fname: "Gaurav",
      lname: "Khatri",
      role: "Defender",
      img: "https://www.puneripaltan.com/uploads/image/Puneri Paltan-68dfd1e2c00934.39079211h20uirxl.png",
    },
    {
      fname: "Aslam",
      lname: "Inamdar",
      role: "All Rounder",
      img: "https://www.puneripaltan.com/uploads/image/Puneri Paltan-68dfd235b23638.49901849shwd6gvr.png",
    },
  ];
export default function Hero(){
  const dispatch=useDispatch();
  const {playerList,loading,error}=useSelector((s)=>s.player);
  const totalPlayers=10;
  useEffect(()=>{
    for (let id = 1; id <= totalPlayers; id++) {
    dispatch(fetchSinglePlayer(id))
    }
  },[dispatch,totalPlayers]);
   const apiPlayers = Array.isArray(playerList) ? playerList : [];
   const minSlidesForLoop = 3; // set to the smallest slidesPerView you expect
  const enableLoop = apiPlayers.length >= minSlidesForLoop;
    return(
        <>
        <div className="hero">  
            <div className="col-md-12 col-xs-12 col-sm-12 no-padd">
                <img src={img1} alt="banner title" className="hero-img"/>
            </div>
        </div>
        <section className={classes.description}>
            <div className={classes.container} >
                <h2 className={classes.right} >scr</h2>
                <div className={classes.line}></div>  
                <h2 className={classes.left} >oll</h2>   
            </div>
            <p className={classes.despara}>Puneri Paltan is currently one of the top performing teams in the Pro Kabaddi League. With a mix of unstoppable energy, honed-out skills and steely nerves, here's a force that consistently looks forward to perform better, challenge its opponents and make a difference.</p>
            <div className="players-section">
                  <div className="play flex md:justify-center items-center w-full gap-4 px-4">
                  <div className="title w-[20%]">
                    <h2>Players</h2>
                  </div>
            {loading && apiPlayers.length === 0 ? <p>Loading...</p> : null}
                <div className="w-[80%] min-h-[300px]">
                  <div className="w-full  h-100">
                  <Swiper
                    style={{height:"100%"}}
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    loop
                    autoplay={{ delay: 6000 }}
                    spaceBetween={20}
                    breakpoints={{
                      320: { slidesPerView: 1 },
                      480: { slidesPerView: 2 },
                      768: { slidesPerView: 3 },
                      1024: { slidesPerView: 4 },
                    }}
                  >
                    {loading && <p>Loading...</p>}
                    {apiPlayers.length === 0 ? (
                  // fallback slides so UI doesn't break
                  <SwiperSlide>
                    <div className="player-card">
                      <p>No players available</p>
                    </div>
                  </SwiperSlide>
                  ) :(
                    apiPlayers.map((player, index) => (
                      <SwiperSlide key={index} className="player-slide">
                        <div className="player-card">
                          <img src={player.profile_image} alt={player.fname} className="player-img" />
            
                          <div className="name">
                            <h3>{player.name}</h3>
                            <h3>{player.lname}</h3>
                            <p className="role">{player.position}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    )))}
                  </Swiper>
                  </div>
                  </div>
                  </div>
                </div>
        </section>
       
            
        </>
    )
}