import './playerDescription.css'
export default function PlayerDescription({ player }) {

  if (!player) return <p>No player data</p>;

  return (
    <>
    {/* <div className="player-desc p-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10">

          <div data-aos="fade-left" className="flex justify-center">
            <img
              src={player.full_image}
              alt={player.name}
              className="w-full max-w-sm md:max-w-md object-contain drop-shadow-xl"
            />
          </div>

         
          <div data-aos="fade-right" className="py-6">

            <div className="grid grid-cols-2 gap-4 ">

              <div className="text-center  text-white p-4 ">
                <h5 className="uppercase bg-[#f40] text-xl opacity-80">Jersey No.</h5>
                <div>
                <h6 className="text-3xl font-bold tracking-wide text-black">
                  {player.jersey_no}
                </h6>
              </div>
              

              <div className="text-center  text-white p-4">
                <h5 className="uppercase bg-[#f40] text-xl opacity-80">Position</h5>
                <div>
                <h6 className="text-3xl font-bold text-black">{player.position}</h6>
              </div>
              </div>
              </div>
              

            </div>

            
            <div
              data-aos="fade-up"
              className="bg-gray-100 p-6 rounded-xl shadow-md"
            >
              <h5 className="text-xl font-semibold mb-3">Bio</h5>
              <p className="text-gray-700 leading-relaxed">
                {player.name} is a professional Kabaddi player representing
                Puneri Paltan.
              </p>
            </div>

           
            <div data-aos="fade-up">
              <h5 className="text-xl font-semibold mb-3">Vitals</h5>

              <table className="w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow">
                <tbody>
                  <tr className="border-b">
                    <td className="p-3 font-medium text-gray-700">Name</td>
                    <td className="p-3 text-gray-600">{player.name}</td>
                  </tr>

                  <tr className="border-b">
                    <td className="p-3 font-medium text-gray-700">Date of Birth</td>
                    <td className="p-3 text-gray-600">{player.date_of_birth}</td>
                  </tr>

                  <tr className="border-b">
                    <td className="p-3 font-medium text-gray-700">Nationality</td>
                    <td className="p-3 text-gray-600">{player.nationality}</td>
                  </tr>

                  <tr className="border-b">
                    <td className="p-3 font-medium text-gray-700">Matches Played</td>
                    <td className="p-3 text-gray-600">{player.Matches_played}</td>
                  </tr>

                  <tr className="border-b">
                    <td className="p-3 font-medium text-gray-700">Total Points</td>
                    <td className="p-3 text-gray-600">{player.total_ponints_earned}</td>
                  </tr>

                  <tr>
                    <td className="p-3 font-medium text-gray-700">Super Tackles</td>
                    <td className="p-3 text-gray-600">{player.no_of_super_tackles}</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div> */}
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
            <div className="desc-box desc-jersey">
              <span className="desc-label">Jersey No.</span>
              <span className="desc-value">{player.jersey_no}</span>
            </div>
            <div className="desc-box desc-position">
              <span className="desc-label">Position</span>
              <span className="desc-value">{player.position}</span>
            </div>
          </div>
          <div className="desc-vitals-box">
            <hr />
            <span className="desc-label vitals-title">Vitals</span>
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
                {/* <tr>
                  <td>Matches Played</td>
                  <td>{player.Matches_played}</td>
                </tr>
                <tr>
                  <td>Total Points</td>
                  <td>{player.total_ponints_earned}</td>
                </tr>
                <tr>
                  <td>Super Tackles</td>
                  <td>{player.no_of_super_tackles}</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
