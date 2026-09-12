import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette construite autour du logo, qui est monochrome.
        ink: "#111111",          // le noir exact du logo
        ink2: "#1E1E1E",
        bleu: "#1F4FE0",         // structure et information
        bleuc: "#EAF0FF",
        corail: "#FF5C39",       // action : devis, uniquement
        corailc: "#FFEDE8",
        jaune: "#FFB703",        // rappel de l'ampoule du logo
        jaunec: "#FFF4DC",
        vert: "#0FB08A",
        vertc: "#E4F7F1",
        gris: "#F3F5F9",
        grist: "#5C6470",
        bord: "#E6E9EE",
      },
      fontFamily: {
        // Lato : la police du logo. Site et identité ne font qu'un.
        sans: ["var(--font-lato)", "system-ui", "sans-serif"],
      },
      borderRadius: { xl2: "18px", xl3: "26px" },
      maxWidth: { content: "1200px" },
    },
  },
  plugins: [],
} satisfies Config;
