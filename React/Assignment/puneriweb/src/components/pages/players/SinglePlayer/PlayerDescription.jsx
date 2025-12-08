import Banner from '../Banner';
import './playerDescription.css'
export default function PlayerDescription({ player }) {

  if (!player) return <p>No player data</p>;

  return (
    <>
    <Banner text={player.name} Image={player.full_image}/>
     <div className="player-desc-image-style">
      <div className="desc-content">
        <div className="desc-left">
          <img
            src={player.full_image}
            alt={player.name}
            className="player-image"
          />
        </div>
        <div className="desc-right">
          <div className="desc-headings-row">
            <div className="desc-jersey">
              <span className="desc-box desc-label">Jersey No.</span>
              <span className="desc-value">{player.jersey_no||"--"}</span>
            </div>
            <div className=" desc-position">
              <span className=" desc-box desc-label">Position</span>
              <span className="desc-value">{player.position}</span>
            </div>
          </div>
          <div className="desc-vitals-box">
            <hr />
            <span className=" desc-label vitals-title">Vitals</span>
            <table className="desc-vitals-table">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{player.name}</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>{player.date_of_birth}</td>
                </tr>
                <tr>
                  <td>Nationality</td>
                  <td>{player.nationality}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
