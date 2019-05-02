import { HELPERS } from "../utils";
import { SERVICES } from "../config";
import httpRequest, { googleRequest, newsRequest, post, get } from "./http";

// GOOGLE SERVICES
const googleGeocode = googleRequest(SERVICES.google.path.geocode);
const googlePlaceAutocomplete = googleRequest(SERVICES.google.path.placeAutocomplete);
const googlePlaceDetails = googleRequest(SERVICES.google.path.placeDetails);
const googleDirections = googleRequest(SERVICES.google.path.directions);

// APP SERVICE
const login = post("path/login");
const register = post("path/register");
const loginv2 = post(SERVICES.app.path.login);
const registerv2 = post(SERVICES.app.path.login);


// OTHER SERVICE
const NewsTopHeadlines = newsRequest("/v2/top-headlines");
const NewsEverything = newsRequest("/v2/everything");
const NewsSources = newsRequest("/v2/sources");

const API = {
    // CORE
    httpRequest,
    googleRequest,
    newsRequest,
    post,
    get,
    // GOOGLE SERVICES
    googleGeocode,
    googlePlaceAutocomplete,
    googlePlaceDetails,
    googleDirections,
    // APP SERVICE
    login,
    register,
    loginv2,
    registerv2,
    // OTHER SERVICE
    NewsTopHeadlines,
    NewsEverything,
    NewsSources
    
}

export default { ...API }
