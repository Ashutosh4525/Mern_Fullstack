import {  Link, useParams } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { fetchSinglePlayer } from '../../redux/action/player.action';
import { clearSinglePlayer } from '../../redux/slice/player.slice';
import { useEffect } from 'react';
import PlayerDescription from './SinglePlayer/PlayerDescription';
import PlayerStatistics from './SinglePlayer/Statistics';
function SinglePlayer() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singlePlayer, loading, error } = useSelector((s) => s.player);

  useEffect(() => {
    if (id) dispatch(fetchSinglePlayer(id));
    return () => dispatch(clearSinglePlayer());
  }, [dispatch, id]);

  if (loading) return <p>Loading player details...</p>;
  if (error) return <p className="error">Error: {String(error.message || error)}</p>;
  if (!singlePlayer) return <p>No player found.</p>;

  const p = singlePlayer;

  return (
    <>
    <PlayerDescription player={p}/>
    <PlayerStatistics stats={p}/>
    </>
  );
}
export default SinglePlayer;