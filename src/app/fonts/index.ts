import localFont from "next/font/local";


const primary = localFont({
    src: "./RobotoSlab-Bold.ttf",
    variable: "--font-primary",
    weight: "100 900",
});
const secondary = localFont({
    src: "./Jost.woff",
    variable: "--font-secondary",
    weight: "100 900",
});


export { primary, secondary };