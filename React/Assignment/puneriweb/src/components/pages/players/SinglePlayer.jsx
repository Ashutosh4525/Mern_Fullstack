import {  useParams } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { fetchSinglePlayer } from '../../redux/action/player.action';
import { clearSinglePlayer } from '../../redux/slice/player.slice';
import { useEffect } from 'react';
import PlayerDescription from './SinglePlayer/PlayerDescription';
import PlayerStatistics from './SinglePlayer/Statistics';
import OtherPlayers from './SinglePlayer/OtherPlayers';
function SinglePlayer() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singlePlayer, loading, error } = useSelector((s) => s.player);

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePlayer(id))
    }
    return () => {
      dispatch(clearSinglePlayer())
    };
  }, [dispatch, id]);

  if (loading) return (
  <>
     <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  </>);
  if (error) return (
    <>
   <div className="flex justify-center items-center h-screen w-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Oops!</h2>
          <p className="text-gray-600">
            {typeof error === 'object' ? error.message || "Something went wrong" : error}
          </p>
        </div>
      </div>
    </>
  )
 
  if (!singlePlayer|| Object.keys(singlePlayer).length === 0) return (
    <div className="flex justify-center items-center h-[50vh]">
        <p className="text-xl text-gray-500 font-semibold">Player not found.</p>
      </div>
  );

  const p = singlePlayer;

  return (
    <>
    <PlayerDescription player={p}/>
    <PlayerStatistics stats={p}/>
    <div className="mt-10">
        <OtherPlayers excludeId={p.id} />
      </div>
    </>
  );
}
export default SinglePlayer;