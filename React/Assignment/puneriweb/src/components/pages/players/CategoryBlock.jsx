import PlayerCard from "./PlayerCard";
function CategoryBlock({ category, players }) {
  return (
    <section className="category-block w-full" style={{marginBottom:24}}>
      <div className="bg-amber-600 w-full md:w-1/3 transform-none md:-skew-x-20 md:-translate-x-10 ">
      <h2 className="p-2 text-xl md:text-3xl text-start md:text-end uppercase text-white" style={{marginBottom:12,padding:"15px"}} data-aos="fade-right">{category.category_name || category.title || category.name || `${category.cat_name}`}</h2>
      </div>
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