import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeasonList,fetchGalleryList } from "../../../redux/action/gallery.action";
import Banner from "../../players/Banner";
import { Link } from "react-router-dom";
import Blockele from "../../Block/Block";
import classes from './season.module.css'

export default function SeasonGalleryPage() {
  const dispatch = useDispatch();
  const { seasons, galleryBySeason } = useSelector((s) => s.gallery);

const [activeSeason, setActiveSeason] = useState(null);
   useEffect(() => {
    dispatch(fetchSeasonList());
  }, []);

  useEffect(() => {
    if (seasons.length > 0 && !activeSeason) {
      const firstSeasonId = seasons[0].id;
      setActiveSeason(firstSeasonId);
      dispatch(fetchGalleryList(firstSeasonId));
    }
  }, [seasons]);

  const selectSeason = (id) => {
    setActiveSeason(id);
    dispatch(fetchGalleryList(id));
  };

  return (
    <>
    <div className="w-full">
    <Banner text={"Gallery"}/>
    <div className={`${classes.blockSeason}`}>
      <div className={`flex justify-center flex-wrap align-middle text-center items-center gap-4 ${classes.blockSeason}`} >
        {seasons.map((s) => (
          <button
            key={s.id}
            onClick={() => selectSeason(s.id)}
            className={`w-50 p-6 text-white text-3xl mb-5 ${classes.seasonList}
              ${activeSeason === s.id ? "bg-orange-600" : "bg-gray-400"} -skew-x-10 
            `}
          >
            {s.cat_name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full p-10 h-full">
        {activeSeason &&
        ( galleryBySeason[activeSeason]?.length>0 ?(  
          galleryBySeason[activeSeason].map((g) => (
            <Link
              to={`/gallery/${g.id}`}
              key={g.id}
              data-aos="fade-up"
            >
              <img
                src={g.main_image}
                alt="Gallery"
                className="w-full h-60 object-cover p-5"
              />
              <div className="h-5"></div>
              
              <div className="overflow-hidden">
              <Blockele title={g.name} translate="15" translateLine="2" width="full"/>
              </div>
              <div className="h-2"></div>
            </Link>
          ))
        ):(
          <div className="col-span-full flex justify-center py-20">
          <Blockele title={"No Gallery Found"} translate="0" translateLine="0" width="full"/>
          </div>
        )
        )}
      </div>
    </div>
    </div>
    </>
  );
}
