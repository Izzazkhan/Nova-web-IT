import withMT from "@material-tailwind/html/utils/withMT";

export default  withMT({
    content: ['./src/**/*.{js,jsx,ts,tsx}'], // Ensure all files in 'src/' are scanned
    theme: {
        extend: {},
    },
    plugins: [],
});
