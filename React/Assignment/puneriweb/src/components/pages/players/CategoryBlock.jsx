import Blockele from "../Block/Block";
import PlayerCard from "./PlayerCard";
import './player.css'
function CategoryBlock({ category, players }) {
  return (
    <section className="category-block w-full" style={{marginBottom:24}}>
      <Blockele title={category.cat_name} translate="15" translateLine="9" width="1/3"/>
        <div className="players-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))'}}>
        {players && players.length > 0 ? (
          players.map((p) => <PlayerCard key={p.id} player={p} />)
        ) : (
          <p className="muted">No players in this category yet.</p>
        )}
      </div>
    </section>
  );
}
export default CategoryBlock;