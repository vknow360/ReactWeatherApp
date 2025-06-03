/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            animation: {
                float: "float 6s ease-in-out infinite",
                "fade-in": "fadeIn 0.5s ease-out",
                "spin-slow": "spin 3s linear infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                fadeIn: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
            backgroundImage: {
                "grid-white":
                    "linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                "grid-pattern":
                    "radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
            },
            backgroundSize: {
                "grid-sm": "20px 20px",
            },
        },
    },
    variants: {
        extend: {
            scale: ["group-hover"],
            opacity: ["group-hover"],
        },
    },
    plugins: [],
};
