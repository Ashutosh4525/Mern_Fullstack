// import PlayerCard from "./PlayerCard"
import { useEffect } from "react"
import {useDispatch,useSelector} from 'react-redux'
import { fetchCategory,fetchPlayersByCat } from "../../redux/action/player.action";
import CategoryBlock from "./CategoryBlock";


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