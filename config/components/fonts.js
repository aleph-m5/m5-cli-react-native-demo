const openSans = {
    "light": "OpenSans-Light",
    "regular": "OpenSans-Regular",
    "semiBold": "OpenSans-SemiBold",
    "bold": "OpenSans-Bold",
}

const fonts = {
    family: {
        base: openSans.regular,
        light: openSans.light,
        regular: openSans.regular,
        semiBold: openSans.semiBold,
        bold: openSans.bold
    },
    size: {
        extraSmall: 11,
        small: 12,
        base: 14,
        large: 18,
        extraLarge: 20,
        veryExtraLarge: 30,
        val: function (val) {
            return this[val];
        }
    },
    lineHeight: {
        extraSmall: 10 * 1.5,
        small: 12 * 1.5,
        base: 14 * 1.5,
        large: 18 * 1.5,
        extraLarge: 20 * 1.5,
        veryExtraLarge: 30 * 1.5,
        val: function (val) {
            return this[val];
        }
    },

    weight: {
        thin: '100',
        extraLight: '200',
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extraBold: '800',
        black: '900',
        val: function (val) {
            return this[val];
        }
    },

    style: {
        normal: 'normal',
        italic: 'italic',
        val: function (val) {
            return this[val];
        }
    }
    // ... Add More Here
};

const FONTS = { ...fonts }
export default FONTS
