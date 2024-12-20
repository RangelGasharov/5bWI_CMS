module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        ptsans: ["PT Sans", "sans-serif"],
        oswald: ["Oswald", "sans-serif"]
      },
      colors: {
        "drab-dark-brown": "#2D2B03",
        "penn-red": "#960200",
        "british-racing-green": "#034732",
        "sunglow": "#FFD046",
        "light orange": "#FCD0A1",
        "russian-violet": "#241E4E"
      },
      screens: {
        "xs": "480px"
      }
    },
  },
  plugins: [],
}