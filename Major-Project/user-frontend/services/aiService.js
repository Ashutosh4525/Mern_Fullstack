// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY);
// const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// const buildCatalogPrompt = (userInput, catalog) => {
//   const visibleCatalog = catalog.slice(0, 25);
//   const catalogString = visibleCatalog
//     .map((item, index) => {
//       const description = item.description?.replace(/\s+/g, ' ').trim().slice(0, 120);
//       return `${index + 1}. ${item.title} (${item.type}) - ${description || 'No description available.'}`;
//     })
//     .join('\n');

//   return `You are an intelligent movie recommendation assistant. Only recommend titles that are explicitly listed in the catalog below. Do not invent new movies or TV shows. Based on the user's interest: "${userInput}", choose up to 5 titles from the catalog. For each recommendation, include the title, type, and a short reason why it matches the requested mood or preference. If there is no good match, explain that and suggest the closest titles from the catalog.

// Catalog:
// ${catalogString}`;
// };

// export const getMovieRecommendations = async (userInput, catalog = []) => {
//   const prompt = buildCatalogPrompt(userInput, catalog);
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   return response.text();
// };

// export const summarizeMovie = async (movieTitle, description) => {
//   const prompt = `Summarize the movie "${movieTitle}" with description: "${description}". Provide a short summary.`;

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   return response.text();
// };

const OLLAMA_URL =
  process.env.NEXT_PUBLIC_OLLAMA_URL ||
  process.env.OLLAMA_URL ||
  "http://localhost:11434/api/generate";

const buildIntentPrompt = (userInput) => {
  return `
You are an API that extracts user intent for movie recommendations.

Extract structured data from the query.

RULES:
- Return ONLY valid JSON
- No explanation
- No extra text

FORMAT:
{
  "genre": ["string"],
  "mood": ["string"],
  "keywords": ["string"],
  "type": "movie" | "series" | "any"
}

User query: "${userInput}"
`;
};

export const getUserIntent = async (userInput) => {
  if (!OLLAMA_URL) {
    return {
      genre: [],
      mood: [],
      keywords: [userInput],
      type: "any",
    };
  }

  const prompt = buildIntentPrompt(userInput);

  try {
    const res = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi3",
        prompt,
        stream: false,
        options: {
          temperature: 0,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Intent request failed with status ${res.status}`);
    }

    const data = await res.json();
    const text = data.response;

    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) throw new Error("No JSON");

    return JSON.parse(jsonMatch[0]);

  } catch (err) {
    console.error("Intent error:", err);

    // fallback intent
    return {
      genre: [],
      mood: [],
      keywords: [userInput],
      type: "any",
    };
  }
};

const normalizeType = (type) => {
  if (!type) return "any";
  const normalized = String(type).toLowerCase();
  if (normalized === "series") return "tv";
  return normalized;
};

const getMovieGenres = (movie, categoryMap) =>
  (movie.categoryIds || [])
    .map((item) => {
      if (typeof item === "string") {
        return categoryMap[item]?.toLowerCase();
      }

      return (
        item?.name?.toLowerCase() ||
        categoryMap[item?._id]?.toLowerCase()
      );
    })
    .filter(Boolean);

export const filterMovies = (catalog, intent, categoryMap = {}) => {
  const requestedType = normalizeType(intent.type);

  return catalog.filter((movie) => {
    const text = `${movie.title || ""} ${movie.description || ""}`.toLowerCase();
    const movieGenres = getMovieGenres(movie, categoryMap);

    // type match
    if (requestedType !== "any" && normalizeType(movie.type) !== requestedType) {
      return false;
    }

    const genreMatch =
      intent.genre.length === 0 ||
      intent.genre.some((g) =>
        movieGenres.some((mg) => mg?.includes(g.toLowerCase()))
      );

    const moodMatch =
      intent.mood.length === 0 ||
      intent.mood.some((m) => text.includes(m.toLowerCase()));

    const keywordMatch =
      intent.keywords.length === 0 ||
      intent.keywords.some((k) => text.includes(k.toLowerCase()));

    return genreMatch || moodMatch || keywordMatch;
  });
};

export const rankMovies = (movies, intent, categoryMap = {}) => {
  return movies
    .map((movie) => {
      let score = 0;
      const text = `${movie.title || ""} ${movie.description || ""}`.toLowerCase();
      const movieGenres = getMovieGenres(movie, categoryMap);

      // genre weight
      intent.genre.forEach((g) => {
        if (movieGenres.some((mg) => mg.includes(g.toLowerCase()))) {
          score += 3;
        }
      });

      // mood weight
      intent.mood.forEach((m) => {
        if (text.includes(m.toLowerCase())) {
          score += 1;
        }
      });

      // keyword weight
      intent.keywords.forEach((k) => {
        if (text.includes(k.toLowerCase())) {
          score += 2;
        }
      });

      return { ...movie, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
};

export const getHybridRecommendations = async (userInput, catalog, categoryMap) => {
  const intent = await getUserIntent(userInput);

  const filtered = filterMovies(catalog, intent, categoryMap);

  const ranked = rankMovies(filtered, intent, categoryMap);

  return ranked;
};

