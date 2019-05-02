import { Platform } from 'react-native';

const isIos = Platform.OS == "ios";

const CONST = {
    debug : true,
    isIos : isIos,
    isAndroid : !isIos
}

export default { ...CONST }
