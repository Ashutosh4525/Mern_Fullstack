import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleList } from "../../../redux/action/gallery.action";
import Banner from "../../players/Banner";
import Lightbox from "yet-another-react-lightbox";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Download from "yet-another-react-lightbox/plugins/download";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Loading from "../../Loading";


export default function SingleGallery() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleGallery, loading } = useSelector((s) => s.gallery);

  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchSingleList(id));
    
  }, [dispatch, id]);

   const slides =
    singleGallery.match_images?.map((img) => ({
      src: img,
      download: img,
    })) || [];
  return (
    <>
    <Banner text={"Gallery"}/>
    <div className="w-full" style={{padding:"10px",paddingBottom:'10px'}}>
      <h2 className="text-center text-[20px] md:text-[50px] space-x-1 font-bold mb-4 p-10 text-[#f40]">{singleGallery.name}</h2>
      {loading && (
          <Loading/>
        )}
     <div className="w-full flex flex-wrap justify-center gap-4"> 
        {singleGallery.match_images?.map((img, index) => (
    
      <img
        key={index}
        src={img}
        alt=""
        className="w-1/4 max-w-2xl rounded shadow-lg opacity-100"
        onClick={() => {
                setStartIndex(index);
                setOpen(true);
        }}
      />
       
         ))}
      </div>  
      {/* <p className="mt-4 text-lg">{singleGallery.description}</p> */}
      {open && slides.length > 0 && (
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={slides}
            index={startIndex}
            plugins={[Slideshow, Download, Thumbnails, Zoom]}
            slideshow={{ autoplay: true, delay: 2000 }}
            zoom={{
              maxZoomPixelRatio: 3,
              zoomInMultiplier: 1.5,
            }}
            thumbnails={{
              position: "bottom",
              border: 0,
              gap: 10,
            }}
            styles={{
              container: { backgroundColor: "rgba(0,0,0,0.95)" },
            }}
          />
        )}
    </div>
    </>
  );
}
