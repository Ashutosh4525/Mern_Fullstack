import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPuneriTv } from "../../../redux/action/tv.action";
import Banner from "../../players/Banner";
import Blockele from "../../Block/Block";

export default function SingleTv() {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { singleTv, loading } = useSelector((state) => state.puneritv);

  useEffect(() => {
    if (id) dispatch(fetchPuneriTv(id));
  }, [id]);

  if (loading || !singleTv)
    return (
      <div className="p-4 text-center text-white">
        <h2>Loading video...</h2>
      </div>
    );

  return (
    <>
      <Banner text={singleTv.cat_name || "Puneri TV"} />

      <div className="p-4 text-black" style={{padding:"50px"}}>

        {/* <h1 className="text-xl md:text-5xl text-center bg-[#f40] -skew-x-6 font-bold md:font-extrabold " style={{marginBottom:"10px",padding:"10px"}}>{singleTv.name}</h1> */}
        <Blockele title={singleTv.name} translate="100" width="full"/>
        <div className="h-5"></div>
        <div className="w-full aspect-video mb-4 p-10">
          <iframe
            className="w-full h-full rounded"
            src={`https://www.youtube.com/embed/${singleTv.url}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {singleTv.description && (
          <p className="mt-2 text-gray-300">{singleTv.name}</p>
        )}
      </div>
    </>
  );
}
