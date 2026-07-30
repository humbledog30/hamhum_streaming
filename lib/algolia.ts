import { liteClient as algoliasearch } from "algoliasearch/lite";
import aa from "search-insights";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;

if (!appId || !searchKey) {
	throw new Error("Missing Algolia environment variables");
}

export const searchClient = algoliasearch(appId, searchKey);

aa("init", {
	appId,
	apiKey: searchKey,
	useCookie: true, // lets it auto-generate/persist an anonymous userToken
});

export const insightsClient = aa;
