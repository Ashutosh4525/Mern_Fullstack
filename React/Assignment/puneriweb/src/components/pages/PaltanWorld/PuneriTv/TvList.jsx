import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPuneriTv,fetchTvList } from "../../../redux/action/tv.action";
import Blockele from "../../Block/Block";
import { fetchCategory } from "../../../redux/action/player.action";
export default function TvList(){
    const dispatch=useDispatch();
    
    const {tvList,loading}=useSelector((state)=>state.puneritv);
    const [season ,setSeason]=useState([]);
    useEffect(()=>{
        dispatch(fetchTvList(6));
        dispatch(fetchTvList(7));
    },[])
    
    useEffect(()=>{
        setSeason(tvList)
    },[tvList])
    console.log(tvList.cat_name);
    
    
    return(
        <>
        {loading? `<h2>Loading..</h2>` : <h2>loaded</h2>}
        {season.map((s)=>(
            <button key={s.id}>{s.cat_name}</button>
        ))}
        </>
    )
}