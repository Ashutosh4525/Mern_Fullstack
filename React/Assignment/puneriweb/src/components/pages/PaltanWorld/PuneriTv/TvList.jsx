import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPuneriTv,fetchTvList } from "../../../redux/action/tv.action";
import Blockele from "../../Block/Block";
import Banner from "../../players/Banner";
import Loading from "../../Loading";
export default function TvList(){
    const dispatch=useDispatch();  
    const {tvList,loading}=useSelector((state)=>state.puneritv);

    const seasonIds = [7, 6];

    const [seasons ,setSeasons]=useState([]);
    const [allSeasonData, setAllSeasonData] = useState({});
     const [activeSeason, setActiveSeason] = useState(null);
     
    useEffect(()=>{
         seasonIds.forEach((id) => 
            dispatch(fetchTvList(id)));
         }, []);

    useEffect(() => {
    if (!Array.isArray(tvList) || tvList.length === 0) return;

    const seasonId = tvList[0].id;
    const seasonName = tvList[0].cat_name;

    setAllSeasonData((prev) => ({
      ...prev,
      [seasonId]: tvList,
    }));

   setSeasons((prev) => {
      if (prev.some((s) => s.id === seasonId)) return prev;
      const updated = [...prev, { id: seasonId, name: seasonName }];
      updated.sort((a, b) => b.id - a.id);
      return updated;
    //   return [...prev, { id: seasonId, name: seasonName }];
    
    });
    setActiveSeason((prev) => (prev === null ? seasonId : prev));
  }, [tvList]);

  const currentVideos = allSeasonData[activeSeason] || [];
    
    
    return(
        <>
        <Banner text={"Puneri TV"}/>
    
    <div className="p-4" style={{padding:"10px"}}>
      
      <div className="flex justify-center gap-4 my-4 ">
        {seasons.length > 0 && seasons.map((s) => (
          <button
            key={s.id}
            className={`p-5 rounded text-white text-xl md:text-4xl uppercase font-extrabold cursor-pointer
              ${s.id === activeSeason ? "bg-orange-500" : "bg-gray-600"}`}
            onClick={() => setActiveSeason(s.id)}
            style={{padding:"10px", marginBottom:"5px",transform:"skewX(-10deg)" }}
          >
            {s.name}
          </button>
        ))}
      </div>
       <div className="flex flex-wrap justify-center text-center align-middle gap-4" style={{padding:"20px"}}>
        {/* <div className=" w-full md:w-1/3 "> */}
          {loading && <Loading/>}

          {!loading &&
            currentVideos.map((item) => (
              <Link 
                to={`/puneri-tv/${item.id}`} 
                key={item.id}
                className="p-2  w-full sm:w-[48%] "
              >
                <img
                  src={`https://img.youtube.com/vi/${item.url}/hqdefault.jpg`}
                  className="w-full rounded"
                />
                <div className="h-2"></div>
                <div className="overflow-hidden">
                <Blockele title={item.name} translate={16} width="w-full"/>
                </div>
                <div className="h-5"></div>
              </Link>
            ))}
        {/* </div> */}
        </div>
    </div>
        </>
    )
}