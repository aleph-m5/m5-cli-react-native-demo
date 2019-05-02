
class getLocation {

    currentPosition(timeout: number, maximumAge: number) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(position)
                },
                (error) => {
                    reject(error)
                },
                { enableHighAccuracy: true, timeout: timeout ? timeout : 20000, maximumAge: maximumAge ? maximumAge : 2000 },
            );
        })
    }

    watchPosition(timeout: number, maximumAge: number) {
        return new Promise((resolve, reject) => {
            const watchPosition = navigator.geolocation.watchPosition(
                (position) => {
                    navigator.geolocation.clearWatch(watchPosition);
                    resolve(position)
                },
                (error) => {
                    navigator.geolocation.clearWatch(watchPosition);
                    reject(error)
                },
                { enableHighAccuracy: true, timeout: timeout ? timeout : 20000, maximumAge: maximumAge ? maximumAge : 2000 },
            );

        })
    }
}
const GeoLocation = new getLocation();
export default GeoLocation
