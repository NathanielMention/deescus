//define light/darkmode themes
const white = "#FFFFFF";
const black = "#1b2938";
const gray = "#F8F8F9";

const themeLight = {
  background: gray,
  body: black,
};

const themeDark = {
  background: black,
  body: white,
};

const theme = (mode) => (mode === "dark" ? themeDark : themeLight);

export default theme;
