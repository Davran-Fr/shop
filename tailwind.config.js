/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "300": "300px",
        "350": "350px",
        "400": "400px",
        "450": "450px",
        "500": "500px",
      },
      backgroundImage: {
        "pastel-gradient": "linear-gradient(0deg,#475c6c, #5e717f,#475c6c)",
        registerBack: "linear-gradient(0deg, #457b9d)",
        header: "linear-gradient(0deg,  transparent, #edede9  )",
        mainBack: "linear-gradient(120deg,  #D9DFCC)",
        categoriesBack:
          "linear-gradient(190deg , transparent,transparent,#e9edc9)",
        gradientradialcenter:
          "radial-gradient(circle at center,white, transparent  )",
        headerGradient: "linear-gradient(180deg,#2f3e46  ,transparent     )",
      },
      backgroundColor: {
        mainColor: "#F4F6E4 ",
        bgBlue: "#d8eaab",
        orderBtn: "#EBEFCE",
        footerBacl: "#E9EDC9",
      },
      divideColor: {
        mainBack: "#475c6c",
      },
      fontFamily: {
        workSans: ["var(--font-workSans) ", "sans-serif"],
        ptSerif: ["var(--font-workSans) ", "sans-serif"],
        agamtoh: ["Agamtoh", "sans-serif"],
        world: ["World", "sans-serif"],
        how: ["Howdybun", "sans-serif"],
        howw: ["Howdybunn", "sans-serif"],
      },
      height: {
        "1px": "1px",
        "200px": "200px",
        "225px": "225px",
        "250px": "250px",
        "275px": "275px",
        "300px": "300px",
        "350px": "350px",
        "400px": "400px",
        "425px": "425px",
        "450px": "450px",
        "475px": "475px",
        "500px": "500px",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
      },
      padding: {
        "1px": "0.55px",
      },
      colors: {
        textBlue: "#a2d2ff",
      },
      maxHeight: {
        registerHeight: "500px",
      },
      maxWidth: {
        registerWidth: "850px",
        quickViewWidth: "950px",
        "quickViewWidth2": "400px",

      },
      borderWidth: {
        "1px": "1px",
      },
      boxShadow: {
        center: "0 0 50px rgba(0, 0, 0 , 0.30)",
      },
      translate: {
        "100%": "100%",
        "90%": "90%",
        "95%": "95%",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(110%)" },
          "100%": { transform: "translateX(-110%)" },
        },
      },
      animation: {
        marquee: "marquee 10s linear infinite",
      },
    },
  },
  plugins: [],
};
