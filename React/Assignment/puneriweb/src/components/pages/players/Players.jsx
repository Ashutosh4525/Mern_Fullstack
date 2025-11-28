// import PlayerCard from "./PlayerCard"
import { useEffect } from "react"
import {useDispatch,useSelector} from 'react-redux'
import { fetchCategory,fetchPlayersByCat } from "../../redux/action/player.action";
import CategoryBlock from "./CategoryBlock";
// export default function Players(){

//   const dispatch = useDispatch();
//   const { category, playersByCategory, loading, error } = useSelector((s) => s.player);
//   useEffect(()=>{

//     dispatch(fetchCategory()).then((res) => {
//     res.payload.forEach(cat => dispatch(fetchCategory(cat.id)));
// });
//   },[dispatch])
//   return(
//     <>
//      <section className="category-block" style={{marginBottom:24}}>
//       <h2 style={{marginBottom:12}}>{ `Category ${category.id}` && console.log(category)}</h2>
//       <div className="players-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
//         {/* {players && players.length > 0 ? (
//           players.map((p) => <PlayerCard key={p.id} player={p} />)
//         ) : (
//           <p className="muted">No players in this category yet.</p>
//         )} */}
//       </div>
//     </section>
//     </>
//   )
// }

function Players() {
  const dispatch = useDispatch();
  const { categories, playersByCategory, loading, error } = useSelector((s) => s.player);

  useEffect(() => {
    dispatch(fetchCategory()).then((res) => {
      if (res && res.payload && Array.isArray(res.payload)) {
        const cats = res.payload;
        cats.forEach((c) => dispatch(fetchPlayersByCat(c.id)));
      }
    });
  }, [dispatch]);

  return (
    <>
    <section className="w-full">
    <div style={{padding:20}}>
      <h1>Players by Category</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {String(error.message || error)}</p>}
      {/* {console.log(categories)} */}
    </div>
    <div className="categories-list">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((cat) => (
            <CategoryBlock key={cat.id} category={cat} players={playersByCategory[cat.id] || []} />
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </section>
    </>
  );
}
export default Players;