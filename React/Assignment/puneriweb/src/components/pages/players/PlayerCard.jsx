import { useNavigate } from "react-router-dom";
import './player.css'
import VanillaTilt from "vanilla-tilt";
import { useEffect,useRef } from "react";

function PlayerCard({ player }) {
  const navigate = useNavigate();
  const tiltRef = useRef(null);
  const handleClick = () => navigate(`/player/${player.id}`);
  
  useEffect(() => {
    if (!tiltRef.current) return;
   VanillaTilt.init(tiltRef.current, {
      max: 20,
      speed: 1000,
      glare: true,
      "max-glare": 0,
      perspective: 800,
      scale: 1.03,
      reverse: false,
      "mouse-event-element": tiltRef.current,
      gyroscope: false,  
    });

    return () => tiltRef.current?.vanillaTilt?.destroy();
  }, []);
    

  return (
    <>
    <div
      className="col-md-6 col-lg-4 col-xs-12 col-sm-6 " 
      data-id={player.id}
    >
      <div onClick={handleClick} style={{ cursor: "pointer" }} data-aos="fade-up" data-aos-delay={player.id * 100}>
        <div ref={tiltRef} className="players card"  >
          <div className="player-img">
            <img src={  player.profile_image || ''} className="img-responsive" alt={player.fname} />
          </div>

          <div className="name">
            <h3 className="team-name">{player.name||""}</h3>
            <h5 className="team-position">{player.role || player.position || ''}</h5>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
export default PlayerCard;