import { Box } from "@mui/material";
import React from "react";
import bg from "../bg.jpg"; // This import assumes bg.jpg is located one level up from the current file directory

const Background = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      zIndex="-100"
      width="100%"
      height="50vh"
      bgcolor={"black"}
      display={"flex"}
      justifyContent={"center"}
      sx={{
        filter: "brightness(0.8)",
      }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1700px",
          height: "50svh",
          backgroundImage: `url(${bg})`, // Using the imported image as a reference

          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}></Box>
    </Box>
  );
};

export default Background;
