import React, { useEffect, useState } from "react";
import FetchTags from "./components/TagsComponent";
import Navigation from "./components/Navigation";
import { Box, Switch, ThemeProvider } from "@mui/material";
import ErrorBox from "./components/ErrorBox";
import { darkTheme, lightTheme } from "./theme/theme";
import { tagsStore } from "./story/TagsStore";
import { observer } from "mobx-react";

const App = observer(() =>{
  const [theme, setTheme] = useState("light");
  const [onSiteError, setOnSiteError] = useState(false);

  useEffect(() => {
    if (tagsStore.errorMessage !== "") {
      setOnSiteError(true);
      setTimeout(() => {
        setOnSiteError(false);
      }, 3000);
    }
  }, [tagsStore.errSwitch]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Box bgcolor="background.default">
      <Switch checked={theme === "dark"} onChange={toggleTheme} />{" "}
      </Box>
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
          <Navigation tagsStore={tagsStore}/>
          <FetchTags tagsStore={tagsStore}/>
        </Box>
        {
          onSiteError &&
          <ErrorBox errorMessage={tagsStore.errorMessage}/>

        }
      </Box>
    </ThemeProvider>
  );
})

export default App;
