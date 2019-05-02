import AsyncStorage from '@react-native-community/async-storage';

class Storage {

    async set(key, value){
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value))
            return 1
        } catch (e) {
            throw new Error(e);
        }
    }

    async get(key){
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null) {
                if (JSON.parse(value)){
                    return JSON.parse(value)
                }else{
                    return value
                }
            }
            throw new Error("Value not set");
        } catch (e) {
            throw new Error(e);
        }
    }

    async remove(key){
        try {
            await AsyncStorage.removeItem(key);
            return 1
        } catch (e) {
            throw new Error(e);
        }
    }

}

const STORAGE = new Storage();
export default STORAGE
