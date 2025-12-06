
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './swip.css'

export default function OtherPlayers({ excludeId }) {
    const { playerList, loading, error } = useSelector((s) => s.player);
    const apiPlayers = Object.values(playerList);
    
    const filteredPlayers = apiPlayers.filter(p => p.id && Number(p.id) !== Number(excludeId));
    
  
    if (error) {
        return <div className="text-center text-red-500 my-10 px-4">Error loading other players.</div>;
    }

    const swiperContent = (
        filteredPlayers.length === 0 ? (
            <SwiperSlide className="flex justify-center items-center h-[300px] w-full">
                <p className="text-xl text-gray-500">No other players available</p>
            </SwiperSlide>
        ) : (
            filteredPlayers.map((player, index) => (
                <SwiperSlide key={player.id || index} className="other-player-slide relative group cursor-pointer">
                    <Link to={`/player/${player.id}`}> 
                        
                        <div className="other-player-card bg-black h-full overflow-hidden flex flex-col justify-end relative shadow-lg">
                            
                            <div className="absolute top-0 left-0 bg-[#f40] text-white text-4xl sm:text-5xl font-extrabold px-3 py-1 sm:px-4 sm:py-2 z-10"
                            style={{padding:"10px"}}>
                                {player.jersey_no || '0'} 
                            </div>
                            

                            <div className="relative w-full h-full flex justify-center items-end">

                                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

                                <img 
                                    src={player.full_image || player.profile_image || "https://via.placeholder.com/300x400"} 
                                    alt={`${player.name} ${player.lname}`} 
                                    className="other-player-img w-3/4 h-3/4 object-cover object-top absolute bottom-0 left-20" 
                                />
                                <div className="other-player-name absolute top-20 left-4 md:bottom-4 md:left-4 md:right-4 z-20 text-white">
                                    <h3 className="text-xl sm:text-2xl font-bold uppercase leading-tight">{player.name} {player.lname}</h3>
                                    <p className="other-player-role text-base sm:text-lg text-[#f40] uppercase">{player.position}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>
            ))
        )
    );

    return (
        <div className="other-players-section w-full py-10">
            
          
            <div className="other-players-title w-full text-center mb-10">
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-yellow-500 uppercase tracking-widest leading-none">
                    Other Players
                </h2>
            </div>
            
            <div className="other-players-content flex justify-center items-center w-full px-4">
                
              
                <div className="w-5/6 min-h-[400px]">
                    <div className="w-full h-full other-players-swiper-wrapper transform-none lg:-skew-x-6">
                        
                        {(loading && filteredPlayers.length === 0) ? (
                            <div className="flex justify-center items-center h-[300px]">
                                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#f40]"></div>
                            </div>
                        ) : (
                            <Swiper
                                style={{height:"100%", paddingBottom: '30px', margin: '0 10px'}} 
                                modules={[Navigation, Pagination, Autoplay]}
                                navigation
                                pagination={{ clickable: true }}
                                loop={filteredPlayers.length > 2} 
                                autoplay={{ delay: 6000 }}
                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    768: { slidesPerView: 2},
                                    1024: { slidesPerView: 2 },
                                }}
                            >
                                {swiperContent}
                            </Swiper>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}