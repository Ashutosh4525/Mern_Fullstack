import './playerDescription.css'
export default function PlayerDescription({ player }) {

  if (!player) return <p>No player data</p>;

  return (
    <>
    <div className="player-desc py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10">

          <div data-aos="fade-left" className="flex justify-center">
            <img
              src={player.full_image}
              alt={player.name}
              className="w-full max-w-sm md:max-w-md object-contain drop-shadow-xl"
            />
          </div>

         
          <div data-aos="fade-right" className="space-y-6">

            
            <div className="grid grid-cols-2 gap-4">

              <div className="text-center bg-orange-600 text-white p-4 rounded-xl shadow-lg">
                <h5 className="uppercase text-sm opacity-80">Jersey No.</h5>
                <h6 className="text-3xl font-bold tracking-wide">
                  {player.jersey_no}
                </h6>
              </div>

              <div className="text-center bg-blue-900 text-white p-4 rounded-xl shadow-lg">
                <h5 className="uppercase text-sm opacity-80">Position</h5>
                <h6 className="text-lg font-semibold">{player.position}</h6>
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
    </div>
    </>
  );
}
