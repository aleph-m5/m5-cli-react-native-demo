import COLORS from "./colors";
import FONTS from "./fonts";
import METRICS from "./metrics";

const styles = {
    fonts : {
        base: {
            fontFamily: FONTS.family.base
        },
        light: {
            fontFamily: FONTS.family.light
        },
        regular: {
            fontFamily: FONTS.family.regular
        },
        semibold: {
            fontFamily: FONTS.family.semibold
        },
        bold: {
            fontFamily: FONTS.family.bold
        }
    },
    margin : {
        default : {
            margin: METRICS.gutter.base
        },
        small : {
            margin: METRICS.gutter.small
        },
        large : {
            margin: METRICS.gutter.large
        },
        extraLarge : {
            margin: METRICS.gutter.extraLarge
        }
    },
    marginBottom : {
        default : {
            marginBottom: METRICS.gutter.base
        },
        small : {
            marginBottom: METRICS.gutter.small
        },
        large : {
            marginBottom: METRICS.gutter.large
        },
        extraLarge : {
            marginBottom: METRICS.gutter.extraLarge
        }
    },
    padding : {
        default : {
            margin: METRICS.gutter.base
        },
        small : {
            margin: METRICS.gutter.small
        },
        large : {
            margin: METRICS.gutter.large
        },
        extraLarge : {
            margin: METRICS.gutter.extraLarge
        }
    }
};

const STYLES = { ...styles }

export default STYLES
