import { HELPERS } from "../utils";
import { SERVICES } from "../config";

const fakeRequest = () => {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve({
                "success": 1
            })
        }, 10000)
    })
}

const httpTimeout = (ms, promise) => {
    return new Promise((resolve, reject) => {
        // setTimeout(() => {
        //     reject({
        //         type: "timeout",
        //         message: "Error timeout " + ms + "ms",
        //     })
        // }, ms)
        promise.then(resolve, reject)
    })
}

const checkStatus = (response) => {
    const contentType = response.headers.get("content-type");
    if (response.status >= 200 && response.status < 300) {
        if (contentType.includes("application/json")) {
            return response.json()
        } else {
            throw {
                status: response.status,
                type: "content-type",
                message: "Error Content Type, make sure content-type is application/json",
            }
        }
    } else {
        throw response
    }
}

const httpFetch = (options) => {
    return new Promise((resolve, reject) => {
    httpTimeout(20000, fetch(options.url, options.fetchOptions))
        .then(checkStatus)
        .then((data) => {
            if (data && data.error_message){
                reject({ ...data, ...{ message: data.error_message}})
            }else{
                resolve(data)
            }
        }).catch((error) => {
            if (HELPERS.typeOf(error.text) == "function") {
                error.text().then(res => {
                    if (HELPERS.isJsonString(res)) {
                        const errorJson = JSON.parse(res); 
                        if (errorJson && errorJson.error_message){
                            reject({ ...errorJson, ...{ message: errorJson.error_message } })
                        }
                        if( error.status){
                            reject({ ...errorJson, ...{ status: error.status}})
                        }else{
                            reject(errorJson)
                        }
                    } else {
                        reject({
                            status: error && error.status,
                            type: error && error.type,
                            message: error && error.message
                        })
                    }
                })
            } else if (error.message){
                reject({
                    status: error && error.status,
                    type: error && error.type,
                    message: error && error.message
                })
            }else{
                reject(error)
            }
        });
    });
}

const httpRequest = (options : any) => {
    /*
    if (options.showLoading){
        LOADINGACTION.show()
    }
    if (options.saveToredux) {
        APIACTION.requestStart({
            url: options.url,
            fetch: options.fetchOptions
        }, options.requestName);
    }
    */
    return new Promise((resolve, reject) => {
        httpFetch(options).then( res => {
            /*
            if (options.showLoading) {
                LOADINGACTION.hide()
            }
            if (options.saveToredux) {
                APIACTION.requestSuccess(res, options.requestName);
            }
            */
            resolve(res)
        }).catch ( e => {
            /*
            if (options.shwoAllertWhenError) {
                UTILS.alertError(e.message)
            }
            if (options.showLoading) {
                LOADINGACTION.hide()
            }
            if (options.saveToredux) {
                APIACTION.requestFail(e, options.requestName);
            }
            */
            reject(e);
        })
    })
}

const getOptions = (options : any) => {
    return {
        requestName: options && options.requestName,
        saveToredux: options && options.saveToRedux,
        shwoAllertWhenError: options && options.shwoAllertWhenError,
        showLoading: options && options.showLoading,
    }
}

const httpHeader = () => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
}

export const googleRequest = (path: string) => async (options: any) => {
    const googleParams = { ...{ key: SERVICES.google.key }, ...options.params };
    const url = SERVICES.google.url.maps + path + HELPERS.objectToParams(googleParams);
    return await httpRequest({
        ...getOptions(options),
        url: url,
        fetchOptions: {
            method: 'get',
            headers: httpHeader()
        }
    })
};

export const newsRequest = (path) => async (options: any) => {
    const newsParams = { ...{ apiKey: SERVICES.news.key }, ...options.params };
    const url = SERVICES.news.url + HELPERS.objectToParams(newsParams);
    return await httpRequest({
        ...getOptions(options),
        url: url,
        fetchOptions: {
            method: 'get',
            headers: httpHeader()
        }
    })
}


export const post = (path: string) => async (options) => {
    return await httpRequest({
        ...getOptions(options),
        url: "http://localhost" + path,
        fetchOptions: {
            method: 'post',
            headers: httpHeader(),
            body: JSON.stringify(options.params)
        }
    })
};

export const get = (path: string) => async (options: any) => {
    const params = HELPERS.objectToParams(options.params);
    return await httpRequest({
        ...getOptions(options),
        url: "http://localhost" + path + params,
        fetchOptions: {
            method: 'get',
            headers: httpHeader()
        }
    })
};


export default httpRequest
