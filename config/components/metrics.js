import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const metrics = {
    gutter: {
        extraSmall: 4,
        small: 8,
        base: 16,
        large: 24,
        extraLarge: 48,
        val: function (val) {
            return this[val];
        }
    },

    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,

    // * get current window/device width and height
    windowWidth: width,
    windowHeight: height,
    // ... Add More Here
};

const METRICS = { ...metrics };
export default METRICS
