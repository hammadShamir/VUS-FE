import localFont from "next/font/local";


const primary = localFont({
    src: "./HeleneHess-Regular.woff2",
    variable: "--font-primary",
    weight: "900",
});
const secondary = localFont({
    src: "./Jost-400-Book.woff2",
    variable: "--font-secondary",
    weight: "100 900",
});


export { primary, secondary };