import React, { useState } from "react";
import FetchTags from "./components/TagsComponent";
import Navigation from "./components/Navigation";
import { Box, Switch, ThemeProvider } from "@mui/material";
import ErrorBox from "./components/ErrorBox";
import { darkTheme, lightTheme } from "./theme/theme";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Switch checked={theme === "dark"} onChange={toggleTheme} />{" "}
      <Box
        className="App"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          width: "100%",
          minHeight: "100svh",
          bgcolor: "background.default",
        }}
      >
        <Box
          mb={"10px"}
          px={"8px"}
          sx={{
            width: "clamp(300px, 90%, 1200px)",
          }}
        >
          <Navigation />
          <FetchTags />
        </Box>
        <ErrorBox />
      </Box>
    </ThemeProvider>
  );
}

export default App;
