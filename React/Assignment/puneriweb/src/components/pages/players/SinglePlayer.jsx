import {  Link, useParams } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { fetchSinglePlayer } from '../../redux/action/player.action';
import { clearSinglePlayer } from '../../redux/slice/player.slice';
import { useEffect } from 'react';
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
    <div className="container" style={{padding:20}}>
      <Link to="/player">← Back</Link>
      <h1 style={{marginTop:8}}>{(p.fname || p.player_name || '') + ' ' + (p.lname || '')}</h1>
      <img src={p.img || p.image || p.profile_image || p.player_image || ''} alt={`${p.fname || p.player_name || ''}`} style={{width:300,height:300,objectFit:'cover',borderRadius:8}} />
      <div className="details" style={{marginTop:12}}>
        <p><strong>Role:</strong> {p.role || p.position || p.player_role || '—'}</p>
        <p><strong>Bio:</strong> {p.description || p.bio || p.about || '—'}</p>
        {/* render other available fields dynamically (non-image/name fields) */}
        {Object.keys(p).filter(k => !['img','image','profile_image','player_image','fname','lname','player_name','role','position','player_role','description','bio','about'].includes(k)).map((k) => (
          <p key={k}><strong>{k}:</strong> {String(p[k])}</p>
        ))}
      </div>
    </div>
  );
}
export default SinglePlayer;