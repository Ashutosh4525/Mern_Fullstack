import { getUserIntent, filterMovies, rankMovies } from "@/services/aiService";
import { getAllContent, getAllCategories } from "@/services/contentService";

export async function POST(req) {
  try {
    const { input,limit = 5, page = 1 } = await req.json();

    // Fetch catalog
    const catalogRes = await getAllContent({ limit: 40 });
    const catalog = catalogRes.data || [];

    // Build category map
    const categoryRes = await getAllCategories();
    const categoryMap = {};

    (categoryRes.data || []).forEach((cat) => {
      categoryMap[cat._id] = cat.name.toLowerCase();
    });

    // AI intent
    const intent = await getUserIntent(input);

    // Filter + rank
    const filtered = filterMovies(catalog, intent, categoryMap);
    const ranked = rankMovies(filtered, intent, categoryMap);

    const start = (page - 1) * limit;
    const end = start + limit;

    const paginated = ranked.slice(start, end);

        return Response.json({
        success: true,
        data: paginated,
        hasMore: end < ranked.length,
        });

    // return Response.json({
    //   success: true,
    //   data: ranked.length ? ranked : catalog.slice(0, 4),
    // });

  } catch (err) {
    console.error(err);

    return Response.json(
      { success: false, error: "Failed" },
      { status: 500 }
    );
  }
}