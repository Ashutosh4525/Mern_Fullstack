import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleList } from "../../../redux/action/gallery.action";
import Banner from "../../players/Banner";
export default function SingleGallery() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleGallery, loading } = useSelector((s) => s.gallery);

  useEffect(() => {
    dispatch(fetchSingleList(id));
    
  }, [dispatch, id]);

  return (
    <>
    <Banner text={"Gallery"}/>
    <div className="p-6 w-full">
      <h2 className="text-center text-[20px] md:text-[50px] space-x-1 font-bold mb-4 text-[#f40]">{singleGallery.name}</h2>
     <div className="w-full flex flex-wrap justify-center gap-4"> 
        {singleGallery.match_images?.map((img, index) => (
    
      <img
        key={index}
        src={img}
        alt=""
        className="w-1/4 max-w-2xl rounded shadow-lg opacity-100"
      />
       
         ))}
      </div>  
      <p className="mt-4 text-lg">{singleGallery.description}</p>
    </div>
    </>
  );
}
