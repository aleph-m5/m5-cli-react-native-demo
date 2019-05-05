

export const trimText = (str: string, limit: number = 100) => {
    const trimmedString = str.length > limit ?
        str.substring(0, limit - 3) + "..." :
        str;
    return trimmedString
}

export const getLastArray = (arr : any) => {
    if (arr && arr.length) {
        return arr[arr.length - 1]
    }
}

export const getKeyByRandom = () => {
    return ("key") + (Math.floor(Math.random() * Math.floor(100000)))
}

export const getKeybyDate = () => {
    const date = new Date();
    return ("key") + date.getTime()
}

export const milesToKm = (miles) => {
    const distance = (miles * 1.60934)
    if (distance >= 1) {
        return distance.toString().slice(0, 4) + " KM"
    } else {
        return (distance * 1000).toString().slice(0, 3) + " Meter"
    }
}

export const getPercent = (max, now) => {
    return (now / max) * 100
}

export const hasSpace = (val): String => {
    if (!val) return false;
    const find = (val).match(/\s/g);
    if (find) {
        return find.length
    }
    return false
}

export const removeSpace = (val : String) => {
    return val.replace(/\s/g, '');
}

export const getYearLists = (yearStart : Number) => {
    const years = [];
    const currentYears = new Date().getFullYear();
    for (let y = currentYears; y >= parseInt(yearStart); y--) {
        years.push({
            label: y,
            name: String(y),
            id: y
        });
    }
    return years;
}


export const toRad = (rad : Number) => {
    return (rad * Math.PI / 180)
}

export const toDeg = (deg: Number) => {
    return deg * (180 / Math.PI);
}

export const getCenterFromLongLat = (lat1: Number, lng1: Number, lat2: Number, lng2: Number) => {
    const dLng = toRad(lng2 - lng1);

    const _lat1 = toRad(lat1);
    const _lat2 = toRad(lat2);
    const _lng1 = toRad(lng1);

    const bX = Math.cos(_lat2) * Math.cos(dLng);
    const bY = Math.cos(_lat2) * Math.sin(dLng);
    const lat3 = Math.atan2(Math.sin(_lat1) + Math.sin(_lat2), Math.sqrt((Math.cos(_lat1) + bX) * (Math.cos(_lat1) + bX) + bY * bY));
    const lng3 = _lng1 + Math.atan2(bY, Math.cos(_lat1) + bX);

    return {
        latitude: toDeg(lat3),
        longitude: toDeg(lng3)
    }
}

export const getDistanceFromLongLat = (lat1: Number, lng1: Number, lat2: Number, lng2: Number) => {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}

export const getUserNameByEmail = (email: String) => {
    if (email.indexOf("@") > -1) {
        const userName = email.split("@");
        return userName[0]

    }
    return email
}

export const isString = (value) => {
    return typeof value === 'string' || value instanceof String;
}

export const printDate = (date) => {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul",
        "Ags", "Sep", "Okt", "Nov", "Des"
    ];
    date = date.split("-");

    const year = date[0];
    const month = date[1];
    const day = date[2];
    return parseInt(day) + " " + months[parseInt(month) - 1] + " " + year;
}

export const typeOf = (data) => {
    if (typeof data == "undefined"){
        return "undefined"
    }
    if (data === null) {
        return null
    }
    if (data.constructor === [].constructor) {
        return 'array';
    }
    if (data.constructor === {}.constructor) {
        return 'object';
    }
    return typeof data
}


export const objectToArray = (data: any) => {
    if (typeOf(data) != "object") {
        throw new Error("data must be object")
    }
    const arr = [];
    for (let key in data) {
        arr.push({
            key: key,
            value: data[key]
        })
    }
    return arr
}

export const objectToParams = (data:any) =>{
    if (typeOf(data) != "object") {
        throw new Error("data must be object")
    }

    let param = "";
    for (let key in data) {
        param += (param == "") ? "?" : "&";
        param += `${key}=${encodeURIComponent(data[key])}`;
    }
    return param
}

export const getGooleAddress = (data : any) => {
    let temp = {
        country : "", // negara
        province : "", // provinsi, state
        city : "", // city, kabupaten
        district : "", // kecamatan
        subdistrict : "", // kelurahan, desa
        address : "", // jalan
        postalcode : "" // kode post
    };

    data.forEach( data => {
        if (data["types"][0] == "country"){
            temp.country = data.long_name
        }
        if (data["types"][0] == "administrative_area_level_1"){
            temp.province = data.long_name
        }
        if (data["types"][0] == "administrative_area_level_2"){
            temp.city = data.long_name
        }
        if (data["types"][0] == "administrative_area_level_3"){
            temp.district = data.long_name
        }
        if (data["types"][0] == "administrative_area_level_4"){
            temp.subdistrict = data.long_name
        }
        if (data["types"][0] == "route"){
            temp.address = data.long_name
        }
        if (data["types"][0] == "postal_code"){
            temp.postalcode = data.long_name
        }
    })
    return temp
}

const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const isCanParseJson = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const isCanStringifyJson = (str) => {
    try {
        JSON.stringify(str);
    } catch (e) {
        return false;
    }
    return true;
}

const forceValue = (val) => {
    if( typeof val == "string"){
        return val
    }
    if ( isCanStringifyJson(val)){
        return JSON.stringify(val);
    }
    if ( isCanParseJson(val)){
        return JSON.parse(val);
    }
    return null
}

const is = (data, defaultValue) => {
    try {
        data
    } catch (e) {
        return defaultValue ? defaultValue : false
    }
    return data
}

const getDataByKeyValue = (data, key, value) => {
    for( let d of data){
        if(d[key] == value){
            return d
        }
    }
    return data[0]
}

const createArrayAtoZ = () => {
    // return new Array( 26 ).fill( 1 ).map( ( _, i ) => {
    //     return String.fromCharCode( 65 + i ).toLowerCase()
    // });
    const temp = [];
    const arr = new Array( 26 );
    for (let index = 0; index < arr.length; index++) {
        temp.push(String.fromCharCode( 65 + index ).toLowerCase())
    }
    return temp

}

const createArrayList = (name, length) => {
    const temp = [];
    for (let index = 0; index < length; index++) {
        temp.push(`${name}${index}`)
    }
    return temp
}

const helpers = {
    createArrayList,
    createArrayAtoZ,
    forceValue,
    getDataByKeyValue,
    isJsonString,
    printDate,
    typeOf,
    getGooleAddress,
    objectToParams,
    isString,
    trimText,
    getLastArray,
    getKeyByRandom,
    getKeybyDate,
    milesToKm,
    getPercent,
    hasSpace,
    removeSpace,
    getYearLists,
    objectToArray,
    toRad,
    toDeg,
    getCenterFromLongLat,
    getDistanceFromLongLat,
    getUserNameByEmail
}

const HELPERS = { ...helpers }
export default HELPERS
