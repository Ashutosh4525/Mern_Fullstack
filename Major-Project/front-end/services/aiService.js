import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

const buildCatalogPrompt = (userInput, catalog) => {
  const visibleCatalog = catalog.slice(0, 25);
  const catalogString = visibleCatalog
    .map((item, index) => {
      const description = item.description?.replace(/\s+/g, ' ').trim().slice(0, 120);
      return `${index + 1}. ${item.title} (${item.type}) - ${description || 'No description available.'}`;
    })
    .join('\n');

  return `You are an intelligent movie recommendation assistant. Only recommend titles that are explicitly listed in the catalog below. Do not invent new movies or TV shows. Based on the user's interest: "${userInput}", choose up to 5 titles from the catalog. For each recommendation, include the title, type, and a short reason why it matches the requested mood or preference. If there is no good match, explain that and suggest the closest titles from the catalog.

Catalog:
${catalogString}`;
};

export const getMovieRecommendations = async (userInput, catalog = []) => {
  const prompt = buildCatalogPrompt(userInput, catalog);
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const summarizeMovie = async (movieTitle, description) => {
  const prompt = `Summarize the movie "${movieTitle}" with description: "${description}". Provide a short summary.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};