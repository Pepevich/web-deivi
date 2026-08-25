// tailwind.config.js
// -----------------------------------------------------------------------------
// theme.extend estaba vacío en el scaffold inicial. Se completó acá con lo
// que los componentes ya construidos (Hero.jsx, layout.jsx) necesitan para
// verse como en las capturas originales:
//   - colors: paleta oficial DeIvi (Manual de Marca 2026), igual a PALETTE
//     en src/data/siteData.js — si la paleta cambia ahí, replicar acá.
//   - fontFamily: los dos nombres que layout.jsx expone como variables CSS
//     vía next/font (--font-display para Playfair Display, --font-body
//     para Inter).
//   - keyframes/animation: fadeInUp, usado por Hero.jsx (animate-fadeInUp).
// -----------------------------------------------------------------------------
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        crema: "#f6f6f6",
        grafito: "#1d1d1b",
        rosa: "#f094ac",
        naranja: "#f59400",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out",
      },
    },
  },
  plugins: [],
};
