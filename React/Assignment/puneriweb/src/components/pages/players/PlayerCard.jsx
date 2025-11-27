import { useNavigate } from "react-router-dom";
import './player.css'
function PlayerCard({ player }) {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/player/${player.id}`);

  return (
    <>
    {/* // <div className="player-card" onClick={handleClick} role="button" tabIndex={0} style={{cursor:'pointer',border:'1px solid #333',padding:8,borderRadius:6}}>
    //   <img src={player.img || player.image || player.profile_image || ''} alt={`${player.fname || ''} ${player.lname || ''}`} style={{width:'100%',height:180,objectFit:'cover',borderRadius:6}} />
    //   <div className="player-info" style={{marginTop:8}}>
    //     <strong>{(player.fname || '') + ' ' + (player.lname || '')}</strong>
    //     <div className="role" style={{color:'#ff8500'}}>{player.role || player.position || ''}</div>
    //   </div>
    // </div> */}
    <div
      className="col-md-6 col-lg-4 col-xs-12 col-sm-6 " 
      data-id={player.id}
    >
      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        <div className="players card" data-tilt="" data-aos="fade-up" data-aos-delay={player.id * 100}>
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