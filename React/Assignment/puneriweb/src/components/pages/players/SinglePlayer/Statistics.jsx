import Blockele from "../../Block/Block";

export default function PlayerStatistics({ stats }) {
  return (
    <div className="w-full bg-white py-10 px-4">
      {/* Section Title */}
      <div className="text-center mb-8" data-aos="fade-up">
        <h2 className="text-3xl font-bold uppercase tracking-wide text-[#002147]">
          Statistics
        </h2>
      </div>

      {/* OVERALL SECTION */}
      <div className="w-full bg-gray-100 rounded-xl p-6 mb-10">
        {/* <h3 className="text-xl font-bold uppercase text-[#FF6A00] mb-4">
          Overall
        </h3> */}
        <Blockele title={"Overall"}/>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <StatBox
            value={stats.Matches_played}
            label="MATCHES PLAYED"
          />
          <StatBox
            value={stats.total_ponints_earned}
            label="TOTAL POINTS EARNED"
          />
          <StatBox
            value={stats.most_points_in_a_match}
            label="MOST POINTS IN A MATCH"
          />
          <StatBox
            value={stats.not_out_percentage}
            label="NOT OUT PERCENTAGE"
          />
        </div>
      </div>

      {/* RAID SECTION */}
      <div className="w-full bg-gray-100 rounded-xl p-6 mb-10">
        {/* <h3 className="text-xl font-bold uppercase text-[#FF6A00] mb-4">
          Raid
        </h3> */}
        <Blockele title={"Raid"}/>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Stats */}
          <div className="grid grid-cols-2 gap-6">
            <StatBox value={stats.no_of_super_raids} label="SUPER RAIDS" />
            <StatBox value={stats.super_10s} label="SUPER 10s" />
            <StatBox value={stats.avg_raid_points} label="AVG RAID POINTS" />
          </div>

          {/* Circular Progress + Strike Rate */}
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center w-28 h-28 rounded-full border-4 border-[#FF6A00]">
              <div className="text-center text-sm font-bold">
                total raid <br />
                <span className="text-2xl">{stats.total_raid || 207}</span>
              </div>
            </div>

            <div className="text-center ml-4">
              <h6 className="text-xl font-bold text-[#FF6A00]">
                {stats.raid_strike_rate || "53.14%"}
              </h6>
              <p className="uppercase text-xs tracking-wide">Raid Strike Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* TACKLES SECTION */}
      <div className="w-full bg-gray-100 rounded-xl p-6">
        {/* <h3 className="text-xl font-bold uppercase text-[#FF6A00] mb-4">
          Tackles
        </h3> */}
        <Blockele title={"Tackles"}/>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="grid grid-cols-2 gap-6">
            <StatBox
              value={stats.no_of_super_tackles}
              label="SUPER TACKLES"
            />
            <StatBox
              value={stats.total_tacle_points}
              label="TACKLE POINTS"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center w-28 h-28 rounded-full border-4 border-[#002147]">
              <div className="text-center text-sm font-bold">
                total tackle <br />
                <span className="text-2xl">{stats.total_tackle || 15}</span>
              </div>
            </div>

            <div className="text-center ml-4">
              <h6 className="text-xl font-bold text-[#002147]">
                {stats.tackle_strike_rate || "20%"}
              </h6>
              <p className="uppercase text-xs tracking-wide">
                Tackle Strike Rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// SMALL REUSABLE COMPONENT
function StatBox({ value, label }) {
  return (
    <div
      className="animatedParent"
      data-aos="fade-up"
    >
      <h4 className="text-3xl font-bold text-[#002147]">{value}</h4>
      <h5 className="text-sm uppercase tracking-wide text-gray-600">{label}</h5>
    </div>
  );
}
