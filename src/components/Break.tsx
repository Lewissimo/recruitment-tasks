import { Box, Button, Grid, styled } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AnimW from "../utilitis/AnimW";
const Break = () => {
  const w_1 = "Kamil Lewiński";
  const w_2 = "worth hiring";
  const ArrowAnim = styled(Button)(({ theme }) => ({
    "@keyframes arrowAnim": {
      "0%": {
        transform: "scale(0.96)",
      },
      "50%": {
        transform: "scale(1.04)",
      },
      "100%": {
        transform: "scale(0.96)",
      },
    },
    animation: "arrowAnim 1s infinite",
    fontSize: "4em",
  }));
  return (
    <Box
      sx={{
        userSelect: "none",
      }}
      zIndex={10}
      position={"relative"}
      height={"50svh"}
      width={"100%"}
      display={"flex"}
      alignItems={"end"}
      fontWeight={"bold"}>
      <Grid
        container
        height={"40%"}
        width={"100%"}
        color={"white"}
        fontSize={"2em"}
        fontStyle={"italic"}>
        <Grid item xs={12} sm={6}>
          <AnimW value={w_1} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AnimW value={w_2} defaultDuration={w_1.length * 0.1} />
        </Grid>
        <Grid item xs={12}>
          <ArrowAnim
            variant="contained"
            href="#table"
            sx={{
              borderRadius: "50%",
            }}>
            <KeyboardArrowDownIcon />{" "}
          </ArrowAnim>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Break;
