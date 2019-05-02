export const collection = {
    main: "#feb15f",
    black: "#000000",
    softBlack: "#777777",
    gray: "#cccccc",
    white: "#ffffff"
}

const text = {
    default: collection.softBlack,
}

const COLORS = {
    ...collection,
    text: { ...text }
}

export default COLORS
