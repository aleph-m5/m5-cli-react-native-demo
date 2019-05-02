const services = {
    app : {
        url : "http://localhost",
        path : {
            login : '/login',
            register : '/login'
        }
    },
    news : {
        url: "https://newsapi.org",
        path : {
            headlines : "/v2/top-headlines"
        },
        key: "18ba3127e62142b8a426c11a9f617d20"
    },
    google: {
        url : {
            maps: "https://maps.googleapis.com/maps",
            vision: 'https://vision.googleapis.com/v1/images:annotate'
        },
        path: {
            geocode : "/api/geocode/json",
            placeAutocomplete : "/api/place/autocomplete/json",
            placeDetails : "/api/place/details/json",
            directions : '/api/directions/json',
        },
        key: '__SET_GOOGLE_KEY_HERE__'
    }
}

export default services
